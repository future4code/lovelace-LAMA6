import { UserDataBase } from "../data/UserDataBase"
import { User } from "../entites/User"
import { Authenticator } from "../service/Authenticator"
import { HashManager } from "../service/HashManager"
import { IdGenerator } from "../service/IdGenerator"

export class UserBusiness {

    constructor (
        private userDataBase: UserDataBase,
        private idGenerator: IdGenerator,
        private hashPassword: HashManager,
        private authenticator: Authenticator
        
    ) {}

    public signupBusiness = async (input: any) => {

        const {name, email, password, role} = input

        if (!name || !email || !password) {
            throw new Error ("Insira corretamente as credenciais 'nome', 'email' e 'password'.")
        }

        if (email.indexOf("@") === -1) {
            throw new Error ("Email inválido!")
        }

        if (password.length <6) {
            throw new Error ("A senha deve conter ao menos 6 caracteres.")
        }

        const verifyEmail = await this.userDataBase.verifyEmail (email)

        if (verifyEmail) {
            throw new Error ("Email já Cadastrado")
        }

        const id = this.idGenerator.generate()
        const hashPassword = await this.hashPassword.hash(password)
        
        const createUser = new User (id, name, email, hashPassword, role)
        const newUser = this.userDataBase.createUser(createUser)

        const token = this.authenticator.generate({id, role})

        return token
    }

    public loginBusiness = async (input: any) => {

        const {email, password} = input

        if (!email || !password) {
            throw new Error ("Insira corretamente as credenciais 'email' e 'password'.")
        }

        if (email.indexOf("@") === -1) {
            throw new Error ("Email inválido!")
        }

        if (password.length <6) {
            throw new Error ("A senha deve conter ao menos 6 caracteres.")
        }

        const user = await this.userDataBase.verifyEmail(email)

        if(!user) {
            throw new Error ("Email não cadastrado.")
        }

        const isCorrectPassword = await this.hashPassword.compare(password, user.getPassword())

        if (!isCorrectPassword) {
            throw new Error ("Email ou senha inválidos.")
        }

        const token = await this.authenticator.generate({id: user.getId(), role: user.getRole()})

        return token

    }
}
