import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Loading from "../../../components/Loading/loading";
import { useCurrentState } from "@nextui-org/react";
import { passwordUpdate } from "../../../service/data-service";

const logo = require("../../../src/images/logo.svg");

function RecoveryForm() {
  const router = useRouter();
  const { token } = router.query;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useCurrentState();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();

    if (data.password === data.passwordConfirmation) {
      passwordUpdate(data).then((response) => {
        if (response.code === "ERR_BAD_REQUEST") {
          setError(
            response.response.data.message || response.response.data.error
          );
        } else {
          router.push("/login");
        }
      });
    } else {
      setError("Las contraseñas no coinciden.");
    }
  };
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
      token: token,
    });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative h-screen flex flex-col md:flex-row justify-center items-stretch columns-1 md:columns-2  bg-login-hero bg-cover bg-center md:bg-white">
          <div className="bg-recover bg-cover bg-no-repeat bg-center lg:bg-top-lg xl:bg-top-xl relative w-full md:w-3/6 flex justify-center items-center bg-accent"></div>
          <div className="static md:relative h-6/6 py-8 bg-white md:h-full w-11/12 md:w-3/6 flex mx-auto flex-col justify-center items-center rounded-md md:rounded-none">
            <Link href={`/login`}>
              <Image src={logo} alt="logo" width={`150`} height={100} />
            </Link>
            <div className="w-11/12 md:w-6/12 flex flex-col gap-3">
              <h1 className="text-center text-4xl font-bold">
                Recupera tu contraseña
              </h1>
              <p className="text-center mb-3">Digita nueva contraseña:</p>
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col justify-center gap-3"
              >
                <input
                  type="password"
                  name="password"
                  placeholder="Constraseña"
                  className="w-full"
                  required
                  onChange={handleChange}
                ></input>
                <input
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirmar contraseña"
                  className="w-full"
                  required
                  onChange={handleChange}
                ></input>
                <button
                  type="submit"
                  className="w-48 mx-auto bg-primary rounded-md px-6 py-2 font-bold text-white hover:bg-dark"
                >
                  Enviar
                </button>
              </form>
              {error && (
                <div className="alert alert-danger w-full bg-dark text-secondary text-lg text-center">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RecoveryForm;
