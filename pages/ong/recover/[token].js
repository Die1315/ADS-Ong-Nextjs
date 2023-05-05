
function RecoveryForm(){
    const [email, setEmail] = useState()

    const handleSubmit = () => {
        
    }
    const handleChange = (event) => {
        setEmail({
            [event.target.name]: event.target.value,
        });
    }

    return (
        <>
            <div className="static md:relative h-6/6 py-8 bg-white md:h-full w-11/12 md:w-3/6 flex mx-auto flex-col justify-center items-center rounded-md md:rounded-none">
                <Link href={`/login`}>
                    <Image
                        src={logo}
                        alt='logo'
                        width={`150`}
                        height={100} />
                </Link>
                <div className="w-11/12 md:w-6/12 flex flex-col gap-3">
                    <h1 className='text-center text-4xl font-bold'>Recupera tu contraseña</h1>
                    <p className='text-center mb-3'>Ingresa tu correo electrónico:</p>
                    <form onSubmit={handleSubmit} className='w-full flex flex-col justify-center gap-3'>
                        {<input
                            type="email"
                            placeholder="correo electrónico"
                            className='w-full'
                            required
                            onChange={handleChange}
                        ></input>}
                        <button type='submit' className='w-full mx-auto uppercase bg-primary rounded-md px-6 py-2 font-bold text-white hover:bg-dark'>Enviar</button>
                    </form>
                    <button onClick={toggleForm} className="btn-alt">Iniciar Sesión</button>
                </div>
            </div>

        </>)

}

export default RecoveryForm;