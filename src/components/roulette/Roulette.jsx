import React, {useState} from 'react'
import { Wheel } from 'react-custom-roulette'

const data = [
  { option: '0' },
  { option: '1' },
  { option: '3' },
  { option: '5' },
  { option: '6' },
  { option: '7' },
  { option: '8' },
  { option: '9' },
  { option: '10' },
  { option: '11' }
]

const Roulette = () => {
	const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedValueRoulette, setSelectedValueRoulette] = useState(null)

  const initRoulette = () => {
  	if(!mustSpin){
	  	const newPrizeNumber = Math.floor(Math.random() * data.length);
	    setPrizeNumber(newPrizeNumber);
	  	setMustSpin(true)
  	}
  }

	return (
		<>
			<div className="h-4 w-full bg-gradient-to-r from-azulBrillante1 to-azulBrillante2"></div>
			<div className="bg-clEFEFEF py-4 px-2 w-full flex justify-between items-center gap-3">
				<div className="flex flex-col justify-center items-center w-2/6">
					<i className="fa-solid fa-trophy text-4xl"></i>
					<p className="text-cl379f text-lg font-semibold">10 Puntos</p>
				</div>
				<div className="w-3/6">
					<p className="uppercase text-md font-bold text-center">GIRA LA RULETA Y ACEPTA EL RETO</p>
				</div>
				<div className="flex flex-col justify-center items-center w-2/6">
					<i className="fa-solid fa-trophy text-4xl"></i>
					<p className="text-cl379f text-lg font-semibold">100 Puntos</p>
				</div>
			</div>
			<div className="-rotate-45 container mx-auto px-5 flex justify-center my-14">
				<Wheel
		      mustStartSpinning={mustSpin}
		      prizeNumber={prizeNumber}
		      data={data}
		      backgroundColors={['#2A7EFE', '#FDFDFD']}
		      outerBorderColor={["#0D5BF2"]}
		      outerBorderWidth={15}
		      innerBorderColor={["#f2f2f2"]}
		      textColors={['#ffffff', "#2A7EFE"]}
		      fontSize={[40]}
		      onStopSpinning={() => {
	          setMustSpin(false);
	          setSelectedValueRoulette(data[prizeNumber].option)
	        }}
		    />
	    </div>

	    <p className="text-center text-2xl font-bold text-white">{selectedValueRoulette || ""}</p>

	    <div className="container mx-auto px-5 flex justify-between gap-4">
	    	<button
	    		className="bg-white text-black text-lg font-semibold py-3 px-9 rounded-3xl w-1/2"
	    		>Volver</button>
	    	<button
	    		className="bg-azulBrillante3 text-black text-lg font-semibold py-3 px-9 rounded-3xl w-1/2"
	    		onClick={() => initRoulette()}
	    	>Jugar</button>
	    </div>
		</>
	)
}

/*
pointerProps={{
            style: {
                position: 'absolute',
                transform: 'translateX(-300%) translateY(-50%) rotate(180deg)',
                width: '0',
                height: '0',
                borderLeft: '20px solid transparent',
                borderRight: '20px solid transparent',
                borderBottom: '40px solid #f0ad4e',
            },
	        }}
*/

export default Roulette
