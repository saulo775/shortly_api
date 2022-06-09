import Joi from "joi";

const newUserSchema = Joi.object({
    name: Joi.string().min(4).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.any().valid(Joi.ref('password')).required()
});

export default newUserSchema;