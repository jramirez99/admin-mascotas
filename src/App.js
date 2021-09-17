import React, { Fragment,useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';
import PropTypes from 'prop-types';


function App() {

  // citas en localStorage
  let citasIniciales = JSON.parse( localStorage.getItem( 'citas' ) );
  if ( !citasIniciales ) {
    citasIniciales = [];
  };

  const [citas, guardarCitas] = useState( citasIniciales );

  useEffect( () => {
    if ( citasIniciales ) {
      localStorage.setItem( 'citas', JSON.stringify( citas ) )
    } else {
      localStorage.setItem( 'citas', JSON.stringify( [] ) );
    }
    
  }, [ citas, citasIniciales] )
  const crearCitas = cita => {
    guardarCitas( [ ...citas, cita] );
  };

  const eliminarCita = id => {
      const citaEliminada = citas.filter( cita => cita.id !== id );
      guardarCitas( citaEliminada )
  }

  // mesaje condicional
  const titulo = citas.length === 0 ? 'No hay citas'  : 'Adminstra tus citas';

  return (
    <Fragment>
      <h1> Adminstrador de Mascotas </h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">

            <Formulario
              crearCitas={ crearCitas }
            />
            
          </div>

          <div className="one-half column">
            <h1> { titulo } </h1>
            <div className="contenedor-citas">

              { citas.map( cita => {
                  return (
                    <Cita 
                      key={ cita.id }
                      cita={ cita }
                      eliminarCita={ eliminarCita }
                    />
                  );
                })
            }
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
};

Formulario.propTypes = {
  crearCitas: PropTypes.func.isRequired
}

export default App;
