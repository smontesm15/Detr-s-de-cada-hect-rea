/**
 * Archivo central de contenido del blog académico.
 * Edita únicamente este archivo para completar los días 2 a 6, agregar la carrera
 * de cada integrante, añadir "Nuestra postura" en el Día 7 o registrar créditos de imágenes.
 *
 * Regla de visualización: cualquier campo que permanezca vacío ("") o arreglo vacío ([])
 * se oculta automáticamente en la interfaz y no suma palabras al reloj de lectura.
 */

export interface Integrante {
  nombre: string;
  carrera: string;
}

export interface FuenteDia {
  titulo: string;
  tipo: string;
  anio: string;
  autor: string;
  enlace: string;
}

export interface ContextualizacionDia {
  titulo: string;
  enlace: string;
}

export interface ImagenDia {
  /** Ruta local (ej. "/imagenes/mapa.jpg") o URL válida. Si está vacío, no se muestra imagen. */
  src: string;
  alt: string;
  pieDeFoto: string;
  credito: string;
}

export interface DiaContenido {
  numero: number;
  titulo: string;
  subtitulo: string;
  integrante: string;
  parrafos: string[];
  /** Campos específicos para los días 2 a 6 */
  fuente?: FuenteDia;
  contextualizacion?: ContextualizacionDia;
  contexto?: string;
  perspectiva?: string;
  aporteALaTesis?: string;
  dilemaEtico?: string;
  cita?: string;
  imagen?: ImagenDia;
  /** Campo específico para el día 7 */
  nuestraPostura?: string;
}

export interface ReferenciaItem {
  cita: string;
  enlace?: string;
}

export interface CreditoImagen {
  descripcion: string;
  credito: string;
  enlace?: string;
}

export interface ProyectoInfo {
  titulo: string;
  subtitulo?: string;
  grupo: string;
  curso: string;
  audiencia: string;
  preguntaIndagacion: string;
  tesis: string;
  integrantes: Integrante[];
}

export const PROYECTO: ProyectoInfo = {
  titulo: "Detrás de cada hectárea",
  subtitulo:
    "Siete días para entender quién se quedó con la tierra en los Montes de María (1990-2005)",
  grupo: "Grupo 7",
  curso: "CBU Colombia: espacio, tiempo, diferencia",
  audiencia:
    "Lectura dirigida a estudiantes de pregrado de ingenierías, economía, administración y ciencias.",
  preguntaIndagacion:
    "¿Cuál fue la influencia de los grupos armados al margen de la ley en la concentración de la tenencia de la tierra en la región de los Montes de María entre 1990 y 2005?",
  tesis:
    "En la región de los Montes de María entre 1990 y 2005, la presencia y accionar de los grupos armados al margen de la ley impulsó la concentración de la tenencia de la tierra al sustituir el control estatal y subordinar los derechos legales de propiedad campesina a través del despojo sistemático a favor de élites locales y terceros.",
  integrantes: [
    { nombre: "Juan González Puentes", carrera: "[carrera]" },
    { nombre: "Sahara Manuela Montes Martínez", carrera: "[carrera]" },
    { nombre: "Juan Sebastián Pinedo Sogamoso", carrera: "[carrera]" },
    { nombre: "Laura Santana Ortiz", carrera: "[carrera]" },
    { nombre: "Natalia Vitoviz Perdomo", carrera: "[carrera]" },
  ],
};

export const DIAS: DiaContenido[] = [
  {
    numero: 1,
    titulo: "La pregunta que inquieta",
    subtitulo: "Planteamiento inicial e hipótesis del equipo",
    integrante: "",
    parrafos: [
      'Todo proceso de investigación riguroso nace de una pregunta que inquieta y desafía lo evidente. En este recorrido grupal, nuestra mirada se ha centrado en una región profundamente marcada por los daños del conflicto armado en Colombia: los Montes de María. Nuestra pregunta de indagación busca responder: "¿Cuál fue la influencia de los grupos armados al margen de la ley en la concentración de la tenencia de la tierra en la región de los Montes de María entre 1990 y 2005?"',
      'Partimos de la convicción de que los problemas agrarios de nuestro país no se reducen a meras cifras económicas o atributos físicos del suelo. Por ello, nuestra tesis central postula: "En la región de los Montes de María entre 1990 y 2005, la presencia y accionar de los grupos armados al margen de la ley impulsó la concentración de la tenencia de la tierra al sustituir el control estatal y subordinar los derechos legales de propiedad campesina a través del despojo sistemático a favor de élites locales y terceros."',
      "Sin embargo, antes de contrastar esta postura con los archivos, mapas y testimonios, nuestra hipótesis inicial asumía que el desplazamiento forzado y el abandono de tierras operaban casi exclusivamente como un daño colateral y directo de los enfrentamientos armados entre la guerrilla y los paramilitares. Al arrancar este viaje, creíamos que la concentración de la tierra era un efecto automático de la guerra y que los actores armados actuaban por iniciativa propia para expulsar a los campesinos, sin dimensionar cómo estas dinámicas se entrelazaban con intereses económicos previos, la omisión o cuestionamientos al rol estatal, o el papel de terceros y élites locales que se beneficiaron de la reconfiguración territorial.",
      "A lo largo de los siguientes días (del 2 al 6), cada miembro de nuestro equipo analizará una fuente distinta, desde informes de memoria histórica sobre Montes de María y El Salado hasta estudios de contrarreforma agraria, mapas de uso del suelo y crónicas periodísticas. ¿Confirmarán estas fuentes nuestra suposición inicial o nos mostrarán una red de complicidades e intereses mucho más compleja? El análisis comienza mañana.",
    ],
  },
  {
    numero: 2,
    titulo: "",
    subtitulo: "",
    integrante: "",
    parrafos: [],
    fuente: {
      titulo: "La masacre de El Salado",
      tipo: "Informe de memoria histórica",
      anio: "",
      autor: "CNMH",
      enlace:
        "https://centrodememoriahistorica.gov.co/wp-content/uploads/2020/02/3.-La-masacre-de-El-Salado.pdf",
    },
    contextualizacion: {
      titulo:
        'CNMH (2023), "Un poco de verdad para poder respirar: trayectoria e impactos de los bloques paramilitares en Montes de María y Mojana"',
      enlace:
        "https://centrodememoriahistorica.gov.co/wp-content/uploads/2023/04/INFORME_MONTES-DE-MARIA-Y-MOJANA.pdf",
    },
    contexto: "",
    perspectiva: "",
    aporteALaTesis: "",
    dilemaEtico: "",
    cita: "",
    imagen: {
      src: "",
      alt: "",
      pieDeFoto: "",
      credito: "",
    },
  },
  {
    numero: 3,
    titulo: "",
    subtitulo: "",
    integrante: "",
    parrafos: [],
    fuente: {
      titulo:
        "Piden investigar papel de la Fuerza Pública en masacres de Montes de María",
      tipo: "Prensa",
      anio: "",
      autor: "El Tiempo",
      enlace:
        "https://www.eltiempo.com/justicia/jep-colombia/piden-investigar-papel-de-la-fuerza-publica-en-masacres-de-montes-de-maria-516220",
    },
    contextualizacion: {
      titulo: 'CODHES, "Los Montes de María bajo fuego"',
      enlace:
        "https://codhes.wordpress.com/wp-content/uploads/2021/01/montes-de-maria-bajo-fuego.pdf",
    },
    contexto: "",
    perspectiva: "",
    aporteALaTesis: "",
    dilemaEtico: "",
    cita: "",
    imagen: {
      src: "",
      alt: "",
      pieDeFoto: "",
      credito: "",
    },
  },
  {
    numero: 4,
    titulo: "",
    subtitulo: "",
    integrante: "",
    parrafos: [],
    fuente: {
      titulo: "Los amigos que se apoderaron de los Montes de María",
      tipo: "Prensa",
      anio: "2017",
      autor: "El Heraldo",
      enlace:
        "https://www.elheraldo.co/bolivar/2017/04/03/los-amigos-que-se-apoderaron-de-los-montes-de-maria-343767/",
    },
    contextualizacion: {
      titulo:
        '"Contrarreforma agraria y conflicto armado en los Montes de María, 1996-2016"',
      enlace:
        "https://www.researchgate.net/publication/337274281_Contrarreforma_agraria_y_conflicto_armado_en_los_Montes_de_Maria_1996-2016",
    },
    contexto: "",
    perspectiva: "",
    aporteALaTesis: "",
    dilemaEtico: "",
    cita: "",
    imagen: {
      src: "",
      alt: "",
      pieDeFoto: "",
      credito: "",
    },
  },
  {
    numero: 5,
    titulo: "",
    subtitulo: "",
    integrante: "",
    parrafos: [],
    fuente: {
      titulo:
        "Mapa de uso de la tierra en el conflicto (2002) y Mapa de vocación de uso de la tierra (2012)",
      tipo: "Cartografía",
      anio: "2002 / 2012",
      autor: "IGAC",
      enlace: "",
    },
    contextualizacion: {
      titulo:
        'DANE, Censo Nacional Agropecuario, y CNMH (2018), cap. 1, "La ocupación y apropiación del territorio"',
      enlace: "",
    },
    contexto: "",
    perspectiva: "",
    aporteALaTesis: "",
    dilemaEtico: "",
    cita: "",
    imagen: {
      src: "",
      alt: "",
      pieDeFoto: "",
      credito: "",
    },
  },
  {
    numero: 6,
    titulo: "",
    subtitulo: "",
    integrante: "",
    parrafos: [],
    fuente: {
      titulo: "[por definir]",
      tipo: "",
      anio: "",
      autor: "",
      enlace: "",
    },
    contextualizacion: {
      titulo: "[por definir]",
      enlace: "",
    },
    contexto: "",
    perspectiva: "",
    aporteALaTesis: "",
    dilemaEtico: "",
    cita: "",
    imagen: {
      src: "",
      alt: "",
      pieDeFoto: "",
      credito: "",
    },
  },
  {
    numero: 7,
    titulo: "Lo que cambió en nuestra mirada",
    subtitulo: "Síntesis del recorrido y consolidación de la tesis",
    integrante: "",
    parrafos: [
      "Llegamos al final de este recorrido de análisis y reflexión. Cuando iniciamos este blog en el Día 1, partíamos de una hipótesis inicial bastante directa: asumíamos que la concentración de tierras en los Montes de María entre 1990 y 2005 era el resultado directo del desplazamiento provocado por la confrontación armada entre los actores ilegales.",
      "Sin embargo, el diálogo crítico con las fuentes analizadas a lo largo de la semana (del Día 2 al Día 6) transformó profundamente nuestra mirada inicial. La evidencia demostró que el fenómeno no responde a una sola causa, sino a una red de factores históricos, institucionales y económicos: al analizar las fuentes a lo largo de los días 2 al 6, nuestra hipótesis inicial se transformó; pasamos de ver la violencia de los noventa como un daño colateral a comprender que esta intensificó disputas agrarias históricas y dio rostro humano al despojo, mientras que los mapas técnicos del IGAC, el Censo Agropecuario del DANE, los análisis de contrarreforma agraria y la prensa evidenciaron cómo los conflictos de uso del suelo, los vacíos y cuestionamientos institucionales, y los intereses de terceros y élites locales facilitaron la reconfiguración económica y la concentración de la tierra.",
      'Tras este riguroso tránsito por las fuentes, nuestra hipótesis inicial evolucionó de una suposición simple a una tesis consolidada: "En la región de los Montes de María entre 1990 y 2005, la presencia y accionar de los grupos armados al margen de la ley impulsó la concentración de la tenencia de la tierra al sustituir el control estatal y subordinar los derechos legales de propiedad campesina a través del despojo sistemático a favor de élites locales y terceros."',
      "Este ejercicio nos deja una profunda enseñanza como futuros profesionales: entender el territorio exige mirar más allá de los mapas de producción y reconocer que detrás de cada hectárea hay memorias, derechos vulnerados y luchas por la justicia social que no podemos ignorar.",
    ],
    nuestraPostura: "",
  },
];

export const REFERENCIAS: ReferenciaItem[] = [
  {
    cita: "Ojeda, D., Guerra, P., Aguirre, C., & Díaz, H. (2016). Caminos condenados. Laguna Libros.",
  },
  {
    cita: "IGAC (2002). Mapa Uso de la tierra en el conflicto.",
    enlace:
      "https://geoportal.igac.gov.co/sites/geoportal.igac.gov.co/files/geoportal/conflictos_uso.jpg",
  },
  {
    cita: "IGAC (2012). Mapa Vocación uso de la tierra.",
    enlace:
      "https://geoportal.igac.gov.co/sites/geoportal.igac.gov.co/files/geoportal/vocacion_uso_tierras.pdf",
  },
  {
    cita: "Guzmán, J. (2016). El país tiene 26,5 millones de hectáreas con vocación agro. La República.",
    enlace:
      "https://www.larepublica.co/economia/el-pais-tiene-265-millones-de-hectareas-con-vocacion-agro-2401746",
  },
  {
    cita: "Rutas del conflicto. Tierra en disputa.",
    enlace: "http://tierraendisputa.com/home",
  },
  {
    cita: "CNMH. La masacre de El Salado.",
    enlace:
      "https://centrodememoriahistorica.gov.co/wp-content/uploads/2020/02/3.-La-masacre-de-El-Salado.pdf",
  },
  {
    cita: "CNMH (2023). Un poco de verdad para poder respirar: trayectoria e impactos de los bloques paramilitares en Montes de María y Mojana.",
    enlace:
      "https://centrodememoriahistorica.gov.co/wp-content/uploads/2023/04/INFORME_MONTES-DE-MARIA-Y-MOJANA.pdf",
  },
  {
    cita: "CNMH (2018). Cap. 1: La ocupación y apropiación del territorio. En Tierras: balance de la contribución del CNMH al esclarecimiento histórico (pp. 17-24).",
    enlace:
      "http://www.centrodememoriahistorica.gov.co/micrositios/balances-jep/tierras.html",
  },
  {
    cita: "CNMH (2018). El Salado, Montes de María: tierra de luchas y contrastes.",
    enlace:
      "http://www.centrodememoriahistorica.gov.co/micrositios/un-viaje-por-la-memoria-historica/pdf/el-salado.pdf",
  },
  {
    cita: "El Tiempo. Piden investigar papel de la Fuerza Pública en masacres de Montes de María.",
    enlace:
      "https://www.eltiempo.com/justicia/jep-colombia/piden-investigar-papel-de-la-fuerza-publica-en-masacres-de-montes-de-maria-516220",
  },
  {
    cita: "CODHES. Los Montes de María bajo fuego (Serie Contribuciones a la Verdad).",
    enlace:
      "https://codhes.wordpress.com/wp-content/uploads/2021/01/montes-de-maria-bajo-fuego.pdf",
  },
  {
    cita: "El Heraldo (2017). Los amigos que se apoderaron de los Montes de María.",
    enlace:
      "https://www.elheraldo.co/bolivar/2017/04/03/los-amigos-que-se-apoderaron-de-los-montes-de-maria-343767/",
  },
  {
    cita: "Contrarreforma agraria y conflicto armado en los Montes de María, 1996-2016.",
    enlace:
      "https://www.researchgate.net/publication/337274281_Contrarreforma_agraria_y_conflicto_armado_en_los_Montes_de_Maria_1996-2016",
  },
  {
    cita: "ANEIA, Universidad de los Andes. El efecto de la violencia en la población rural: caso Montes de María.",
    enlace:
      "https://aneia.uniandes.edu.co/el-efecto-de-la-violencia-en-la-poblacion-rural-caso-montes-de-maria-2/",
  },
  {
    cita: "DANE. Censo Nacional Agropecuario.",
    enlace:
      "https://geoportal.dane.gov.co/geovisores/economia/censo-nacional-agropecuario/",
  },
  {
    cita: "FIP. Acceso a la tierra y sustitución de cultivos ilícitos.",
    enlace: "http://ideaspaz.org/media/website/FIP_NE_AccesosTierras.pdf",
  },
];

/**
 * Lista editable de créditos de imágenes.
 * Vacía por defecto; al agregar entradas con descripción y crédito,
 * aparecerá la subsección correspondiente en Referencias y créditos.
 */
export const CREDITOS_IMAGENES: CreditoImagen[] = [];
