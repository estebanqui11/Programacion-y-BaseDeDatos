// src/components/AgregarVideojuego.jsx
import React, { useState } from 'react';

const AgregarVideojuego = ({ onAgregar }) => {
  const [form, setForm] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    estado: 'pendiente',
    calificacion: 0,
    tiempo_jugado: 0
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resp = await fetch('http://localhost:3001/videojuegos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!resp.ok) throw new Error('Error al crear');

      const nuevo = await resp.json();
      onAgregar(nuevo); // Para actualizar la lista si querés
      setForm({
        titulo: '',
        genero: '',
        plataforma: '',
        estado: 'pendiente',
        calificacion: 0,
        tiempo_jugado: 0
      });
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Videojuego</h2>

      <input name="titulo" placeholder="Título" value={form.titulo} onChange={handleChange} required />
      <input name="genero" placeholder="Género" value={form.genero} onChange={handleChange} required />
      <input name="plataforma" placeholder="Plataforma" value={form.plataforma} onChange={handleChange} required />
      
      <select name="estado" value={form.estado} onChange={handleChange}>
        <option value="pendiente">Pendiente</option>
        <option value="jugando">Jugando</option>
        <option value="completado">Completado</option>
      </select>

      <input type="number" name="calificacion" placeholder="Calificación" value={form.calificacion} onChange={handleChange} min="0" max="10" />
      <input type="number" name="tiempo_jugado" placeholder="Horas jugadas" value={form.tiempo_jugado} onChange={handleChange} />

      <button type="submit">Agregar</button>
    </form>
  );
};

export default AgregarVideojuego;

