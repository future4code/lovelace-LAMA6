import app from "./app";
import { UserBusiness } from "./business/UserBusiness";
import { UserController } from "./controller/UserController";
import { UserDataBase } from "./data/UserDataBase";
import { Authenticator } from "./service/Authenticator";
import { HashManager } from "./service/HashManager";
import { IdGenerator } from "./service/IdGenerator";


const userController = new UserController (

    new UserBusiness (
        new UserDataBase(),
        new IdGenerator(),
        new HashManager(),
        new Authenticator()
    )
)

app.post ("/user/signup", userController.signupController)
app.post ("/user/login", userController.loginController)
