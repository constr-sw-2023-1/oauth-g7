const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = new mongoose.Schema({
    client_id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    grant_type: {
        type: String,
        required: true,
    },
});

UserSchema.plugin(mongoosePaginate);

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User', UserSchema);
