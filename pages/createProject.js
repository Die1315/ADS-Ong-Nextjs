import Link from 'next/link';

import Project from '../components/Project/project';

import Navbar from "../components/Navbar/navbar";
import CardProfile from "../components/CardProfile/cardprofile";
import CardTags from "../components/CardTags/cardtags";
import CardContacts from "../components/CardContacts/cardcontacts";

const CreateProject = () => {

    const logo = require("../src/images/logo.svg")
    const tags = ['Caridad', 'Servicios', 'Participación', 'Empoderamiento'];
    const categories = ['Comunitarias', 'Locales', 'Nacionales', 'Internacionales'];

    return (
        <>
            <Navbar />
            <div className="container mx-auto py-5 flex gap-5">
                <div className="w-3/12 flex flex-col gap-5">
                    <CardProfile
                        name="Nombre ONG"
                        title="Categoría/Descripción"
                        imageSrc={logo}
                    />
                    <CardTags title="Descubrir" tags={tags} categories={categories} />
                </div>
                <div className="w-6/12 flex flex-col gap-5">
                    <Project />
                </div>
                <div className="w-3/12">
                    <CardContacts />
                </div>
            </div>
        </>
    );
};

export default CreateProject;