import newUserSchema from "../schemas/newUserSchema.js"

export function validateNewUserMiddleware(req, res, next) {
    const userValid = newUserSchema.validate(req.body);
    if (userValid.error) {
        return res.status(422).send(userValid.error.message);
    }

    next();
}