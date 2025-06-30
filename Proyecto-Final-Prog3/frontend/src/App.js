import React from 'react';
import Videojuegos from './components/videojuegos';
import AgregarVideojuego from './components/agregarVideojuego';

function App() {
  return (
    <div className="App">
      <h1>Colección de Videojuegos</h1>
      <AgregarVideojuego />
      <Videojuegos />
    </div>
  );
}

export default App;
