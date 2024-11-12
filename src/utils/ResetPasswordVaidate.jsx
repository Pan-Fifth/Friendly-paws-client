import Joi from "joi"


const resetAuthen = (t) => Joi.object({


    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/)
        .required()
        .messages({
            "string.empty": t('validation.psRequired'),
            "string.base": t('validation.psRequired'),
            "string.pattern.base": t('validation.psPattern')
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': t('validation.psRequired2'),
            "string.empty": t('validation.psRequired'),
            "string.base": t('validation.psRequired'),
        })



})

const validateResetPassword = (input, t) => {

    const { error } = resetAuthen(t).validate(input, {
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

export default validateResetPassword
