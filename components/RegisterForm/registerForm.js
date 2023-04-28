import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { register, updateProfile, uploadCloudinary } from "../../service/data-service";

function RegisterForm({setUpdateProfile, ongToUpdate, setActiveItem}) {
    const [error, setError] = useState();
    const router = useRouter();
    const [dataRegister, setDataRegister] = useState();
    const [uploadFile, setUploadFile] = useState("");
    const [preview, setPreview] = useState(null);

    useEffect(()=>{
        if(ongToUpdate){
            setPreview(ongToUpdate.image)        
        }
    }, [ongToUpdate])

    const handleChange = (event) => {
       
        setDataRegister({
            ...dataRegister,
            [event.target.name]: event.target.value,
        });
    }    

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
            formData.append("file", uploadFile);
            formData.append("upload_preset", "ovclfrex");
        if(ongToUpdate){
            if(uploadFile){
                uploadCloudinary(formData).then((response) => {
                    updateProfile({...dataRegister, image: response.data.secure_url})
                    .then((ong) =>{
                        setUpdateProfile(ong)
                    })
                })
            } else {
                updateProfile({...dataRegister})
                    .then((ong) =>{
                        setUpdateProfile(ong)
                    })
            }
            setActiveItem("Proyectos")
        } else {
            if (dataRegister.password === dataRegister.passwordConfirmation) {
                if(uploadFile){
                uploadCloudinary(formData)
                    .then((response) => {
                        register({ ...dataRegister, image: response.data.secure_url })
                            .then((response) => {
                                if (response.code === "ERR_BAD_REQUEST") {
                                    setError(response.response.data.message || response.response.data.error);
                                } else {
                                    router.push("/login");
                                }
                                console.log(response);
                            })
                            .catch((err) => {
                                console.log(err.message);
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                } else {
                    setError("Debe agregar una imagen")
                }
            } else {
                setError("Las contraseñas no coinciden.")
            }
        }
    };

    return (
        <div>
            <form
                autoComplete="off"
                onSubmit={handleSubmit}
                className="w-full flex flex-col justify-center items-stretch gap-5"
            >
                 {!ongToUpdate && 
                    (     <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3">
                    <input
                        onChange={handleChange}
                        name="name"
                        type="text"
                        placeholder="Nombre ONG*"
                        required
                        className="w-full md:w-3/6"
                    /> 
                    <input
                        onChange={handleChange}
                        name="email"
                        type="email"
                        placeholder="Email ONG*"
                        required
                        className="w-full md:w-3/6"
                    /> 
                </div>
                )}
                {!ongToUpdate && 
                
                 (
                 <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3">
                    <input
                        onChange={handleChange}
                        name="password"
                        type="password"
                        placeholder="Contraseña*"
                        required
                        className="w-full md:w-3/6"
                    />
                    <input
                        onChange={handleChange}
                        name="passwordConfirmation"
                        type="password"
                        placeholder="Confirmar contraseña*"
                        required
                        className="w-full md:w-3/6"
                    /> 
                    
                </div>
                 )
                     }
                {!ongToUpdate && 
                ( <input
                    onChange={handleChange}
                    name="CIF"
                    type="number"
                    placeholder="CIF ONG*"
                    required
                /> )}
                <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3">
                    <input
                        onChange={handleChange}
                        name="facebook"
                        type="url"
                        placeholder="URL Facebook"
                        defaultValue={ ongToUpdate?.facebook || ""}
                        className="w-full md:w-3/6"
                    />
                    <input
                        onChange={handleChange}
                        name="instagram"
                        type="url"
                        defaultValue={ ongToUpdate?.instagram || ""}
                        placeholder="URL Instagram"
                        className="w-full md:w-3/6"
                    />
                </div>
                <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3">
                    <input
                        onChange={handleChange}
                        name="webPage"
                        type="url"
                        defaultValue={ ongToUpdate?.webPage || ""}
                        placeholder="Sitio Web"
                        className="w-full md:w-3/6"
                    />
                    <input
                        onChange={handleChange}
                        name="telephone"
                        type="tel"
                        placeholder="Teléfono*"
                        defaultValue={ ongToUpdate?.telephone || ""}
                        required={ true && !ongToUpdate}
                        className="w-full md:w-3/6"
                    />
                </div>
                <textarea
                    onChange={handleChange}
                    name="description"
                    rows="3"
                    defaultValue={ ongToUpdate?.description || ""}
                    required={ true && !ongToUpdate}
                    placeholder="Breve descripción*"
                />
                <div>
                    <label className="block text-sm text-gray-400 px-3">
                        Logo ONG*
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
                                        required={ true && !ongToUpdate}
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
                <button type="submit" className="btn mt-5">
                    Registrar ONG
                </button>
            </form>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    )
}

export default RegisterForm