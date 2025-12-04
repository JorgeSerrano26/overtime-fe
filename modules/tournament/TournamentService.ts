import { client } from "../common/client/baseClient"
import { Service } from "../common/services/Service"
import { Tournament } from "../common/types"


class TournamentService extends Service {
    async getTournaments() {
        const { data } = await this.client.get<Tournament[]>("/tournaments")
        return data
    }
}

export default new TournamentService(client)
