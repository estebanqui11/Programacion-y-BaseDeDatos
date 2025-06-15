import { useState, useEffect } from 'react';
import axios from 'axios';
import ListaTarjetas from './ListaTarjetas';

const TraerPersonas = () => {
    const [personas, setPersonas] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerPersonas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/personas');
                setPersonas(response.data);
            } catch (err) {
                setError('Error al obtener los datos de las personas');
                console.error('Error:', err);
            }
        };

        obtenerPersonas();
    }, []);

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="traer-personas">
            <h2>Lista de Personas</h2>
            <ListaTarjetas personas={personas} />
        </div>
    );
};

export default TraerPersonas; 