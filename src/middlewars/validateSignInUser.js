import UserSchema from "../schemas/userSchema.js";

export function validateSignInUser(req, res, next) {
    const userValidated =  UserSchema.validate(req.body);

    if (userValidated.error) {
        return res.status(422).send(userValidated.error);
    }

    next();
}