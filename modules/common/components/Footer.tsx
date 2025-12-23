import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
    return (
        <footer className="bg-newbox h-28 bg-ot-dark-blue text-white">
            <div className="h-full mx-auto flex max-w-3xl">
                <Link
                    className="flex justify-evenly items-center h-full w-1/3 mb-0.5"
                    href="#"
                    target="_blank"
                >
                    <p>Web by Someone</p>
                </Link>
                <div className="flex justify-center items-center h-full w-1/3 cursor-default">
                    <div className="flex flex-col sm:flex-row gap-2 items-center">
                        <Image
                            src="/overtime_logo.png"
                            className="h-8"
                            alt="logo"
                            width={41}
                            height={31}
                        />
                        <p className="font-din-display font-bold uppercase text-blanco text-center text-xs sm:text-sm">
                            Overtime 2023 - {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
                <div className="flex justify-center items-center h-full w-1/3 cursor-default ">
                    <p className="font-din-display text-blanco text-center text-xs sm:text-sm md:text-md sm:text-start">
                        Todos los derechos reservados
                    </p>
                </div>
            </div>
        </footer>
    )
}