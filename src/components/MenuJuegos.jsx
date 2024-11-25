import { Link, useNavigate } from "react-router-dom";

export default function MenuJuegos() {
    const items = [
        { name: "Ruleta", link: "ruleta" },
        { name: "Trivia", link: "trivia" },
        { name: "Trivia Multiple", link: "trivia-multiple" },
        { name: "Ahorcado", link: "ahorcado" },
        { name: "Rompecabezas", link: "rompecabeza" },
        { name: "Memoria", link: "memoria" },
        { name: "Crucigrama", link: "crucigrama" },
        { name: "Sopa de letras", link: "sopa-de-letras" }
    ];

    const navigate = useNavigate();

    return (
        <ul
            onSelect={(selectedKey) => navigate(selectedKey)}
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-azul-claro rounded-box z-[1] mt-3 w-52 p-2 shadow">
            {items.map((item, index) => (
                <li key={index}><Link className="text-white" to={`/juego/${item.link}`}>{item.name}</Link></li>
            ))}
        </ul>
    )
}
