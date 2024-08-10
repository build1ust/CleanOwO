const { logger } = require('../../utils/logger')
module.exports = async (_0x2af806, _0x4e8c25) => {
    let _0x104d2b = _0x4e8c25.content.toLowerCase()
    if (_0x4e8c25.author.id === '408785106942164992') {
        if (
            _0x104d2b.includes('please complete your captcha') ||
            _0x104d2b.includes('verify that you are human') ||
            _0x104d2b.includes('are you a real human') ||
            _0x104d2b.includes('please use the link below so i can check')
        ) {
            _0x2af806.global.paused = true
            _0x2af806.global.captchadetected = true
            _0x2af806.global.total.captcha++
            logger.alert('Bot', 'Captcha', 'Captcha Detected!!!')
            logger.info(
                'Bot',
                'Captcha',
                'Total Captcha: ' + _0x2af806.global.total.captcha
            )
            logger.warn('Bot', 'Captcha', 'Bot Paused: ' + _0x2af806.global.paused)
            if (_0x2af806.config.settings.captcha.alerttype.notification) {
                _0x2af806.notifier.notify({
                    title: 'Captcha Detected!',
                    message:
                        'Solve the captcha and type ' +
                        _0x2af806.config.prefix +
                        'resume in farm channel',
                    icon: './assets/captcha.png',
                    sound: true,
                    wait: true,
                    appID: 'OwO Farm Bot Stable',
                })
            }
            if (_0x2af806.config.settings.captcha.alerttype.prompt) {
                var _0x3684e2 =
                    'Captcha detected! Solve the captcha and type ' +
                    _0x2af806.config.prefix +
                    'resume in farm channel'
                const _0x1f84d9 = [
                    'Add-Type -AssemblyName PresentationFramework',
                    '[System.Windows.MessageBox]::' +
                    ("Show('" +
                        _0x3684e2 +
                        "', 'OwO Farm Bot Stable', 'OK', 'Warning')"),
                ]
                const _0x4c0b39 = _0x1f84d9.join('; ')
                _0x2af806.childprocess.exec(
                    'powershell.exe -ExecutionPolicy Bypass -Command "' + _0x4c0b39 + '"'
                )
            }
            if (_0x104d2b.includes('owobot.com/captcha')) {
                let _0x335d97
                let _0x2f565a
                switch (process.platform) {
                    case 'win32':
                        _0x335d97 = 'start'
                        _0x2f565a = (_0x590e7e) => _0x2af806.childprocess.exec(_0x590e7e)
                        break
                    case 'darwin':
                        _0x335d97 = 'open'
                        _0x2f565a = (_0x4d206c) =>
                            _0x2af806.childprocess.spawn(_0x4d206c, [
                                'https://owobot.com/captcha',
                            ])
                        break
                    case 'android':
                        return
                    case 'linux':
                        _0x335d97 = 'xdg-open'
                        _0x2f565a = (_0x1781a6) =>
                            _0x2af806.childprocess.spawn(_0x1781a6, [
                                'https://owobot.com/captcha',
                            ])
                        break
                    default:
                        logger.warn('Bot', 'Captcha', 'Unsupported platform!')
                        return
                }
                if (_0x335d97) {
                    logger.info('Bot', 'Captcha', 'Opening Browser.')
                    _0x2f565a(_0x335d97 + ' https://owobot.com/captcha')
                }
            }
        }
        if (_0x104d2b.includes('i have verified that you are human')) {
            _0x2af806.global.captchadetected = false
            _0x2af806.global.paused = false
            logger.warn('Bot', 'Captcha', 'Captcha Solved. Bot Resuming...')
        }
    }
    let _0x4b20d0 = _0x2af806.config.prefix
    const _0x29ce38 = (_0x2e9afc) =>
        _0x2e9afc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const _0x1d7e56 = new RegExp(
        '^(<@!?' + _0x2af806.user.id + '>|' + _0x29ce38(_0x4b20d0) + ')\\s*'
    )
    if (!_0x1d7e56.test(_0x4e8c25.content)) {
        return
    }
    const [_0x12f9f3] = _0x4e8c25.content.match(_0x1d7e56)
    const _0x58837e = _0x4e8c25.content
        .slice(_0x12f9f3.length)
        .trim()
        .split(/ +/g)
    const _0x241b9d = _0x58837e.shift().toLowerCase()
    const _0x4fa68a =
        _0x2af806.commands.get(_0x241b9d) ||
        _0x2af806.commands.get(_0x2af806.aliases.get(_0x241b9d))
    if (_0x4fa68a) {
        if (_0x4e8c25.author.id !== _0x2af806.config.userid) {
            return
        }
        _0x4fa68a.run(_0x2af806, _0x4e8c25, _0x58837e)
    }
}