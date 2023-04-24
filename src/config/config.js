module.exports = {
    baseApiUrl: process.env.BASE_API_URL || 'http://keycloak:8080/auth',
    realm: process.env.REALM || 'constr-sw-2023-1',
    clientId: process.env.CLIENT_ID || 'grupo7',
    grantType: process.env.GRANT_TYPE || 'password',
};