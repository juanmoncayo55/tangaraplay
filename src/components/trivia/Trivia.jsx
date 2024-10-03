import React from 'react'
import {Link} from "react-router-dom";
import HeadScore from "../utils/HeadScore.jsx"

const Trivia = () => {
	return (
		<>
			<HeadScore title="RESPONDE LA TRIVIA ACORDE A LA INFORMACIÓN" />
			<div className="conatiner mx-auto px-5 flex flex-col gap-8">
				<p className="text-azulBrillante3 text-center text-xl mt-5">con base en lo aprendido en Tángara</p>

				<div className="bg-verdeLimon rounded-2xl py-4">
					<p className="text-black uppercase text-lg font-semibold text-center">Gira la Ruleta <br /> y Acepta el Reto</p>
				</div>

				<div className="flex flex-col gap-3">
					{
						[1,2,3].map((item) => (
							<Link key={item} to={item == 1 ? "/hangman" : null} className="bg-white rounded-3xl text-backgroundAzulOscuro uppercase text-xl text-center font-bold py-3">Respuesta {item}</Link>
						))
					}
				</div>
			</div>
		</>
	)
}

export default Trivia