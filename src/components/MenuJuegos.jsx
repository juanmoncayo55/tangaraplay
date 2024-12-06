import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'
export default function MenuJuegos({ items, display = "list" }) {
    const idMenuJuegos = [
        {"oid": 1, "nombre": "Ahorcado con Imagen"},
        {"oid": 2, "nombre": "Ahorcado con Pregunta"},
        {"oid": 3, "nombre": "Rompecabezas"},
        {"oid": 4, "nombre": "Adivinanza Pregunta"},
        {"oid": 5, "nombre": "Adivinanza Imagen"},
        {"oid": 6, "nombre": "Ruleta-Pregunta-Unica"},
        {"oid": 7, "nombre": "Ruleta-Imagen-Unica"},
        {"oid": 8, "nombre": "Ruleta-Pregunta-multiple"},
        {"oid": 9, "nombre": "Ruleta-Imagen-multiple"},
        {"oid": 10, "nombre": "Adivinanza-(Trivia Pregunta)-multiple"},
        {"oid": 11, "nombre": "Adivinanza-(Trivia Imagen)-multiple"},
        {"oid": 12, "nombre": "Busca las parejas"},
        {"oid": 13, "nombre": "Sopa de letras"},
        {"oid": 14, "nombre": "Tres en raya"},
        {"oid": 15, "nombre": "sudoku"},
        {"oid": 16, "nombre": "Crucigrama"},
      ];
      if(items === undefined)items = idMenuJuegos;
    const navigate = useNavigate();
    const missingGames = [12,14,15];

    return (
        <>
            {display === 'list' ?
                <ul onSelect={(selectedKey) => navigate(selectedKey)} tabIndex={0} className="menu menu-sm dropdown-content bg-azul-claro rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    {items.map((item, index) => (
                        !missingGames.includes(item.oid) && 
                        <li key={index}>
                            <Link className="text-white" to={`/juegos/${item.oid}/`}>{item.nombre}</Link>
                        </li>
                    ))}
                </ul>
                :
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {items.map((item, index) => (
                        !missingGames.includes(item.oid) && 
                        <div className="card w-auto text-azul-claro shadow-lg transition-all ease-in-out duration-700 cursor-pointer  hover:shadow-2xl" key={index}>
                            <div className="card-body">
                                <h2 className="card-title mx-auto text-center">{item.nombre}</h2>
                                <Link className="btn bg-transparent hover:bg-success stretched-link uppercase font-bold" to={`/juegos/${item.oid}`}>
                                    Ver juegos
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                                    </svg>
                                </Link>
                            </div>
                        </div>                        
                    ))}
                </div>
            }
        </>
    )
}

MenuJuegos.propTypes = {
    items: PropTypes.array,
    display: PropTypes.string
}