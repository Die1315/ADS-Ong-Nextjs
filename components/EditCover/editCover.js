import { useState } from "react";

function EditCover() {// Cloudinary
    const [uploadFile, setUploadFile] = useState("");
    const [preview, setPreview] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", uploadFile);
        formData.append("upload_preset", "ovclfrex");

        uploadCloudinary(formData)
            .then((response) => {
                register({ ...dataRegister, image: response.data.secure_url })
                    .then((response) => {
                        if (response.code === "ERR_BAD_REQUEST") {
                            setError(response.response.data.message);
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
    };

    return (
        <div className="w-full bg-white rounded-md flex flex-col gap-5 items-stretch p-4 border border-gray-200">
            <form
                onSubmit={handleSubmit}>
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
                        (1250x500) / PNG, JPG, SVG 
                        </p>
                    </div>
                </div>
                <button type="submit" className="btn mt-5">
                    Actualizar Portada
                </button>
            </form>

        </div>
    )
}

export default EditCover