class User {
    constructor(id, username, passwordhash) {
        this._id = id;
        this.username = username;
        this.passwordhash = passwordhash
    }
};

module.exports = User;
