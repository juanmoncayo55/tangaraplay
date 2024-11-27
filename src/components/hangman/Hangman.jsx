import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Corazon from '../Corazon';
import "./index.css"
const Hangman = ({vidas = 3, movimientos}) => {

  const palabrasGuardadas = ["casa", "carro", "perro", "gato", "estudiar", "tablero"];
  
  //Variables de estado que me ayudaran a controlar el registro de info de la api, los errores y el loading de la info.
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vueltasCorazon, setVueltasCorazon] = useState(3);

  //funcion que se ejecuta para llevar a cabo la consulta a la api
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "oidJuego": 38,
          "oidUsuario": 18
        })
      });

      if(response.status !== 200) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();
      
      const gameData = {
        "respuesta": result.RespuestaJuego.opcionRespuesta[0].opcion,
        "pregunta": result.RespuestaJuego.pregunta,
        "errores": result.RespuestaJuego.errores,
        "intentos": result.RespuestaJuego.intentos
      };

      setData(gameData);
      setError(null);
    } catch(err) {
      console.log(err)
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const [palabraSecreta, setPalabraSecreta] = useState('');
  const [inputsLetras, setInputsLetras] = useState([]);
  const [intentosRestantes, setIntentosRestantes] = useState(3);
  const [mensajeResultado, setMensajeResultado] = useState('');

  const separarPalabra = () => {
    // Verificar que data existe y tiene respuesta antes de continuar
    if (data && data.respuesta) {
      setPalabraSecreta(data.respuesta);
      setIntentosRestantes(data.intentos);
      setMensajeResultado('');

      const inputsIniciales = data.respuesta.split('').map((letra, index) => ({
        valor: index === 0 ? letra : '',
        esCorrecta: index === 0,
        bloqueado: index === 0
      }));

      setInputsLetras(inputsIniciales);
    }
  };

  const verificarLetra = (index, valorIngresado) => {
    const nuevosInputs = [...inputsLetras];
    const letraCorrecta = palabraSecreta[index].toLowerCase();
    
    if (valorIngresado.toLowerCase() !== letraCorrecta) {
      // Letra incorrecta
      nuevosInputs[index] = { 
        ...nuevosInputs[index], 
        valor: valorIngresado, 
        esCorrecta: false 
      };
      setIntentosRestantes(prev => prev - 1);
    } else {
      // Letra correcta
      nuevosInputs[index] = { 
        ...nuevosInputs[index], 
        valor: valorIngresado, 
        esCorrecta: true 
      };
    }

    setInputsLetras(nuevosInputs);

    // Verificar condiciones de victoria o derrota
    if (intentosRestantes - 1 === 0) {
      setVueltasCorazon(prev => prev -1);
      console.log(vueltasCorazon)
      //setMensajeResultado(`¡Perdiste! La palabra era: ${palabraSecreta}`);
      setIntentosRestantes(3)
      //separarPalabra()
    }

    if(vueltasCorazon < 1){
      bloquearInputs();
      setIntentosRestantes(0);
    }

    // Verificar si se completó la palabra
    const palabraAdivinada = nuevosInputs.every((input, i) => 
      input.valor.toLowerCase() === palabraSecreta[i].toLowerCase()
    );

    if (palabraAdivinada) {
      setMensajeResultado('¡Felicidades! Has adivinado la palabra.');
      bloquearInputs();
    }
  };

  const bloquearInputs = () => {
    const inputsBloqueados = inputsLetras.map(input => ({
      ...input,
      bloqueado: true
    }));
    setInputsLetras(inputsBloqueados);
  };

  const handleInputChange = (index, evento) => {
    const valorIngresado = evento.target.value;
    verificarLetra(index, valorIngresado);
  };

  // Modificar useEffect para llamar a separarPalabra cuando los datos estén listos
  useEffect(() => {
    fetchData();
  }, []);

  // Otro useEffect para manejar cuando los datos cambian
  useEffect(() => {
    if (data) {
      separarPalabra();
    }
  }, [data]);

  if(error) return <div>Error: {error}</div>

  return (
    <div className="flex flex-col justify-between flex-nowrap items-center min-h-screen md:min-h-px md:h-screen">
      <Header />
      <main className="grow w-full flex flex-col">
        <header className="w-full bg-gris-claro-azul py-2">
          <div className="container mx-auto text-center">
            <h1 className="text-secondary text-3xl">Ahorcado</h1>
          </div>
        </header>
        <section className="grow container mx-auto flex flex-col min-h-screen md:flex-row xl:justify-start space-x-0 md:space-x-12 space-y-8 md:space-y-0 px-4 lg:px-16 xxl:px-0 pb-12">
          {/* info */}
          <aside className="w-full md:w-1/2 h-full 2xl:h-2/3 flex flex-col space-y-6 md:space-y-14 justify-between items-center">
            <div className="flex bg-primary text-white rounded-b-3xl w-4/5 md:w-2/3 h-1/3 max-h-max p-2 pt-8 divide-x-2">
              <div className="w-1/2 flex flex-col justify-end items-center">
                <div className="vidas flex space-x-2 mb-4">
                  {Array.from({ length: vueltasCorazon}).map((vida,index) => <Corazon key={index}/>)}
                </div>
                <div className="text-sm">Vidas</div>
              </div>
              <div className="w-1/2 flex flex-col justify-end items-center">
                <div className="movimientos text-4xl mb-2">{intentosRestantes}</div>
                <div className="text-sm">Intentos</div>
              </div>
            </div>
            <div className={`bg-gris-claro-azul rounded-3xl w-full h-2/3 max-h-max xl:max-h-full p-6 md:p-12 justify-center flex flex-col items-center ${loading && 'skeleton'}`}>
              {!loading && (<p className='text-secondary text-2xl text-center'>{data.pregunta}</p>)}
            </div>
          </aside>
          {/* juego */}
          <div className="w-full md:w-1/2 h-full 2xl:h-2/3 flex justify-center items-center pt-12">
            <div className={`aspect-square h-full max-h-96 xl:max-h-full flex items-center justify-center ${loading && 'skeleton'}`}>
              { loading ? null
                 : (<div className="inputs-container">
                       {inputsLetras.map((input, index) => (
                         <input
                           key={index}
                           type="text"
                           maxLength={1}
                           value={input.valor}
                           onChange={(e) => handleInputChange(index, e)}
                           readOnly={input.bloqueado}
                           style={{
                             //backgroundColor: input.esCorrecta === false ? 'red' : input.esCorrecta ? 'green' : 'white',
                             margin: '0 5px'
                           }}
                           className="short_input bottom_line"
                         />
                       ))}
                     </div>) 
              }
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Hangman;
/*{mensajeResultado && (
  <div className="mensaje-resultado">
    {mensajeResultado}
  </div>
)}*/