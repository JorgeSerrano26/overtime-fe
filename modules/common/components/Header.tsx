import TournamentService from "@/modules/tournament/TournamentService";
import Link from "next/link";
import { NavItem, Tournament } from "../types";
import { RecursiveNavItem } from "./RecursiveNavItem";
import Image from "next/image";

const navItem: NavItem[] = [
    { id: "inicio", name: "inicio", href: "/" },
    { id: "torneos", name: "torneos", href: "/torneos" },
    { id: "amistosos", name: "amistosos", href: "/amistosos" },
    { id: "galeria", name: "galeria", href: "/galeria" },
    { id: "contacto", name: "contacto", href: "/contacto" },
    { id: "inscripciones", name: "inscripciones", href: "/inscripciones" }
]

const tournamentsToNavItems = (tournaments: Tournament[]): NavItem[] => {
    return tournaments.filter((tournament) => !tournament.hidden).map((tournament) => ({
        id: tournament.id,
        name: tournament.name,
        href: `/torneos/${tournament.slug}`,
        subMenu: tournament.categories.filter((category) => !category.hidden).map((category) => ({
            id: category.id,
            name: category.name,
            href: `/torneos/${tournament.slug}/${category.slug}`
        }))
    }))
}

const getTorneos = async (): Promise<NavItem[]> => {
    try {
        const tournaments = await TournamentService.getTournaments()
        return tournamentsToNavItems(tournaments)
    } catch (error) {
        console.error(error)
        return []
    }
}

const socialLinks = [
    {
        href: "https://tiktok.com",
        src: "/social/tiktok.png",
        alt: "tiktok"
    },
    {
        href: "https://www.youtube.com/@mediaovertime",
        src: "/social/youtube.png",
        alt: "youtube"
    },
    {
        href: "https://www.instagram.com/overtime.basquet/?hl=es",
        src: "/social/instagram.png",
        alt: "instagram"
    }
]

export const Header = async () => {
    const torneos = await getTorneos()

    navItem.find((item) => item.id === "torneos")!.subMenu = torneos

    return (
        <header className="text-white p-4">
            <nav className="flex max-w-8xl w-full justify-evenly m-auto items-center h-full ">
                <div>
                    <Image src="/overtime_logo.png" alt="Overtime Logo" width={58} height={31} />
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        {navItem.map((item) => (
                            <RecursiveNavItem key={item.id} item={item} />
                        ))}
                    </ul>
                </nav>
                <div>
                    <div className="flex items-center justify-evenly gap-3">
                        {socialLinks.map((link) => (
                            <Link href={link.href} target="_blank" key={link.alt}>
                                <Image
                                    src={link.src}
                                    alt={link.alt}
                                    width={27}
                                    height={27}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    )
}