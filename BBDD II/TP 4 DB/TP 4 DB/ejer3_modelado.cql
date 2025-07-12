CREATE 
  (u1:Usuario {nombre: "Juan"}),
  (u2:Usuario {nombre: "Geronimo"}),
  (u3:Usuario {nombre: "Esteban"}),
  (u4:Usuario {nombre: "Lautaro"}),

  (u1)-[:CONOCE]->(u2),
  (u1)-[:CONOCE]->(u3),
  (u2)-[:CONOCE]->(u4),
  (u3)-[:CONOCE]->(u4),

  (u1)-[:POSTEA]->(:Post {descripcion: "Mi setup"}),
  (u2)-[:POSTEA]->(:Post {descripcion: "Mi perro"}),
  (u3)-[:POSTEA]->(:Post {descripcion: "Atardecer"}),

  (u1)-[:TIENE]->(h1:Habilidad {nombre: "Programar"}),
  (u1)-[:TIENE]->(h2:Habilidad {nombre: "Diseñar"}),
  (u2)-[:TIENE]->(h3:Habilidad {nombre: "Cocinar"}),
  (u2)-[:TIENE]->(h4:Habilidad {nombre: "Cantar"}),
  (u3)-[:TIENE]->(h5:Habilidad {nombre: "Dibujar"}),
  (u3)-[:TIENE]->(h6:Habilidad {nombre: "Fotografía"}),
  (u4)-[:TIENE]->(h7:Habilidad {nombre: "Editar video"}),
  (u4)-[:TIENE]->(h8:Habilidad {nombre: "Actuar"}),

  (u2)-[:ENDOSA]->(h1),
  (u3)-[:ENDOSA]->(h1),
  (u1)-[:ENDOSA]->(h5),
  (u4)-[:ENDOSA]->(h3);