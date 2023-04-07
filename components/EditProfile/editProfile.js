import RegisterForm from "../RegisterForm/registerForm"

function EditProfile() {
    return (
        <div className="w-full bg-white rounded-md flex flex-col gap-5 items-stretch p-4 border border-gray-200">
            <h2 className="text-xl font-bold">Editar perfil</h2>
            <RegisterForm />
        </div>
    )
}

export default EditProfile