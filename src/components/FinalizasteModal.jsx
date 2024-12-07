import { useNavigation } from 'react-router-dom'
import LoLograste from '../assets/lo-lograste.svg'

const FinalizasteModal = ({puntos, handleNextGame}) => {
  const navigate = useNavigation();
  return (
    <dialog id="finalizasteModal" className="modal">
        <div className="modal-box mt-24 overflow-visible pt-2 bg-azul-claro max-w-80 text-center rounded-t-none">
          <div className="absolute top-0 left-0 w-full bg-azul-claro pt-24 -translate-y-full stars rounded-t-full">
            <img className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10/12' src={LoLograste} alt="" />
            <h3 className="text-white font-black text-5xl">Finalizaste!</h3>
          </div>
          <p className="text-white text-2xl">Completaste los retos del día de hoy</p>
          <div className="justify-center modal-action">
            <form method="dialog">
              <button className="btn btn-[#17FDE2] font-extrabold text-lg px-8 py-4 rounded-3xl w-auto h-auto text-#0F3F9E" onClick={() => navigate("/")}>Siguiente</button>
            </form>
          </div>
        </div>
    </dialog>
  )
}

export default FinalizasteModal