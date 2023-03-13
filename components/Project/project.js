import { useState } from "react";
import { useRouter } from "next/router";
import { registerProject } from "../../service/data-service";
import MapView from "../map-box/map";

const Project = () => {

    const [error, setError] = useState();
    const router = useRouter();
    const [dataRegister, setDataRegister] = useState();
    const [userLngLat, setUserLngLat] = useState(null);

    // image lo enviare por defecto ya que no existe funcionalidad para las imagenes.
    const image = "https://temporary.png";

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
            [event.target.name]: event.target.value,
            image: image
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log(dataRegister);
        registerProject(dataRegister)
            .then((response) => {
                console.log(response);
                if (response.code === "ERR_BAD_REQUEST") {
                    setError(response.response.data.message);
                } else {
                    router.push("/dashboard");
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    return (
        <>
            {/* <div className="h-screen flex flex-col md:flex-row justify-center items-stretch columns-1 md:columns-2 py-5 md:py-0 bg-register-hero bg-cover bg-center md:bg-white"> */}
            {/* <div className="static md:relative py-14 overflow-auto bg-white h-auto w-11/12 md:w-3/6 flex mx-auto flex-col justify-start items-center rounded-md md:rounded-none"> */}
            <p className="w-5/6 md:w-4/6 my-5 text-center mx-auto">Crear Proyecto</p>
            <form onSubmit={handleSubmit}
                  className="flex flex-col justify-center items-stretch gap-5"
            >
                <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3">
                    <input
                        onChange={handleChange}
                        name="title"
                        type="text"
                        placeholder="Título de Proyecto"
                        required
                        className="w-full"
                    />
                </div>
                <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3">
                    <textarea
                        onChange={handleChange}
                        name="description"
                        type="text"
                        placeholder="Descripción del Proyecto"
                        required
                        className="w-full"
                    />
                </div>
                {/* <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3">
                    <input
                        onChange={handleChange}
                        name="lat"
                        type="number"
                        placeholder="Latitud"
                        required
                        className="w-full md:w-3/6"
                        step="any"
                    />
                    <input
                        onChange={handleChange}
                        name="lon"
                        type="number"
                        placeholder="Longitud"
                        required
                        className="w-full md:w-3/6"
                        step="any"
                    />
                </div> */}
                <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3 h-64">
                    <MapView setLngLat={setLngLat}/>
                </div>
                <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3">
                    <label>Fecha Inicio: </label>
                    <input
                        onChange={handleChange}
                        name="startdate"
                        type="date"
                        required
                        className="w-full md:w-3/6"
                    />
                </div>
                <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3">
                    <label>Fecha Fin: </label>
                    <input
                        onChange={handleChange}
                        name="enddate"
                        type="date"
                        className="w-full md:w-3/6"
                    />
                </div>
                <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3">
                    <input
                        onChange={handleChange}
                        name="resources"
                        type="text"
                        placeholder="Recursos 'Separados por comas ( , )'"
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm text-gray-400 px-3">
                        Imagen del Proyecto
                    </label>
                    <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
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
                            <div className="flex text-sm text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary"
                                >
                                    <span>Upload a file</span>
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                    />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                                PNG, JPG, GIF up to 10MB
                            </p>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn mt-5">
                    Crear Proyecto
                </button>
            </form>

            {/* </div> */}
            {/* </div> */}
        </>
    );
};

export default Project;