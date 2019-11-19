class Character {
    constructor(username, name, level, race, charclass, exp) {
        this.username = username;
        this.name = name;
        this.level = level;
        this.race = race;
        this.charclass = charclass;
        this.exp = exp;
    }

    json() {
        return {
            username: this.username,
            name: this.name,
            level: this.level,
            race: this.race,
            charclass: this.charclass,
            exp: this.exp
        };
    }
};

module.exports = Character;
