const UserSchema = {
    id: { type: String, required: true },
    createdTimestamp: { type: Number, required: true },
    username: { type: String, required: true },
    enabled: { type: Boolean, required: true },
    totp: { type: Boolean, required: true },
    emailVerified: { type: Boolean, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    disableableCredentialTypes: [{ type: String }],
    requiredActions: [{ type: String }],
    notBefore: { type: Number },
    access: {
        manageGroupMembership: { type: Boolean },
        view: { type: Boolean },
        mapRoles: { type: Boolean },
        impersonate: { type: Boolean },
        manage: { type: Boolean },
    },
};

module.exports = UserSchema;