class Character {
    constructor(username, name, level, race, charclass, exp) {
        this.name = name;
        this.username = username;
        this.level = level;
        this.race = race;
        this.charclass = charclass;
        this.exp = exp;
    }

    getName() {
        return this.name;
    }

    getUsername() {
        return this.username;
    }

    getLevel() {
        return this.level;
    }

    getRace() {
        return this.race;
    }

    getCharClass() {
        return this.charclass;
    }

    getExp() {
        return this.exp;
    }

    get() {
        return {
            name: this.getName(),
            username: this.getUsername(),
            level: this.getLevel(),
            race: this.getRace(),
            charclass: this.getCharClass(),
            exp: this.getExp()
        };
    }

    json() {
        return JSON.stringify(this.get());
    }
};

module.exports = Character;
