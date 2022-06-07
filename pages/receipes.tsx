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
          process.env.NEXT_PUBLIC_BACKEND_URL + "/user/" + pars
        );
  
        const recipes = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/recipe"
        );
        return {
          props: {
            user: await resp.data,
            Recettes: await recipes.data,
            error: false
          },
        };
      } catch (error) {
        return {
          props: {
            user: '',
            Recettes: '',
            error: true
          },
        };
      }

      
      
    } else {
      try {
        const recipes = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/recipe"
        );
        return {
          props: {
            user: '',
            Recettes: await recipes.data,
            error: false
          },
        };
      } catch (error) {
        return {
          props: {
            user: '',
            Recettes: '',
            error: false
          },
        };
      }
    }
  }

const ReceipesPage: NextPage = ({ user, Recettes, error } : any) => {
  const router = useRouter()

  if(!error) {
    if(user) {
      return (
        <div className="flex flex-col">  
            <div className="flex flex-row items-center justify-between mb-5">
              <h2>Liste des recettes</h2>
              <button className=" m-auto backgroundChefButton text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => router.push('/addRecipe')}>
                Ajouter une recette
              </button>
            </div>
            <div className="flex flex-wrap">
                {Recettes.map((Recette: any) => (
                    <div className="m-2" key={Recette.id}>
                        <h3>{Recette.name}</h3>
                    </div>
                ))}
            </div>
        </div>
      )
    } else {
      return (
        <div className="flex flex-col">  
            <div className="flex flex-row items-center justify-between mb-5">
              <h2>Liste des recettes</h2>
            </div>
            <div className="flex flex-wrap">
                {Recettes.map((Recette: any) => (
                    <div className="m-2" key={Recette.id}>
                        <h3>{Recette.name}</h3>
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

export default ReceipesPage