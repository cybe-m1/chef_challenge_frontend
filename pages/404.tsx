import { NextPage } from "next";
import Link from 'next/link'
import Image from 'next/image'

const Notfound: NextPage = () => {
    return (
        <div className="md:w-1/2 max-w-sm md:m-auto absolute md:inset-60 text-center">
            <h1>OH JINKIES !!!</h1>
            <Link href={"/"}>
                <a className="typoColor">Retourner à la page principale</a>
            </Link>
            <Link href={"/"}>
                <Image
                    src="/scooby.gif"
                    alt="Landscape picture"
                    className="object-contain"
                    width={400}
                    height={500}
                />
            </Link>
        </div>
    )
}

export default Notfound