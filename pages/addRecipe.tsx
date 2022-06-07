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
        "http://localhost:9998/user/" + pars
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


const AddRecipePage: NextPage = ({ user, error } : any) => {
    const router = useRouter()

    const [recipe, setRecipe] = useState({
        url: "",
        name: ""
    })

    const addRecipe : React.FormEventHandler<HTMLFormElement> = async (event) =>  {
        event.preventDefault()
        const form = recipe
        
        const endpoint = "http://localhost:9998/recipe"

        try {
            const data = await axios.post(endpoint, form)
            if(data.status === 200) {
                router.push('/receipes')
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    if (user != '') {
      return (
        <div className="xl:h-full flex flex-col md:w-1/2 md:m-auto md:inset-60">
            <form className="bg-white shadow-md rounded mt-12 md:mt-0 px-7 pt-6 pb-8 mb-4" onSubmit={addRecipe}>
                <h1>Formulaire d&apos;ajout d&apos;une recette</h1>
                <div className="mb-4 mt-5">
                    <label htmlFor="url" className="block typoColor text-sm font-bold mb-2">
                      Url de votre image
                    </label>
                    <input id="url" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 typoColor leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="url de l'image de votre recette"
                        value={recipe.url}
                        onChange={event => setRecipe({...recipe, url : event.target.value})}
                        required />
                </div>
                <div className="mb-4 mt-5">
                    <label htmlFor="name" className="block typoColor text-sm font-bold mb-2">
                        Nom de la recette
                    </label>
                    <input id="name" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 typoColor leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Nom de l'ingrédient"
                        value={recipe.name}
                        onChange={event => setRecipe({...recipe, name : event.target.value})}
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
          Veuillez aller vous connectez
        </div>
      )
    }
}

export default AddRecipePage