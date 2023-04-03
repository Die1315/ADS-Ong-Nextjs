function Footer() {

    return (
        <div className="w-full p-5">
            <ul className="w-12/12 p-0 flex flex-wrap justify-center items-center gap-2 mb-5 text-sm">
                <li><a href="#" className="text-dark hover:text-gray-500">Políticas de privacidad</a></li>
                <li><a href="#" className="text-dark hover:text-gray-500">Términos y condiciones</a></li>
                <li><a href="#" className="text-dark hover:text-gray-500">Preguntas Frecuentes</a></li>
                <li><a href="#" className="text-dark hover:text-gray-500">Configuración</a></li>
            </ul>
            <div className="w-12/12 text-center">
                <p className="text-sm">Copyright © 2023 HelpGo | Todos los derechos reservados.</p>
            </div>
        </div>
    )
}

export default Footer