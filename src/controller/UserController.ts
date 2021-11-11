import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {

    constructor (
        private userBusiness: UserBusiness

    ) {}

    public signupController = async (req: Request, res: Response) => {
       
        try {

            const {name, email, password, role} = req.body
            const token = await this.userBusiness.signupBusiness ({name, email, password, role})
            res.status(200).send({message: "Usuário criado", token})


        } catch (error:any) {
            res.status(400).send({error: error.message})
        }
    }

    public loginController = async (req: Request, res: Response) => {

        try {

            const {email, password} = req.body

            const token = await this.userBusiness.loginBusiness({email,password})

            res.status(200).send({message: "Usuário logado.", token})

        } catch (error: any) {
            res.status(400).send({error: error.message})
        }   
    }

}