import Link from "next/link"
import TournamentService from "../TournamentService"

const getTorneos = async ()=> {
    try {
        const tournaments = await TournamentService.getTournaments()
        await new Promise(resolve => setTimeout(resolve, 5000))
        return tournaments.filter((tournament) => !tournament.hidden)
    } catch (error) {
        console.error(error)
        return []
    }
}

export async function ListOfTournaments() {
    const tournaments = await getTorneos()
    return (
        <ul>
            {tournaments.map((tournament) => (
                <li key={tournament.id}>
                    <Link href={`/torneos/${tournament.slug}`} className="text-ot-orange">{tournament.name}</Link>
                </li>
            ))}
        </ul>
    )
}
