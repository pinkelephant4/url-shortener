import Joi from "joi";

export const createUrlSchema = Joi.object({
    url: Joi.string()
        .uri()
        .required()
        .messages({ "string.empty": "URL is required", "string.uri": "URL must be a valid URI." }),
});

export const updateUrlSchema = Joi.object({
    url: Joi.string()
        .uri()
        .required()
        .messages({
            "string.empty": "Updated URL is required",
            "string.uri": "Updated URL must be a valid URI.",
        }),
});
