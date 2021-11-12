import app from "./app";
import { BandBusiness } from "./business/BandBusiness";
import { UserBusiness } from "./business/UserBusiness";
import { BandController } from "./controller/BandController";
import { UserController } from "./controller/UserController";
import { BandDataBase } from "./data/BandDataBase";
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

const bandController = new BandController (

    new BandBusiness (
        new BandDataBase(),
        new IdGenerator(),
        new Authenticator()
    )
)

app.post ("/band/create", bandController.BandController)
app.get ("/band/:id", bandController.getBandController)