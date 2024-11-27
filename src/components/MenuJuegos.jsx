import { Link, useNavigate } from "react-router-dom";

export default function MenuJuegos() {
    const items = [
        { name: "Ruleta", tipoJuego: "ruleta", oidJuego: "8", oidUsuario: "18" },
        { name: "Trivia", tipoJuego: "trivia", oidJuego: "44", oidUsuario: "18" },
        { name: "Trivia Multiple", tipoJuego: "trivia-multiple", oidJuego: "71", oidUsuario: "18" },
        { name: "Ahorcado", tipoJuego: "ahorcado", oidJuego: "13", oidUsuario: "18" },
        { name: "Rompecabezas", tipoJuego: "rompecabezas", oidJuego: "61", oidUsuario: "18" },
        { name: "Memoria", tipoJuego: "memoria", oidJuego: "", oidUsuario: "" },
        { name: "Crucigrama", tipoJuego: "crucigrama", oidJuego: "", oidUsuario: "" },
        { name: "Sopa de letras", tipoJuego: "sopa-de-letras", oidJuego: "", oidUsuario: "" }
    ];

    const navigate = useNavigate();

    const disabledGames = ['memoria','crucigrama','sopa-de-letras'];

    return (
        <ul
            onSelect={(selectedKey) => navigate(selectedKey)}
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-azul-claro rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {items.map((item, index) => (
                <li key={index}>
                    <Link 
                        className={`text-white ${(disabledGames.includes(item.tipoJuego) ? 'line-through pointer-events-none disabled' : '')}`} 
                        to={`/juegos/${item.tipoJuego}/${item.oidJuego}/${item.oidUsuario}`}>
                    {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}
