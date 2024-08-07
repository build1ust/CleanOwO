module.exports = V => {
    process.on("unhandledRejection", (N, F) => {
        console.log(V.chalk.blue(V.chalk.bold("[antiCrash]")), V.chalk.white(">>"), V.chalk.magenta("Unhandled Rejection/Catch"), V.chalk.red(N, F));
    });
    process.on("uncaughtException", (N, F) => {
        console.log(V.chalk.blue(V.chalk.bold("[antiCrash]")), V.chalk.white(">>"), V.chalk.magenta("Unhandled Exception/Catch"), V.chalk.red(N, F));
    });
    process.on("uncaughtExceptionMonitor", (N, F) => {
        console.log(V.chalk.blue(V.chalk.bold("[antiCrash]")), V.chalk.white(">>"), V.chalk.magenta("Uncaught Exception/Catch"), V.chalk.red(N, F));
    });
    console.log(V.chalk.blue(V.chalk.bold("Bot")), V.chalk.white(">>"), V.chalk.red("AntiCrash"), V.chalk.green("ready!"));
};