import Joi from "joi";


const eventFormAuthen = Joi.object({
    id: Joi.number().allow(),

    title_en: Joi.string()
        .required()
        .messages({
            "string.empty": "กรุณากรอกชื่อกิจกรรม",

        }),
    title_th: Joi.string()
        .required()
        .messages({
            "string.empty": "กรุณากรอกชื่อกิจกรรม",

        }),
    location: Joi.string()
        .required()
        .messages({
            "string.empty": "กรุณากรอกสถานที่จัดกิจกรรม",

        }),
    description_en: Joi.string()
        .required()
        .messages({
            "string.empty": "กรุณากรอกรายละเอียดกิจกรรม",

        }),
    description_th: Joi.string()
        .required()
        .messages({
            "string.empty": "กรุณากรอกรายละเอียดกิจกรรม",

        }),
    date_start: Joi.date().required().messages({     
        "any.required": "กรุณากรอกวันที่เริ่มต้น"
    }),
    date_end: Joi.date().min(Joi.ref('date_start')).required().messages({      
        "any.required": "กรุณากรอกวันที่สิ้นสุด"
    }),
    image: Joi.any()
        .custom((value, helpers) => {
            if (!value || !(value instanceof File)) {
                return helpers.message("กรุณาอัปโหลดรูปภาพ");
            }
            if (!['image/jpeg', 'image/png', 'image/gif'].includes(value.type)) {
                return helpers.message("รองรับเฉพาะไฟล์ JPEG, PNG, และ GIF");
            }
            return value;
        })
        .required()
});

const validateEvent = (input) => {
    console.log(input, "this is input")
    const { error } = eventFormAuthen.validate(input, {
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

export default validateEvent;

