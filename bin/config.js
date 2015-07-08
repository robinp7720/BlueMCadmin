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
        base: 'http://192.168.1.98:3000/'
    }
};
module.exports = config;