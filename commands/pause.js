module.exports = {
    config: {
        name: 'pause',
        aliases: ['stop'],
    },
    run: async (_0x55c0a1, _0x8aead3, _0x53fec8) => {
        if (_0x55c0a1.global.paused) {
            await _0x8aead3.delete()
            if (_0x55c0a1.config.settings.chatfeedback) {
                await _0x8aead3.channel.send({ content: 'Bot is already paused!!!' })
            }
        } else {
            _0x55c0a1.global.paused = true
            _0x55c0a1.rpc('update')
            await _0x8aead3.delete()
            if (_0x55c0a1.config.settings.chatfeedback) {
                await _0x8aead3.channel.send({ content: 'Paused :)' })
            }
        }
    },
}