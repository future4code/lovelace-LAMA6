import * as jwt from 'jsonwebtoken'
import { USER_ROLES } from '../entites/User'

export interface AuthenticatonData {
    id: string
    role: USER_ROLES
}

export class Authenticator {

    public generate (input: AuthenticatonData) : string {
        const token = jwt.sign (input, process.env.JWT_KEY as string, {
            expiresIn: '10h'
        })

        return token
    }

    public getTokenData (token: string) : AuthenticatonData {
        const data = jwt.verify (token, process.env.JWT_KEY as string)
        return data as AuthenticatonData
    }
}