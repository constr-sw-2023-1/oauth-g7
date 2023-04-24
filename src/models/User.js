const Joi = require('joi');

const userSchema = Joi.object({
    id: Joi.string(),
    createdTimestamp: Joi.number(),
    username: Joi.string().required(),
    enabled: Joi.boolean(),
    totp: Joi.boolean(),
    emailVerified: Joi.boolean(),
    firstName: Joi.string().allow('').optional(),
    lastName: Joi.string().allow('').optional(),
    email: Joi.string().allow('').optional(),
    disableableCredentialTypes: Joi.array().items(Joi.string()),
    requiredActions: Joi.array().items(Joi.string()),
    notBefore: Joi.number(),
    access: Joi.object({
        manageGroupMembership: Joi.boolean(),
        view: Joi.boolean(),
        mapRoles: Joi.boolean(),
        impersonate: Joi.boolean(),
        manage: Joi.boolean()
    }),
    realmRoles: Joi.array().items(Joi.string())
});

module.exports = userSchema;