import { client } from "../common/client/baseClient"
import { Service } from "../common/services/Service"
import { Category, Tournament } from "../common/types"


class TournamentService extends Service {
    async getTournaments() {
        const { data } = await this.client.get<Tournament[]>("/tournaments")
        return data
    }
    async getTournamentBySlug(slug: string) {
        const { data } = await this.client.get<Tournament>(`/tournaments/${slug}`)
        return data
    }
    async getCategoryBySlug(tournamentSlug: string, categorySlug: string) {
        const { data } = await this.client.get<Category>(`/tournaments/${tournamentSlug}/categories/${categorySlug}`)
        return data
    }
}

const tournamentService = new TournamentService(client)
export default tournamentService