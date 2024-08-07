module.exports = {
    config: {
        name: "pause",
        aliases: ["stop"]
    },
    run: async (s, S) => {
        if (s.global.paused) {
            await S.delete();
            if (s.config.settings.chatfeedback) {
                await S.channel.send({
                    content: "Bot is already paused!!!"
                });
            }
        } else {
            s.global.paused = true;
            s.rpc("update");
            await S.delete();
            if (s.config.settings.chatfeedback) {
                await S.channel.send({
                    content: "Paused :)"
                });
            }
        }
    }
};