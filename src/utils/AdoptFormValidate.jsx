import Joi from "joi";


const adoptFormAuthen = (t) => Joi.object({
    id: Joi.number().allow(),

    firstname: Joi.string()
        .required()
        .pattern(/^[a-zA-Zก-๙]+$/)
        .messages({
            "string.base": t('validation.fnRequired'),
            "string.empty": t('validation.fnRequired'),
            "any.required": t('validation.fnRequired'),
            "string.pattern.base": t('validation.fnPattern'),
        }),
    lastname: Joi.string()
        .required()
        .pattern(/^[a-zA-Zก-๙]+$/)
        .messages({
            "string.empty": t('validation.lnRequired'),
            "string.base": t('validation.lnRequired'),
            "any.required": t('validation.lnRequired'),
            "string.pattern.base": t('validation.lnPattern'),
        }),
    phone: Joi.string()
        .required()
        .pattern(/^[0-9]{10}$/)
        .messages({
            "string.empty": t('validation.pnRequired'),
            "string.base": t('validation.pnRequired'),
            "any.required": t('validation.pnRequired'),
            "string.pattern.base": t('validation.pnPattern')
        }),
    salary: Joi.number()
        .required()
        .min(0)
        .messages({
            "number.base": t('validation.salaryRequired'),
            "any.required": t('validation.salaryRequired'),
            "number.min": t('validation.salaryMin')
        }),
    dateOfBirth: Joi.date()
        .required()
        .messages({
            "date.base": t('validation.dateOfBirthRequired'),
            "date.empty": t('validation.dateOfBirthRequired'),
            "any.required": t('validation.dateOfBirthRequired'),

        }),
    socialContact: Joi.string()
        .optional()
        .messages({
            "string.empty": t('validation.socialContact'),
            "string.base": t('validation.socialContact')
        }),
    address: Joi.string()
        .required()
        .messages({
            "string.empty": t('validation.address'),
            "string.base": t('validation.address'),
            "any.required": t('validation.address'),

        }),
    career: Joi.string()
        .required()
        .messages({
            "string.empty": t('validation.career'),
            "string.base": t('validation.career'),
            "any.required": t('validation.career'),

        }),
    workPlace: Joi.string()
        .required()
        .messages({
            "string.empty": t('validation.workPlace'),
            "string.base": t('validation.workPlace'),
            "any.required": t('validation.workPlace'),

        }),
    workTime: Joi.string()
        .required()
        .messages({
            "string.empty": t('validation.workTime'),
            "string.base": t('validation.workTime'),
            "any.required": t('validation.workTime'),

        }),
    dayOff: Joi.string()
        .required()
        .messages({
            "string.empty": t('validation.dayOff'),
            "string.base": t('validation.dayOff'),
            "any.required": t('validation.dayOff'),

        }),
    currentPetCount: Joi.number()
        .integer()
        .min(0)
        .required()
        .messages({
            "number.base": t('validation.currentPetCountRequired'),
            "number.empty": t('validation.currentPetCountRequired'),
            "any.required": t('validation.currentPetCountRequired'),
            "number.min": t('validation.currentPetCountMin')
        }),
    currentPetDetails: Joi.string()
        .required()
        .messages({
            "string.base": t('validation.currentPetDetails'),
            "string.empty": t('validation.currentPetDetails'),
            "any.required": t('validation.currentPetDetails')
        }),
    familyMemberCount: Joi.number()
        .integer()
        .min(1)
        .required()
        .messages({
            "number.base": t('validation.familyMemberCountRequired'),
            "number.empty": t('validation.familyMemberCountRequired'),
            "any.required": t('validation.familyMemberCountRequired'),

            "number.min": t('validation.familyMemberCountMin')
        }),
    familyAlwaysHome: Joi.boolean()
        .required()
        .messages({
            "boolean.base": t('validation.familyAlwaysHomeRequired'),
            "boolean.empty": t('validation.familyAlwaysHomeRequired')
        }),
    aloneHours: Joi.number()
        .integer()
        .min(0)
        .optional()
        .messages({
            "number.base": t('validation.aloneHours'),
            "number.min": t('validation.aloneHoursMin')
        }),
    housingType: Joi.string()
        .valid("OWN_HOUSE", "RENTAL_HOUSE", "CONDO", "APARTMENT")
        .required()
        .messages({
            "string.base": t('validation.housingTypeRequired'),
            "string.empty": t('validation.housingTypeRequired'),
            "any.required": t('validation.housingTypeRequired'),
            "any.only": t('validation.housingTypeInvalid')
        }),

    deliveryType: Joi.string()
        .valid("PICK_UP", "REQUIRE_DELIVERY")
        .required()
        .messages({
            "string.base": t('validation.deliveryTypeRequired'),
            "string.empty": t('validation.deliveryTypeRequired'),
            "any.only": t('validation.deliveryTypeInvalid')
        }),
    why: Joi.string()
        .required()
        .messages({
            "string.base": t('validation.why'),
            "string.empty": t('validation.why')
        }),




});

const validateAdoptForm = (input, t) => {

    const { error } = adoptFormAuthen(t).validate(input, {
        abortEarly: false
    });


    if (error?.details) {
        const formatError = error.details.reduce((prev, cur) => {

            prev[cur.path[0]] = cur.message;
            return prev;
        }, {});

        return formatError;
    }
    return null;
}

export default validateAdoptForm;

