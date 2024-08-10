module.exports = async (p7, p8) => {
    const vF3 = (p11) => {
        const v4 = p7.fs.readdirSync('./events/' + p11 + '/').filter((p12) => p12.endsWith('.js'))
        for (let v5 of v4) {
            const v6 = require('../events/' + p11 + '/' + v5)
            let v7 = v5.split('.')[0]
            p7.on(v7, v6.bind(null, p7))
        }
    }
    p7.fs.readdirSync('./events/').forEach((p13) => vF3(p13))
    console.log(
        p7.chalk.blue(p7.chalk.bold('Bot')),
        p7.chalk.white('>>'),
        p7.chalk.red('Events'),
        p7.chalk.green('Succesfully loaded!')
    )
}
