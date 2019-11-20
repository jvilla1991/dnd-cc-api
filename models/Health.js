class Health {
    constructor(session, app, status, message) {
        this.session = session;
        this.app = app;
        this.status = status;
        this.message = message;
    }

    getSession() {
        return this.session;
    }

    getApp() {
        return this.app;
    }

    getStatus() {
        return this.status;
    }

    getMessage() {
        return this.message;
    }

    get() {
        return {
            session: this.getSession(),
            app: this.getApp(),
            status: this.getStatus(),
            message: this.getMessage()
        };
    }

    json() {
        return JSON.stringify(this.get());
    }
};

module.exports = Health;
