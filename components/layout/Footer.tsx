import type { NextPage } from 'next'

const Footer : NextPage = () => {
    return (
        <footer className='backgroundChef pb-2 text-white'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 text-center">
                    2022 © Anatole de Chauvron & Tristan Six
                    </div>
                    <div className="col-md-6">
                        <div className="flex flex-row text-center justify-evenly">
                            <a href="">A propos de nous</a>
                            <a href="">Aide</a>
                            <a href="">Nous contacter</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;