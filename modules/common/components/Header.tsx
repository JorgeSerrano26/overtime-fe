import TournamentService from "@/modules/tournament/TournamentService";
import Link from "next/link";
import { NavItem, Tournament } from "../types";
import { RecursiveNavItem } from "./RecursiveNavItem";

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
            href: `/torneos/${tournament.slug}/${category.slug}`,
            subMenu: category.zones.filter((zone) => !zone.hidden).map((zone) => ({
                id: zone.id,
                name: zone.name,
                href: `/torneos/${tournament.slug}/${category.slug}/${zone.slug}`,
            }))
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

export const Header = async () => {
    const torneos = await getTorneos()

    navItem.find((item) => item.id === "torneos")!.subMenu = torneos

    return (
        <header className="bg-black text-white p-4">
            <div className="flex justify-between items-center">
                <div>
                    <img src="/overtime_logo.png" alt="Overtime Logo" className="h-10" />
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        {navItem.map((item) => (
                            <RecursiveNavItem key={item.id} item={item} />
                        ))}
                    </ul>
                </nav>
                <div>
                    <button>Sign In</button>
                </div>
            </div>
        </header>
    )
}