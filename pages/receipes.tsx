import { NextPage } from "next";
import  axios  from "axios"

export async function getStaticProps() {
    const resp = await axios.get(
      "http://localhost:8084/recipe"
    );

    return {
      props: {
        Recettes: await resp.data,
      },
    };
  }

const ReceipesPage: NextPage = ({ Recettes } : any) => {
    return (
        <div>
            <h2>Liste des recettes</h2>
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

export default ReceipesPage