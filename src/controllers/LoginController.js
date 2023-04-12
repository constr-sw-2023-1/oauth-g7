const request = require('request');

require('dotenv').config();
const config = require('../config/config');

const Keycloak = require('keycloak-connect');
const keycloak = new Keycloak({}, config);

function login(req, res) {
    const options = {
        url: `${config.baseApiUrl}/realms/${config.realm}/protocol/openid-connect/token`,
        form: {
            client_id: config.clientId,
            client_secret: config.clientSecret,
            username: config.username,
            password: config.password,
            grant_type: config.grantType,
        },
    };
    request.post(options, (error, response, body) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        try {
            const data = JSON.parse(body);
            if (data.access_token) {
                return res.status(200).send({
                    message: 'Successfully Generated Token',
                    token_type: data.token_type,
                    access_token: data.access_token,
                    expires_in: data.expires_in,
                    refresh_token: data.refresh_token,
                    refresh_expires_in: data.refresh_expires_in,
                });
            } else {
                return res.status(401).send({ message: 'Invalid Credentials' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}

function refreshTokens(req, res) {
    const refreshToken = localStorage.getItem('refresh_token');
    const options = {
        url: `${config.baseApiUrl}/realms/${config.realm}/protocol/openid-connect/token`,
        form: {
            client_id: config.clientId,
            client_secret: config.clientSecret,
            refresh_token: refreshToken,
            grant_type: 'refresh_token',
        },
    };

    console.log('refreshTokens' + refreshToken);
    request.post(options, (error, response, body) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        try {
            console.log(`Status code: ${response.statusCode}`);
            console.log(`Response body: ${body}`);
            const data = JSON.parse(body);
            if (data.access_token) {
                return res.status(200).send({
                    message: 'Successfully Refreshed Tokens',
                    token_type: data.token_type,
                    access_token: data.access_token,
                    expires_in: data.expires_in,
                    refresh_token: data.refresh_token,
                    refresh_expires_in: data.refresh_expires_in,
                });
            } else {
                return res.status(401).send({ message: 'Invalid Refresh Token' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}


module.exports = { login, refreshTokens };