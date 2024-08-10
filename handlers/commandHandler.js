module.exports = async p => {
    const v = p.fs.readdirSync("./commands/").filter(p2 => p2.endsWith(".js"));
    for (let v2 of v) {
        let vRequire = require("../commands/" + v2);
        p.commands.set(vRequire.config.name, vRequire);
        if (vRequire.config.aliases) {
            vRequire.config.aliases.forEach(p3 => p.aliases.set(p3, vRequire.config.name));
        }
    }
    console.log(p.chalk.blue(p.chalk.bold("Bot")), p.chalk.white(">>"), p.chalk.red("Commands"), p.chalk.green("Succesfully loaded!"));
};