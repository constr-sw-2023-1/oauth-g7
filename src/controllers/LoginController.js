const request = require('request');

require('dotenv').config();
const clientId = 'your_client_id';
const clientSecret = 'your_client_secret';
const user = 'your_username';
const password = 'your_password';

function login(req, res) {
    const options = {
        url: 'http://localhost:8090/auth/realms/constr-sw-2023-1/protocol/openid-connect/token',
        form: {
            client_id: 'grupo7',
            client_secret: 'cNtic55gUnn9aROIvMGulzLaOheBqcaz',
            username: 'grupo7',
            password: 'a123456',
            grant_type: 'password',
        },
    };

    request.post(options, (error, response, body) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        try {
            const data = JSON.parse(body);
            res.status(200).send({
                token_type: data.token_type,
                access_token: data.access_token,
                expires_in: data.expires_in,
                refresh_token: data.refresh_token,
                refresh_expires_in: data.refresh_expires_in,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}

module.exports = { login };