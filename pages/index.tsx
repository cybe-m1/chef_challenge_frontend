import type { NextPage } from 'next'
import Cookie from "js-cookie"
import cookie from "cookie"
import  axios  from "axios"
import Link from 'next/link'

export async function getServerSideProps({req}: any) {
  const getCookie = cookie.parse(req.headers.cookie)
    if(getCookie.user.length > 2) {
      let pars = JSON.parse(getCookie.user)
      pars = JSON.parse(pars)
      
      try {
        const resp = await axios.get(
          "http://localhost:9998/user/" + pars
        );

        const recipeOfTheDay = await axios.get(
          "http://localhost:9998/recipe/1"
        );

        const Recipes = await axios.get(
          "http://localhost:9998/recipe"
        );
  
        return {
          props: {
            user: await resp.data,
            recipeOfTheDay: await recipeOfTheDay.data,
            Recipes: await Recipes.data,
            error: false
          },
        };
      } catch (error) {
        return {
          props: {
            user: '',
            recipeOfTheDay: '',
            Recipes: '',
            error: true
          },
        };
      }  
    } else {
      Cookie.set("user", "{}")
      try {
        const recipeOfTheDay = await axios.get(
          "http://localhost:9998/recipe/1"
        );

        const Recipes = await axios.get(
          "http://localhost:9998/recipe"
        );
  
        return {
          props: {
            user: '',
            recipeOfTheDay: await recipeOfTheDay.data,
            Recipes: await Recipes.data,
            error: false
          },
        };
      } catch (error) {
        return {
          props: {
            user: '',
            recipeOfTheDay: '',
            Recipes: '',
            error: true
          },
        };
      }  
    }
  }

const Home: NextPage = ({ user, recipeOfTheDay, Recipes, error } : any) => {
  return (
    <div className='flex flex-row justify-around flex-grow'>
      <div className='flex flex-col w-2/5'>
        <h1 className='font-bold'>Des recettes qui pourraient vous plaire :</h1>
        {Recipes.slice(2,4).map((Recipe: any) => (
          <Link key={Recipe.id_recipe} href={{ pathname: '/recipe', query: { keyword: Recipe.id_recipe } }}>
            <a>
              <div className="text-center">
                <img
                  className="object-contain"
                  src={`${Recipe.url}`}
                  alt={Recipe.name}
                />
                <h3>{Recipe.name}</h3>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <div className='flex flex-col w-2/5'>
        <div className="text-center">
            <h1 className='font-bold'>Recette du jour :</h1>
            <Link href={{ pathname: '/recipe', query: { keyword: recipeOfTheDay.id_recipe } }}>
              <a>
                <img
                  className="object-contain h-78"
                  src={`${recipeOfTheDay.url}`}
                  alt={recipeOfTheDay.name}
                />
                <h3>{recipeOfTheDay.name}</h3>
              </a>
            </Link>
          </div>
      </div>
    </div>
  )
}

export default Home;
