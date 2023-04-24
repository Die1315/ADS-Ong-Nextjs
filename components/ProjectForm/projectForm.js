import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MapView from "../map-box/map";

import { editPost, registerProject, uploadCloudinary } from "../../service/data-service";

const ProjectForm = ({ postToUpdate, setPostUpdate, closeModal }) => {
    const [error, setError] = useState();
    const router = useRouter();
    const [dataRegister, setDataRegister] = useState();
    const [userLngLat, setUserLngLat] = useState(null);
    const location = {
        lat: postToUpdate?.lat || 0,
        lng: postToUpdate?.lon || 0
    }
    // Cloudinary
    const [uploadFile, setUploadFile] = useState("");
    const [preview, setPreview] = useState(postToUpdate?.image || null);
    useEffect(() => {
        if (postToUpdate) {
            setPreview(postToUpdate.image)
        }
    }, [postToUpdate]);
    const setLngLat = (lngLat) => {
        setUserLngLat(lngLat);
        setDataRegister({
            ...dataRegister,
            lon: lngLat.lng,
            lat: lngLat.lat,
        });
    }

    const handleChange = (event) => {
        setDataRegister({
            ...dataRegister,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", uploadFile);
        formData.append("upload_preset", "ovclfrex");
        if (postToUpdate) {
            if (uploadFile) {
                uploadCloudinary(formData).then((response) => {
                    editPost(postToUpdate.id,
                        { ...dataRegister, image: response.data.secure_url })
                        .then((response) => {
                            //console.log(response)
                            setPostUpdate(response)
                        })
                })
            } else {
                editPost(postToUpdate.id, { ...dataRegister })
                    .then((response) => {
                        //console.log(response)
                        setPostUpdate(response)
                    })
            }
            closeModal()
        } else {
            uploadCloudinary(formData)
                .then((response) => {
                    registerProject({ ...dataRegister, image: response.data.secure_url })
                        .then((response) => {

                            if (response.code === "ERR_BAD_REQUEST") {
                                setError(response.response.data.message || response.response.data.error);
                            } else {
                                router.push("/dashboard");
                            }
                        })
                        .catch((err) => {
                            console.log(err.message);
                        });
                })
                .catch((error) => {
                    if (error.code === "ERR_BAD_REQUEST") {
                        setError(error.response.data.error.message || error.response.data.error.error);
                    }

                });
        }
    };
    let formattedstartDate = ""
    let formattedendDate = ""
    if (postToUpdate) {
        if(postToUpdate?.startdate) {
            const startDate = new Date(postToUpdate?.startdate);
            formattedstartDate = startDate?.toISOString().split("T")[0];}
        if(postToUpdate?.enddate){
            const endDate = new Date(postToUpdate?.enddate);        
            formattedendDate = endDate?.toISOString().split("T")[0];
        }
    }
    return (
        <form onSubmit={handleSubmit}
            className="flex flex-col justify-center items-stretch gap-5 w-full"
        >
            <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3">
                <input
                    onChange={handleChange}
                    name="title"
                    type="text"
                    placeholder={"Título de Proyecto"}
                    defaultValue={postToUpdate?.title || ""}
                    required
                    className="w-full"
                />
            </div>
            <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3">
                <textarea
                    onChange={handleChange}
                    name="description"
                    type="text"
                    placeholder={"Descripción del Proyecto"}
                    defaultValue={postToUpdate?.description || ""}
                    required
                    className="w-full"
                    rows="3"
                />
            </div>
            <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3 h-64">
                <MapView setLngLat={setLngLat} initialViewState={location} locationToUpdate={location} />
            </div>
            <div className="input-group flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <label>Fecha Inicio: </label>
                <input
                    onChange={handleChange}
                    name="startdate"
                    type="date"
                    defaultValue={formattedstartDate || ""}
                    required={!postToUpdate && true}
                    className="w-full md:w-5/6"
                />
            </div>
            <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3">
                <label>Fecha Fin: </label>
                <input
                    onChange={handleChange}
                    name="enddate"
                    type="date"
                    defaultValue={formattedendDate || ""}

                    className="w-full md:w-5/6"
                />
            </div>
            <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3">
                <input
                    onChange={handleChange}
                    name="resources"
                    type="text"
                    required
                    placeholder={"Recursos 'Separados por comas ( , )'"}
                    defaultValue={postToUpdate?.resources || ""}
                    className="w-full"
                />
            </div>
            <div>
                <label className="block text-sm text-gray-400 px-3">
                    Imagen del Proyecto
                </label>
                <div id="img-preview" className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="flex flex-col gap-3 text-sm text-gray-600">
                            <label htmlFor="image" className="relative flex flex-col justify-center items-center w-full cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary">
                                <span className="font-bold w-48">Upload a file</span>
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={(event) => {
                                        const file = event.target.files[0];
                                        const imgPreview = URL.createObjectURL(file);
                                        setUploadFile(file);
                                        setPreview(imgPreview);
                                    }}
                                />
                                {preview && <img src={preview} alt="Preview" className="mt-5" />}
                            </label>
                        </div>
                        <p className="text-xs text-gray-500">
                            PNG, JPG, SVG
                        </p>
                    </div>
                </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn mt-5">
                {postToUpdate ? "Editar Proyecto" : "Crear Proyecto"}
            </button>
        </form>
    )
}

export default ProjectForm