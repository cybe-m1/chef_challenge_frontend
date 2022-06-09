import { NextPage } from "next";
import  axios  from "axios"
import { useRouter } from 'next/router'
import { useState } from "react";
import cookie from "cookie"

export async function getServerSideProps({req, query}: any) {
    const getCookie = cookie.parse(req.headers.cookie)
    if(getCookie.user.length > 2) {
      let pars = JSON.parse(getCookie.user)
      pars = JSON.parse(pars)

      const resp = await axios.get(
        "http://localhost:9998/user/" + pars
      );

      const ingredient = await axios.get(
        "http://localhost:9998/stock/particularStock/" + query.keyword
      );

      return {
        props: {
          user: await resp.data,
          ingredient: await ingredient.data
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


const IngredientPage: NextPage = ({ user, ingredient, error } : any) => {
    const router = useRouter()

    const [ingredientForm, setIngredientForm] = useState({
        id_user: ingredient.id_user,
        id_ingredient: ingredient.id_ingredient,
        id_stock: ingredient.id_stock,
        name: ingredient.name,
        url: ingredient.url,
        quantity: ingredient.quantity
    })

    const putIngredient : React.FormEventHandler<HTMLFormElement> = async (event) =>  {
        event.preventDefault()
        const form = ingredientForm
        
        const endpoint = "http://localhost:9998/stock"

        try {
            const data = await axios.put(endpoint, form)
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
            <form className="bg-white shadow-md rounded mt-12 md:mt-0 px-7 pt-6 pb-8 mb-4" onSubmit={putIngredient}>
                <h1 className="text-center">Modification d&apos;un ingrédient</h1>
                <div className="mb-4 mt-5">
                    <label htmlFor="name" className="block typoColor text-sm font-bold mb-2">
                        Nom de l&apos;ingrédient
                    </label>
                    <input id="name" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 typoColor leading-tight focus:outline-none focus:shadow-outline" 
                        type="text" 
                        placeholder="Nom de l'ingrédient"
                        value={ingredientForm.name}
                        onChange={event => setIngredientForm({...ingredientForm, name : event.target.value})}
                        required />
                </div>
                <div className="mb-4 mt-5">
                    <label htmlFor="quantity" className="block typoColor text-sm font-bold mb-2">
                        Quantité
                    </label>
                    <input id="quantity" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 typoColor leading-tight focus:outline-none focus:shadow-outline" 
                        type="number" 
                        placeholder="Quantité en possesion"
                        value={ingredientForm.quantity}
                        onChange={event => setIngredientForm({...ingredientForm, quantity : Number(event.target.value)})}
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
          Merci de vous connectez.
        </div>
      )
    }
}

export default IngredientPage