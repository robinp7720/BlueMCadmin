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
    },
    server: {
        max_ram: 4096,
        min_ram: 1024,
        save_interval: 1000*60*30
    }
};
module.exports = config;