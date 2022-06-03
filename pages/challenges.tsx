import { NextPage } from "next";
import  axios  from "axios"

export async function getStaticProps() {
    const resp = await axios.get(
      "http://localhost:8085/challenge"
    );

    return {
      props: {
        Challenges: await resp.data,
      },
    };
}

const ChallengesPage: NextPage = ({ Challenges } : any) => {
    return (
        <div>
            <h2>Liste des challenges</h2>
            <div className="flex flex-wrap">
                {Challenges.map((Challenge: any) => (
                    <div className="m-2" key={Challenge.id}>
                        <h3>{Challenge.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChallengesPage