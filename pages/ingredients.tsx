import { NextPage } from "next";
import Image from 'next/image'
import  axios  from "axios"

export async function getStaticProps() {
    const resp = await axios.get(
      "http://localhost:8083/ingredient"
    );
  
    return {
      props: {
        Ingredients: await resp.data,
      },
    };
  }


const IngredientsPage: NextPage = ({ Ingredients } : any) => {
    return (
        <div>
            <h2>Liste des ingrédient</h2>
            <div className="flex flex-wrap">
                {Ingredients.map((Ingredient: any) => (
                <div key={Ingredient.id}>
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

export default IngredientsPage