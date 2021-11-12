import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";

export class BandController {

    constructor (

        private bandBusiness: BandBusiness

    ) {}

    public BandController = async (req: Request, res: Response) => {

        try {

            const token = req.headers.authorization
            const {name, music_genre, responsible} = req.body

            const band = await this.bandBusiness.BandController({name,music_genre,responsible, token})

            res.status(200).send({message: "Banda adicionada", band})

        } catch (error: any) {
            res.status(400).send({error: error.message})
        }

    }

    public getBandController = async (req: Request, res: Response) => {

        try {

            const token = req.headers.authorization
            const {id} = req.params

            const result = await this.bandBusiness.getBandController({id, token})

            res.status(200).send({message: "informações da banda", result})

        } catch (error: any) {
            res.status(400).send({error: error.message})
        }
    }
}