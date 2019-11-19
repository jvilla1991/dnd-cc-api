class User {
    constructor(username, passwordhash) {
        this.username = username;
        this.passwordhash = passwordhash;
    }

    constructor(params) {
        this.username = params.username;
        this.passwordhash = params.passwordhash;
    }

    json() {
        return {
            username: this.username,
            passwordhash: this.passwordhash
        };
    }
};

module.exports = User;
