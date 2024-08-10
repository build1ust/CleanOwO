module.exports = (_0x259f7a) => {
    process.on('unhandledRejection', (_0x31546c, _0x558393) => {
        console.log(
            _0x259f7a.chalk.blue(_0x259f7a.chalk.bold('[antiCrash]')),
            _0x259f7a.chalk.white('>>'),
            _0x259f7a.chalk.magenta('Unhandled Rejection/Catch'),
            _0x259f7a.chalk.red(_0x31546c, _0x558393)
        )
    })
    process.on('uncaughtException', (_0x7fd3d0, _0x137478) => {
        console.log(
            _0x259f7a.chalk.blue(_0x259f7a.chalk.bold('[antiCrash]')),
            _0x259f7a.chalk.white('>>'),
            _0x259f7a.chalk.magenta('Unhandled Exception/Catch'),
            _0x259f7a.chalk.red(_0x7fd3d0, _0x137478)
        )
    })
    process.on('uncaughtExceptionMonitor', (_0x4ea66f, _0x5288a1) => {
        console.log(
            _0x259f7a.chalk.blue(_0x259f7a.chalk.bold('[antiCrash]')),
            _0x259f7a.chalk.white('>>'),
            _0x259f7a.chalk.magenta('Uncaught Exception/Catch'),
            _0x259f7a.chalk.red(_0x4ea66f, _0x5288a1)
        )
    })
    console.log(
        _0x259f7a.chalk.blue(_0x259f7a.chalk.bold('Bot')),
        _0x259f7a.chalk.white('>>'),
        _0x259f7a.chalk.red('AntiCrash'),
        _0x259f7a.chalk.green('ready!')
    )
}