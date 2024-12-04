import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logoGym from '@/resources/images/logo-gym.png'

const Navbar = () => {
    return (
        <nav className="navbar bg-dark border-bottom border-body navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Image
                    src={logoGym}
                    width={50}
                    height={50}
                    alt="Picture of the author"
                />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <Link href='/'>
                            <li className="nav-item">
                                <p className="nav-link active" aria-current="page">Inicio</p>
                            </li>
                        </Link>
                        <Link href='/inscriptos' replace>
                            <li className="nav-item">
                                <p className="nav-link">Inscriptos</p>
                            </li>
                        </Link>
                        <Link href='/inscriptos/nuevo' replace>
                            <li className="nav-item">
                                <p className="nav-link">Nuevo</p>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
