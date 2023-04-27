import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { register, uploadCloudinary } from "../../service/data-service";

function RegisterForm({ setUpdateProfile, ongToUpdate }) {
    const [error, setError] = useState();
    const router = useRouter();
    const [dataRegister, setDataRegister] = useState();
    const [uploadFile, setUploadFile] = useState("");
    const [preview, setPreview] = useState(null);

    useEffect(() => {

    })

    const handleChange = (event) => {
        if (ongToUpdate) {
            setPreview(ongToUpdate.image)
        } else {
            setDataRegister({
                ...dataRegister,
                [event.target.name]: event.target.value,
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (dataRegister.password === dataRegister.passwordConfirmation) {


            const formData = new FormData();
            formData.append("file", uploadFile);
            formData.append("upload_preset", "ovclfrex");
            if (uploadFile) {
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
    };

    return (
        <div>
            <form
                autocomplete="off"
                onSubmit={handleSubmit}
                className="w-full flex flex-col justify-center items-stretch gap-5"
            >
                <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3">
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
                        defaultValue={ongToUpdate?.email || ""}
                        className="w-full md:w-3/6"
                    />
                </div>
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
                <input
                    onChange={handleChange}
                    name="CIF"
                    type="number"
                    placeholder="CIF ONG*"
                    required
                />
                <select
                    onChange={handleChange}
                    name="category"
                    required
                >
                    <option value="" hidden>
                        Categoría
                    </option>
                    <option value="Caridad">Caridad</option>
                    <option value="Servicios">Servicios</option>
                    <option value="Participación">Participación</option>
                    <option value="Empoderamiento">Empoderamiento</option>
                </select>
                <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3">
                    <input
                        onChange={handleChange}
                        name="facebook"
                        type="url"
                        placeholder="URL Facebook"
                        className="w-full md:w-3/6"
                    />
                    <input
                        onChange={handleChange}
                        name="instagram"
                        type="url"
                        placeholder="URL Instagram"
                        className="w-full md:w-3/6"
                    />
                </div>
                <div className="input-group flex flex-col md:flex-row justify-between items-center gap-3">
                    <input
                        onChange={handleChange}
                        name="website"
                        type="url"
                        placeholder="Sitio Web"
                        className="w-full md:w-3/6"
                    />
                    <input
                        onChange={handleChange}
                        name="telephone"
                        type="tel"
                        placeholder="Teléfono*"
                        required
                        className="w-full md:w-3/6"
                    />
                </div>
                <textarea
                    onChange={handleChange}
                    name="description"
                    rows="3"
                    required
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