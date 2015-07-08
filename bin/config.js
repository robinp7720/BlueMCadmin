var config = {
    http: {
        port: 3000
    },
    app: {
        name: 'BlueMCadmin',
        session: {
            secret: "ThisIsMyDeepestSecret"
        }
    },
    login: {
        username: "admin",
        password: "admin"
    },
    url: {
        base: 'http://localhost:3000/'
    }
};
module.exports = config;