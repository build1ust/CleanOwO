module.exports = async (b, E) => {
    const i = Y => {
        const Q = b.fs.readdirSync("./events/" + Y + "/").filter(I => I.endsWith(".js"));
        for (let I of Q) {
            const M = require("../events/" + Y + "/" + I);
            let x = I.split(".")[0];
            b.on(x, M.bind(null, b));
        }
    };
    b.fs.readdirSync("./events/").forEach(Y => i(Y));
    console.log(b.chalk.blue(b.chalk.bold("Bot")), b.chalk.white(">>"), b.chalk.red("Events"), b.chalk.green("Succesfully loaded!"));
};