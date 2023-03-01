
function addOng() {

    return (

        <div className="h-screen flex flex-col md:flex-row justify-center items-stretch columns-1 md:columns-2  bg-sm-register">
            <div className="static md:relative h-max py-8 bg-white md:h-full w-11/12 md:w-3/6 flex mx-auto flex-col justify-center items-center rounded-md md:rounded-none">
                <h1 className="text-secondary text-4xl font-bold">LOREM IPSUM</h1>
                <p className="w-5/6 md:w-4/6 lg:w-3/6 my-5 text-center mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <form className="w-5/6 md:w-4/6 lg:w-3/6 flex flex-col justify-center items-stretch gap-5">
                    <input name="nombre" type="text" placeholder="Nombre ONG*" required />
                    <input name="email" type="email" placeholder="Email ONG*" required />
                    <input name="dni" type="number" placeholder="DNI ONG*" required />
                    <textarea name="description" rows="3" placeholder="Descripción" />
                    <input name="password" type="password" placeholder="Contraseña" />
                    <button type="submit" className="btn mt-5">Registrar ONG</button>
                </form>
            </div>
            <div className="register-hero relative w-full md:w-3/6 flex justify-center items-center bg-accent">
            </div>
        </div>
    )
}

export default addOng