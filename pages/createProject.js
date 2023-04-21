import Link from 'next/link';

import Project from '../components/Project/project';


import Navbar from "../components/Navbar/navbar";
import CardProfile from "../components/CardProfile/cardProfile";
import CardTags from "../components/CardTags/cardTags";
import CardContacts from "../components/Following/following";


const CreateProject = () => {

    const logo = require("../src/images/logo.svg")
    const tags = ['Caridad', 'Servicios', 'Participación', 'Empoderamiento'];
    const categories = ['Comunitarias', 'Locales', 'Nacionales', 'Internacionales'];

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-5 md:px-0 py-5 flex flex-col-reverse md:flex-row gap-5">
                <div className="w-12/12 md:w-3/12 flex flex-col gap-5">
                    <CardProfile
                        name="Nombre ONG"
                        title="Categoría/Descripción"
                        imageSrc={logo}
                    />
                    <CardTags title="Descubrir" tags={tags} categories={categories} />
                </div>
                <div className="w-12/12 md:w-6/12 flex flex-col gap-5 bg-white rounded-md px-4 py-6">
                    <Project />
                </div>
                <div className="hidden md:block w-12/12 md:w-3/12">
                    <CardContacts />
                </div>
            </div>
        </>
    );
};

export default CreateProject;