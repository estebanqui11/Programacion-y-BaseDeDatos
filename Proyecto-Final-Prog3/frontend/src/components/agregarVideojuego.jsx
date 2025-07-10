import { useState } from 'react';

const generosDisponibles = [
  "Acción", "Aventura", "RPG", "Estrategia", "Deportes",
  "Simulación", "Puzzle", "Terror", "Shooter"
];

const plataformasDisponibles = [
  "PC", "Xbox", "Xbox One", "PS4", "PS5",
  "Nintendo Switch", "Steam Deck", "Android", "iOS"
];

function AgregarVideojuego() {
  const [nuevo, setNuevo] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    estado: 'pendiente',
    calificacion: 0,
    tiempo_jugado: 0,
    imagen: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevo({ ...nuevo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/videojuegos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevo)
      });
      if (res.ok) {
        alert('🎉 Videojuego agregado correctamente!');
        setNuevo({
          titulo: '',
          genero: '',
          plataforma: '',
          estado: 'pendiente',
          calificacion: 0,
          tiempo_jugado: 0,
          imagen: ''
        });
      }
    } catch (error) {
      console.error('Error al agregar:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <h3 style={{ marginBottom: '1rem' }}>Agregar nuevo videojuego</h3>


      <input
        className="input-field"
        name="titulo"
        value={nuevo.titulo}
        onChange={handleChange}
        placeholder="Título"
        required
      />

      <select
        className="input-field"
        name="genero"
        value={nuevo.genero}
        onChange={handleChange}
        required
      >
        <option value="">-- Género --</option>
        {generosDisponibles.map((g, i) => (
          <option key={i} value={g}>{g}</option>
        ))}
      </select>

      <select
        className="input-field"
        name="plataforma"
        value={nuevo.plataforma}
        onChange={handleChange}
        required
      >
        <option value="">-- Plataforma --</option>
        {plataformasDisponibles.map((p, i) => (
          <option key={i} value={p}>{p}</option>
        ))}
      </select>

      <select
        className="input-field"
        name="estado"
        value={nuevo.estado}
        onChange={handleChange}
      >
        <option value="pendiente">Pendiente</option>
        <option value="jugando">Jugando</option>
        <option value="completado">Completado</option>
      </select>

      <input
        className="input-field"
        type="number"
        name="calificacion"
        value={nuevo.calificacion}
        onChange={handleChange}
        min="0"
        max="10"
        placeholder="Calificación (0-10)"
      />

      <input
        className="input-field"
        type="number"
        name="tiempo_jugado"
        value={nuevo.tiempo_jugado}
        onChange={handleChange}
        placeholder="Horas jugadas"
      />

      <input
        className="input-field"
        type="text"
        name="imagen"
        value={nuevo.imagen}
        onChange={handleChange}
        placeholder="URL de la imagen"
      /><br />


      <button type="submit" className="boton-agregar">Agregar</button>
    </form>
  );
}

export default AgregarVideojuego;
