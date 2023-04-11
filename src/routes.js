const request = require('request');
const express = require('express');
const routes = express.Router();

require('dotenv').config();
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const username = process.env.USER_ID;
const password = process.env.PASSWORD;

// Obtendo o token de acesso
routes.post('/login', (req, res) => {
    const options = {
        url: 'http://localhost:8090/auth/realms/grupo-7-realm/protocol/openid-connect/token',
        form: {
            client_id: clientId,
            client_secret: clientSecret,
            username: username,
            password: password,
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
});

routes.post('/users', (req, res) => {
    const options = {
        url: 'http://localhost:8090/auth/admin/realms/grupo-7-client/users',
        headers: {
            Authorization: req.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": "Strange",
            "firstName": "Stephen",
            "lastName": "Strange",
            "email": "drstranger@marvel.com",
            "enabled": true,
            "emailVerified": true,
            "attributes": {},
            "credentials": [],
            "disableableCredentialTypes": [],
            "requiredActions": [],
            "access": {
                "manageGroupMembership": true,
                "view": true,
                "mapRoles": true,
                "impersonate": true,
                "manage": true
            },
            "realmRoles": [
                "default-roles-grupo-7-realm"
            ]
        })
    };
    console.log(options.headers.Authorization);
    request.post(options, (error, response, body) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        try {
            const data = JSON.parse(body);
            console.log('JSON:',data);
            res.status(200).send({
                message: "User created successfully",
                user: {
                    createdTimestamp: data.createdTimestamp,
                    username: data.username,
                    enabled: data.enabled,
                    emailVerified: data.emailVerified,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    attributes: data.attributes,
                    credentials: data.credentials,
                    disableableCredentialTypes: data.disableableCredentialTypes,
                    requiredActions: data.requiredActions,
                    access: data.access,
                    realmRoles: data.realmRoles
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
    });
});


routes.get('/users/:id', (req, res) => {
    res.send('Recuperar um usuário');
});

routes.put('/users/:id', (req, res) => {
    res.send('Atualizar um usuário');
});

routes.patch('/users/:id', (req, res) => {
    res.send('Atualizar a senha de um usuário');
});

routes.delete('/users/:id', (req, res) => {
    res.send('Excluir um usuário');
});

module.exports = routes;