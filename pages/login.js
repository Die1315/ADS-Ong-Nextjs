import { useState } from "react";
import axios from "axios"
import { useRouter } from "next/router";
import Footer from "/components/footer/footer";

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
        <div className="h-screen flex flex-row items-stretch columns-2">
            <div className="login-hero relative w-3/6 flex justify-center items-center bg-accent">

            </div>
            <div className="relative h-full w-3/6 flex flex-col justify-center items-center">
                <h1 className="text-secondary text-4xl font-bold">LOREM IPSUM</h1>
                <p className="w-3/6 my-5 text-center mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                <form onSubmit={handleSubmit} className="w-3/6 flex flex-col gap-5">
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
