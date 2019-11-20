class User {
    constructor(username, passwordhash) {
        this.username = username;
        this.passwordhash = passwordhash;
    }
    
    json() {
        return JSON.stringify({
            username: this.username,
            passwordhash: this.passwordhash
        });
    }
};

module.exports = User;
