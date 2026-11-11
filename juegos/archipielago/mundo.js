/* El mundo del juego: los cuatro personajes, el archipiélago de siete islas
   y la puerta final. El motor (archivo.html) solo lee de aquí.

   Cada isla es una sala isométrica de 10 × 8 casillas. En "cosas" va todo
   lo que ocupa una casilla:
     decoracion  mobiliario; con "solido" estorba el paso
     foco        algo que se examina; hay que verlos todos antes del reto
     item        algo que se carga hasta su destino
     zona        donde se deja un item
     placa       losa que se pisa, con su orden
     secreto     el guiño escondido; no hace falta para terminar

   En "m" va cómo se dibuja:
     { sp:"banco", alto:0.5 }   un sprite del pack, apoyado en el suelo
     { t:"columna", ... }       una figura dibujada por el motor
   "alto" va en unidades de altura (1 unidad = una casilla de alto).
*/

var PERSONAJES = [
  { id: "sofia", nombre: "Sofía", oficio: "la que pregunta", sp: "per-sofia",
    lema: "Nunca acepta la primera respuesta. Su pista llega en forma de pregunta.",
    color: "#c9a227",
    ocioso: ["¿Por qué cada época creyó que su manera de enseñar era la natural?", "Siete islas, siete respuestas a la misma pregunta. ¿Cuál es la pregunta?", "Nunca me quedo con la primera respuesta. Casi siempre es la de alguien más.", "¿Qué isla te hizo dudar de algo que ya dabas por sabido?"] },
  { id: "teo", nombre: "Teo", oficio: "el que observa", sp: "per-teo",
    lema: "Mira antes de opinar. Su pista señala el detalle que se te pasó.",
    color: "#6a9ec4",
    ocioso: ["Desde aquí se ven las siete. Mira cuáles siguen a oscuras.", "Cada isla rescatada dejó una letra. Juntas dicen algo.", "Me fijo en lo que no cambia de una época a otra. Es poco.", "Las apagadas tienen candado. Las abiertas brillan. No hay que adivinar."] },
  { id: "nura", nombre: "Nura", oficio: "la que recuerda", sp: "per-nura",
    lema: "Guarda lo que otros olvidan. Su pista trae un dato de la clase.",
    color: "#c47a9e",
    ocioso: ["Llevo el cuaderno al día. Lo que no se anota, se pierde.", "Los conceptos quedan guardados por corriente pedagógica, no sueltos.", "De Grecia al aula de hoy hay veinticinco siglos. Caben en siete islas.", "Si olvidas un concepto, está en el cuaderno. Para eso lo abrimos."] },
  { id: "bruno", nombre: "Bruno", oficio: "el que construye", sp: "per-bruno",
    lema: "Prueba, falla y rehace. Su pista descarta un camino equivocado.",
    color: "#7fb37f",
    ocioso: ["Una isla a la vez. La llave de una abre la siguiente.", "Si algo no encaja, no insistas: prueba otra cosa.", "Lo que no se usa, se desarma. Por eso quedaron a oscuras.", "Primero mira todo, después toca. Se pierde menos tiempo."] }
];

var SALAS = [

/* ════════════════════ 1 · GRECIA ════════════════════ */
{
  titulo: "La palestra",
  epoca: "Grecia · siglos VIII al IV a. C.",
  color: "#d4541f",
  letra: "P",
  llave: "la llave de arena",
  motivo: "columnas",
  mapa: { x: 0.12, y: 0.30 },
  ambiente: "Arena pisada y olor a aceite. Al fondo, dos puertas: una da a un cuartel, la otra a una casa con patio. Por la arena andan cuatro tablillas sin repartir.",
  piso: { img: "suelo-arena", tinte: "#d8a05a", alfa: 0.2 },
  muro: { c: "#e0d4b8", borde: "#c25a2a", patron: "greca" },

  instruccion: {
    mision: "Reparte las cuatro tablillas entre Esparta y Atenas.",
    pasos: [
      "Examina las tres cosas que hay sobre los altares: hasta verlas todas no podrás tocar las tablillas.",
      "Recoge una tablilla del suelo. La llevarás en la mano, encima de la cabeza.",
      "Déjala en la estera de la ciudad que practicaba eso. Si te equivocas, se queda en tu mano."
    ]
  },

  cosas: [
    { x: 0, y: 0, tipo: "decoracion", solido: true, m: { sp: "columna", alto: 1.8 } },
    { x: 4, y: 0, tipo: "decoracion", solido: true, m: { sp: "columna", alto: 1.8 } },
    { x: 9, y: 0, tipo: "decoracion", solido: true, m: { sp: "columna", alto: 1.8 } },
    { x: 0, y: 7, tipo: "decoracion", solido: true, m: { sp: "barril", alto: 0.62 } },
    { x: 9, y: 3, tipo: "decoracion", solido: true, m: { sp: "roca", alto: 0.45 } },

    { x: 2, y: 0, tipo: "decoracion", solido: true, m: { sp: "portal", alto: 1.55 } },
    { x: 7, y: 0, tipo: "decoracion", solido: true, m: { sp: "portal", alto: 1.55 } },

    { x: 2, y: 1, tipo: "zona", rotulo: "Esparta", m: { t: "estera", c: "#b4441c" } },
    { x: 7, y: 1, tipo: "zona", rotulo: "Atenas", m: { t: "estera", c: "#2f6b8a" } },

    { x: 3, y: 3, tipo: "decoracion", solido: true, m: { sp: "banco", alto: 0.52 } },
    { x: 4, y: 3, tipo: "decoracion", solido: true, m: { sp: "banco", alto: 0.52 } },
    { x: 5, y: 3, tipo: "decoracion", solido: true, m: { sp: "banco", alto: 0.52 } },
    { x: 6, y: 3, tipo: "decoracion", solido: true, m: { sp: "banco", alto: 0.52 } },

    { x: 3, y: 4, tipo: "item", destino: "Esparta",
      nombre: "El niño deja su casa a los siete años y vive en un cuartel" },
    { x: 4, y: 4, tipo: "item", destino: "Atenas",
      nombre: "Un esclavo de confianza lo acompaña a casa del maestro" },
    { x: 5, y: 4, tipo: "item", destino: "Esparta",
      nombre: "La resistencia al dolor se entrena como una materia más" },
    { x: 6, y: 4, tipo: "item", destino: "Atenas",
      nombre: "Se aprende la lira y a recitar a Homero" },

    { x: 1, y: 5, tipo: "foco", solido: true, m: { sp: "altar", alto: 0.85, encima: { sp: "em-lira", alto: 0.72 } },
      nombre: "Una lira de siete cuerdas",
      texto: "En Atenas la música no era adorno. Se aprendía a tocar y a recitar a Homero porque se creía que el ritmo ordenaba el alma antes que el argumento." },
    { x: 5, y: 6, tipo: "foco", solido: true, m: { sp: "altar", alto: 0.85, encima: { sp: "em-escudo", alto: 0.66 } },
      nombre: "Un escudo con una lambda",
      texto: "Λ de Lacedemonia. A los siete años el niño espartano dejaba su casa para entrar en la agogé, la crianza común que organizaba el Estado." },
    { x: 8, y: 5, tipo: "foco", solido: true, m: { sp: "altar", alto: 0.85, encima: { sp: "em-tablilla", alto: 0.56 } },
      nombre: "Una tablilla de cera gastada",
      texto: "Un extremo del estilo graba y el otro borra. Letras, música y gimnasia: las tres artes con que Atenas formaba a un ciudadano." },

    { x: 0, y: 2, tipo: "decoracion", solido: true, m: { sp: "arbusto-gr", alto: 0.32 } },
    { x: 8, y: 7, tipo: "decoracion", m: { sp: "flor-roja", alto: 0.2 } },
    { x: 1, y: 7, tipo: "decoracion", m: { sp: "flor-amar", alto: 0.2 } },

    { x: 9, y: 7, tipo: "secreto",
      nombre: "Unas letras rascadas en el zócalo",
      texto: "ΠΑΙΔΕΙΑ. Alguien la grabó aquí hace mucho. Es la palabra que los griegos usaban para algo más grande que instruir: formar a una persona entera. Guárdala: al final del archipiélago te va a hacer falta." }
  ],

  conceptos: [
    { clave: "agoge", corriente: "clasica", tema: "donde", termino: "Agogé",
      def: "La crianza común que el Estado espartano imponía desde los siete años. El niño deja de pertenecer a su familia para pertenecer a la ciudad: la educación como asunto público antes que doméstico.",
      por: { foco: "Un escudo con una lambda" } },
    { clave: "paideia", corriente: "clasica", tema: "que", termino: "Paideia",
      def: "La palabra griega para la formación entera de una persona, no solo para su instrucción. Es la pregunta que abre toda la historia de la pedagogía: ¿qué parte del ser humano se propone formar cada época?",
      por: "reto" }
  ],

  reto: {
    tipo: "llevar",
    objetivo: "Las dos puertas no se abren a la vez. Lleva cada tablilla a la ciudad que la practicaba.",
    pistas: {
      sofia: "¿Cuál de las dos ciudades necesitaba que el niño dejara de ser de su familia para ser de la ciudad?",
      teo: "Fíjate en quién acompaña al niño: donde hay un pedagogo que lo lleva, la casa sigue mandando.",
      nura: "En clase quedó la fórmula: Esparta forma el cuerpo para la falange; Atenas forma la palabra para la asamblea.",
      bruno: "Descarta lo fácil: la lira no suena en un cuartel."
    }
  },
  /* lo que dice cada personaje mientras explora esta isla */
  voces: {
    sofia: [
      "¿Quién decidió que un niño de siete años pertenece a la ciudad y no a su casa? Porque alguien lo decidió.",
      "Mismos dioses, mismo siglo, misma lengua. ¿Por qué formaban hombres tan distintos?"
    ],
    teo: [
      "Mira el suelo: arena pisada y olor a aceite. Aquí se entrena el cuerpo antes que la palabra.",
      "Fíjate en que las dos puertas son iguales por fuera. Lo que cambia está detrás."
    ],
    nura: [
      "En clase quedó así: paideia no es instruir, es formar a la persona entera.",
      "Agogé viene de «conducir». Literalmente: hacia dónde se lleva al niño."
    ],
    bruno: [
      "Una ciudad que necesita falange arma su escuela como un cuartel. Tiene su lógica.",
      "Si una tablilla no entra donde la pones, no insistas: esa es la pista."
    ]
  },
  cierre: "Dos ciudades griegas, el mismo siglo, los mismos dioses, y dos respuestas opuestas a la misma pregunta: ¿para qué formamos a un niño? Esparta contesta que para la ciudad en armas. Atenas, que para el ciudadano que delibera. Ninguna de las dos pensó que fuera una elección: cada una creía estar haciendo lo natural."
},

/* ════════════════════ 2 · IMPERIOS ════════════════════ */
{
  titulo: "La cámara de los cuatro imperios",
  epoca: "Egipto, China, los mexicas y los incas",
  color: "#17968e",
  letra: "A",
  llave: "la llave de nudos",
  motivo: "imperios",
  mapa: { x: 0.33, y: 0.16 },
  ambiente: "Cuatro vitrinas de cuatro mundos que nunca se conocieron. En el suelo, cuatro losas talladas y una rueda de piedra que no gira.",
  piso: { img: "suelo-adoquin", tinte: "#2f8b84", alfa: 0.16 },
  muro: { c: "#1f6560", borde: "#d9b24a", patron: "sillar" },

  instruccion: {
    mision: "Pisa las cuatro losas de la escuela más antigua a la más reciente.",
    pasos: [
      "Mira las cuatro vitrinas: cada una guarda el sistema educativo de un imperio.",
      "Cada losa del suelo lleva el nombre de uno de ellos.",
      "Písalas en orden cronológico. Si te equivocas de losa, todas vuelven a subir y empiezas otra vez."
    ]
  },

  cosas: [
    { x: 1, y: 1, tipo: "foco", solido: true, m: { sp: "estante-frascos", alto: 1.8, encima: { sp: "em-quipu", alto: 0.62 } },
      nombre: "Un quipu de cuerdas anudadas",
      texto: "Los incas no escribían con signos sino con nudos. En el Yachaywasi, la casa del saber, se formaba a los hijos de la nobleza; el resto aprendía su oficio en casa." },
    { x: 3, y: 1, tipo: "foco", solido: true, m: { sp: "estante-libros", alto: 1.8, encima: { sp: "em-papiro", alto: 0.5 } },
      nombre: "Un papiro con cálculos de crecida",
      texto: "Las Casas de la Vida egipcias formaban escribas. Medir la tierra después de que el Nilo se retirara era una tarea de Estado, y por eso se enseñaba." },
    { x: 6, y: 1, tipo: "foco", solido: true, m: { sp: "estante-frascos", alto: 1.8, encima: { sp: "em-sello", alto: 0.58 } },
      nombre: "Un sello de bronce chino",
      texto: "El saber conducía al cargo. El sistema de exámenes imperiales convirtió a la escuela en la puerta de la administración, siglos antes que en ningún otro lugar." },
    { x: 8, y: 1, tipo: "foco", solido: true, m: { sp: "estante-libros", alto: 1.8, encima: { sp: "em-codice", alto: 0.5 } },
      nombre: "Un códice mexica plegado",
      texto: "Calmécac para la nobleza, Telpochcalli para el pueblo. El único de los cuatro con educación obligatoria para todos, y a la vez el más estrictamente separado por cuna." },

    { x: 5, y: 3, tipo: "decoracion", solido: true, m: { t: "rueda", c: "#8d8676" } },
    { x: 0, y: 3, tipo: "decoracion", solido: true, m: { sp: "roca", alto: 0.45 } },
    { x: 9, y: 4, tipo: "decoracion", solido: true, m: { sp: "pozo", alto: 1.0 } },
    { x: 0, y: 6, tipo: "decoracion", solido: true, m: { sp: "caja", alto: 0.6 } },

    { x: 2, y: 5, tipo: "placa", orden: 1, rotulo: "Las Casas de la Vida egipcias", tag: "Egipto", m: { t: "losa", c: "#d9b24a" } },
    { x: 4, y: 6, tipo: "placa", orden: 2, rotulo: "Las escuelas de la China imperial", tag: "China", m: { t: "losa", c: "#d9b24a" } },
    { x: 6, y: 5, tipo: "placa", orden: 3, rotulo: "El Calmécac mexica", tag: "Mexicas", m: { t: "losa", c: "#d9b24a" } },
    { x: 8, y: 6, tipo: "placa", orden: 4, rotulo: "El Yachaywasi inca", tag: "Incas", m: { t: "losa", c: "#d9b24a" } },

    { x: 2, y: 3, tipo: "decoracion", m: { sp: "rocachica", alto: 0.2 } },

    { x: 0, y: 7, tipo: "secreto",
      nombre: "Una cuerda suelta debajo de la vitrina",
      texto: "Se le cayó al quipu y nadie la recogió. Los khipukamayuq, los que sabían leerlos, murieron sin dejar el método escrito: hoy entendemos los números de un quipu, pero no las palabras. Un sistema educativo entero se perdió porque nadie lo enseñó fuera de su gremio." }
  ],

  conceptos: [
    { clave: "escriba", corriente: "estado", tema: "que", termino: "El escriba",
      def: "El primer oficio formado por el Estado. Egipto abrió las Casas de la Vida para producir los funcionarios que el reino necesitaba: la escuela nace atada a la administración, no a la curiosidad.",
      por: { foco: "Un papiro con cálculos de crecida" } },
    { clave: "merito", corriente: "estado", tema: "quien", termino: "Examen y mérito",
      def: "China convirtió la escuela en la puerta del cargo público a través de los exámenes imperiales. Por primera vez el saber abre un camino de ascenso social, siglos antes que en Europa.",
      por: { foco: "Un sello de bronce chino" } },
    { clave: "estamental", corriente: "estado", tema: "quien", termino: "Educación estamental",
      def: "Una escuela distinta según la cuna: Calmécac para la nobleza, Telpochcalli para el pueblo. La educación puede ser obligatoria para todos y, aun así, reproducir el orden social del que parte.",
      por: "reto" }
  ],

  reto: {
    tipo: "pisar",
    objetivo: "La rueda solo gira si pisas las cuatro losas de la escuela más antigua a la más reciente.",
    pistas: {
      sofia: "¿Cuál de estos cuatro mundos ya era antiguo cuando los otros tres empezaban?",
      teo: "Mira las vitrinas: el papiro está mucho más deteriorado que el códice.",
      nura: "En clase pusimos los años: Egipto hacia el 2000 a. C., China hacia el 1000 a. C., y los dos imperios americanos ya en los siglos XIV y XV.",
      bruno: "Descarta empezar por América: los mexicas y los incas son los últimos en llegar, no los primeros."
    }
  },
  /* lo que dice cada personaje mientras explora esta isla */
  voces: {
    sofia: [
      "¿Por qué cuatro pueblos que nunca se conocieron inventaron la escuela casi a la vez?",
      "Si saber abre un cargo, ¿la escuela enseña o selecciona?"
    ],
    teo: [
      "Mira los nudos del quipu: no son adorno, son cifras. Eso también es escritura.",
      "Las cuatro vitrinas guardan lo mismo: algo para fijar la memoria fuera de la cabeza."
    ],
    nura: [
      "Egipto formaba escribas; China, funcionarios. En los dos casos, el que sabe manda.",
      "Los mexicas tenían dos escuelas: calmécac para los nobles, telpochcalli para el pueblo."
    ],
    bruno: [
      "Un imperio grande necesita archivo. Sin archivo no hay impuesto ni ejército.",
      "Si el examen decide el cargo, el sistema se sostiene solo. Está bien armado."
    ]
  },
  cierre: "Cuatro imperios que no supieron el uno del otro llegaron a la misma conclusión: un Estado grande no se sostiene sin gente formada para sostenerlo. Lo que cambia en cada uno es quién entra a la escuela y para qué sale de ella."
},

/* ════════════════════ 3 · EDAD MEDIA ════════════════════ */
{
  titulo: "El claustro",
  epoca: "Edad Media · siglos V al XV",
  color: "#4a5f9e",
  letra: "I",
  llave: "la llave de hierro",
  motivo: "claustro",
  mapa: { x: 0.56, y: 0.26 },
  ambiente: "Piedra fría y una galería de arcos. Huele a tinta de agallas y a leña. Al fondo, una puerta que ya no es de monasterio sino de universidad, y que todavía no cede.",
  piso: { img: "suelo-piedra", tinte: "#5a6a9e", alfa: 0.2 },
  muro: { c: "#5f6780", borde: "#aab3cc", patron: "sillar" },

  instruccion: {
    mision: "Pisa las cuatro fechas en el orden en que ocurrieron.",
    pasos: [
      "Examina el atril, la campana y el rosetón antes de tocar el suelo.",
      "En las losas están talladas cuatro cosas que pasaron entre el siglo IV y el XIII.",
      "Písalas de la más antigua a la más reciente y la puerta de la universidad cederá."
    ]
  },

  cosas: [
    { x: 0, y: 0, tipo: "decoracion", solido: true, m: { sp: "arco", alto: 1.7 } },
    { x: 3, y: 0, tipo: "decoracion", solido: true, m: { sp: "arco", alto: 1.7 } },
    { x: 6, y: 0, tipo: "decoracion", solido: true, m: { sp: "arco", alto: 1.7 } },
    { x: 9, y: 0, tipo: "decoracion", solido: true, m: { sp: "arco", alto: 1.7 } },
    { x: 0, y: 2, tipo: "decoracion", solido: true, m: { sp: "candelabro", alto: 1.05 } },
    { x: 9, y: 6, tipo: "decoracion", solido: true, m: { sp: "candelabro", alto: 1.05 } },
    { x: 7, y: 7, tipo: "decoracion", solido: true, m: { sp: "tumba", alto: 0.45 } },
    { x: 0, y: 5, tipo: "decoracion", solido: true, m: { sp: "chimenea", alto: 1.5 } },
    { x: 3, y: 2, tipo: "decoracion", solido: true, m: { sp: "gargola", alto: 0.55 } },

    { x: 2, y: 2, tipo: "foco", solido: true, m: { sp: "altar", alto: 0.82, encima: { sp: "libro-rayo", alto: 0.5 } },
      nombre: "Un atril con un códice encadenado",
      texto: "El libro se encadenaba porque valía más que el mueble que lo sostenía. Copiar era enseñar: durante siglos el scriptorium fue el único sitio donde el saber se reproducía." },
    { x: 7, y: 2, tipo: "foco", solido: true, m: { sp: "campana", alto: 0.78 },
      nombre: "Una campana pequeña",
      texto: "La vida monástica se regía por horas marcadas. De ahí viene algo que todavía haces sin pensarlo: partir el día de estudio en bloques que empiezan y terminan con una señal." },
    { x: 5, y: 7, tipo: "foco", solido: true, m: { sp: "roseton", alto: 0.95 },
      nombre: "Un rosetón con las armas de una catedral",
      texto: "Cuando las ciudades crecieron, las escuelas catedralicias desbordaron el claustro. De ellas, y de los gremios de maestros y alumnos que se organizaron alrededor, nació la universidad." },

    { x: 2, y: 5, tipo: "placa", orden: 1, rotulo: "Agustín escribe De Magistro y se pregunta si las palabras enseñan algo", tag: "Agustín", m: { t: "losa", c: "#c3b07a" } },
    { x: 4, y: 4, tipo: "placa", orden: 2, rotulo: "Carlomagno ordena abrir escuelas junto a monasterios y catedrales", tag: "Carlomagno", m: { t: "losa", c: "#c3b07a" } },
    { x: 6, y: 5, tipo: "placa", orden: 3, rotulo: "Bolonia se organiza como estudio general: nace la universidad", tag: "Bolonia", m: { t: "losa", c: "#c3b07a" } },
    { x: 8, y: 4, tipo: "placa", orden: 4, rotulo: "Tomás de Aquino sostiene que fe y razón no se contradicen", tag: "Tomás", m: { t: "losa", c: "#c3b07a" } },

    { x: 2, y: 7, tipo: "decoracion", m: { sp: "helecho", alto: 0.22 } },
    { x: 8, y: 2, tipo: "decoracion", m: { sp: "seta", alto: 0.18 } },

    { x: 0, y: 4, tipo: "secreto",
      nombre: "Una marca de cantero en el sillar",
      texto: "Cada picapedrero firmaba sus piedras con un signo propio para que le pagaran por obra. No sabían leer ni escribir, y aun así dejaron su nombre en la pared. El claustro donde se guardaba el saber lo levantó gente a la que ese saber no llegaba." }
  ],

  conceptos: [
    { clave: "scriptorium", corriente: "escolastica", tema: "donde", termino: "Scriptorium",
      def: "La sala donde los monjes copiaban a mano. Durante siglos fue el único lugar donde el saber se reproducía: copiar era, literalmente, enseñar, y por eso el libro valía más que el mueble que lo sostenía.",
      por: { foco: "Un atril con un códice encadenado" } },
    { clave: "universitas", corriente: "escolastica", tema: "donde", termino: "Universitas",
      def: "El gremio de maestros y estudiantes que se organiza para defender sus derechos frente a la ciudad y la Iglesia. De ahí nace la universidad, y de ahí vienen todavía sus grados y sus títulos.",
      por: { foco: "Un rosetón con las armas de una catedral" } },
    { clave: "escolastica", corriente: "escolastica", tema: "como", termino: "Escolástica",
      def: "El método medieval de enseñar discutiendo: se plantea una cuestión, se exponen las objeciones, se responde. Tomás de Aquino lo lleva a su forma más acabada al sostener que fe y razón no se contradicen.",
      por: "reto" }
  ],

  reto: {
    tipo: "pisar",
    objetivo: "Cuatro fechas talladas fuera de sitio. Písalas en orden y la puerta de la universidad cede.",
    pistas: {
      sofia: "¿Quién vino primero: el que dudaba de que enseñar fuera posible, o el que ya tenía una universidad donde discutirlo?",
      teo: "Mira el rosetón de la catedral: las escuelas catedralicias son anteriores a la universidad, no al revés.",
      nura: "Las fechas de la clase: 389, 789, 1088 y el siglo XIII.",
      bruno: "Descarta poner a Tomás al principio: él enseña ya dentro de la universidad que las otras tres fechas hicieron posible."
    }
  },
  /* lo que dice cada personaje mientras explora esta isla */
  voces: {
    sofia: [
      "¿Se copiaba para conservar el saber, o para decidir quién puede leerlo?",
      "¿Qué le pasa a una idea que solo existe en un ejemplar?"
    ],
    teo: [
      "Mira las ventanas: todas dan al patio. Nadie mira hacia afuera.",
      "Fíjate en el atril: el libro está encadenado. Eso dice bastante."
    ],
    nura: [
      "Primero el trivium —gramática, retórica, dialéctica— y después el quadrivium.",
      "La universidad nace aquí, en el siglo XII, como gremio de maestros y estudiantes."
    ],
    bruno: [
      "Copiar un libro a mano tomaba meses. Todo el sistema se armó alrededor de esa lentitud.",
      "Mil años de monasterios sostuvieron los textos. No es poco para un andamio."
    ]
  },
  cierre: "Setecientos años para pasar del monasterio a la universidad. Agustín abre preguntándose si un maestro puede enseñar algo con palabras; Tomás cierra sosteniendo que la razón no estorba a la fe. Entre esos dos extremos se levantó la institución en la que todavía estás sentada."
},

/* ════════════════════ 4 · MODERNIDAD ════════════════════ */
{
  titulo: "El gabinete",
  epoca: "Modernidad · la ciencia y la mujer",
  color: "#5e8a6a",
  letra: "D",
  llave: "la llave de bronce",
  motivo: "gabinete",
  mapa: { x: 0.78, y: 0.40 },
  ambiente: "Dos escritorios cubiertos de instrumentos. Tres retratos cuelgan de la pared del fondo y tres letreros esperan en mitad de la sala, todos con la placa vacía; las ideas que les corresponden andan sueltas por el suelo.",
  piso: { img: "suelo-madera", tinte: "#8a6a42", alfa: 0.22 },
  muro: { c: "#3f5c4a", borde: "#c2a05a", patron: "panel" },

  instruccion: {
    mision: "Devuelve cada idea a quien la sostuvo.",
    pasos: [
      "Examina el telescopio, la Didáctica Magna y la Vindicación antes de tocar nada.",
      "Por el suelo andan seis ideas sueltas. Recoge una y la llevarás en la mano.",
      "Déjala en la estera que lleva el nombre de su autor: tres bajo los retratos y tres junto a los letreros. Son seis viajes."
    ]
  },

  cosas: [
    { x: 1, y: 0, tipo: "decoracion", solido: true, m: { sp: "retrato-a", alto: 1.3 } },
    { x: 4, y: 0, tipo: "decoracion", solido: true, m: { sp: "retrato-b", alto: 1.3 } },
    { x: 7, y: 0, tipo: "decoracion", solido: true, m: { sp: "retrato-c", alto: 1.3 } },
    { x: 1, y: 1, tipo: "zona", rotulo: "Bacon", m: { t: "estera", c: "#6b7f5a" } },
    { x: 4, y: 1, tipo: "zona", rotulo: "Comenio", m: { t: "estera", c: "#6b7f5a" } },
    { x: 7, y: 1, tipo: "zona", rotulo: "Locke", m: { t: "estera", c: "#6b7f5a" } },

    { x: 1, y: 4, tipo: "decoracion", solido: true, m: { sp: "letrero", alto: 0.95 } },
    { x: 4, y: 4, tipo: "decoracion", solido: true, m: { sp: "letrero", alto: 0.95 } },
    { x: 7, y: 4, tipo: "decoracion", solido: true, m: { sp: "letrero", alto: 0.95 } },
    { x: 1, y: 5, tipo: "zona", rotulo: "Sor Juana", m: { t: "estera", c: "#6b7f5a" } },
    { x: 4, y: 5, tipo: "zona", rotulo: "Rousseau", m: { t: "estera", c: "#6b7f5a" } },
    { x: 7, y: 5, tipo: "zona", rotulo: "Wollstonecraft", m: { t: "estera", c: "#6b7f5a" } },

    { x: 3, y: 2, tipo: "decoracion", solido: true, m: { sp: "escritorio", alto: 1.15 } },
    { x: 6, y: 2, tipo: "decoracion", solido: true, m: { sp: "escritorio", alto: 1.15 } },
    { x: 9, y: 0, tipo: "decoracion", solido: true, m: { sp: "farol", alto: 1.15 } },
    { x: 9, y: 6, tipo: "decoracion", solido: true, m: { sp: "caja", alto: 0.6 } },

    { x: 2, y: 7, tipo: "item", destino: "Bacon",
      nombre: "El saber es poder: inducción, observación y experimento contra las palabras vacías" },
    { x: 3, y: 7, tipo: "item", destino: "Comenio",
      nombre: "Enseñar todo a todos, siguiendo el orden de la naturaleza" },
    { x: 4, y: 7, tipo: "item", destino: "Locke",
      nombre: "La mente del niño al nacer es una hoja en blanco que llenan los sentidos" },
    { x: 5, y: 7, tipo: "item", destino: "Sor Juana",
      nombre: "El convento como única rendija por donde una mujer podía llegar a las letras" },
    { x: 6, y: 7, tipo: "item", destino: "Rousseau",
      nombre: "A Sofía se la educa para el hogar; a Emilio, para el mundo" },
    { x: 7, y: 7, tipo: "item", destino: "Wollstonecraft",
      nombre: "Si la razón es universal, las mujeres también la tienen" },

    { x: 0, y: 1, tipo: "foco", solido: true, m: { sp: "telescopio", alto: 1.0 },
      nombre: "Un telescopio sin pulir",
      texto: "La Modernidad deja de preguntarle a los textos antiguos y empieza a mirar. El saber ya no se hereda: se comprueba." },
    { x: 9, y: 2, tipo: "foco", solido: true, m: { sp: "estante-libros", alto: 1.8 },
      nombre: "Un ejemplar de la Didáctica Magna",
      texto: "Comenio quiso enseñar todo a todos, con un orden copiado de las leyes de la naturaleza. Es el primer intento serio de una pedagogía con método." },
    { x: 9, y: 4, tipo: "foco", solido: true, m: { sp: "altar", alto: 0.82, encima: { sp: "libro-purpura", alto: 0.5 } },
      nombre: "Una Vindicación de 1792, con las páginas cortadas a mano",
      texto: "Wollstonecraft señala la contradicción del siglo: si la razón es universal, no puede detenerse en la puerta de las mujeres." },

    { x: 0, y: 7, tipo: "secreto",
      nombre: "El reverso de un retrato descolgado",
      texto: "Detrás del marco de Sor Juana, una firma a lápiz: «Yo, la peor de todas». Así se llamó a sí misma al renunciar a sus libros bajo presión de la Iglesia. Tenía la biblioteca más grande de la Nueva España y la vendió entera." }
  ],

  conceptos: [
    { clave: "metodo", corriente: "realismo", tema: "como", termino: "Método experimental",
      def: "Bacon propone dejar de preguntarle a los textos antiguos y empezar a observar y comprobar. El saber deja de heredarse y pasa a demostrarse: es el giro que hace posible la ciencia moderna.",
      por: { foco: "Un telescopio sin pulir" } },
    { clave: "pansofia", corriente: "realismo", tema: "que", termino: "Enseñar todo a todos",
      def: "La Didáctica Magna de Comenio: una escuela ordenada según las leyes de la naturaleza y abierta a todos los niños, sin distinción de condición ni de sexo. El primer intento serio de una pedagogía con método.",
      por: { foco: "Un ejemplar de la Didáctica Magna" } },
    { clave: "razon", corriente: "ilustracion", tema: "quien", termino: "Razón universal",
      def: "Wollstonecraft señala la contradicción de la Ilustración: si la razón es de todos, no puede detenerse en la puerta de las mujeres. La igualdad educativa se vuelve un argumento, no una concesión.",
      por: { foco: "Una Vindicación de 1792, con las páginas cortadas a mano" } },
    { clave: "tabula", corriente: "ilustracion", tema: "como", termino: "Tabula rasa",
      def: "Para Locke la mente del recién nacido es una hoja en blanco que llenan los sentidos. Si todo viene de la experiencia, entonces la educación decide casi todo lo que una persona llegará a ser.",
      por: "reto" }
  ],

  reto: {
    tipo: "llevar",
    objetivo: "Recoge cada idea del suelo y déjala en la estera que hay bajo su retrato.",
    pistas: {
      sofia: "¿Cuál de los seis escribió contra otro de los seis? Empieza por ese par.",
      teo: "Observa el orden de los retratos: los tres primeros son del XVII, los tres últimos del XVIII.",
      nura: "En el taller fueron dos rutas de tres estaciones: Bacon, Comenio y Locke por un lado; el Renacimiento, Rousseau y Wollstonecraft por el otro.",
      bruno: "Descarta confundir a Locke con Comenio: uno habla de cómo entra el conocimiento, el otro de cómo se organiza la escuela."
    }
  },
  /* lo que dice cada personaje mientras explora esta isla */
  voces: {
    sofia: [
      "¿Por qué el método que servía para medir estrellas tardó tanto en entrar al aula?",
      "Si ellas hicieron el trabajo, ¿quién firmó el libro?"
    ],
    teo: [
      "Mira los retratos: fíjate a quién pintaron con instrumento y a quién sin nada en las manos.",
      "El aparato está aquí, sobre la mesa. El nombre de quien lo usó, no."
    ],
    nura: [
      "Lo dijimos en clase: la ciencia moderna cambia la autoridad del texto por la observación.",
      "Muchas aprendieron en gabinetes privados porque las aulas les estaban cerradas."
    ],
    bruno: [
      "Un gabinete es un taller: se mide, se anota y se vuelve a medir.",
      "Si el dato contradice al maestro, gana el dato. Ese fue el cambio."
    ]
  },
  cierre: "La misma época que inventó el método científico sostuvo, sin ver contradicción, que media humanidad no necesitaba aprenderlo. Wollstonecraft fue de las primeras en decir en voz alta que eso no se sostenía."
},

/* ════════════════════ 5 · IMPRENTA ════════════════════ */
{
  titulo: "La imprenta",
  epoca: "Del humanismo a la Ilustración",
  color: "#b0763a",
  letra: "E",
  llave: "la llave de plomo",
  motivo: "prensa",
  mapa: { x: 0.70, y: 0.64 },
  ambiente: "Olor a plomo y aceite. Tres pliegos recién tirados andan por el suelo, cada uno con una frase y sin firma. Las cajas de tipos del fondo llevan el nombre de su autor.",
  piso: { img: "suelo-cripta", tinte: "#a0763e", alfa: 0.3 },
  muro: { c: "#6e4a2c", borde: "#c9923f", patron: "ladrillo" },

  instruccion: {
    mision: "Lleva cada pliego a la caja de tipos de quien escribió esa frase.",
    pasos: [
      "Examina la caja de tipos y el pliego húmedo antes de tocar la prensa.",
      "Los tres pliegos de delante no están firmados: léelos al recogerlos.",
      "Déjalos en la estera que hay frente a la estantería con el nombre correcto."
    ]
  },

  cosas: [
    { x: 4, y: 0, tipo: "decoracion", solido: true, m: { sp: "prensa", alto: 1.2 } },
    { x: 5, y: 0, tipo: "decoracion", solido: true, m: { sp: "prensa", alto: 1.2 } },
    { x: 0, y: 0, tipo: "decoracion", solido: true, m: { sp: "estante-libros", alto: 1.8 } },
    { x: 9, y: 0, tipo: "decoracion", solido: true, m: { sp: "carreta", alto: 0.65 } },
    { x: 0, y: 6, tipo: "decoracion", solido: true, m: { sp: "barril", alto: 0.62 } },
    { x: 9, y: 6, tipo: "decoracion", solido: true, m: { sp: "barril", alto: 0.62 } },

    { x: 3, y: 2, tipo: "item", destino: "Lutero",
      nombre: "«Pedí a las ciudades fundar y sostener escuelas para niños y niñas: si cada creyente debe leer la Biblia, cada creyente debe saber leer.»" },
    { x: 5, y: 2, tipo: "item", destino: "Erasmo",
      nombre: "«Me burlé de la escuela de mi tiempo, que llenaba la memoria y dejaba el juicio vacío.»" },
    { x: 7, y: 2, tipo: "item", destino: "Moreno y Escandón",
      nombre: "«En la Nueva Granada propuse un plan de estudios que corría la teología del centro.»" },

    { x: 2, y: 7, tipo: "decoracion", solido: true, m: { sp: "letrero", alto: 0.9 } },
    { x: 5, y: 7, tipo: "decoracion", solido: true, m: { sp: "letrero", alto: 0.9 } },
    { x: 8, y: 7, tipo: "decoracion", solido: true, m: { sp: "letrero", alto: 0.9 } },

    { x: 2, y: 6, tipo: "zona", rotulo: "Erasmo", m: { t: "estera", c: "#8a6a3a" } },
    { x: 5, y: 6, tipo: "zona", rotulo: "Lutero", m: { t: "estera", c: "#8a6a3a" } },
    { x: 8, y: 6, tipo: "zona", rotulo: "Moreno y Escandón", m: { t: "estera", c: "#8a6a3a" } },

    { x: 0, y: 3, tipo: "foco", solido: true, m: { sp: "caja", alto: 0.65 },
      nombre: "Una caja de tipos móviles",
      texto: "Sin imprenta no hay Reforma, y sin Reforma no hay alfabetización masiva. Las tres cosas ocurren juntas y se empujan entre sí." },
    { x: 9, y: 3, tipo: "foco", solido: true, m: { sp: "barril", alto: 0.62, encima: { sp: "pergamino", alto: 0.46 } },
      nombre: "Un pliego aún húmedo",
      texto: "Las ideas dejaron de viajar a velocidad de copista. Un panfleto podía cruzar Europa en semanas, y eso cambió quién participaba en la discusión." },

    { x: 9, y: 1, tipo: "secreto",
      nombre: "Una errata en el pliego de arriba",
      texto: "Dice «eduación». El cajista puso la letra al revés y nadie lo vio antes de tirar la edición entera. Las primeras imprentas producían más rápido de lo que nadie alcanzaba a corregir: el error también se volvió masivo." }
  ],

  conceptos: [
    { clave: "alfabetizacion", corriente: "estado", tema: "quien", termino: "Alfabetización masiva",
      def: "Imprenta y Reforma se empujan entre sí: si cada creyente debe leer la Biblia por su cuenta, cada creyente debe aprender a leer. Las ciudades empiezan a fundar y sostener escuelas para niños y niñas.",
      por: { foco: "Una caja de tipos móviles" } },
    { clave: "opinion", corriente: "ilustracion", tema: "donde", termino: "Opinión pública",
      def: "Un panfleto cruza Europa en semanas. Las ideas dejan de viajar a velocidad de copista, y eso cambia quién puede participar en la discusión y qué puede discutirse.",
      por: { foco: "Un pliego aún húmedo" } },
    { clave: "plan", corriente: "estado", tema: "que", termino: "Plan de estudios",
      def: "Moreno y Escandón propone en la Nueva Granada un currículo que corre la teología del centro. Decidir qué se enseña, en qué orden y con cuánto peso se revela como una decisión política.",
      por: "reto" }
  ],

  reto: {
    tipo: "llevar",
    objetivo: "Ninguna frase está firmada. Lleva cada pliego a la caja de tipos de quien la escribió.",
    pistas: {
      sofia: "¿Cuál de las tres frases solo puede haberse escrito en América?",
      teo: "Mira quién habla de la Biblia y quién de la memoria: no es el mismo problema.",
      nura: "En la clase de Edad Moderna fueron tres rondas; Moreno y Escandón era el único neogranadino de los nueve autores.",
      bruno: "Descarta a Erasmo para la frase de las escuelas municipales: esa es una consecuencia directa de la Reforma."
    }
  },
  /* lo que dice cada personaje mientras explora esta isla */
  voces: {
    sofia: [
      "¿Qué cambia en una clase cuando cada estudiante puede tener su propio libro?",
      "Rousseau dice que hay que dejar crecer al niño. ¿Dejarlo crecer hacia dónde?"
    ],
    teo: [
      "Mira los tipos de plomo: cada letra va suelta. De ahí sale todo lo demás.",
      "Fíjate en que el libro ya trae índice y grabados. Está pensado para aprender solo."
    ],
    nura: [
      "Comenio lo escribió en el siglo XVII: enseñar todo a todos. Y con imágenes.",
      "El Orbis Pictus fue el primer libro ilustrado hecho a propósito para niños."
    ],
    bruno: [
      "Mover tipos sueltos en vez de tallar la página entera: ahí está el invento.",
      "Baja el precio del libro y el aula se rearma sola. Primero la máquina, después el método."
    ]
  },
  cierre: "Entre el humanismo y la Ilustración casi todos estos autores se estaban respondiendo unos a otros. Ninguno escribe solo, y leerlos en fila, como una lista de nombres, es perder justamente lo que los hacía interesantes."
},

/* ════════════════════ 6 · CONDUCTISMO ════════════════════ */
{
  titulo: "El laboratorio",
  epoca: "Conductismo · Watson, Pávlov y Skinner",
  color: "#14a06a",
  letra: "I",
  llave: "la llave de níquel",
  motivo: "laboratorio",
  mapa: { x: 0.44, y: 0.76 },
  ambiente: "Azulejo blanco y luz fría. Un perro de porcelana con la cánula dibujada, una caja con palanca y cuatro estaciones numeradas que alguien dejó sin secuencia.",
  piso: { img: "suelo-piedra", tinte: "#cfe2dc", alfa: 0.4 },
  muro: { c: "#d4dedb", borde: "#14a06a", patron: "azulejo" },

  instruccion: {
    mision: "Pisa las cuatro estaciones en el orden del condicionamiento clásico.",
    pasos: [
      "Examina la campana, el comedero y el cuaderno de curvas.",
      "Las cuatro losas verdes son los cuatro momentos del experimento de Pávlov.",
      "Hay dos pasos con la campana sola: uno abre el experimento y el otro lo cierra. No son el mismo."
    ]
  },

  cosas: [
    { x: 3, y: 0, tipo: "decoracion", solido: true, m: { sp: "perro", alto: 0.52 } },
    { x: 7, y: 7, tipo: "decoracion", solido: true, m: { sp: "caja", alto: 0.68 } },
    { x: 0, y: 0, tipo: "decoracion", solido: true, m: { sp: "estante-frascos", alto: 1.8 } },
    { x: 9, y: 7, tipo: "decoracion", solido: true, m: { sp: "cubo", alto: 0.4 } },

    { x: 2, y: 2, tipo: "placa", orden: 1, rotulo: "Tocar la campana sola y comprobar que el perro no reacciona", tag: "Campana sola", m: { t: "losa", c: "#14a06a" } },
    { x: 7, y: 2, tipo: "placa", orden: 2, rotulo: "Presentar el alimento y observar la salivación que ya existía", tag: "El alimento", m: { t: "losa", c: "#14a06a" } },
    { x: 3, y: 5, tipo: "placa", orden: 3, rotulo: "Emparejar campana y alimento varias veces seguidas", tag: "Emparejar", m: { t: "losa", c: "#14a06a" } },
    { x: 8, y: 5, tipo: "placa", orden: 4, rotulo: "Tocar la campana sola: ahora el perro saliva", tag: "Campana de nuevo", m: { t: "losa", c: "#14a06a" } },

    { x: 1, y: 6, tipo: "foco", solido: true, m: { sp: "campana", alto: 0.78 },
      nombre: "Una campana de latón",
      texto: "Antes de cualquier emparejamiento la campana no significa nada para el perro. Es un estímulo neutro, y ese es justamente el punto de partida del experimento." },
    { x: 5, y: 1, tipo: "foco", solido: true, m: { sp: "cubo", alto: 0.45 },
      nombre: "Un comedero con palanca",
      texto: "La caja de Skinner cambia la pregunta. La conducta ya no se provoca desde fuera: se emite, y la consecuencia decide si vuelve a ocurrir." },
    { x: 9, y: 0, tipo: "foco", solido: true, m: { sp: "caja", alto: 0.6, encima: { sp: "libro-rayo", alto: 0.46 } },
      nombre: "Un cuaderno con curvas dibujadas",
      texto: "Adquisición, extinción y recuperación espontánea. Pávlov medía saliva; lo que terminó describiendo fue una forma del tiempo." },

    { x: 0, y: 7, tipo: "secreto",
      nombre: "Una ficha caída detrás del archivador",
      texto: "«Alberto B., 11 meses.» Es el niño del experimento de Watson de 1920, al que condicionaron a temerle a una rata blanca y nunca descondicionaron. Lo sacaron del hospital antes de terminar. La psicología tardó cincuenta años en escribir sus comités de ética, y los escribió por casos como este." }
  ],

  conceptos: [
    { clave: "neutro", corriente: "conductismo", tema: "como", termino: "Estímulo neutro",
      def: "Antes del experimento la campana no significa nada para el perro. Comprobarlo es el paso cero: sin esa prueba previa no se puede demostrar que lo aprendido se aprendió de verdad.",
      por: { foco: "Una campana de latón" } },
    { clave: "operante", corriente: "conductismo", tema: "como", termino: "Condicionamiento operante",
      def: "En la caja de Skinner la conducta no se provoca desde fuera: se emite, y la consecuencia decide si vuelve a ocurrir. De aquí salen el refuerzo y el castigo tal como se usan todavía en el aula.",
      por: { foco: "Un comedero con palanca" } },
    { clave: "clasico", corriente: "conductismo", tema: "como", termino: "Condicionamiento clásico",
      def: "Neutro, innato, emparejamiento y respuesta condicionada. Pávlov describe cómo un estímulo que no significaba nada termina provocando una respuesta que no era suya.",
      por: "reto" }
  ],

  reto: {
    tipo: "pisar",
    objetivo: "El panel solo acepta la secuencia correcta del condicionamiento clásico. Pisa las cuatro estaciones en orden.",
    pistas: {
      sofia: "¿Cómo sabrías que la campana no significaba nada, si no lo compruebas antes de empezar?",
      teo: "Fíjate en que hay dos estaciones con la campana sola. No son la misma: una abre y otra cierra.",
      nura: "Es la misma secuencia del laboratorio del aula virtual: neutro, innato, emparejar, condicionado.",
      bruno: "Descarta empezar emparejando: si emparejas primero, ya no puedes demostrar que la campana era neutra."
    }
  },
  /* lo que dice cada personaje mientras explora esta isla */
  voces: {
    sofia: [
      "Si puedo predecir la conducta, ¿ya entendí a la persona?",
      "¿Qué parte del que aprende no cabe en esta medición?"
    ],
    teo: [
      "Mira la jaula: todo está controlado menos una cosa. Esa es justamente la que miden.",
      "Fíjate en la campana y el plato. El orden entre los dos lo es todo."
    ],
    nura: [
      "Pávlov buscaba digestión y encontró el reflejo condicionado. Fue de casualidad.",
      "Skinner no habla de premio y castigo: habla de refuerzo y de su programa."
    ],
    bruno: [
      "Esto es ingeniería: entra un estímulo, sale una conducta, se ajusta y se repite.",
      "Funciona. El problema no es que falle, es todo lo que deja fuera."
    ]
  },
  cierre: "Watson lo llevó al extremo famoso: dadme una docena de niños sanos y os devolveré el especialista que queráis. La educación entendida como ingeniería. Durante medio siglo pareció la única psicología seria que existía."
},

/* ════════════════════ 7 · CONSTRUCTIVISMO ════════════════════ */
{
  titulo: "El aula",
  epoca: "Constructivismo · Piaget y Vygotski",
  color: "#b453e0",
  letra: "A",
  llave: "la llave de tiza",
  motivo: "aula",
  mapa: { x: 0.22, y: 0.60 },
  ambiente: "La última isla no parece una isla: es un aula cualquiera, con las sillas movidas y cosas a medio hacer. Dos escritorios llevan un nombre, y por el suelo andan cuatro afirmaciones sin dueño.",
  piso: { img: "suelo-madera", tinte: "#a87ac4", alfa: 0.18 },
  muro: { c: "#cdbbe2", borde: "#9a35c9", patron: "tablero" },

  instruccion: {
    mision: "Lleva cada afirmación al escritorio de quien la sostuvo.",
    pasos: [
      "Examina los bloques, las dos sillas enfrentadas y el cuaderno subrayado.",
      "Recoge una de las cuatro afirmaciones del suelo.",
      "Déjala en la estera de Piaget o en la de Vygotski. Dos son de cada uno."
    ]
  },

  cosas: [
    { x: 2, y: 0, tipo: "decoracion", solido: true, m: { sp: "escritorio", alto: 1.15 } },
    { x: 7, y: 0, tipo: "decoracion", solido: true, m: { sp: "escritorio", alto: 1.15 } },
    { x: 0, y: 0, tipo: "decoracion", solido: true, m: { sp: "estante-libros", alto: 1.8 } },
    { x: 9, y: 0, tipo: "decoracion", solido: true, m: { sp: "farol", alto: 1.15 } },
    { x: 0, y: 7, tipo: "decoracion", solido: true, m: { sp: "caja", alto: 0.6 } },

    { x: 2, y: 1, tipo: "zona", rotulo: "Piaget", m: { t: "estera", c: "#9a35c9" } },
    { x: 7, y: 1, tipo: "zona", rotulo: "Vygotski", m: { t: "estera", c: "#9a35c9" } },

    { x: 3, y: 5, tipo: "item", destino: "Piaget",
      nombre: "El desarrollo va primero: hay que esperar a que el niño esté listo" },
    { x: 4, y: 6, tipo: "item", destino: "Vygotski",
      nombre: "El aprendizaje jala al desarrollo: hay que adelantarse" },
    { x: 6, y: 5, tipo: "item", destino: "Piaget",
      nombre: "Lo nuevo se asimila a los esquemas que el niño ya tiene" },
    { x: 7, y: 6, tipo: "item", destino: "Vygotski",
      nombre: "La distancia entre lo que logra solo y lo que logra acompañado" },

    { x: 1, y: 6, tipo: "foco", solido: true, m: { sp: "lena", alto: 0.45 },
      nombre: "Unos bloques de madera a medio apilar",
      texto: "Piaget observaba a sus propios hijos. No le interesaba cuánto sabían, sino con qué lógica se equivocaban: el error como ventana al pensamiento." },
    { x: 9, y: 4, tipo: "foco", solido: true, m: { sp: "silla", alto: 0.66 },
      nombre: "Dos sillas enfrentadas",
      texto: "Para Vygotski toda función aparece dos veces: primero entre personas y después dentro de una. El pensamiento empieza siendo una conversación." },
    { x: 9, y: 7, tipo: "foco", solido: true, m: { sp: "caja", alto: 0.6, encima: { sp: "libro-purpura", alto: 0.46 } },
      nombre: "Un cuaderno abierto con una frase subrayada",
      texto: "«Averigüe qué sabe ya el alumno y enseñe en consecuencia.» Ausubel: lo nuevo se aprende si engancha con lo que ya está; si no engancha, se memoriza y se va." },

    { x: 5, y: 2, tipo: "decoracion", m: { sp: "flor-amar", alto: 0.2 } },
    { x: 0, y: 5, tipo: "decoracion", solido: true, m: { sp: "arbusto", alto: 0.26 } },

    { x: 0, y: 2, tipo: "secreto",
      nombre: "Una esquina del tablero mal borrada",
      texto: "Quedó media fecha: 1896. Es el año en que nacieron los dos, Piaget en Neuchâtel y Vygotski en Orsha, a tres mil kilómetros el uno del otro. Nunca se conocieron. Vygotski leyó a Piaget y le respondió por escrito; Piaget leyó esa respuesta en 1962, veintiocho años después de que Vygotski hubiera muerto." }
  ],

  conceptos: [
    { clave: "zdp", corriente: "constructivismo", tema: "como", termino: "Zona de desarrollo próximo",
      def: "La distancia entre lo que un alumno logra solo y lo que logra acompañado. Para Vygotski enseñar consiste en trabajar justo en esa franja: ni en lo que ya domina ni en lo que todavía le queda lejos.",
      por: { foco: "Dos sillas enfrentadas" } },
    { clave: "significativo", corriente: "constructivismo", tema: "como", termino: "Aprendizaje significativo",
      def: "Ausubel lo resume así: averigüe qué sabe ya el alumno y enseñe en consecuencia. Lo nuevo se aprende si engancha con lo que ya está; si no engancha, se memoriza y se va.",
      por: { foco: "Un cuaderno abierto con una frase subrayada" } },
    { clave: "esquema", corriente: "constructivismo", tema: "como", termino: "Asimilación y acomodación",
      def: "Piaget: lo nuevo se incorpora a los esquemas que el niño ya tiene, y cuando no cabe, el esquema se reorganiza. Por eso el error no es un fallo sino la ventana por donde se ve pensar.",
      por: "reto" }
  ],

  reto: {
    tipo: "llevar",
    objetivo: "Recoge cada afirmación y déjala en el escritorio de quien la sostuvo.",
    pistas: {
      sofia: "¿Cuál de los dos tendría que decirle a un docente que espere, y cuál que intervenga ya?",
      teo: "Mira las dos sillas enfrentadas: lo que pasa entre dos personas no es de Piaget.",
      nura: "En la clase quedó así: Piaget, primero madurar; Vygotski, primero aprender.",
      bruno: "Descarta repartir dos y dos al azar: fíjate solo en si la frase habla de uno o de dos."
    }
  },
  /* lo que dice cada personaje mientras explora esta isla */
  voces: {
    sofia: [
      "Si el error es parte de aprender, ¿por qué lo seguimos calificando como fracaso?",
      "¿Aprendo solo y después lo cuento, o lo cuento y por eso aprendo?"
    ],
    teo: [
      "Mira las mesas: están en grupo, no en fila. Eso ya es una teoría.",
      "Fíjate en quién se sienta al lado del que todavía no puede. Ahí está la zona."
    ],
    nura: [
      "Piaget: el niño construye solo, por etapas. Vygotski: construye con otro, y antes.",
      "Zona de desarrollo próximo: lo que hoy hace acompañado, mañana lo hace solo."
    ],
    bruno: [
      "Un andamio se quita cuando el muro se sostiene. Si no se quita, no era andamio.",
      "Dale el problema antes que la respuesta. Se arma mejor así."
    ]
  },
  cierre: "Nacieron el mismo año y nunca llegaron a discutir: Vygotski murió a los treinta y siete. Buena parte de la pedagogía del siglo XX se dedicó a completar esa conversación que no ocurrió."
}
,
/* ════════════════════ 8 · PEDAGOGÍA CRÍTICA (detrás de la puerta) ════════════════════ */
{
  titulo: "El círculo de cultura",
  epoca: "Pedagogía crítica · América Latina, desde 1960",
  color: "#cf3b4e",
  letra: "",
  llave: "",
  trasLaPuerta: true,
  motivo: "circulo",
  mapa: { x: 0.52, y: 0.47 },
  ambiente: "No hay tarima ni filas: unas sillas puestas en círculo, y ninguna mira la espalda de otra. En la pared, un cartel con una sola palabra. Por el suelo andan cuatro frases sobre cómo se enseña, todavía sin separar.",
  piso: { img: "suelo-madera", tinte: "#b5703f", alfa: 0.24 },
  muro: { c: "#c89070", borde: "#8a4433", patron: "ladrillo" },

  instruccion: {
    mision: "Separa las cuatro frases entre la educación bancaria y la problematizadora.",
    pasos: [
      "Examina las tres cosas marcadas con ?: hasta verlas todas no podrás tocar las frases.",
      "Recoge una frase del suelo. La llevarás en la mano.",
      "Déjala del lado que le corresponde. Dos son de cada uno."
    ]
  },

  cosas: [
    { x: 0, y: 0, tipo: "decoracion", solido: true, m: { sp: "estante-libros", alto: 1.8 } },
    { x: 9, y: 0, tipo: "decoracion", solido: true, m: { sp: "farol", alto: 1.15 } },
    { x: 0, y: 7, tipo: "decoracion", solido: true, m: { sp: "caja", alto: 0.6 } },

    /* el anillo de sillas, con el centro vacío: aquí no preside nadie */
    { x: 4, y: 1, tipo: "decoracion", solido: true, m: { sp: "silla", alto: 0.82 } },
    { x: 6, y: 1, tipo: "decoracion", solido: true, m: { sp: "silla", alto: 0.82 } },
    { x: 7, y: 2, tipo: "decoracion", solido: true, m: { sp: "silla", alto: 0.82 } },
    { x: 7, y: 4, tipo: "decoracion", solido: true, m: { sp: "silla", alto: 0.82 } },
    { x: 6, y: 5, tipo: "decoracion", solido: true, m: { sp: "silla", alto: 0.82 } },
    { x: 4, y: 5, tipo: "decoracion", solido: true, m: { sp: "silla", alto: 0.82 } },
    { x: 3, y: 4, tipo: "decoracion", solido: true, m: { sp: "silla", alto: 0.82 } },

    { x: 1, y: 1, tipo: "zona", rotulo: "Bancaria", m: { t: "estera", c: "#8a4433" } },
    { x: 8, y: 1, tipo: "zona", rotulo: "Problematizadora", m: { t: "estera", c: "#cf3b4e" } },

    { x: 2, y: 6, tipo: "item", destino: "Bancaria",
      nombre: "El que enseña deposita el contenido y el que aprende lo recibe, lo archiva y lo repite" },
    { x: 5, y: 7, tipo: "item", destino: "Problematizadora",
      nombre: "El que enseña aprende al enseñar, y el que aprende enseña al aprender" },
    { x: 8, y: 6, tipo: "item", destino: "Bancaria",
      nombre: "Quien sabe decide qué hay que saber; el que no sabe escucha y agradece" },
    { x: 6, y: 7, tipo: "item", destino: "Problematizadora",
      nombre: "El programa se arma con las palabras que esa gente ya usa para nombrar su vida" },

    { x: 5, y: 0, tipo: "foco", solido: true, m: { sp: "letrero", alto: 1.35 },
      nombre: "Un cartel con una sola palabra",
      texto: "LADRILLO. No es un ejemplo de gramática: es lo que esa gente levantaba todos los días. Freire no empezaba por la A, empezaba por las palabras que ya pesaban en la vida de quien iba a aprender a leerlas. Las llamaba palabras generadoras. En Angicos, en 1963, trescientos adultos aprendieron a leer en cuarenta y cinco días empezando así." },
    { x: 3, y: 2, tipo: "foco", solido: true, m: { sp: "silla", alto: 0.82 },
      nombre: "Una silla más en el anillo",
      texto: "Cuenta las sillas y mira el centro: está vacío. No hay cabecera, no hay tarima, nadie se sienta donde todos tengan que mirar. El que coordina ocupa una silla como las demás porque no viene a depositar nada, viene con una pregunta. Por eso esto no se llamaba clase ni aula: se llamaba círculo de cultura." },
    { x: 1, y: 4, tipo: "foco", solido: true, m: { sp: "escritorio", alto: 1.15, encima: { sp: "libro-rayo", alto: 0.5 } },
      nombre: "Un cuaderno abierto, subrayado",
      texto: "«Nadie educa a nadie, nadie se educa a sí mismo: los hombres se educan entre sí, mediatizados por el mundo.» Está en Pedagogía del oprimido, escrito en 1968, en el exilio, después de que el golpe militar brasileño lo expulsara del país por enseñar a leer a los campesinos. Enseñar a leer era un delito político, y eso ya dice qué estaba en juego." },

    { x: 9, y: 7, tipo: "secreto",
      nombre: "Un recorte pegado por dentro de la tapa",
      texto: "Esto no se quedó en Brasil. En Colombia alimentó la educación popular de los años setenta y la Investigación Acción Participativa de Orlando Fals Borda, que le dio vuelta a la pregunta de quién investiga a quién y para quién. La historia de la pedagogía no es solo algo que pasó lejos y hace mucho: también se escribió aquí, y sigue escribiéndose." }
  ],

  conceptos: [
    { clave: "palabra-generadora", corriente: "critica", tema: "que", termino: "Palabra generadora",
      def: "La palabra cargada de vida con la que empieza la alfabetización: se elige del mundo de quien aprende, no del manual. Decide quién pone el contenido, y por eso es una cuestión de poder antes que de método.",
      por: { foco: "Un cartel con una sola palabra" } },
    { clave: "circulo-cultura", corriente: "critica", tema: "donde", termino: "Círculo de cultura",
      def: "El lugar donde Freire sustituye el aula: sin tarima ni cabecera, en círculo, con un coordinador que pregunta en vez de dictar. Cambiar la forma de sentarse ya es cambiar quién tiene autoridad para hablar.",
      por: { foco: "Una silla más en el anillo" } },
    { clave: "dialogo", corriente: "critica", tema: "como", termino: "Nadie educa a nadie",
      def: "Para Freire la educación no va del que sabe al que no sabe: los dos se educan entre sí a través del mundo que miran juntos. El diálogo no es una técnica para amenizar la clase, es la condición de que haya aprendizaje.",
      por: { foco: "Un cuaderno abierto, subrayado" } },
    { clave: "bancaria", corriente: "critica", tema: "quien", termino: "Educación bancaria",
      def: "El modelo que Freire denuncia: el maestro deposita contenidos y el estudiante los guarda y los devuelve intactos. No es solo ineficaz, es política: enseña a recibir el mundo como viene en vez de preguntarse por qué es así.",
      por: "reto" }
  ],

  reto: {
    tipo: "llevar",
    objetivo: "Cuatro frases sobre cómo se enseña. Dos describen la educación bancaria y dos la problematizadora.",
    pistas: {
      sofia: "¿En cuál de las dos el que aprende puede preguntar algo que el que enseña no tenía previsto?",
      teo: "Fíjate en la dirección: si todo va en un solo sentido, del que sabe al que no, ya sabes de cuál es.",
      nura: "En clase quedó la imagen: bancaria viene de banco, de depositar. El estudiante como una cuenta donde se guarda algo.",
      bruno: "Descarta por el verbo: depositar, archivar y repetir arman una sola máquina. Las otras dos no la dejan armar."
    }
  },
  voces: {
    sofia: [
      "En las siete islas anteriores, ¿quién decidió qué valía la pena enseñar? Nunca fue el que iba a aprenderlo.",
      "Si enseñar a leer le costó el exilio, ¿qué tenía de peligroso enseñar a leer?"
    ],
    teo: [
      "Mira las sillas: ninguna mira la espalda de otra. Eso no es decoración, es la tesis.",
      "Fíjate en que no hay tarima. En las siete islas anteriores siempre había alguien más alto que los demás."
    ],
    nura: [
      "Pedagogía del oprimido, 1968, escrito en el exilio. El golpe militar en Brasil había sido en 1964.",
      "Bancaria viene de banco: depositar. El estudiante como una cuenta donde alguien guarda algo."
    ],
    bruno: [
      "Una máquina de depositar funciona perfecto. La pregunta es para qué está hecha.",
      "Cambia dónde se sienta la gente y cambias quién puede hablar. Eso ya es rearmar el aparato."
    ]
  },
  cierre: "Freire no agrega una respuesta más a la fila de las anteriores: les cambia la pregunta. Durante siete islas el archipiélago preguntó qué parte del ser humano se propone formar cada época. Aquí la pregunta pasa a ser quién decidió eso, a quién le convenía y quién nunca estuvo en la sala donde se decidió.\n\nPor eso esta isla estaba detrás de la puerta y no antes. Para leer la historia de la pedagogía así, primero hay que haberla recorrido."
}
];

/* rótulos de los retratos del gabinete, en el orden en que cuelgan */
var RETRATOS = ["Bacon", "Comenio", "Locke", "Sor Juana", "Rousseau", "Wollstonecraft"];

var FINAL = {
  palabra: "PAIDEIA",
  enunciado: "Siete islas, siete llaves. En el centro del archipiélago hay una puerta, y cada llave lleva una letra grabada. Ordénalas y mira qué hay detrás.",
  umbral: "La palabra encaja y la piedra cede. Pero detrás de la puerta no hay una salida: hay otra sala, con las sillas puestas en círculo y una luz encendida, como si alguien llevara rato esperando.\n\nLas siete islas contaron cómo cada época contestó a la pregunta por la educación. Falta la pregunta que vino después, y que no se hizo en Atenas ni en París, sino aquí.",
  pista: "Los griegos usaban esa palabra para algo más grande que la instrucción: la formación entera de una persona. Estaba rascada en el zócalo de la primera isla.",
  texto: "Las siete islas que acabas de levantar no cuentan un progreso. Cuentan siete respuestas distintas a la misma pregunta, cada una convencida de ser la evidente. Esparta formaba soldados y lo llamaba natural. La Ilustración proclamó la razón universal y dejó fuera a la mitad. El conductismo midió lo que podía medirse y declaró que lo demás no existía.\n\nLa palabra que acabas de componer es la más antigua de todas y sigue siendo la más exigente: paideia no era instruir, era formar a alguien entero. Cada época que vino después tuvo que decidir qué partes de esa persona le importaban.\n\nY la última isla agregó en voz alta la pregunta que ninguna de las otras se había hecho: quién decide eso. Mientras alguien decida por otro qué vale la pena saber, esta historia sigue abierta.\n\nLa pregunta no se cerró. Te toca a ti.",
  cierres: {
    sofia: "Saliste del archipiélago preguntando. Es lo que hizo Sócrates y lo que le costó la vida: ninguna época agradece que le pregunten por qué enseña lo que enseña.",
    teo: "Saliste del archipiélago mirando. Bacon y Piaget habrían reconocido el método: no creer lo que te cuentan hasta haber observado por tu cuenta.",
    nura: "Saliste del archipiélago recordando. Antes de la escritura, toda la educación dependía de alguien que guardara lo que los demás olvidaban.",
    bruno: "Saliste del archipiélago construyendo. Es la tesis de la isla del aula: nadie recibe el conocimiento ya hecho, cada quien lo levanta con lo que trae."
  },
  secretosTodos: "Y encontraste los siete secretos. Ninguno hacía falta para salir, y los siete dicen lo mismo desde siete épocas: la historia de la educación también está hecha de lo que se perdió, de quien la construyó sin recibirla y de a quién se le hizo daño por el camino. Eso no suele estar en el temario."
};

/* Las corrientes pedagógicas y los temas con que se agrupa el cuaderno.
   No coinciden con las islas a propósito: una corriente puede atravesar
   varias épocas, y ver eso es parte de lo que el curso quiere enseñar. */
var CORRIENTES = [
  { id: "clasica",        nombre: "Humanismo clásico y paideia", color: "#d4541f",
    nota: "Formar al ciudadano entero. La pregunta griega por el para qué de la educación." },
  { id: "estado",         nombre: "La educación como aparato de Estado", color: "#17968e",
    nota: "La escuela al servicio de la administración, del orden social y del gobierno. Atraviesa los imperios antiguos y vuelve con los planes de estudio ilustrados." },
  { id: "escolastica",    nombre: "Tradición monástica y escolástica", color: "#4a5f9e",
    nota: "Conservar, copiar y discutir. El saber custodiado por una institución que termina convirtiéndose en la universidad." },
  { id: "realismo",       nombre: "Realismo pedagógico y método", color: "#5e8a6a",
    nota: "Observar en vez de citar, y ordenar la enseñanza como se ordena la naturaleza. Bacon y Comenio." },
  { id: "ilustracion",    nombre: "Ilustración y derechos", color: "#b0763a",
    nota: "Si la razón es universal, la educación también debería serlo. Aquí aparecen la experiencia como origen del saber y la igualdad como argumento." },
  { id: "conductismo",    nombre: "Conductismo", color: "#14a06a",
    nota: "Solo cuenta lo observable. Aprender es cambiar de conducta, y la conducta se puede provocar y medir." },
  { id: "constructivismo", nombre: "Constructivismo", color: "#b453e0",
    nota: "Nadie recibe el conocimiento ya hecho: cada quien lo construye con lo que trae y con quien lo acompaña." },
  { id: "critica",        nombre: "Pedagogía crítica", color: "#cf3b4e",
    nota: "La pregunta deja de ser cómo se enseña mejor y pasa a ser a favor de quién y en contra de quién se enseña. Freire y la educación popular latinoamericana." }
];

var TEMAS = [
  { id: "quien",  nombre: "¿Quién puede aprender?", color: "#d4541f",
    nota: "Acceso, exclusión y desigualdad: a quién se le abre la escuela y a quién no." },
  { id: "como",   nombre: "¿Cómo se aprende?", color: "#14a06a",
    nota: "Las teorías del aprendizaje: qué pasa dentro de quien aprende." },
  { id: "que",    nombre: "¿Quién decide qué se enseña?", color: "#b0763a",
    nota: "Currículo, método y poder: qué contenidos entran, en qué orden y por decisión de quién." },
  { id: "donde",  nombre: "¿Dónde ocurre la educación?", color: "#4a5f9e",
    nota: "Las instituciones que la alojan: la crianza pública, el scriptorium, la universidad, la esfera pública." }
];
