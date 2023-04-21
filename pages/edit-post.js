import { useContext } from "react";
import { DashboardContext } from './dashboard';

import Navbar from '../components/Navbar/navbar';
import ProjectForm from '../components/ProjectForm/projectForm'

const EditPost = () => {

    return (
        <div className="relative">
            <Navbar />
            <div className="container mx-auto px-5 md:px-0 py-5 flex flex-col md:flex-row justify-between items-stretch md:items-start gap-5">
                <div className="w-12/12 md:w-3/12 bg-white rounded-md p-4"><p>Lorem Ipsum</p></div>
                <div className="w-12/12 md:w-6/12 bg-white rounded-md p-4">
                    <h1 className="w-full mb-3 text-3xl font-semibold display-1 text-dark mx-auto">Editar Proyecto</h1>
                    <ProjectForm />
                </div>
                <div className="w-12/12 md:w-3/12 bg-white rounded-md p-4"><p>Lorem Ipsum</p></div>
            </div>
        </div>
    );
};

export default EditPost;
