import { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { Tooltip } from '@nextui-org/react';
import Link from "next/link"

import { DashboardContext } from '../../pages/dashboard';
import { ProfileContext } from '../../pages/profile';

function CreateProjectButton() {

    const { mostrarPostsList, setMostrarPostsList } = useContext(DashboardContext);

    return (
        <Tooltip content={mostrarPostsList ? "Crear proyecto" : "Ver proyectos"} placement="bottom" color={mostrarPostsList ? `warning` : `invert`}>
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