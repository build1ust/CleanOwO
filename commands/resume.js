module.exports = {
    config: {
        name: 'resume'
    },
    run: async (_0x4d8797, _0x19c3d0, _0x4dd3ed) => {
        if (_0x4d8797.global.paused) {
            _0x4d8797.global.captchadetected &&= false
            _0x4d8797.global.paused = false
            _0x4d8797.rpc('update')
            await _0x19c3d0.delete()
            if (_0x4d8797.config.settings.chatfeedback) {
                await _0x19c3d0.channel.send({ content: 'Resuming :)' })
            }
        } else {
            await _0x19c3d0.delete()
            if (_0x4d8797.config.settings.chatfeedback) {
                await _0x19c3d0.channel.send({ content: 'Bot is already working!!!' })
            }
        }
    },
}
