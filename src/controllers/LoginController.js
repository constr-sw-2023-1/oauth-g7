const request = require('request');

require('dotenv').config();
const config = require('../config/config');

function login(req, res) {
    const options = {
        url: `${config.baseApiUrl}/realms/${config.realm}/protocol/openid-connect/token`,
        form: {
            client_id: config.clientId,
            client_secret: req.body.client_secret,
            username: req.body.username,
            password: req.body.password,
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
            if (data.access_token && data.refresh_token) {
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

function refreshToken(refreshToken, req, callback) {
    const options = {
        url: `${config.baseApiUrl}/realms/${config.realm}/protocol/openid-connect/token`,
        form: {
            client_id: config.clientId,
            client_secret: req.body.client_secret,
            grant_type: 'refresh_token',
            refresh_token: refreshToken
        }
    };

    request.post(options, (error, response, body) => {
        if (error) {
            return callback(error);
        }

        const data = JSON.parse(body);
        if (!data.access_token) {
            return callback('Failed to refresh token');
        }

        return callback(null, data.access_token, data.refresh_token);
    });
}

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const options = {
        url: `${config.baseApiUrl}/realms/${config.realm}/protocol/openid-connect/userinfo`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    request.get(options, (error, response, body) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }

        if (response.statusCode !== 200) {
            if (response.statusCode === 401) {
                // Tenta renovar o token
                const refreshToken = req.headers['refresh-token'];
                if (!refreshToken) {
                    return res.status(401).send({ message: 'Unauthorized' });
                }

                refreshToken(refreshToken, req, (error, accessToken, refreshToken) => {
                    if (error) {
                        console.error(error);
                        return res.status(401).send({ message: 'Unauthorized' });
                    }

                    res.setHeader('Authorization', `Bearer ${accessToken}`);
                    res.setHeader('refresh-token', refreshToken);
                    req.headers.authorization = `Bearer ${accessToken}`;
                    req.headers['refresh-token'] = refreshToken;

                    // Tenta novamente
                    request.get(options, (error, response, body) => {
                        if (error) {
                            console.error(error);
                            return res.status(500).send({ error: 'Internal Server Error' });
                        }

                        if (response.statusCode !== 200) {
                            return res.status(response.statusCode).send({ message: 'Unauthorized' });
                        }

                        req.user = JSON.parse(body);
                        return next();
                    });
                });
            } else {
                return res.status(response.statusCode).send({ message: 'Unauthorized' });
            }
        }

        req.user = JSON.parse(body);
        return next();
    });
}

module.exports = { login, refreshToken, authenticate };