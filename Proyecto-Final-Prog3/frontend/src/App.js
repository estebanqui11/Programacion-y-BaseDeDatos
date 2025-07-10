import React from 'react';
import Videojuegos from './components/videojuegos';
import AgregarVideojuego from './components/agregarVideojuego';
import './App.css'; // Asegurate de que esto esté

function App() {
  return (
    <div className="container">
      <h1>Colección de Videojuegos</h1>
      <Videojuegos />
      <hr />
      <AgregarVideojuego />
    </div>
  );
}

export default App;
