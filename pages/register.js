import { useState } from "react";
import { useRouter } from "next/router";
import { register, uploadCloudinary } from "../service/data-service";
import Image from "next/image";
import Link from "next/link";

const logo = require("../src/images/logo.svg");

function addOng() {
  const [error, setError] = useState();
  const router = useRouter();
  const [dataRegister, setDataRegister] = useState();

  // Cloudinary
  const [uploadFile, setUploadFile] = useState("");

  const handleChange = (event) => {

    setDataRegister({
      ...dataRegister,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (dataRegister.password === dataRegister.passwordConfirmation) {


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

    } else {
      setError("Las contraseñas no coinciden.")
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row justify-center items-stretch columns-1 md:columns-2 py-5 md:py-0 bg-register-hero bg-cover bg-center md:bg-white">
      <div className="static md:relative py-14 overflow-auto bg-white h-auto w-11/12 md:w-3/6 flex mx-auto flex-col justify-start items-center rounded-md md:rounded-none">
        <Link href="/login"><Image src={logo} alt="logo Help Go" width="200" /></Link>
        <p className="w-5/6 md:w-4/6 my-5 text-center mx-auto">
          Registra tu ONG y ponte en contacto con la ayuda
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-5/6 md:w-4/6 flex flex-col justify-center items-stretch gap-5"
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
              className="w-full md:w-3/6"
            />
          </div>
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
          <input
            onChange={handleChange}
            name="CIF"
            type="number"
            placeholder="CIF ONG*"
            required
          />
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
                    htmlFor="image"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary"
                  >
                    <span>Upload a file</span>
                    <input
                      id="image"
                      name="image"
                      type="file"
                      className="sr-only"
                      onChange={(event) => { setUploadFile(event.target.files[0]); }}
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
            Registrar ONG
          </button>
          <Link href="/login" className="btn text-center">Iniciar sesión</Link>
        </form>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      <div className="bg-register-hero bg-cover bg-no-repeat bg-center relative w-full md:w-3/6 flex justify-center items-center bg-accent"></div>
    </div>
  );
}

export default addOng;
