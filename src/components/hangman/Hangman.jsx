import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import Hangman from './index.js'
import './index.css'
import HeadScore from "../utils/HeadScore.jsx"

const hng = new Hangman();

const HangmanComponent = () => {
  const [keyWord, setKeyWord] = useState("")

  useEffect(() => {
    hng.reset();
    showBtns()
  }, [])

  const showBtns = () => {
    const buttons = document.querySelectorAll("#letterAll button")
    for(let i = 0; i < buttons.length ; i++){
      buttons[i].addEventListener("click", function(e){
        //console.log(e.target)
        hng.guess(e.target.innerText)
        e.target.parentNode.removeChild(e.target)
      })
    }
  }


	return (
		<>
			<HeadScore title="Completa el nombre" />
      <div className="container mx-auto px-2">
  			<div id="hangm" className="flex flex-col space-y-5">
          <div>
            <div id="hangm_end" className="h"></div>
          </div>

          {/* Esta Zona no la toco pero debe estar ahi (Esta oculta) */}
          <div id="hangm_animation" className="hidden">
            <div id="hangm_2" className="h pole_h"></div>
            <div id="hangm_1" className="h pole_v"></div>

            <div id="hangm_3" className="h rope"></div>

            <div id="hangm_4" className="h man_head"></div>
            <div id="hangm_5" className="h man_upper"></div>
            <div id="hangm_6" className="h man_lower"></div>
          </div>
          {/* Aqui termina (Esta oculta) */}

          <img src="/images/cristiano_ronaldo.jpg" className="w-8/12 mx-auto" />

          <div>
            <p className="text-white text-xl" id="winner-hangman"></p>
          </div>

          <div>
            <div id="hangm_guesses" className="h text-white text-xl font-semibold"></div>
          </div>

            {/* Zona de Botones Blancos */}
            <div id="hangm_guessbox" className="h">
                <div>
                    <div id="hangm_word" className="text-white font-bold"></div>
                </div>
            </div>
            {/* Zona de Botones Azules */}
            <div id="letterAll" className="grid grid-cols-6 grid-rows-auto gap-3">
                
            </div>
            {/* Botones */}
            <div className="col-sm-3">
  						<div className="container mx-auto px-5 flex justify-between gap-4">
  							<button
  							 className="bg-white text-black text-lg font-semibold py-3 px-9 rounded-3xl w-1/2"
  							>Volver</button>
  							<Link className="bg-azulBrillante3 text-black text-lg font-semibold py-3 px-9 rounded-3xl w-1/2 text-center" onClick={() => {
                  	hng.reset();
                    showBtns()
                  	return false;
              	} }>Jugar</Link>
  						</div>
            </div>
        </div>
      </div>
		</>
	)
}

/*
onKeyUp={(e) => {
  console.log(e.key)
  hng.guess(e.key);
  document.getElementById("guess").value = ""
  return false;
} }
*/

export default HangmanComponent