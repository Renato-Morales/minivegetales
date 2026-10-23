// Catalog product detail data (microgreens + seasonal flowers).
// Pure data -- kept separate from script.js so behavior stays readable.

const PRODUCT_DETAILS = {
  "Amaranto": {
    "image": "assets/variedades/micro-pousse-amarante-amaranth-x2.jpg",
    "description": "El amaranto fue cultivado por aztecas y otras culturas de climas tropicales. En realidad, es un tipo antiguo de grano utilizado en la India. Muy fáciles de digerir, los microgreens de amaranto están disponibles en diferentes colores, desde verde claro hasta rosa o rojo oscuro. Son brotes frágiles que realzan maravillosamente cualquier comida con color y un ligero sabor dulce. El amaranto contiene altas cantidades de proteínas completas con aminoácidos vitales, en contraste con otras fuentes de proteínas. El amaranto no contiene gluten. Los microgreens de amaranto también contienen vitamina A, C, E, ácido fólico, hierro, magnesio, fósforo, potasio, fibra dietética, calcio, aminoácidos, antioxidantes, minerales y lisina esencial.",
    "benefits": [
      "Antioxidante",
      "Activa la digestión",
      "Ayuda en el tratamiento del cáncer",
      "Refuerza el sistema inmune",
      "Ayuda en el tratamiento de enfermedades cardiovasculares e hipertensión",
      "Disminuye la pérdida de cabello"
    ]
  },
  "Rucula": {
    "image": "assets/variedades/micro-pousse-arugula.jpg",
    "description": "Considerado desde hace mucho tiempo como uno de los superalimentos naturales más útiles y saludables, esta planta agrega un suplemento de salud a una variedad de menús. La rúcula también se conoce como cohete. La rúcula microgreen es sabrosa con un gusto a pimienta. La hoja es similar a la hoja de roble. Gran fuente de ácido fólico, hierro, cobre y una variedad de minerales y vitaminas A, C y K.",
    "benefits": [
      "Mejora la salud ósea y cerebral",
      "Desintoxicante",
      "Reduce el riesgo de contraer cáncer",
      "Antioxidante",
      "Mejora la vista",
      "Ayuda a mantener una piel sana"
    ]
  },
  "Betarraga": {
    "image": "assets/variedades/micro-pousse-betterave-beet.jpg",
    "description": "Las Betarragas son de la misma familia que las acelgas y las espinacas. Tienen tantos beneficios que sería una pena no incorporarlas a su dieta diaria de alimentos, proporcionan una sensación de bienestar al tiempo que reducen el estrés. Los microgreens de betarraga tienen un ligero sabor dulce y aportan un toque colorido con su tallo rojo brillante y las hojas verdes oscuras que contrastan. Los cocineros los adoran al vampiro en color y sabor sus creaciones culinarias. Baja en grasas. Rica en fibra, hierro, nitrato, ácido fólico, minerales y vitaminas. Las betarragas también están cargadas de poderosos antioxidantes. Promueve la oxigenación muscular durante el ejercicio, lo que tiene el potencial de reducir la fatiga y elevar el nivel de energía y aumentar la tolerancia al entrenamiento de resistencia. La pectina contenida en la betarraga ayuda a eliminar toxinas y metales pesados del cuerpo.",
    "benefits": [
      "Poder desintoxicante y curativo",
      "Anti estrés",
      "Ayuda a eliminar grasa el cuerpo",
      "Potente antioxidante",
      "Activa y mejora las funciones inmunes",
      "Ayuda a proteger contra enfermedades del corazón"
    ]
  },
  "Mostaza Amarilla-Negra": {
    "image": "assets/variedades/micro-pousse-moutarde-mustard.jpg",
    "description": "La mostaza es la segunda especia más popular que se comercializa en todo el mundo. Los microgreens de mostaza son un depósito de muchos fitonutrientes que tienen propiedades de promoción de la salud y prevención de enfermedades. Con los años, la mostaza ha sido imbuida de poderes curativos. Los microgreens de mostaza son tiernos, suculentos y picantes. Muchas variedades agregan diferentes sabores picantes a una amplia gama de comidas. Son muy populares en la mezcla asiática. Comer microgreens de mostaza ofrece una gran cantidad de beneficios. La mostaza microverde es una buena fuente de vitamina A, C, E, energía y carbohidratos, proteínas, fibra dietética, ácido fólico, niacina, riboflavina, tiamina, sodio, potasio, calcio, cobre, hierro, magnesio, manganeso y zinc.",
    "benefits": [
      "Antioxidante",
      "Estimulante del apetito",
      "Alivia la congestión, es bueno para las alergias, infecciones o resfriados",
      "Inhibe el crecimiento de las células cancerosas.",
      "Ayuda a aliviar la artritis reumática",
      "Reduce la aparición de migraña"
    ]
  },
  "Maiz Dulce": {
    "image": "assets/variedades/micro-pousse-mais-corn.jpg",
    "description": "El maíz es uno de los cereales más populares del mundo. El maíz verde micro agrega un sabor dulce y delicioso a sus comidas y embellece los platos delicadamente con sus hojas doradas. Fácil de servir fresco incluso para personas que no disfrutan las verduras. Conocido como una fuente beneficiosa de calorías. Contiene ácido ferúlico, hierro, betacaroteno y una amplia variedad de minerales y vitaminas A, B, E, incluyendo tiamina y niacina.",
    "benefits": [
      "Antioxidante",
      "Mejora la resistencia ósea",
      "Reduce la hipertensión",
      "Refuerza el sistema inmune",
      "Ayuda a prevenir la anemia",
      "Contribuye en la lucha contra los tumores que conducen al cáncer de mama y al cáncer de hígado"
    ]
  },
  "Lentejas": {
    "image": "assets/variedades/micro-pousse-lentilles-lentils.jpg",
    "description": "Las lentejas son verdaderas \"minas de oro\" nutritivas. Estas semillas de la familia de las leguminosas se cultivan en microgreens. Las lentejas son parte de la dieta humana desde tiempos prehistóricos. Canadá es uno de los mayores productores de lentejas después de la India. Los microgreens de lentejas son muy ricos en proteínas y también en fibra y minerales, especialmente hierro y magnesio. Aportan vitaminas B y C.",
    "benefits": [
      "Ayuda en el control de peso",
      "Reduce el riesgo de cáncer",
      "Ayuda a relajar los músculos cardiovasculares",
      "Acelera el metabolismo",
      "Ayuda en el funcionamiento óptimo del cerebro",
      "Activa tus reservas de hierro beneficiosas para las mujeres que menstrúan"
    ]
  },
  "Repollo": {
    "image": "assets/variedades/micro-pousse-chou-rouge-cabbage-red.jpg",
    "description": "El repollo es ampliamente utilizado en todo el mundo, pero con frecuencia desconocido. Sus beneficios para la salud son increíbles, es una fuente abundante de vitamina C. En realidad, es más rico en vitamina C que las naranjas. Es uno de los mejores antioxidantes y ayuda a reducir los radicales libres en nuestro cuerpo que es una de las causas fundamentales del envejecimiento prematuro. Un estudio realizado en mujeres chinas mostró una reducción significativa del cáncer de seno cuando se agregaron vegetales crucíferos como el repollo a su dieta. El microgreen de repollo está lleno de minerales beneficiosos, vitaminas (C, K) minerales y otros nutrientes. Es rico en fibra, betacaroteno, calcio, magnesio, potasio, yodo y azufre. También tiene una serie de compuestos anticancerígenos que se sabe que estimulan la actividad enzimática e inhiben el crecimiento de tumores.",
    "benefits": [
      "Desintoxica la sangre",
      "Contribuye a eliminar toxinas",
      "Proporciona alivio del dolor",
      "Promueve la buena salud ocular",
      "Ayuda a reducir el riesgo de cáncer y úlcera",
      "Inhibe el crecimiento de las células cancerosas"
    ]
  },
  "Rabano": {
    "image": "assets/variedades/micro-pousse-radis-daikon-radish.jpg",
    "description": "El rábano es bien conocido en todo el mundo. En la antigua Grecia, la gente creía que el rábano disminuía el impacto del alcohol. Esto no ha sido probado recientemente. Los microgreens de rábano son muy nutritivos y populares. Muchas variedades de rábanos están disponibles con diferentes colores, desde gamas de rojo-rosa-púrpura hasta amarillo y verde. El rábano microverde es crujiente y su sabor es dulce y agradablemente picante también. El rábano microverde es una buena fuente de vitamina C, energía y carbohidratos. También contiene zinc, potasio, ácido fólico, manganeso, cobre, sodio, fósforo, fibra dietética, niacina, riboflavina, vitamina B1 y B6, calcio, hierro, magnesio y mucho más.",
    "benefits": [
      "Diurético natural",
      "Antifúngico y antibacteriano",
      "Comida desintoxicante",
      "Tiene propiedades antiinflamatorias",
      "Ayuda a prevenir el cáncer de pulmón",
      "Recomendado en tratamiento de ictericia"
    ]
  },
  "Arvejas": {
    "image": "assets/variedades/micro-pousse-pois-peas.jpg",
    "description": "Las arvejas son una fuente inagotable de nutrición y antioxidantes fuertes. Tienen una proteína de tan alta calidad que ahora se agregan a muchas comidas y productos de proteínas comerciales. En el gusto, los microgreens de zarcillo de arvejas son ligeramente dulces, con un ligero sabor amargo y tienen un matiz de nuez. Las hojas tienen una textura similar a la espinaca, aunque no tan delicada, agregan frescura y un poco de crujido a los platos con sabores ricos y terrosos. Los microgreens de arveja son bajos en grasa pero altos en todo lo demás. Contienen proteínas, fibra, omega-3 y micronutrientes. Rico en ácido fólico, carbohidratos, vitamina A, C, E, B1, B2, B3, B6.",
    "benefits": [
      "Antioxidante",
      "Ayuda a prevenir el cáncer de estómago",
      "Retrasa el envejecimiento",
      "Previene arrugas",
      "Mejora el sistema inmunitario",
      "Ayuda a proteger contra el Alzheimer"
    ]
  },
  "Cilantro": {
    "image": "assets/variedades/cilantro.jpg",
    "description": "Cilantro es uno de los microgreens más populares actualmente en el mercado. Favorecido por su sabor picante y picante, el Micro Cilantro se ha generalizado como guarnición por su facilidad de uso y su capacidad para agregar sabor, textura y atractivo visual a cualquier plato. El cilantro es una buena fuente de vitamina K. La vitamina K es necesaria para la coagulación de la sangre y las verduras de hoja verde oscuro son buenas fuentes. Los microgreens de cilantro tienen una concentración similar de vitamina K a la de las espinacas baby. El cilantro también es una buena fuente de vitamina C, que es un nutriente esencial que actúa como antioxidante. Los microgreens de cilantro tienen una concentración ligeramente más baja de vitamina C que una naranja.",
    "benefits": [
      "Antioxidante",
      "Activa la digestión",
      "Ayuda a prevenir la degeneración ocular",
      "Refuerza el sistema inmune",
      "Mejora la vista",
      "Mejora la recuperación de la enfermedad"
    ]
  },
  "Acelga Roja": {
    "image": "assets/variedades/micro-pousse-radis-rose-radish-pink.jpg",
    "description": "La acelga es de la misma familia que la remolacha. Está disponible en muchas variedades que ofrecen una gama de tallos coloridos como rojo, blanco, rosa, amarillo y naranja. La parte frondosa es siempre verde. Los colores llamativos y la hermosa y delicada textura de este microverde lo convierten en uno de los activos más atractivos para decorar comidas. Los microgreen de acelga también se usa comúnmente en sándwiches, envolturas y batidos. Estos microgreens tienen efectos excepcionales en la promoción de la salud. Debido a sus proteínas más altas, así como a su contenido mineral, ofrecen resistencia contra una serie de enfermedades y enfermedades. La acelga suiza ha sido descubierta por un botánico suizo, por lo que esta es la razón de su nombre. Esta planta se usa comúnmente en la cocina italiana y mediterránea. Ahora se está volviendo más popular en muchas culturas. Los microgreens de acelgas tienen un sabor distintivo suave, jugoso y salado que nos recuerda el sabor de la remolacha con una mezcla de espinacas. Bajo en grasas. Rico en betacaroteno, vitamina E, K y C, zinc, cobre, sodio, potasio, hierro, manganeso, fósforo, luteína y otras enfermedades que luchan contra los antioxidantes. También un alto nivel de calcio, magnesio y vitamina K contribuye a una buena salud ósea.",
    "benefits": [
      "Antioxidante",
      "Ayuda a regular el nivel de azúcar en la sangre",
      "Ayuda a fortalecer los huesos",
      "Utilizado como prevención del cáncer",
      "Aumenta la función mental y la concentración",
      "Fomenta el crecimiento y la fuerza del cabello"
    ]
  },
  "Girasol": {
    "image": "assets/variedades/micro-pousse-tournesol-sunflower.jpg",
    "description": "Los microgreens de girasol ofrecen una de las formas más equilibradas de una proteína vegetal completa. Es uno de los mejores alimentos para agregar a su dieta para la salud y el bienestar en general. Tiene un tallo fuerte y hojas verdes. El sabor es fresco y crujiente. Delicioso como aperitivo o en cualquier ensalada, sándwich, envoltura o creación culinaria. Los microgreens de girasol son bajos en calorías y altos en nutrición, lo que los hace ideales para cualquier programa de pérdida de grasa natural y saludable. Son una gran fuente de nutrientes valiosos que incluyen proteínas, enzimas, ácido fólico, selenio, lecitina, minerales, como calcio, cobre, hierro, magnesio, potasio, fósforo, zinc, así como vitaminas A, C, complejo D y E.",
    "benefits": [
      "Contiene lecitina que ayuda a descomponer los ácidos grasos",
      "Activa las células del sistema inmunitario",
      "Contribuir a construir sistemas esqueléticos, musculares y neurológicos",
      "Aumenta tu fertilidad",
      "Ayuda a aliviar el estrés",
      "Ayuda a eliminar la acumulación en las paredes arteriales"
    ]
  },
  "Ajo Chino": {
    "image": "assets/variedades/ajo.jpg",
    "description": "El amaranto fue cultivado por aztecas y otras culturas de climas tropicales. En realidad, es un tipo antiguo de grano utilizado en la India. Muy fáciles de digerir, los microgreens de amaranto están disponibles en diferentes colores, desde verde claro hasta rosa o rojo oscuro. Son brotes frágiles que realzan maravillosamente cualquier comida con color y un ligero sabor dulce. El amaranto contiene altas cantidades de proteínas completas con aminoácidos vitales, en contraste con otras fuentes de proteínas. El amaranto no contiene gluten. Los microgreens de amaranto también contienen vitamina A, C, E, ácido fólico, hierro, magnesio, fósforo, potasio, fibra dietética, calcio, aminoácidos, antioxidantes, minerales y lisina esencial.",
    "benefits": [
      "Antioxidante",
      "Activa la digestión",
      "Ayuda en el tratamiento del cáncer",
      "Refuerza el sistema inmune",
      "Ayuda en el tratamiento de enfermedades cardiovasculares e hipertensión",
      "Disminuye la pérdida de cabello"
    ]
  },
  "Zanahoria": {
    "image": "assets/variedades/Carrot-microgreens-tops.jpg",
    "description": "Al igual que sus homólogos maduros, los microgreens de zanahoria están llenos de nutrientes y saben a raíces de zanahoria. Fuente excepcionalmente rica en antioxidantes, carotenos y vitamina A, esta variedad de microvegetales ayuda a mantener a raya los cánceres de piel, pulmón y cavidad oral. Se cultiva mejor en tierra u otro medio de cultivo. Los microgreens de zanahoria son ideales si está buscando una solución rápida para su comida saludable.",
    "benefits": [
      "Antioxidante",
      "Activa la digestión",
      "Ayuda en el tratamiento del cáncer",
      "Refuerza el sistema inmune",
      "Ayuda en el tratamiento de enfermedades cardiovasculares e hipertensión",
      "Disminuye la pérdida de cabello"
    ]
  },
  "Albahaca": {
    "image": "assets/variedades/micro-pousse-radis-daikon-radish.jpg",
    "description": "La micro albahaca es crujiente, tierna y aromática, con un sutil sabor a clavo de olor verde seguido de un final dulce con notas de cítricos, pimienta y anís suave.Apreciada por su sabor dulce y picante pero clásico, la micro albahaca se usa predominantemente como guarnición en una variedad de platos culinarios para agregar una capa extra de sabor, textura y atractivo estético Las características suaves y dulces de la micro albahaca la hacen ideal para incorporar tanto en aplicaciones saladas como dulces. Se pueden usar como guarnición en pasta, pizza, quiche, sopas, ensaladas verdes y ensaladas de frutas. También pueden agregar sabor a limonada y cócteles afrutados como mojitos, gimlets o martinis o combinarse en salsas, aderezos y salsas.La micro albahaca contiene algunas vitaminas A, B6, C, E y K, calcio, fósforo, hierro, zinc, cobre, magnesio y potasio.",
    "benefits": [
      "Antioxidante",
      "Activa la digestión",
      "Ayuda en el tratamiento del cáncer",
      "Refuerza el sistema inmune",
      "Ayuda en el tratamiento de enfermedades cardiovasculares e hipertensión",
      "Disminuye la pérdida de cabello"
    ]
  },
  "Pensamientos": {
    "image": null,
    "description": "Los pensamientos son flores comestibles de petalos aterciopelados y colores vibrantes que van del amarillo al violeta profundo. Su sabor es suave, ligeramente dulce con un toque herbal, perfecto para decorar postres, ensaladas y copas sin competir con otros sabores.",
    "benefits": [
      "Colores vivos para decorar cualquier plato",
      "Sabor suave y ligeramente dulce",
      "Ideales en postres, ensaladas y cocteleria",
      "Disponibilidad limitada por temporada"
    ]
  },
  "Mini Violas": {
    "image": null,
    "description": "Primas pequenas de los pensamientos, las mini violas aportan el mismo estallido de color en formato miniatura. Tienen un leve toque a wintergreen que las hace protagonistas en cocteleria de autor y reposteria fina.",
    "benefits": [
      "Formato mini, ideal para detalles delicados",
      "Notas suaves a wintergreen",
      "Perfectas para cocteleria y reposteria",
      "Cosecha artesanal, disponibilidad limitada"
    ]
  },
  "Calendulas": {
    "image": "assets/flores/calendula.jpg",
    "description": "Conocida como el azafran del pobre, la calendula despliega petalos naranjas y amarillos intensos con un sabor ligeramente picante y amargo. Se usa hace siglos para dar color a arroces, sopas y ensaladas, ademas de sus propiedades tradicionalmente calmantes.",
    "benefits": [
      "Color naranja y amarillo intenso natural",
      "Sabor ligeramente picante",
      "Uso tradicional calmante en infusiones",
      "Alternativa natural al colorante artificial"
    ]
  },
  "Capuchinas": {
    "image": "assets/flores/capuchina.jpg",
    "description": "Las capuchinas sorprenden con un sabor picante que recuerda al berro o a un wasabi suave. Tanto sus flores como sus hojas son comestibles y aportan un contraste fresco y especiado a ensaladas, tacos y platos de autor.",
    "benefits": [
      "Sabor picante tipo berro o wasabi suave",
      "Flores y hojas 100% comestibles",
      "Alta en vitamina C",
      "Ideal para contrastes frescos y especiados"
    ]
  },
  "Claveles Japoneses": {
    "image": "assets/flores/clavel-japones.jpg",
    "description": "De petalos delicados y aroma dulce con notas de clavo de olor, los claveles japoneses son un clasico en la decoracion de tortas y bebidas de autor. Su sabor sutilmente especiado combina bien con preparaciones dulces y saladas.",
    "benefits": [
      "Aroma dulce con notas de clavo de olor",
      "Perfectos para decorar tortas y bebidas",
      "Sabor sutilmente especiado",
      "Color y textura delicada"
    ]
  },
  "Mini Clavel": {
    "image": "assets/flores/mini-clavel.jpg",
    "description": "Version miniatura del clavel clasico, con petalos tiernos y un sabor dulce-especiado sin el amargor de la base blanca de la flor completa. Un giro elegante para platos de autor y reposteria de alta gama.",
    "benefits": [
      "Formato mini sin la base amarga",
      "Sabor dulce-especiado",
      "Elegante en reposteria de autor",
      "Textura tierna y delicada"
    ]
  },
  "Gypsophillas": {
    "image": null,
    "description": "Diminutas flores blancas que parecen una nube; aportan textura eterea y un toque romantico a cualquier plato o bebida. Son principalmente decorativas, perfectas para rematar postres, cocteles y mesas de celebracion.",
    "benefits": [
      "Textura eterea tipo nube",
      "Toque decorativo y romantico",
      "Ideal para postres y mesas de celebracion",
      "Combinan con cualquier paleta de colores"
    ]
  }
};
