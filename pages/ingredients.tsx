import { NextPage } from "next";
import  axios  from "axios"
import { useRouter } from 'next/router'
import cookie from "cookie"

export async function getServerSideProps({req}: any) {
    const getCookie = cookie.parse(req.headers.cookie)
      if(getCookie.user.length > 2) {
        let pars = JSON.parse(getCookie.user)
        pars = JSON.parse(pars)
        
        try {
          const resp = await axios.get(
            "http://localhost:8082/user/" + pars
          );
    
          const recipes = await axios.get(
            "http://localhost:8083/ingredient"
          );
          return {
            props: {
              user: await resp.data,
              Ingredients: await recipes.data,
              error: false
            },
          };
        } catch (error) {
          return {
            props: {
              user: '',
              Ingredients: '',
              error: true
            },
          };
        }
  
        
        
      } else {
        try {
          const ingredient = await axios.get(
            "http://localhost:8083/ingredient"
          );
          return {
            props: {
              user: '',
              Ingredients: await ingredient.data,
              error: false
            },
          };
        } catch (error) {
          return {
            props: {
              user: '',
              Ingredients: '',
              error: false
            },
          };
        }
      }
    }


const IngredientsPage: NextPage = ({ user, Ingredients, error } : any) => {
  const router = useRouter()

    if(!error) {
      if(user) {
        return (
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between mb-5">
              <h2>Liste des ingrédient</h2>
              <button className=" m-auto backgroundChefButton text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => router.push('/addIngredient')}>
                Ajouter un ingredient
              </button>
            </div>
            <div className="flex flex-wrap">
                {Ingredients.map((Ingredient: any) => (
                <div className="text-center" key={Ingredient.id_challenge}>
                    <img
                        className="object-contain h-32 w-68"
                        src={`${Ingredient.url}`}
                        alt={Ingredient.name}
                    />
                    <h3>{Ingredient.name}</h3>
                </div>
                ))}
            </div>
          </div>
        )
      } else {
        return (
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between mb-5">
              <h2>Liste des ingrédient</h2>
            </div>
            <div className="flex flex-wrap">
                {Ingredients.map((Ingredient: any) => (
                <div className="text-center" key={Ingredient.id_challenge}>
                    <img
                        className="object-contain h-32 w-68"
                        src={`${Ingredient.url}`}
                        alt={Ingredient.name}
                    />
                    <h3>{Ingredient.name}</h3>
                </div>
                ))}
            </div>
          </div>
        )
      }
    } else {
      return (
        <div>
            <div className="flex flex-wrap">
                <h1>Ooops quelque chose c&apos;est mal passée !</h1>
            </div>
        </div>
      )
  }
}

export default IngredientsPage