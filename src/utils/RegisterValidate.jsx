import Joi from "joi"


const registerAuthen = (t) => Joi.object({


    email: Joi.string()
        .email({ tlds: false })
        .required()
        .messages({
            "string.empty": t('validation.emRequired'),
            "string.base": t('validation.emRequired'),
            "string.email": t('validation.emFormat')
        }),

    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/)
        .required()
        .messages({
            "string.empty": t('validation.psRequired'),
            "string.base": t('validation.psRequired'),
            "string.pattern.base": t('validation.psPattern')
        }),
    confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref("password"))
        .messages({
            'any.only': t('validation.psRequired2'),
            "string.empty": t('validation.psRequired'),
            "string.base": t('validation.psRequired'),
        }),


})

const validateRegister = (input, t) => {

    const { error } = registerAuthen(t).validate(input, {
        abortEarly: false
    })


    if (error) {
        const formatError = error.details.reduce((prev, cur) => {


            prev[cur.path[0]] = cur.message
            return prev
        }, {})

        return formatError
    }
}

export default validateRegister
