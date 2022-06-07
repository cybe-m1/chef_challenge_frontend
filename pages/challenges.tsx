import { NextPage } from "next";
import  axios  from "axios"

export async function getStaticProps() {
    try {
        const resp = await axios.get(
            process.env.NEXT_PUBLIC_BACKEND_URL + "/challenge"
        );
  
        return {
          props: {
            Challenges: await resp.data,
            error: false
          },
        };
    } catch (error) {
        return {
          props: {
            Challenges: '',
            error: true
          },
        };
    }
}

const ChallengesPage: NextPage = ({ Challenges, error } : any) => {
    if(!error) {
        return (
        <div>
            <h2>Liste des challenges</h2>
            <div className="flex flex-wrap">
                {Challenges.map((Challenge: any) => (
                    <div className="m-2" key={Challenge.id_challenge}>
                        <h3>{Challenge.name}</h3>
                    </div>
                ))}
            </div>
        </div>
        )
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

export default ChallengesPage