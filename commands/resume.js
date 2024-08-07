module.exports = {
    config: {
        name: "resume"
    },
    run: async (i, c) => {
        if (i.global.paused) {
            i.global.captchadetected &&= false;
            i.global.paused = false;
            i.rpc("update");
            await c.delete();
            if (i.config.settings.chatfeedback) {
                await c.channel.send({
                    content: "Resuming :)"
                });
            }
        } else {
            await c.delete();
            if (i.config.settings.chatfeedback) {
                await c.channel.send({
                    content: "Bot is already working!!!"
                });
            }
        }
    }
};