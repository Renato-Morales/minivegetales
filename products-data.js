// Catalog product detail data (microgreens + seasonal flowers).
// Pure data -- kept separate from script.js so behavior stays readable.
// "uses" = ideas de uso en cocina (reemplaza a los antiguos "benefits" de salud).
// "image": null muestra un recuadro de color hasta que llegue la foto real.

const PRODUCT_DETAILS = {
  "Amaranto": {
    "label": "Amaranto",
    "image": "assets/variedades/micro-pousse-amarante-amaranth-x2.jpg",
    "description": "Brotes delicados de sabor suave y ligeramente dulce. Van del verde claro al rosa y el rojo oscuro, y aportan color a cualquier plato.",
    "uses": ["Terminación de platos fríos y calientes", "Ensaladas y tablas", "Postres y coctelería"]
  },
  "Rucula": {
    "label": "Rúcula",
    "image": "assets/variedades/micro-pousse-arugula.jpg",
    "description": "Sabor a pimienta, con una hoja que recuerda a la de roble. Da un toque picante y fresco.",
    "uses": ["Carnes y carpaccios", "Pastas y pizzas", "Quesos y ensaladas"]
  },
  "Betarraga": {
    "label": "Betarraga",
    "image": "assets/variedades/micro-pousse-betterave-beet.jpg",
    "description": "Ligero sabor dulce y terroso. Su tallo rojo brillante y sus hojas verde oscuro contrastan muy bien sobre el plato.",
    "uses": ["Ensaladas y carpaccios", "Quesos frescos y cremas", "Pescados y mariscos"]
  },
  "Mostaza Amarilla-Negra": {
    "label": "Mostaza amarilla-negra",
    "image": "assets/variedades/micro-pousse-moutarde-mustard.jpg",
    "description": "Tierna, suculenta y picante. Es muy usada en la mezcla asiática y agrega un picor limpio sin dominar el plato.",
    "uses": ["Carnes y sándwiches", "Mariscos y sushi", "Ensaladas y mezclas asiáticas"]
  },
  "Maiz Dulce": {
    "label": "Maíz dulce",
    "image": "assets/variedades/micro-pousse-mais-corn.jpg",
    "description": "Sabor dulce y amable, con hojas doradas que embellecen el plato. Funciona bien incluso con quienes no son fans de las verduras.",
    "uses": ["Ensaladas frescas", "Entradas y tostadas", "Presentación de platos"]
  },
  "Lentejas": {
    "label": "Lentejas",
    "image": "assets/variedades/micro-pousse-lentilles-lentils.jpg",
    "description": "Brotes tiernos de sabor suave y textura agradable, con un gusto discreto a legumbre.",
    "uses": ["Bowls y ensaladas", "Guarniciones", "Sopas y cremas"]
  },
  "Repollo": {
    "label": "Repollo",
    "image": "assets/variedades/micro-pousse-chou-rouge-cabbage-red.jpg",
    "description": "Sabor suave a repollo, textura crujiente y tallos de un morado intenso que se luce en el plato.",
    "uses": ["Tacos y sándwiches", "Ensaladas y bowls", "Terminación de cremas"]
  },
  "Rabano": {
    "label": "Rábano",
    "image": "assets/variedades/micro-pousse-radis-daikon-radish.jpg",
    "description": "Picante, fresco y crujiente. Un picor directo que realza sin tapar los demás sabores.",
    "uses": ["Mariscos y ceviches", "Tacos y sushi", "Ensaladas"]
  },
  "Arvejas": {
    "label": "Arvejas",
    "image": "assets/variedades/micro-pousse-pois-peas.jpg",
    "description": "Dulces, frescas y crujientes, con sabor a arveja recién abierta.",
    "uses": ["Pastas y risottos", "Ensaladas", "Entradas y cremas frías"]
  },
  "Cilantro": {
    "label": "Cilantro",
    "image": "assets/variedades/cilantro.jpg",
    "description": "Todo el aroma del cilantro en formato mini, para usar crudo y de último en el plato.",
    "uses": ["Ceviches y tacos", "Salsas y pebre", "Mariscos y pescados"]
  },
  "Acelga Roja": {
    "label": "Acelga roja",
    "image": null,
    "description": "Tallos rojos intensos y sabor suave y terroso. Aporta color fuerte con muy poco sabor que compita.",
    "uses": ["Guarniciones y ensaladas", "Terminación de platos", "Tablas y canapés"]
  },
  "Girasol": {
    "label": "Girasol",
    "image": "assets/variedades/micro-pousse-tournesol-sunflower.jpg",
    "description": "Crocante y de sabor a nuez, con tallos gruesos y hojas redondeadas.",
    "uses": ["Ensaladas y bowls", "Sándwiches y paltas", "Tostadas y entradas"]
  },
  "Ajo Chino": {
    "label": "Ajo chino",
    "image": "assets/variedades/ajo.jpg",
    "description": "Sabor a ajo, más suave que el diente de ajo y con un frescor herbal.",
    "uses": ["Carnes y huevos", "Sopas y salteados", "Salsas y aderezos"]
  },
  "Zanahoria": {
    "label": "Zanahoria",
    "image": "assets/variedades/Carrot-microgreens-tops.jpg",
    "description": "Hojitas finas con el sabor dulce y herbal de la zanahoria.",
    "uses": ["Cremas y sopas", "Carnes y pescados", "Ensaladas"]
  },
  "Albahaca": {
    "label": "Albahaca",
    "image": null,
    "description": "El aroma clásico de la albahaca en brotes pequeños, para agregar al final.",
    "uses": ["Tomates y pizzas", "Pastas y quesos frescos", "Ensaladas y aperitivos"]
  },
  "Pensamientos": {
    "label": "Pensamientos",
    "image": null,
    "description": "Flores de colores variados y sabor suave, para decorar.",
    "uses": ["Ensaladas", "Postres y tortas", "Bebidas y coctelería"]
  },
  "Mini Violas": {
    "label": "Mini violas",
    "image": null,
    "description": "Flores pequeñas y delicadas, de sabor suave, ideales para platos de detalle.",
    "uses": ["Canapés y entradas", "Postres", "Bebidas y coctelería"]
  },
  "Calendulas": {
    "label": "Caléndulas",
    "image": "assets/flores/calendula.jpg",
    "description": "Pétalos de amarillo a naranja intenso. Sabor suave y ligeramente picante.",
    "uses": ["Arroces y guisos", "Ensaladas", "Mantequillas y quesos"]
  },
  "Capuchinas": {
    "label": "Capuchinas",
    "image": "assets/flores/capuchina.jpg",
    "description": "Flores naranjas con vetas rojas, de sabor picante parecido al berro.",
    "uses": ["Ensaladas", "Quesos y canapés", "Terminación de carnes y pescados"]
  },
  "Claveles Japoneses": {
    "label": "Claveles japoneses",
    "image": "assets/flores/clavel-japones.jpg",
    "description": "Flores de colores vivos y aroma suave, con un toque ligeramente especiado.",
    "uses": ["Postres y tortas", "Bebidas y coctelería", "Tablas y presentación de platos"]
  },
  "Mini Clavel": {
    "label": "Mini clavel",
    "image": "assets/flores/mini-clavel.jpg",
    "description": "Versión pequeña del clavel, de aroma suave y colores intensos.",
    "uses": ["Postres y tortas", "Bebidas y coctelería", "Presentación de platos"]
  },
  "Gypsophillas": {
    "label": "Gypsophila",
    "image": null,
    "description": "Pequeñas flores blancas y delicadas, de uso decorativo.",
    "uses": ["Decoración de tortas y postres", "Tablas y presentación de platos"]
  }
};
