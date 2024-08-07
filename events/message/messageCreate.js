const {
    logger
} = require("../../utils/logger");
module.exports = async (w, k) => {
    const N = {
        TFTSA: "Bot",
        IDsLS: "Captcha",
        dkjwO: "Add-Type -AssemblyName PresentationFramework",
        hDvAi: function (u, M) {
            return u + M;
        },
        ZGRIM: "[System.Windows.MessageBox]::",
        oynoH: function (u, M) {
            return u !== M;
        },
        ycatW: "Captcha Detected!",
        ftOKq: "./assets/captcha.png",
        Yshcu: "OwO Farm Bot Stable",
        ocExs: "Opening Browser.",
        leyPk: function (u, M) {
            return u(M);
        },
        NnkhE: function (u, M) {
            return u === M;
        },
        CbMwJ: "408785106942164992",
        QRebd: "please complete your captcha",
        wvDdS: "verify that you are human",
        mZbpw: "are you a real human",
        mfdNt: "please use the link below so i can check",
        QrHWp: function (u, M) {
            return u === M;
        },
        LfFtf: "rUCAU",
        OdigY: "wUSkX",
        yHgFg: "grwNV",
        ZMrsE: "ZAMMS",
        GTbhY: "owobot.com/captcha",
        zHJHJ: function (u, M) {
            return u === M;
        },
        fGiEw: "DmihL",
        Zdcqc: "win32",
        SvYEH: "start",
        MFWDm: "darwin",
        gBmYv: "open",
        niDBK: "android",
        EHhLV: "linux",
        EdIAH: "xdg-open",
        MHPzO: "Unsupported platform!",
        ovDwo: function (u, M) {
            return u === M;
        },
        gioig: "KreLh",
        BleVc: "XGVXW",
        tTXMv: "i have verified that you are human"
    };
    let d = k.content.toLowerCase();
    if (N.NnkhE(k.author.id, N.CbMwJ)) {
        if (d.includes(N.QRebd) || d.includes(N.wvDdS) || d.includes(N.mZbpw) || d.includes(N.mfdNt)) {
            if (N.QrHWp(N.LfFtf, N.OdigY)) {
                d.global.captchadetected = false;
                n.global.paused = false;
                j.warn(N.TFTSA, N.IDsLS, "Captcha Solved. Bot Resuming...");
            } else {
                w.global.paused = true;
                w.global.captchadetected = true;
                w.global.total.captcha++;
                logger.alert(N.TFTSA, N.IDsLS, "Captcha Detected!!!");
                logger.info(N.TFTSA, N.IDsLS, "Total Captcha: " + w.global.total.captcha);
                logger.warn(N.TFTSA, N.IDsLS, "Bot Paused: " + w.global.paused);
                if (w.config.settings.captcha.alerttype.notification) {
                    if (N.oynoH(N.yHgFg, N.yHgFg)) {
                        var Y = "Captcha detected! Solve the captcha and type " + N.config.prefix + "resume in farm channel";
                        const L = [N.dkjwO, N.hDvAi(N.ZGRIM, "Show('" + Y + "', 'OwO Farm Bot Stable', 'OK', 'Warning')")];
                        const r = L.join("; ");
                        d.childprocess.exec("powershell.exe -ExecutionPolicy Bypass -Command \"" + r + "\"");
                    } else {
                        w.notifier.notify({
                            title: N.ycatW,
                            message: "Solve the captcha and type " + w.config.prefix + "resume in farm channel",
                            icon: N.ftOKq,
                            sound: true,
                            wait: true,
                            appID: N.Yshcu
                        });
                    }
                }
                if (w.config.settings.captcha.alerttype.prompt) {
                    if (N.NnkhE(N.ZMrsE, N.ZMrsE)) {
                        var n = "Captcha detected! Solve the captcha and type " + w.config.prefix + "resume in farm channel";
                        const Y = [N.dkjwO, N.hDvAi(N.ZGRIM, "Show('" + n + "', 'OwO Farm Bot Stable', 'OK', 'Warning')")];
                        const L = Y.join("; ");
                        w.childprocess.exec("powershell.exe -ExecutionPolicy Bypass -Command \"" + L + "\"");
                    } else {
                        if (N.oynoH(a.author.id, q.config.userid)) {
                            return;
                        }
                        h.run(S, P, t);
                    }
                }
                if (d.includes(N.GTbhY)) {
                    if (N.zHJHJ(N.fGiEw, N.fGiEw)) {
                        let z;
                        let A;
                        switch (process.platform) {
                            case N.Zdcqc:
                                z = N.SvYEH;
                                A = U => w.childprocess.exec(U);
                                break;
                            case N.MFWDm:
                                z = N.gBmYv;
                                A = U => w.childprocess.spawn(U, ["https://owobot.com/captcha"]);
                                break;
                            case N.niDBK:
                                return;
                            case N.EHhLV:
                                z = N.EdIAH;
                                A = U => w.childprocess.spawn(U, ["https://owobot.com/captcha"]);
                                break;
                            default:
                                logger.warn(N.TFTSA, N.IDsLS, N.MHPzO);
                                return;
                        }
                        if (z) {
                            if (N.ovDwo(N.gioig, N.BleVc)) {
                                const y = {
                                    title: N.ycatW,
                                    message: "Solve the captcha and type " + d.config.prefix + "resume in farm channel",
                                    icon: N.ftOKq,
                                    sound: true,
                                    wait: true,
                                    appID: N.Yshcu
                                };
                                N.notifier.notify(y);
                            } else {
                                logger.info(N.TFTSA, N.IDsLS, N.ocExs);
                                N.leyPk(A, z + " https://owobot.com/captcha");
                            }
                        }
                    } else {
                        d.info(N.TFTSA, N.IDsLS, N.ocExs);
                        N.leyPk(n, j + " https://owobot.com/captcha");
                    }
                }
            }
        }
        if (d.includes(N.tTXMv)) {
            w.global.captchadetected = false;
            w.global.paused = false;
            logger.warn(N.TFTSA, N.IDsLS, "Captcha Solved. Bot Resuming...");
        }
    }
    let j = w.config.prefix;
    const a = T => T.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const q = new RegExp("^(<@!?" + w.user.id + ">|" + N.leyPk(a, j) + ")\\s*");
    if (!q.test(k.content)) {
        return;
    }
    const [h] = k.content.match(q);
    const S = k.content.slice(h.length).trim().split(/ +/g);
    const P = S.shift().toLowerCase();
    const t = w.commands.get(P) || w.commands.get(w.aliases.get(P));
    if (t) {
        if (N.oynoH(k.author.id, w.config.userid)) {
            return;
        }
        t.run(w, k, S);
    }
};