import { Band } from "../entites/Bands";
import { BaseDatabase } from "./BaseDataBase";

export class BandDataBase extends BaseDatabase {

    public createBand = async (band: Band) => {

        try {
            await BaseDatabase.connection ('NOME_TABELA_BANDAS')
            .insert ({
                id: band.getId(),
                name: band.getName(),
                music_genre: band.getMusic_genre(),
                responsible: band.getResponsible()
            })

        } catch (error: any) {
            throw new Error (error.sqlMessage || error.message)
        }
    }

    public getBandDataBase = async (id: string) : Promise <Band> => {

        try {

            const detailband = await BandDataBase.connection('NOME_TABELA_BANDAS')
            .select()
            .where({id})
            return detailband[0]

        } catch (error:any) {
            throw new Error (error.sqlMessage || error.message)
        }
    }

    public verifyId = async (id: string) : Promise <Band> => {

        try {

            const result = await BaseDatabase.connection('NOME_TABELA_BANDAS')
            .select()
            .where({id})
            return result[0]
            
        } catch (error: any) {
            throw new Error (error.sqlMessage || error.message)
        }
    }
}