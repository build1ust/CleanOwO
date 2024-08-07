module.exports = async t => {
    const v = t.fs.readdirSync("./commands/").filter(G => G.endsWith(".js"));
    for (let G of v) {
        let B = require("../commands/" + G);
        t.commands.set(B.config.name, B);
        if (B.config.aliases) {
            B.config.aliases.forEach(J => t.aliases.set(J, B.config.name));
        }
    }
    console.log(t.chalk.blue(t.chalk.bold("Bot")), t.chalk.white(">>"), t.chalk.red("Commands"), t.chalk.green("Succesfully loaded!"));
};