import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { useContext } from 'react';
import { DashboardContext } from '../../pages/dashboard';
import Tooltip from 'react-modern-tooltip'



function CreateProjectButton() {

    const { mostrarPostsList, setMostrarPostsList } = useContext(DashboardContext);

    return (
        <Tooltip
            placement='bottom'
            color={mostrarPostsList ? 'yellow' : 'gray'}
            content={mostrarPostsList ? 'Crear proyecto' : 'Ver proyectos'}
            rounded={false}
        >
            <Link href="" onClick={() => setMostrarPostsList(!mostrarPostsList)}>
                <FontAwesomeIcon
                    icon={faPlusCircle}
                    style={{ fontSize: 20 }}
                    className={mostrarPostsList ? "transform rotate-0  text-secondary" : "transform rotate-45 text-dark"}
                />
            </Link>
        </Tooltip>
    )
}

export default CreateProjectButton