import { User } from "../entites/User";
import { BaseDatabase } from "./BaseDataBase";

export class UserDataBase extends BaseDatabase {

    public createUser = async (user: User) => {

        try {
            await BaseDatabase.connection ('NOME_TABELAS_USUÁRIOS')
            .insert ({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                role: user.getRole()
            })


        } catch (error: any) {
            throw new Error (error.sqlMessage || error.message)
        }
    }

    public verifyEmail = async (email: string) : Promise <User> => {

        try {
            const result = await BaseDatabase.connection('NOME_TABELAS_USUÁRIOS')
            .select()
            .where({email})
            return result[0] && User.toUserModel(result[0])

        } catch (error: any) {
            throw new Error (error.sqlMessage || error.message)
        }

    }

}