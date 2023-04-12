const request = require('request');

require('dotenv').config();
const config = require('../config/config');
function createUser(req, res) {
    const options = {
        url: `${config.baseApiUrl}/admin/realms/${config.realm}/users`,
        headers: {
            'Authorization': req.headers.authorization,
            'Content-Type': 'application/json'
        },
        json: {
            "createdTimestamp": 1588880747548,
            "username": "dssssssssds",
            "enabled": true,
            "totp": false,
            "emailVerified": true,
            "firstName": "dssssss",
            "lastName": "Stradsndsssge",
            "email": "drstrangsssssds2@marvel.com",
            "disableableCredentialTypes": [],
            "requiredActions": [],
            "notBefore": 0,
            "access": {
                "manageGroupMembership": true,
                "view": true,
                "mapRoles": true,
                "impersonate": true,
                "manage": true
            },
            "realmRoles": [ "mb-user" ]
        }
    };
    request.post(options, (error, response, body) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        console.log('HTTP response code:', response.statusCode);
        try {
            res.status(200).send({
                message: "User created successfully",
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}

function listUsers(req, res) {
    const options = {
        url: `${config.baseApiUrl}/admin/realms/${config.realm}/users`,
        headers: {
            Authorization: req.headers.authorization
        },
    };
    request.get(options, (error, response, body) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        const statusCode = response.statusCode;
        switch (statusCode) {
            case 200:
                try {
                    const data = JSON.parse(body);
                    console.log('JSON:',data);
                    res.status(200).send({
                        message: "Successfully Listed Users",
                        users: data
                    });
                } catch (error) {
                    console.error(error);
                    return res.status(500).send({ error: 'Internal Server Error' });
                }
                break;
            case 401:
                res.status(401).send({ message: 'Invalid Token' });
                break;
            case 403:
                res.status(403).send({ message: 'Forbidden' });
                break;
            default:
                res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}

function listUserById(req, res) {
    const options = {
        url: `${config.baseApiUrl}/admin/realms/${config.realm}/users/${req.params.id}`,
        headers: {
            Authorization: req.headers.authorization
        },
    };
    request.get(options, (error, response, body) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        try {
            const data = JSON.parse(body);
            console.log('JSON:',data);
            res.status(200).send({
                message: "User listed successfully",
                user: data
            });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}

function updateUser(req, res) {
    const options = {
        url: `${config.baseApiUrl}/admin/realms/${config.realm}/users/${req.params.id}`,
        headers: {
            Authorization: req.headers.authorization,
            'Content-Type': 'application/json'
        },
        json: {
            "firstName": "Dr. Strange",
        }
    };
    request.put(options, (error, response, body) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        try {
            console.log(`Status code: ${response.statusCode}`);
            console.log(`Response body: ${body}`);
            res.status(200).send({
                message: "User updated successfully",
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}

function resetPassword(req, res) {
    const options = {
        url: `${config.baseApiUrl}/admin/realms/${config.realm}/users/${req.params.id}/reset-password`,
        headers: {
            Authorization: req.headers.authorization,
            'Content-Type': 'application/json'
        },
        body: {
            type: 'password',
            temporary: false,
            value: req.body.password
        },
        json: true
    };

    request.patch(options, (error, response, body) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        console.log('Response:', response.statusCode, body);
        if (response.statusCode === 204) {
            res.status(200).send({
                message: "User password updated successfully"
            });
        } else {
            res.status(400).send({
                message: "Failed to update user password"
            });
        }
    });
}

function deleteUser(req, res) {
    const options = {
        url: `${config.baseApiUrl}/admin/realms/${config.realm}/users/${req.params.id}`,
        headers: {
            Authorization: req.headers.authorization
        }
    };
    request.delete(options, (error, response, body) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        try {
            console.log(`Status code: ${response.statusCode}`);
            console.log(`Response body: ${body}`);
            res.status(200).send({
                message: "User deleted successfully",
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}

module.exports = { createUser, listUsers, listUserById, updateUser, resetPassword, deleteUser };
