import { useContext } from "react";
import { DashboardContext } from '../../pages/dashboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import ProjectForm from "../ProjectForm/projectForm";

const Project = () => {

    const { mostrarPostsList, setMostrarPostsList } = useContext(DashboardContext);

    return (
        <div className="relative w-12/12 flex flex-col gap-5 bg-white rounded-md px-4 py-6 overflow-auto">
            <button onClick={() => setMostrarPostsList(!mostrarPostsList)} className="absolute top-6 right-5">
                <FontAwesomeIcon
                    icon={faTimes}
                    style={{ fontSize: 20 }} />
            </button>
            <h1 className="w-full mb-3 text-3xl font-semibold display-1 text-dark mx-auto">Crear Proyecto</h1>
            <ProjectForm />

            <button onClick={() => setMostrarPostsList(!mostrarPostsList)} className="btn-alt bg-dark">
                Cancelar
            </button>
        </div>
    );
};

export default Project;