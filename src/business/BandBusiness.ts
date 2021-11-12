import { Authenticator } from "../service/Authenticator"
import { IdGenerator } from "../service/IdGenerator"
import { Band } from "../entites/Bands"
import { BandDataBase } from "../data/BandDataBase"

export class BandBusiness {

    constructor (

        private bandDataBase: BandDataBase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) {}

    public BandController = (input: any) => {

        const {name, music_genre, responsible, token} = input

        if (!name || !music_genre || !responsible) {
            throw new Error ("Digite corretamente as credenciais 'nome da banda', 'gênero musical' e 'responsavel'.")
        }

        if (!token) {
            throw new Error ("É necessário passar o token no headers da requisição.")
        }

        const tokenData = this.authenticator.getTokenData(token)

        if (tokenData.role !== "ADMIN") {
            throw new Error ("Apenas adminstradores podem adicionar uma banda")
        }

        const id = this.idGenerator.generate()

        const createBand = new Band (id, name, music_genre, responsible)
        const newBand = this.bandDataBase.createBand (createBand)

        return createBand
    }

    public getBandController = async (input: any) => {

        const {id, token} = input

        const verifyId = await this.bandDataBase.verifyId(id)

        if (!verifyId) {
            throw new Error ("id inválido")
        }

        if (!token) {
            throw new Error ("É necessário passar o token no headers da requisição.")
        }

        const tokenData = this.authenticator.getTokenData(token)

        const result = await this.bandDataBase.getBandDataBase(id)
        
        return result

    }
}