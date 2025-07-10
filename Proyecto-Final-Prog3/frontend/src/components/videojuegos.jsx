import { useEffect, useState } from 'react';

const generosDisponibles = [
  "Acción", "Aventura", "RPG", "Shooter", "Plataformas", "Estrategia", "Simulación", "Deportes",
  "Carreras", "Terror", "Sandbox", "Battle Royale", "Otro"
];

function Videojuegos() {
  const [juegos, setJuegos] = useState([]);
  const [juegoEditando, setJuegoEditando] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [filtroGenero, setFiltroGenero] = useState('');
  const [filtroPlataforma, setFiltroPlataforma] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/videojuegos')
      .then(res => res.json())
      .then(data => setJuegos(data))
      .catch(err => console.error('Error al cargar los videojuegos:', err));
  }, []);

  const eliminarVideojuego = (id) => {
    const confirmar = window.confirm("¿Estás seguro de que querés eliminar este videojuego?");
    if (!confirmar) return;

    fetch(`http://localhost:3001/videojuegos/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          setJuegos(juegos.filter(j => j.id !== id));
        } else {
          throw new Error('Error al eliminar');
        }
      })
      .catch(err => console.error('Error al eliminar videojuego:', err));
  };

  const handleModalChange = (e) => {
    setJuegoEditando({ ...juegoEditando, [e.target.name]: e.target.value });
  };

  const confirmarEdicion = () => {
    const confirmar = window.confirm("¿Estás seguro de que querés guardar los cambios?");
    if (!confirmar) return;

    fetch(`http://localhost:3001/videojuegos/${juegoEditando.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(juegoEditando)
    })
      .then(res => {
        if (res.ok) {
          setJuegos(juegos.map(j => j.id === juegoEditando.id ? juegoEditando : j));
          setMostrarModal(false);
        } else {
          throw new Error('Error al editar');
        }
      })
      .catch(err => console.error('Error al editar videojuego:', err));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem',
        maxWidth: '600px',
        marginInline: 'auto'
      }}>
        <h4 style={{ marginBottom: '1rem', color: '#333' }}>Filtrar por:</h4>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          <label style={{ flex: '1' }}>
            Género:
            <select value={filtroGenero} onChange={(e) => setFiltroGenero(e.target.value)} style={{ width: '100%' }}>
              <option value="">Todos</option>
              {generosDisponibles.map((g, i) => (
                <option key={i} value={g}>{g}</option>
              ))}
            </select>
          </label>

          <label style={{ flex: '1' }}>
            Plataforma:
            <select value={filtroPlataforma} onChange={(e) => setFiltroPlataforma(e.target.value)} style={{ width: '100%' }}>
              <option value="">Todas</option>
              <option value="PC">PC</option>
              <option value="Xbox">Xbox</option>
              <option value="Xbox One">Xbox One</option>
              <option value="PS4">PS4</option>
              <option value="PS5">PS5</option>
              <option value="Nintendo Switch">Nintendo Switch</option>
              <option value="Steam Deck">Steam Deck</option>
              <option value="Android">Android</option>
              <option value="iOS">iOS</option>
            </select>
          </label>
        </div>
      </div>


      {/* Lista filtrada */}
      <div className="grid">
        {juegos
          .filter(j =>
            (filtroGenero === '' || j.genero === filtroGenero) &&
            (filtroPlataforma === '' || j.plataforma === filtroPlataforma)
          )
          .map(juego => (
            <div key={juego.id} className="tarjeta">
              {juego.imagen && (
                <img
                  src={juego.imagen}
                  alt={juego.titulo}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    marginBottom: '0.5rem'
                  }}
                />
              )}

              <h3>{juego.titulo}</h3>
              <p><strong>Género:</strong> {juego.genero}</p>
              <p><strong>Plataforma:</strong> {juego.plataforma}</p>
              <p><strong>Estado:</strong> {juego.estado}</p>
              <p><strong>Calificación:</strong> {juego.calificacion}</p>
              <p><strong>Horas jugadas:</strong> {juego.tiempo_jugado}</p>
              <button className="btn btn-eliminar" onClick={() => eliminarVideojuego(juego.id)}>Eliminar</button>
              <button className="btn btn-editar" onClick={() => {
                setJuegoEditando(juego);
                setMostrarModal(true);
              }}>Editar</button>
            </div>
          ))}
      </div>

      {/* Modal de edición */}
      {mostrarModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Editar Videojuego</h3>

            <label>
              Estado:
              <select name="estado" value={juegoEditando.estado} onChange={handleModalChange}>
                <option value="pendiente">Pendiente</option>
                <option value="jugando">Jugando</option>
                <option value="completado">Completado</option>
              </select>
            </label>

            <label>
              Plataforma:
              <select name="plataforma" value={juegoEditando.plataforma} onChange={handleModalChange}>
                <option value="PC">PC</option>
                <option value="Xbox">Xbox</option>
                <option value="Xbox One">Xbox One</option>
                <option value="PS4">PS4</option>
                <option value="PS5">PS5</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="Steam Deck">Steam Deck</option>
                <option value="Mobile">Mobile</option>
                <option value="Otro">Otro</option>
              </select>
            </label>

            <label>
              Género:
              <select name="genero" value={juegoEditando.genero} onChange={handleModalChange}>
                {generosDisponibles.map((g, i) => (
                  <option key={i} value={g}>{g}</option>
                ))}
              </select>
            </label>

            <label>
              Calificación:
              <input
                name="calificacion"
                type="number"
                min="0"
                max="10"
                value={juegoEditando.calificacion}
                onChange={handleModalChange}
              />
            </label>

            <label>
              Tiempo jugado:
              <input
                name="tiempo_jugado"
                type="number"
                min="0"
                value={juegoEditando.tiempo_jugado}
                onChange={handleModalChange}
              />
            </label>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn" onClick={() => setMostrarModal(false)}>Cancelar</button>
              <button className="btn btn-editar" onClick={confirmarEdicion}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Videojuegos;
