import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from 'next/router'
import  axios  from "axios"

type State = {
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    email: string;
    wrong: boolean;
};

const RegisterPage: NextPage = () => {
    const router = useRouter()

    const [state, setState] = useState({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
        wrong: false
    })

    const register : React.FormEventHandler<HTMLFormElement> = async (event) =>  {
        event.preventDefault()
        console.log(state)
        const form = {
            pseudo: state.username,
            password: state.password,
            first_name: state.firstname,
            last_name: state.lastname,
            email: state.email,
        }
        
        const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL + "/user"

        try {
            const data = await axios.post(endpoint, form)
            console.log(data)
            localStorage.setItem('user', JSON.stringify(data.data));
            if(data.status === 200) {
                router.push('/login')
            }
        } catch (error) {
            setState({...state, wrong : true})
            let contenuPage = document.getElementById('error');
            const contenu : string = '<p class="text-red-500 text-xs italic">Il manque des éléments !</p>'
            contenuPage!.innerHTML = contenu
        }
        
    }

    return (
        <div className="md:w-1/2 max-w-sm md:m-auto absolute md:inset-60">
            <form className="bg-white shadow-md rounded mt-12 md:mt-0 px-7 pt-6 pb-8 mb-4" onSubmit={register}>
                <h3 className="text-blue text-center mb-4 mt-0">
                    Formulaire de création de profile
                </h3>
                <div className="mb-4">
                    <label htmlFor="username" className="block typoColor text-sm font-bold mb-2">
                        Identifiant
                    </label>
                    <input id="username" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 typoColor leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Identifiant"
                        value={state.username}
                        onChange={event => setState({...state, username : event.target.value})}
                        required />
                </div>
                <div className="mb-4">
                    <label className="block typoColor text-sm font-bold mb-2" htmlFor="firstname">
                        Prénom :
                    </label>
                    <input id="firstname" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 typoColor leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        value={state.firstname}
                        onChange={event => setState({...state, firstname : event.target.value})}
                        placeholder="Prénom de l'utilisateur"/>
                </div>
                <div className="mb-4">
                    <label className="block typoColor text-sm font-bold mb-2" htmlFor="lastname">
                        Nom :
                    </label>
                    <input id="lastname" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 typoColor leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        value={state.lastname}
                        onChange={event => setState({...state, lastname : event.target.value})}
                        placeholder="Nom de l'utilisateur"/>
                </div>
                <div className="mb-4">
                    <label className="block typoColor text-sm font-bold mb-2" htmlFor="email">
                        Email : 
                    </label>
                    <input id="email" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 typoColor leading-tight focus:outline-none focus:shadow-outline" 
                        type="text"
                        value={state.email}
                        onChange={event => setState({...state, email : event.target.value})} 
                        placeholder="Votre email"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block typoColor text-sm font-bold mb-2">
                        Mot de passe
                    </label>
                    <input id="password" 
                        className='shadow appearance-none border rounded w-full py-2 px-3 typoColor mb-3 leading-tight focus:outline-none focus:shadow-outline' 
                        type="password" 
                        placeholder="******************"
                        value={state.password}
                        onChange={event => setState({...state, password : event.target.value})}
                        required />
                </div>
                <div id="error"></div>
                <div className="text-center">
                    <button className="backgroundChefButton text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Création du compte
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage