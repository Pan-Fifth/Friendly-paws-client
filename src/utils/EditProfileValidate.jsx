import Joi from "joi";


const editProfileAuthen = (t) => Joi.object({
    id: Joi.number().allow(),

    firstname: Joi.string()
        .required()
        .pattern(/^[a-zA-Zก-๙]+$/)
        .max(20)
        .messages({
            "string.base": t('validation.fnRequired'),
            "string.empty": t('validation.fnRequired'),
            "string.pattern.base": t('validation.fnPattern'),
            "string.max": t('validation.fnMax')
        }),
    lastname: Joi.string()
        .required()
        .pattern(/^[a-zA-Zก-๙]+$/)
        .max(20)
        .messages({
            "string.empty": t('validation.lnRequired'),
            "string.base": t('validation.lnRequired'),
            "string.pattern.base": t('validation.lnPattern'),
            "string.max": t('validation.lnMax')
        }),
    phone: Joi.string()
        .required()
        .pattern(/^[0-9]{10}$/)
        .messages({
            "string.empty": t('validation.pnRequired'),
            "string.base": t('validation.pnRequired'),
            "string.pattern.base": t('validation.pnPattern')
        }),


    email: Joi.string()
        .email({ tlds: false })
        .required()
        .messages({
            "string.empty": t('validation.emRequired'),
            "string.email": t('validation.emFormat')
        }),

});

const validateEditProfile = (input, t) => {

    const { error } = editProfileAuthen(t).validate(input, {
        abortEarly: false
    });
    console.log(error, "this is error")

    if (error?.details) {
        const formatError = error.details.reduce((prev, cur) => {

            prev[cur.path[0]] = cur.message;
            return prev;
        }, {});

        return formatError;
    }
    return null;
}

export default validateEditProfile;

