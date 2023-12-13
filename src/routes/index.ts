import { Router } from "express";
import { MongoGetUsersRepository } from "../repositories/get-users/mongo-get-users";
import { MongoCreateUserRepository } from "../repositories/create-user/mongo-create-user";
import { GetUsersController } from "../controllers/get-users/get-users";
import { CreateUserController } from "../controllers/create-user/create-user";
import * as yup from "yup";
import { Validator } from "../shared/middlewares/Validation";
import { CreateUserParams } from "../controllers/create-user/protocols";



export const router = Router();


router.get("/users", async (req, res) => {

    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    res.send(body).status(statusCode);
});


router.post("/users", Validator((getSchema)=>({
    body: getSchema<CreateUserParams>(yup.object().shape({
        name: yup.string().required(),
        username: yup.string().required(),
        password: yup.string().required(),
    })),
})), async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository;
    const createUserController = new CreateUserController(mongoCreateUserRepository);

    const { body, statusCode } = await createUserController.handle({
        body: req.body,
    });

    res.send(body).status(statusCode);
});