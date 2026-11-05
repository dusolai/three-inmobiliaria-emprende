document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const leadId = urlParams.get('lead');

  const BACKEND_URL = "https://web-78t58qun41lt.up-de-fra1-k8s-1.apps.run-on-seenode.com";
  const PERFIL = 'emprendedor';

  // ─── Primero el vídeo, después agendar (5-11) ─────────────────────
  // Un solo vídeo. Hasta verlo ENTERO no aparece ningún botón de agendar:
  // en su lugar sale «Ver el vídeo» (si no lo ven, no queremos que lleguen
  // a la reunión). No se puede adelantar más allá de lo visto. Al terminar
  // se desbloquean los botones y este navegador lo recuerda.

  // ─── Progreso persistente (localStorage) ─────────────────────────
  const STORE_KEY = `three_progress_${leadId || 'anon'}`;
  let saved = { maxTime: {} };
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) saved = Object.assign(saved, JSON.parse(raw));
    if (!saved.maxTime) saved.maxTime = {};
  } catch (e) {}
  const persist = () => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(saved)); } catch (e) {}
  };

  // ─── Helpers de tracking ─────────────────────────────────────────
  const sendEvent = (type, meta) => {
    if (!leadId) return;
    try {
      fetch(`${BACKEND_URL}/tracking/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, type, meta: meta || null }),
        keepalive: true,
      }).catch(() => {});
    } catch (err) {}
  };

  sendEvent('landing_view', { perfil: PERFIL, url: window.location.href });

  // ─── 1. Botones: «Ver el vídeo» hasta terminarlo, luego «Agendar» ──
  // Junto a cada botón de agendar va uno de «Ver el vídeo» (lo oculta el
  // CSS en cuanto html tiene .video-visto, y al revés con los de agendar).
  document.querySelectorAll('.calendly').forEach((btn) => {
    const ver = document.createElement('a');
    ver.href = '#paso2-webinar';
    ver.className = 'ver-video';
    ver.textContent = '▶ Ver el vídeo para poder agendar';
    btn.parentNode.insertBefore(ver, btn);
  });
  const flot = document.getElementById('ctaFlotante');
  const desbloquear = () => {
    document.documentElement.classList.add('video-visto');
    document.querySelectorAll('.calendly').forEach((btn) => btn.classList.add('calendly-revealed'));
    if (flot) flot.classList.add('cta-persist');
  };
  if (saved.visto) desbloquear();

  // ─── 2. Terminó la presentación ENTERA: desbloquea y avisa al CRM ─
  // Se conserva el nombre del evento que ya entiende el CRM
  // (calendly_button_revealed = terminó el vídeo principal).
  let terminada = Boolean(saved.visto);
  const presentacionTerminada = (motivo) => {
    if (terminada) return;
    terminada = true;
    saved.visto = true; persist();
    desbloquear();
    sendEvent('calendly_button_revealed', { motivo });
  };
  const progreso = document.getElementById('progresoVideo');

  // ─── 3. Configurar TODOS los vídeos de la página ──────────────────
  const videos = document.querySelectorAll('video');
  videos.forEach((video) => {
    const videoId = video.id || `video_${Array.from(videos).indexOf(video)}`;
    // Los vídeos del embudo (presentación, extras) se rastrean y persisten.
    // Los DECORATIVOS (autoplay) son pura decoración: en bucle, sin volumen y
    // sin tracking (no deben salir en el CRM ni en "En directo").
    const esFunnel = !video.autoplay;
    if (!esFunnel) {
      video.muted = true;
      video.loop = true;
      video.play().catch(() => {});
      return;
    }

    // Restaurar la posición donde lo dejó (cuando el vídeo sepa su duración).
    if (saved.maxTime[videoId]) {
      const restore = () => {
        try { video.currentTime = Math.min(saved.maxTime[videoId], (video.duration || 1e9) - 0.5); } catch (e) {}
      };
      if (video.readyState >= 1) restore();
      else video.addEventListener('loadedmetadata', restore, { once: true });
    }

    // Bloqueo de seek: no adelantar más allá de lo ya visto (se puede retroceder).
    let maxTimeReached = saved.maxTime[videoId] || 0;
    video.addEventListener('timeupdate', () => {
      if (!video.seeking && video.currentTime > maxTimeReached) {
        maxTimeReached = video.currentTime;
        if (!video._lastSave || maxTimeReached - video._lastSave > 3) {
          video._lastSave = maxTimeReached;
          saved.maxTime[videoId] = maxTimeReached;
          persist();
        }
      }
    });
    video.addEventListener('seeking', () => {
      if (video.currentTime > maxTimeReached + 1) video.currentTime = maxTimeReached;
    });
    video.addEventListener('pause', () => {
      saved.maxTime[videoId] = maxTimeReached; persist();
    });

    // Tracking de play/progreso/end por vídeo. Los hitos ya superados en una
    // sesión anterior (posición restaurada) no se reenvían al CRM.
    let firedPlay = false;
    const restoredPct = (saved.maxTime[videoId] && video.duration)
      ? (saved.maxTime[videoId] / video.duration) * 100 : 0;
    const fired = { 25: restoredPct >= 25, 50: restoredPct >= 50, 75: restoredPct >= 75 };
    let fired90 = restoredPct >= 90;

    video.addEventListener('play', () => {
      if (!firedPlay) { firedPlay = true; sendEvent('video_play', { videoId }); }
    });

    video.addEventListener('timeupdate', () => {
      if (!video.duration) return;
      const pct = (video.currentTime / video.duration) * 100;
      for (const milestone of [25, 50, 75]) {
        if (!fired[milestone] && pct >= milestone) {
          fired[milestone] = true;
          sendEvent(`video_progress_${milestone}`, { videoId });
        }
      }
      if (!fired90 && pct >= 90) {
        fired90 = true;
        sendEvent('video_progress_90', { videoId });
      }
      if (videoId === 'videoWebinar') {
        const visto = Math.max(maxTimeReached, video.currentTime) / video.duration * 100;
        if (progreso && !terminada) progreso.textContent = `Llevas un ${Math.floor(visto)}% visto. Al llegar al final podrás agendar.`;
        if (visto >= 98) presentacionTerminada('webinar_98pct');
      }
    });

    video.addEventListener('ended', () => {
      sendEvent('video_complete', { videoId });
      saved.maxTime[videoId] = video.duration || maxTimeReached; persist();
      if (videoId === 'videoWebinar') presentacionTerminada('webinar_complete');
    });
  });

  // ─── 4. Tracking de clics en cualquier botón Calendly ─────────────
  document.querySelectorAll('.calendly').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (leadId) {
        try {
          fetch(`${BACKEND_URL}/tracking/video-click`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ leadId }),
            keepalive: true,
          });
        } catch (err) {}
      }
    });
  });
});
