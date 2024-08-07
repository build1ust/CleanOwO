module.exports = async l => {
    console.log(l.chalk.blue(l.chalk.bold("Bot")), l.chalk.white(">>"), l.chalk.red("" + l.user.username), l.chalk.green("is ready!"));
    l.rpc("start");
};