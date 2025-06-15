const TarjetaPersona = ({ persona }) => {
    return (
        <div className="tarjeta-persona">
            <h3>{persona.nombre} {persona.apellido}</h3>
            <div className="datos">
                <p>
                    <strong>Edad:</strong>
                    <span>{persona.edad} años</span>
                </p>
                <p>
                    <strong>Email:</strong>
                    <span>{persona.email}</span>
                </p>
            </div>
        </div>
    );
};

export default TarjetaPersona; 