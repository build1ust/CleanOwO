module.exports = {
    config: {
        name: 'start'
    },
    run: async (_0x123657, _0x1a1fc8, _0x33eb35) => {
        if (_0x123657.global.paused) {
            _0x123657.global.captchadetected &&= false
            _0x123657.global.paused = false
            _0x123657.rpc('update')
            await _0x1a1fc8.delete()
            if (_0x123657.config.settings.chatfeedback) {
                await _0x1a1fc8.channel.send({ content: 'BOT started have fun ;)' })
            }
            setTimeout(() => {
                require('../utils/farm.js')(_0x123657, _0x1a1fc8)
            }, 1000)
        } else {
            await _0x1a1fc8.delete()
            if (_0x123657.config.settings.chatfeedback) {
                await _0x1a1fc8.channel.send({ content: 'Bot is already working!!!' })
            }
        }
    },
}
