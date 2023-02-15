import { useState } from "react";
import axios from "axios"
import { useRouter } from "next/router";
import Footer from "/components/loginFooter/loginFooter";

function LoginPage() {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const router = useRouter()
    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/login', {
            credentials
        }).then((response) => {


            router.push("/dashboard")
            console.log(response)
        })
            .catch((err) => console.log(err.toJSON()));
        console.log(credentials)
    }
    return (
        <div className="h-screen flex flex-col md:flex-row justify-center items-stretch columns-1 md:columns-2  bg-sm-login">
            <div className="login-hero relative w-full md:w-3/6 flex justify-center items-center bg-accent">
            </div>
            <div className="static md:relative h-3/6 bg-white md:h-full w-11/12 md:w-3/6 flex mx-auto flex-col justify-center items-center rounded-md md:rounded-none">
                <h1 className="text-secondary text-4xl font-bold">LOREM IPSUM</h1>
                <p className="w-5/6 md:w-4/6 lg:w-3/6 my-5 text-center mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <form onSubmit={handleSubmit} className="w-5/6 md:w-4/6 lg:w-3/6 flex flex-col justify-center items-stretch gap-5">
                    <input name="email" type="email" placeholder="email"
                        onChange={handleChange} />
                    <input name="password" type="password" placeholder="password"
                        onChange={handleChange} />
                    <button type="submit" className="btn">Login</button>
                </form>
                <Footer />
            </div>
        </div>
    )
}

export default LoginPage;
