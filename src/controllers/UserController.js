const request = require('request');

require('dotenv').config();
const config = require('../config/config');
const userSchema = require('../models/User');

function createUser(req, res) {
    const payload = {
        id: req.body.id,
        createdTimestamp: req.body.createdTimestamp,
        username: req.body.username,
        enabled: req.body.enabled,
        totp: req.body.totp,
        emailVerified: req.body.emailVerified,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        disableableCredentialTypes: req.body.disableableCredentialTypes,
        requiredActions: req.body.requiredActions,
        notBefore: req.body.notBefore,
        access: {
            manageGroupMembership: req.body.access.manageGroupMembership,
            view: req.body.access.view,
            mapRoles: req.body.access.mapRoles,
            impersonate: req.body.access.impersonate,
            manage: req.body.access.manage,
        },
    };

    const { error } = userSchema.validate(payload);

    if (error) {
        console.error(error);
        return res.status(400).send({ error: error.details[0].message });
    }

    const options = {
        url: `${config.baseApiUrl}/admin/realms/${config.realm}/users`,
        headers: {
            'Authorization': req.headers.authorization,
            'Content-Type': 'application/json'
        },
        json: payload
    };

    request.post(options, (error, response, body) => {
        try {
            switch (response.statusCode) {
                case 201:
                    return res.status(201).send({
                        message: "User created successfully",
                        response: body,
                    });
                case 400:
                    if (body && body.errorMessage) {
                        return res.status(400).send({ error: body.errorMessage });
                    }
                    return res.status(400).send({ error: "Bad Request" });
                case 401:
                    return res.status(401).send({ error: "Unauthorized" });
                case 403:
                    return res.status(403).send({ error: "Forbidden" });
                case 409:
                    return res.status(409).send({ error: "Username already exists" });
                default:
                    throw new Error(`Unexpected response status code: ${response.statusCode}`);
            }
        } catch (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
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
                        message: "User listed successfully",
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
        const statusCode = response.statusCode;
        if (statusCode === 200) {
            try {
                const data = JSON.parse(body);
                console.log('JSON:',data);
                res.status(statusCode).send({
                    message: "User listed successfully",
                    user: data
                });
            } catch (error) {
                console.error(error);
                return res.status(500).send({ error: 'Internal Server Error' });
            }
        } else if (statusCode === 401) {
            return res.status(statusCode).send({ message: 'Invalid Token' });
        } else if (statusCode === 404) {
            return res.status(statusCode).send({ message: 'User Not Found' });
        } else {
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
        json: req.body
    };
    request.put(options, (error, response, body) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
        try {
            res.status(200).send({
                message: "User updated successfully",
            });
        } catch (error) {
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
            if (response.statusCode === 204) {
                res.status(204).send({message: "User Deleted Successfully"});
            } else if (response.statusCode === 404) {
                res.status(404).send({ error: 'User Not Found' });
            } else if (response.statusCode === 401) {
                res.status(401).send({ error: 'Invalid Token' });
            } else {
                throw new Error(`Unexpected response status code: ${response.statusCode}`);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal Server Error' });
        }
    });
}

module.exports = { createUser, listUsers, listUserById, updateUser, resetPassword, deleteUser };
