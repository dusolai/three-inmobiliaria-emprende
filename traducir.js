/**
 * Traducción ES <-> PT de la landing de emprende, sin recargar la página.
 *
 * Cómo funciona: recorre los nodos de TEXTO del <body> y sustituye cada cadena
 * de español por su equivalente en portugués (y al revés para volver). Solo toca
 * texto, nunca la estructura, así que se conservan negritas, enlaces y estilos.
 *
 * Además, en modo portugués:
 *   - cambia el VSL corto (#video1) al archivo en portugués (1-pt.mp4),
 *   - oculta el webinar en español (no hay webinar en portugués),
 *   - muestra el vídeo extra de Portugal,
 *   - deja visibles los botones de reservar (ver estilos html.pt en index.html).
 *
 * ⚠️ Sube el archivo del VSL corto en portugués como "1-pt.mp4" en este mismo
 * repositorio para que el vídeo se vea en portugués. Hasta entonces, el resto de
 * la traducción funciona igual; solo el VSL no cargará en portugués.
 */
(function () {
  // ─── Diccionario español → portugués ───────────────────────────────
  var ES2PT = {
    // Navegación
    'Inicio': 'Início',
    'Beneficios': 'Benefícios',
    'Herramientas': 'Ferramentas',
    'Servicios': 'Serviços',
    'Formación': 'Formação',
    'Contacto': 'Contacto',

    // Hero
    'Perfecto como complemento • Sistema Digital Paso a Paso': 'Perfeito como complemento • Sistema Digital Passo a Passo',
    'Tu Camino al Éxito con': 'O Teu Caminho para o Sucesso com',
    'Prescripciones Inmobiliarias': 'Prescrições Imobiliárias',
    'Accede a un sistema probado que te permite': 'Acede a um sistema comprovado que te permite',
    'generar honorarios por prescribir': 'gerar honorários por prescrever',
    '. Ideal para quienes buscan un ingreso extra con': '. Ideal para quem procura um rendimento extra com',
    'máxima flexibilidad horaria sin dejar tu trabajo actual': 'máxima flexibilidade de horário sem deixar o teu emprego atual',
    'Quiero Acelerar Mis Ventas Ahora': 'Quero Acelerar as Minhas Vendas Agora',
    'Ver Cómo Funciona': 'Ver Como Funciona',
    'AGENDA TU REUNION': 'AGENDA A TUA REUNIÃO',

    // Vídeos / pasos
    'Paso 1 · Vídeo': 'Passo 1 · Vídeo',
    'Descubre cómo Three Inmobiliaria está transformando el sector inmobiliario digital.': 'Descobre como a Three Inmobiliaria está a transformar o setor imobiliário digital.',
    'Paso 2 · Webinar completo': 'Passo 2 · Webinar completo',
    'Webinar bloqueado': 'Webinar bloqueado',
    'Termina de ver el vídeo del Paso 1 para desbloquear el webinar completo de Three Inmobiliaria.': 'Termina de ver o vídeo do Passo 1 para desbloquear o webinar completo da Three Inmobiliaria.',
    'Webinar completo con nuestra experta (27 min).': 'Webinar completo com a nossa especialista (27 min).',
    '📅 Reservar mi reunión 1 a 1': '📅 Reservar a minha reunião 1 a 1',
    'Disponible tras el webinar': 'Disponível após o webinar',

    // Trust
    'Profesionales y Prescriptores': 'Profissionais e Prescritores',

    // Problema
    '¿Buscas una forma de generar ingresos adicionales sin la complejidad de empezar desde cero?': 'Procuras uma forma de gerar rendimentos adicionais sem a complexidade de começar do zero?',
    'Muchas personas quieren participar en el lucrativo sector inmobiliario, pero se enfrentan a desafíos constantes: la barrera de entrada, el tiempo que requiere formarse, y la necesidad de lidiar con contratos y burocracia compleja.': 'Muitas pessoas querem participar no lucrativo setor imobiliário, mas enfrentam desafios constantes: a barreira de entrada, o tempo que exige a formação, e a necessidade de lidar com contratos e burocracia complexa.',
    'Esto hace que muchos abandonen la idea de diversificar sus ingresos. La falta de un sistema paso a paso y la ausencia de un soporte constante pueden paralizar tus intenciones y hacer que las oportunidades parezcan inalcanzables.': 'Isto faz com que muitos abandonem a ideia de diversificar os seus rendimentos. A falta de um sistema passo a passo e a ausência de um apoio constante podem paralisar as tuas intenções e fazer com que as oportunidades pareçam inalcançáveis.',
    '¿Y si existiera una solución que eliminara estas barreras y te permitiera enfocarte solo en conectar oportunidades?': 'E se existisse uma solução que eliminasse estas barreiras e te permitisse focar apenas em conectar oportunidades?',

    // Solución
    'Te presentamos': 'Apresentamos-te',
    ': Tu Sistema Listo Para Prescribir': ': O Teu Sistema Pronto Para Prescrever',
    'Three Inmobiliaria no es solo una plataforma, es tu socio para': 'A Three Inmobiliaria não é só uma plataforma, é o teu parceiro para',
    'generar honorarios extra': 'gerar honorários extra',
    '. Te proporcionamos un sistema donde tu único rol es': '. Proporcionamos-te um sistema onde o teu único papel é',
    'conectar oportunidades': 'conectar oportunidades',
    ', eliminando las barreras burocráticas y técnicas del sector.': ', eliminando as barreiras burocráticas e técnicas do setor.',
    'Te equipamos con formación paso a paso, soporte operativo y herramientas que hacen el trabajo pesado por ti.': 'Equipamos-te com formação passo a passo, apoio operacional e ferramentas que fazem o trabalho pesado por ti.',
    'Tú creces a tu propio ritmo y nosotros nos encargamos del resto.': 'Tu cresces ao teu próprio ritmo e nós tratamos do resto.',
    'Es el momento perfecto para empezar a prescribir como complemento de ingresos.': 'É o momento perfeito para começar a prescrever como complemento de rendimentos.',

    // Beneficios
    'Beneficios Clave para Ti': 'Benefícios-Chave para Ti',
    'Todo lo que necesitas para generar ingresos adicionales de forma flexible': 'Tudo o que precisas para gerar rendimentos adicionais de forma flexível',
    'Conecta · Prescribe · Gana': 'Conecta · Prescreve · Ganha',
    'Un sistema digital paso a paso para generar ingresos extra desde tu móvil, sin experiencia previa.': 'Um sistema digital passo a passo para gerar rendimentos extra a partir do teu telemóvel, sem experiência prévia.',
    'Sistema Sencillo': 'Sistema Simples',
    'Una plataforma fácil de usar donde registras y haces seguimiento a tus recomendaciones.': 'Uma plataforma fácil de usar onde registas e acompanhas as tuas recomendações.',
    'Comisiones Claras': 'Comissões Claras',
    'Genera honorarios transparentes por cada operación concretada que proviene de ti.': 'Gera honorários transparentes por cada operação concretizada que vem de ti.',
    'Formación Inicial': 'Formação Inicial',
    'Aprende paso a paso cómo identificar oportunidades sin necesidad de experiencia previa.': 'Aprende passo a passo como identificar oportunidades sem necessidade de experiência prévia.',
    'A tu Ritmo': 'Ao Teu Ritmo',
    'Trabaja cuando quieras y desde donde quieras. Máxima flexibilidad horaria.': 'Trabalha quando quiseres e de onde quiseres. Máxima flexibilidade de horário.',
    'Respaldo Total': 'Apoio Total',
    'Nosotros nos encargamos de todo el proceso técnico, visitas y cierre legal de la operación.': 'Nós tratamos de todo o processo técnico, visitas e fecho legal da operação.',
    'Soporte Dedicado': 'Apoio Dedicado',
    'Tendrás a alguien del equipo para guiarte en todo momento y responder tus dudas.': 'Terás alguém da equipa para te guiar a todo o momento e responder às tuas dúvidas.',

    // Herramientas
    'Todo lo Necesario Para Comenzar': 'Tudo o Necessário Para Começar',
    'Un ecosistema diseñado para facilitarte la recomendación': 'Um ecossistema desenhado para te facilitar a recomendação',
    'Plataforma intuitiva para registrar tus prescripciones': 'Plataforma intuitiva para registar as tuas prescrições',
    'Material promocional y de marketing listo para usar': 'Material promocional e de marketing pronto a usar',
    'Sistema de notificaciones sobre el estado de tus recomendaciones': 'Sistema de notificações sobre o estado das tuas recomendações',
    'Panel de control de honorarios generados': 'Painel de controlo de honorários gerados',
    'Guías paso a paso para identificar clientes potenciales': 'Guias passo a passo para identificar clientes potenciais',
    'Acceso directo a asesores profesionales asignados': 'Acesso direto a consultores profissionais atribuídos',
    'Comunidad privada de apoyo y networking': 'Comunidade privada de apoio e networking',
    'Plantillas de mensajes para redes sociales y WhatsApp': 'Modelos de mensagens para redes sociais e WhatsApp',
    'Formación continua en técnicas de recomendación': 'Formação contínua em técnicas de recomendação',
    'Soporte técnico para uso de la plataforma': 'Apoio técnico para uso da plataforma',
    'Gestión transparente y automatizada y pagos seguros': 'Gestão transparente e automatizada e pagamentos seguros',
    'Actualizaciones constantes sobre el mercado para que compartas': 'Atualizações constantes sobre o mercado para partilhares',

    // Servicios
    'Más Que Inmobiliario: Eres Empresario Independiente': 'Mais Que Imobiliário: És Empresário Independente',
    'Dentro de la plataforma tienes acceso a varias líneas de negocio para multiplicar tus ingresos': 'Dentro da plataforma tens acesso a várias linhas de negócio para multiplicar os teus rendimentos',
    'No eres un comercial: eres tu': 'Não és um comercial: és o teu',
    'propio negocio': 'próprio negócio',
    '. Además de las prescripciones inmobiliarias, accedes a una línea de': '. Além das prescrições imobiliárias, acedes a uma linha de',
    'servicios esenciales': 'serviços essenciais',
    'que la gente ya utiliza en su día a día (luz, telefonía, hipotecas y servicios financieros) y por los que puedes generar ingresos extra con tu propia cartera de clientes.': 'que as pessoas já utilizam no dia a dia (luz, telefonia, crédito habitação e serviços financeiros) e pelos quais podes gerar rendimentos extra com a tua própria carteira de clientes.',
    'Energía y Luz': 'Energia e Luz',
    'Telefonía': 'Telefonia',
    'Hipotecas': 'Crédito Habitação',
    'Servicios Financieros': 'Serviços Financeiros',

    // Formación
    'Formaciones de Marketing Digital Gratuitas': 'Formações de Marketing Digital Gratuitas',
    'Aprende a generar tus propios leads desde el móvil, incluido sin coste en la plataforma': 'Aprende a gerar os teus próprios leads a partir do telemóvel, incluído sem custo na plataforma',
    'Uso de redes sociales para la captación de leads': 'Uso de redes sociais para a captação de leads',
    'Introducción y tu primera campaña en Instagram con el móvil': 'Introdução e a tua primeira campanha no Instagram com o telemóvel',
    'Campañas en Instagram paso a paso': 'Campanhas no Instagram passo a passo',
    'Mensajes en Instagram y WhatsApp Business para convertir en leads': 'Mensagens no Instagram e WhatsApp Business para converter em leads',
    'Cómo responder a mensajes y cerrar oportunidades': 'Como responder a mensagens e fechar oportunidades',
    'Cómo saber si tu campaña está funcionando': 'Como saber se a tua campanha está a funcionar',
    'Imagen módulo de formación (próximamente)': 'Imagem módulo de formação (brevemente)',
    '+ Nuevos módulos y formaciones que se van añadiendo continuamente.': '+ Novos módulos e formações que vão sendo adicionados continuamente.',

    // Portugal
    'Ya Operamos También en': 'Já Operamos Também em',
    'Somos una multinacional que acaba de lanzar un nuevo país. El': 'Somos uma multinacional que acabou de lançar um novo país. A',
    '9 de abril': '9 de abril',
    'hicimos el prelanzamiento en Oporto y el': 'fizemos o pré-lançamento no Porto e a',
    '11 de mayo': '11 de maio',
    'se realizó el lanzamiento oficial: la empresa ya opera en Portugal, también en el sector inmobiliario.': 'realizou-se o lançamento oficial: a empresa já opera em Portugal, também no setor imobiliário.',
    'Esto significa que': 'Isto significa que',
    'cualquier persona, resida en España o en Portugal': 'qualquer pessoa, resida em Espanha ou em Portugal',
    ', puede aprovechar el mismo sistema y la misma oportunidad. Una puerta abierta para los prescriptores portugueses y para quienes residen en España.': ', pode aproveitar o mesmo sistema e a mesma oportunidade. Uma porta aberta para os prescritores portugueses e para quem reside em Espanha.',

    // FAQ
    'Preguntas Frecuentes': 'Perguntas Frequentes',
    '¿Se requiere experiencia previa en el sector inmobiliario?': 'É necessária experiência prévia no setor imobiliário?',
    'No, nuestro programa está diseñado de cero para prescriptores. La motivación es clave y la plataforma te guiará en el proceso básico.': 'Não, o nosso programa foi desenhado de raiz para prescritores. A motivação é fundamental e a plataforma vai guiar-te no processo básico.',
    '¿Cómo generan honorarios los prescriptores?': 'Como geram honorários os prescritores?',
    'Recibirás comisiones transparentes por cada recomendación tuya que termine en una operación cerrada por nuestros agentes profesionales.': 'Receberás comissões transparentes por cada recomendação tua que termine numa operação fechada pelos nossos agentes profissionais.',
    '¿Tengo que hacer las visitas o el papeleo?': 'Tenho de fazer as visitas ou a papelada?',
    'No, nuestro equipo de agentes y legales se encargan de toda la burocracia, visitas y cierres. Tu labor es conectar la oportunidad.': 'Não, a nossa equipa de agentes e jurídicos trata de toda a burocracia, visitas e fechos. A tua função é conectar a oportunidade.',
    '¿Qué tipo de soporte ofrece Three Inmobiliaria?': 'Que tipo de apoio oferece a Three Inmobiliaria?',
    'Asistencia total y constante. Tendrás a tu disposición a nuestro equipo para resolver tus dudas rápidamente.': 'Assistência total e constante. Terás à tua disposição a nossa equipa para resolver as tuas dúvidas rapidamente.',
    '¿Puedo colaborar como prescriptor a tiempo parcial?': 'Posso colaborar como prescritor a tempo parcial?',
    'Sí, este rol está pensado para máxima flexibilidad y compatibilidad con otras actividades profesionales. Perfecto como complemento de ingresos.': 'Sim, este papel foi pensado para máxima flexibilidade e compatibilidade com outras atividades profissionais. Perfeito como complemento de rendimentos.',

    // CTA final + footer
    '¿Listo para Transformar tu Carrera Inmobiliaria?': 'Pronto para Transformar a Tua Carreira Imobiliária?',
    'Únete a nuestra red de prescriptores y empieza a generar ingresos extra recomendando': 'Junta-te à nossa rede de prescritores e começa a gerar rendimentos extra a recomendar',
    '© 2025 Three Inmobiliaria. Todos los derechos reservados.': '© 2025 Three Inmobiliaria. Todos os direitos reservados.',
    'Impulsando la diversificación de ingresos inteligentemente': 'Impulsionando a diversificação de rendimentos de forma inteligente'
  };

  // Diccionario inverso PT → ES (para volver al español)
  var PT2ES = {};
  Object.keys(ES2PT).forEach(function (k) { PT2ES[ES2PT[k]] = k; });

  var BTN_LABEL = { es: '🇵🇹 Português', pt: '🇪🇸 Español' };

  // Recorre nodos de texto y traduce con el diccionario dado.
  function translateNode(root, dict) {
    for (var n = root.firstChild; n; n = n.nextSibling) {
      if (n.nodeType === 3) {
        var raw = n.nodeValue;
        var key = raw.trim();
        if (key && dict[key]) {
          var lead = raw.match(/^\s*/)[0];
          var trail = raw.match(/\s*$/)[0];
          n.nodeValue = lead + dict[key] + trail;
        }
      } else if (n.nodeType === 1) {
        var tag = n.tagName;
        if (tag !== 'SCRIPT' && tag !== 'STYLE' && tag !== 'VIDEO' && tag !== 'SOURCE'
            && n.id !== 'langToggle') {
          translateNode(n, dict);
        }
      }
    }
  }

  // Cambia el VSL corto entre español y portugués.
  function swapVSL(lang) {
    var v = document.getElementById('video1');
    if (!v) return;
    var src = v.querySelector('source');
    if (!src) return;
    var want = (lang === 'pt') ? '1-pt.mp4' : '1.mp4';
    if (src.getAttribute('src') !== want) {
      src.setAttribute('src', want);
      try { v.load(); } catch (e) {}
    }
  }

  function updateBtn(lang) {
    var b = document.getElementById('langToggle');
    if (b) b.textContent = BTN_LABEL[lang];
  }

  function setLang(lang) {
    var html = document.documentElement;
    var actual = html.classList.contains('pt') ? 'pt' : 'es';
    if (lang === 'pt' && actual !== 'pt') {
      translateNode(document.body, ES2PT);
      html.classList.add('pt');
      html.setAttribute('lang', 'pt');
    } else if (lang === 'es' && actual !== 'es') {
      translateNode(document.body, PT2ES);
      html.classList.remove('pt');
      html.setAttribute('lang', 'es');
    }
    swapVSL(lang);
    updateBtn(lang);
    try { localStorage.setItem('three_lang', lang); } catch (e) {}
  }

  // Alterna idioma (lo llama el botón).
  window.__toggleLang = function () {
    var actual = document.documentElement.classList.contains('pt') ? 'pt' : 'es';
    setLang(actual === 'pt' ? 'es' : 'pt');
  };

  // Al cargar: aplica el idioma guardado.
  function init() {
    var guardado = 'es';
    try { guardado = localStorage.getItem('three_lang') || 'es'; } catch (e) {}
    if (guardado === 'pt') setLang('pt');
    else updateBtn('es');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
