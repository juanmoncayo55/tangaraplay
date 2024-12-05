import { useState, useEffect, useContext } from 'react';
import { GameContext } from '../../Juegos';
import "./index.css"

const Hangman = () => {
  const { data, moves, handleMoves, boardSize, setWinner } = useContext(GameContext);

  const [vueltasCorazon, setVueltasCorazon] = useState(3);
  const [palabraSecreta, setPalabraSecreta] = useState('');
  const [inputsLetras, setInputsLetras] = useState([]);

  const separarPalabra = () => {
    // Verificación más robusta de la estructura de data
    if (!data || !data.respuesta || !Array.isArray(data.respuesta) || !data.respuesta[0]?.opcion) {
      console.error('Datos inválidos o faltantes:', data);
      return;
    }
    setPalabraSecreta(data.respuesta[0].opcion);
    handleMoves(data.errores || 0);
    setVueltasCorazon(data.intentos || 3);

    const inputsIniciales = data.respuesta[0].opcion.split('').map((letra, index) => ({
      valor: index === 0 ? letra : '',
      esCorrecta: index === 0,
      
      bloqueado: index === 0
    }));

    setInputsLetras(inputsIniciales);

    document.querySelector("#preguntaDiv").innerHTML = `
      <div class="flex justify-between items-center gap-4">
        <img src="${data.url}" class="w-5/12 rounded-xl" />
        <p class="w-7/12 text-[#312B6B] text-lg">${data.pregunta}</p>
      </div>
    `;
  };

  const verificarLetra = (index, valorIngresado) => {
    if (!palabraSecreta) return;

    const nuevosInputs = [...inputsLetras];
    const letraCorrecta = palabraSecreta[index].toLowerCase();
    
    if (valorIngresado.toLowerCase() !== letraCorrecta) {
      nuevosInputs[index] = { 
        ...nuevosInputs[index], 
        valor: valorIngresado, 
        esCorrecta: false 
      };
      handleMoves(moves - 1);
    } else {
      nuevosInputs[index] = { 
        ...nuevosInputs[index], 
        valor: valorIngresado, 
        esCorrecta: true 
      };
    }

    setInputsLetras(nuevosInputs);

    if( letraCorrecta !== valorIngresado ){
      console.log("Es incorrecta la letra")
    }else{
      console.log("Es correcta la letra")
    }

    if(moves === 1){
      handleMoves(data.errores);
      setVueltasCorazon(prev => prev - 1);
    }

    if(vueltasCorazon < 1){
      bloquearInputs();
      return;
    }

    const palabraAdivinada = nuevosInputs.every((input, i) => 
      input.valor.toLowerCase() === palabraSecreta[i].toLowerCase()
    );

    if (palabraAdivinada) {
      //alert('¡Felicidades! Has adivinado la palabra.');
      setWinner()
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
    
    const nuevosInputs = [...inputsLetras];
    
    nuevosInputs[index] = {
      ...nuevosInputs[index],
      valor: valorIngresado
    };
    
    if (evento.nativeEvent.inputType === 'insertText') {
      verificarLetra(index, valorIngresado);
    }

    
    if(vueltasCorazon < 1){
      bloquearInputs();
    } else {
      setInputsLetras(nuevosInputs);
    }

    if( palabraSecreta[index].toLowerCase() !== valorIngresado ){
      evento.nativeEvent.target.style.borderBottom = "1px solid red";
      evento.nativeEvent.target.style.backgroundColor = "#ff3f3f42";
      console.log(evento.nativeEvent.target.value)
    }else if(palabraSecreta[index].toLowerCase() == valorIngresado){
      evento.nativeEvent.target.style.borderBottom = "1px solid green";
      evento.nativeEvent.target.style.backgroundColor = "rgb(27 115 2 / 26%)";
    }

    if(evento.nativeEvent.target.value == ""){
      evento.nativeEvent.target.style.borderBottom = "1px solid #312B6B";
      evento.nativeEvent.target.style.backgroundColor = "#FFF";
    }
  };

  useEffect(() => {
    if (data) {
      separarPalabra();
    }
  }, [data]);

  // Renderizado condicional si no hay datos
  if (!data || !data.respuesta) {
    return <div className="w-full flex justify-center items-center pt-12">Cargando...</div>;
  }

  return (
    <div className="w-full flex justify-center items-center pt-12">
      <div className={`aspect-square h-full max-h-96 xl:max-h-full flex items-center justify-center`}>
        <div className="inputs-container">
         {inputsLetras.map((input, index) => (
           <input
             key={index}
             type="text"
             maxLength={1}
             value={input.valor}
             onChange={(e) => handleInputChange(index, e)}
             readOnly={input.bloqueado}
             style={{
               margin: '0 5px'
             }}
             className="short_input bottom_line"
           />
         ))}
       </div>
      </div>
    </div>
  );
};

export default Hangman;