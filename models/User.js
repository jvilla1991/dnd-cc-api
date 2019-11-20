class User {
    constructor(username, passwordhash) {
        this.username = username;
        this.passwordhash = passwordhash;
    }

    getUsername() {
        return this.username;
    }

    getPasswordHash() {
        return this.passwordhash;
    }

    get() {
        return {
            username: this.getUsername(),
            passwordhash: this.getPasswordHash()
        };
    }
    
    json() {
        return JSON.stringify(this.get());
    }
};

module.exports = User;
