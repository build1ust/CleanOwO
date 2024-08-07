module.exports = {
    config: {
        name: "start"
    },
    run: async (j, D, K) => {
        if (j.global.paused) {
            j.global.captchadetected &&= false;
            j.global.paused = false;
            j.rpc("update");
            await D.delete();
            if (j.config.settings.chatfeedback) {
                await D.channel.send({
                    content: "BOT started have fun ;)"
                });
            }
            setTimeout(() => {
                require("../utils/farm.js")(j, D);
            }, 1000);
        } else {
            await D.delete();
            if (j.config.settings.chatfeedback) {
                await D.channel.send({
                    content: "Bot is already working!!!"
                });
            }
        }
    }
};