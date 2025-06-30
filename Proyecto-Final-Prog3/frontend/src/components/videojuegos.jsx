import { useEffect, useState } from 'react';

function Videojuegos() {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/videojuegos') // endpoint de tu backend
      .then(res => res.json())
      .then(data => setJuegos(data))
      .catch(err => console.error('Error al cargar los videojuegos:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Colección de Videojuegos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {juegos.map(juego => (
          <div key={juego.id} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '1rem',
            width: '200px',
            backgroundColor: '#f8f8f8'
          }}>
            <h3>{juego.titulo}</h3>
            <p><strong>Género:</strong> {juego.genero}</p>
            <p><strong>Plataforma:</strong> {juego.plataforma}</p>
            <p><strong>Estado:</strong> {juego.estado}</p>
            <p><strong>Calificación:</strong> {juego.calificacion}</p>
            <p><strong>Horas jugadas:</strong> {juego.tiempo_jugado}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Videojuegos;
