import Joi from "joi"


const loginAuthen = (t) => Joi.object({

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
            "string.pattern.base": t('validation.psPattern2')
        }),



})

const validateLogin = (input, t) => {

    const { error } = loginAuthen(t).validate(input, {
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

export default validateLogin
