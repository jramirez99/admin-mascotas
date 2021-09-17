import React, { Fragment, useState } from 'react';


const Formulario = ( { crearCitas } ) => {

    const  [ cita, actualizarCita ] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: '',
    });

    //state para mostrar errores
    const [ error, actualizarError ] = useState(false)

    const actualizarState = (e) => {
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    };

    //destructuracion
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    const enviarFormulario = ( e ) => {
        e.preventDefault();

        // VALIDAR
        if ( [ mascota.trim() || propietario.trim() || fecha.trim() || hora.trim() || sintomas.trim() ].includes("") ) {
            actualizarError(true);
            return;
        };

        actualizarError(false);

        //ASIGNARLE UN ID
        cita.id = Date.now();

        // CREAR LA CITA
        crearCitas( cita );

        //REINICIAR EL FORM
        actualizarCita( {
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: '',
        });
    };

    return (
        <Fragment>
            <h1> Crear cita </h1>

            { error 
                ? <p className="alerta-error"> 
                    Todos los campos son obligatorios
                  </p>   
                : null }

            <form
                onSubmit={enviarFormulario}
            >
                <label> Nombre Mascota </label>
                <input 
                    type="text" 
                    name="mascota" 
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={ actualizarState }
                    value={ mascota }
                />

                <label> Propietario </label>
                <input 
                    type="text" 
                    name="propietario" 
                    className="u-full-width" 
                    placeholder="Nombre Propietario"
                    onChange={ actualizarState }
                    value={ propietario }
                />

                <label>Fecha</label>
                <input 
                    type="date" 
                    name="fecha" 
                    className="u-full-width" 
                    onChange={ actualizarState }
                    value={ fecha }
                />

                <label> Hora </label>
                <input 
                    type="time" 
                    name="hora" 
                    className="u-full-width" 
                    onChange={ actualizarState }
                    value={ hora }
                />

                <label> Sintomas </label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={ actualizarState }
                    value={ sintomas }
                >
                </textarea>

                <button
                    type="submit"
                    className="u-full-width"
                >
                    Agregar cita
                </button>
            </form>
        </Fragment>
    )
}

export default Formulario;