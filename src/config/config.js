module.exports = {
    baseApiUrl: process.env.BASE_API_URL || 'http://localhost:8090/auth',
    realm: process.env.REALM || 'constr-sw-2023-1',
    clientId: process.env.CLIENT_ID || 'grupo7',
    clientSecret: process.env.CLIENT_SECRET || 'bL7WQKLGltXLLKXKvmS5SzqUF9vYdEd0',
    username: process.env.USER_ID || 'grupo7',
    password: process.env.PASSWORD || 'a123456',
    grantType: process.env.GRANT_TYPE || 'password',
};