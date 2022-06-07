import { NextPage } from "next";
import  axios  from "axios"
import { useRouter } from 'next/router'
import { useState } from "react";
import cookie from "cookie"

export async function getServerSideProps({req}: any) {
    const getCookie = cookie.parse(req.headers.cookie)
    if(getCookie.user.length > 2) {
      let pars = JSON.parse(getCookie.user)
      pars = JSON.parse(pars)

      const resp = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/user/" + pars
      );

      return {
        props: {
          user: await resp.data,
        },
      };
    } else {
      return {
        props: {
          user: '',
        },
      };
    }
}


const AddIngredientsPage: NextPage = ({ user, error } : any) => {
    const router = useRouter()

    const [ingredient, setIngredient] = useState({
        name: "",
        url: ""
    })

    const addIngredient : React.FormEventHandler<HTMLFormElement> = async (event) =>  {
        event.preventDefault()
        const form = ingredient
        
        const endpoint = process.env.NEXT_PUBLIC_BACKEND_URL + "/ingredient"

        try {
            const data = await axios.post(endpoint, form)
            if(data.status === 200) {
                router.push('/ingredients')
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    if (user != '') {
      return (
        <div className="xl:h-full flex flex-col md:w-1/2 md:m-auto md:inset-60">
            <form className="bg-white shadow-md rounded mt-12 md:mt-0 px-7 pt-6 pb-8 mb-4" onSubmit={addIngredient}>
                <h1>Formulaire d&apos;ajout d&apos;ingredient</h1>
                <div className="mb-4 mt-5">
                    <label htmlFor="url" className="block typoColor text-sm font-bold mb-2">
                        Url de l&apos;image souhaiter pour l&apos;ingrédient
                    </label>
                    <input id="url" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 typoColor leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="url"
                        value={ingredient.url}
                        onChange={event => setIngredient({...ingredient, url : event.target.value})}
                        required />
                </div>
                <div className="mb-4 mt-5">
                    <label htmlFor="name" className="block typoColor text-sm font-bold mb-2">
                        Nom de l&apos;ingrédient
                    </label>
                    <input id="name" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 typoColor leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Nom de l'ingrédient"
                        value={ingredient.name}
                        onChange={event => setIngredient({...ingredient, name : event.target.value})}
                        required />
                </div>
                <div className="flex items-center justify-between mt-3">
                    <button className=" m-auto backgroundChefButton text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Ajouter
                    </button>
                </div>
            </form>
        </div>
      )
    } else {
      return (
        <div>
          Merci de vous reconnecter.
        </div>
      )
    }
}

export default AddIngredientsPage