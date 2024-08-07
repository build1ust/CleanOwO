const fs = require('fs')
const { logger } = require('./logger')
const commandrandomizer = (q) => q[Math.floor(Math.random() * q.length)]
module.exports = async (q, V) => {
    if (q.global.paused || q.global.captchadetected) {
        return
    }
    logger.info('Farm', 'Paused', q.global.paused)
    let X = q.channels.cache.get(q.config.commandschannelid)
    if (q.config.settings.owoprefix.length <= 0) {
        q.config.settings.owoprefix = 'owo'
    }
    if (q.config.settings.inventory.check) {
        checklist(q, X, 'inventory')
    } else {
        if (q.config.settings.checklist.check) {
            checklist(q, X)
        } else {
            await q.delay(2000)
            if (q.config.commands.hunt) {
                hunt(q, X)
            }
            if (q.config.commands.battle) {
                if (q.config.commands.hunt) {
                    await q.delay(2000)
                    battle(q, X)
                }
            }
        }
    }
}
async function checklist(q, V, y) {
    await V.send({
        content:
            commandrandomizer(['owo', q.config.settings.owoprefix]) +
            ' ' +
            commandrandomizer(['cl', 'checklist']),
    }).then(async () => {
        q.global.checklist = true
        logger.info('Farm', 'Checklist', 'Paused: ' + q.global.checklist)
        logger.info('Farm', 'Checklist', 'Reading Checklist')
        let z = null
        do {
            let v = await V.messages.fetch({ limit: 1 })
            if (v.size > 0) {
                z = v.last()
                if (z.author.id !== '408785106942164992') {
                    await new Promise((d) => setTimeout(d, 1000))
                }
            }
        } while (z && z.author.id !== '408785106942164992' && !z.embeds[0])
        await q.delay(2000)
        let a = z.embeds[0].description
        if (a.includes('\u2611️ \uD83C\uDF89')) {
            logger.info('Farm', 'Checklist', 'Checklist Completed')
        } else {
            const e = a.trim().split('\n')
            e.forEach(async (m) => {
                switch (true) {
                    case m.startsWith('\u2B1B \uD83C\uDF81') &&
                        q.config.settings.checklist.types.daily:
                        await V.send({
                            content:
                                commandrandomizer(['owo', q.config.settings.owoprefix]) +
                                ' daily',
                        }).then(() => {
                            logger.info('Farm', 'Checklist - Daily', 'Daily Claimed')
                        })
                        await q.delay(3000)
                        break
                    case m.startsWith('\u2B1B \uD83D\uDCDD') &&
                        q.config.settings.checklist.types.vote:
                        logger.info(
                            'Farm',
                            'Checklist - Vote',
                            'Platform: ' + process.platform
                        )
                        let K
                        let B
                        switch (process.platform) {
                            case 'win32':
                                K = 'start'
                                B = (Q) => q.childprocess.exec(Q)
                                break
                            case 'darwin':
                                K = 'open'
                                B = (Q) =>
                                    q.childprocess.spawn(Q, [
                                        'https://top.gg/bot/408785106942164992/vote',
                                    ])
                                break
                            case 'android':
                                return
                            case 'linux':
                                K = 'xdg-open'
                                B = (Q) =>
                                    q.childprocess.spawn(Q, [
                                        'https://top.gg/bot/408785106942164992/vote',
                                    ])
                                break
                            default:
                                logger.warn('Farm', 'Checklist - Vote', 'Unsupported platform!')
                                return
                        }
                        if (K) {
                            logger.info('Farm', 'Checklist - Vote', 'Opening Browser.')
                            B(K + ' https://top.gg/bot/408785106942164992/vote')
                        }
                        break
                    case m.startsWith('\u2B1B \uD83C\uDF6A') &&
                        q.config.settings.checklist.types.cookie:
                        await V.send({
                            content:
                                commandrandomizer(['owo', q.config.settings.owoprefix]) +
                                ' cookie <@408785106942164992>',
                        }).then(() => {
                            logger.info('Farm', 'Checklist - Cookie', 'Cookie Sended')
                        })
                        await q.delay(3000)
                        break
                }
            })
        }
        await q.delay(2000)
        for (let T = 0; T < 1000; T++) {
            if (q.global.captchadetected === false) {
                q.global.checklist = false
                break
            }
            await q.delay(1000)
        }
        if (y === 'inventory') {
            logger.info('Farm', 'Checklist', 'Paused: ' + q.global.checklist)
            inventory(q, V, 'checklist')
        } else {
            logger.info('Farm', 'Checklist', 'Paused: ' + q.global.checklist)
            if (q.config.commands.hunt) {
                hunt(q, V)
            }
            if (q.config.commands.battle) {
                if (q.config.commands.hunt) {
                    await q.delay(2000)
                    battle(q, V)
                }
            }
        }
    })
}
async function inventory(q, V, y) {
    if (y === 'checklist') {
        if (q.global.captchadetected) {
            return
        }
        q.global.inventory = true
        logger.info('Farm', 'Inventory', 'Paused: ' + q.global.inventory)
        logger.info('Farm', 'Inventory', 'Getting Inventory ...')
        await V.send({
            content: 'owo ' + commandrandomizer(['inv', 'inventory']),
        }).then(async () => {
            let C = null
            do {
                let d = await V.messages.fetch({ limit: 1 })
                if (d.size > 0) {
                    C = d.last()
                    if (C.author.id !== '408785106942164992') {
                        await new Promise((J) => setTimeout(J, 1000))
                    }
                }
            } while (C && C.author.id !== '408785106942164992')
            let z = C.content
            let a = []
            let F
            while ((F = /`([^`]+)`/g.exec(z)) !== null) {
                a.push(F[1])
            }
            for (let e of a) {
                switch (e) {
                    case '050':
                        use(
                            q,
                            V,
                            '' + commandrandomizer(['lb', 'lootbox']),
                            'all',
                            'inventory'
                        )
                        await q.delay(2000)
                        break
                    case '049':
                        use(q, V, 'lootbox fabled', 'all', 'inventory')
                        await q.delay(2000)
                    case '100':
                        use(
                            q,
                            V,
                            '' + commandrandomizer(['wc', 'crate']),
                            'all',
                            'inventory'
                        )
                        await q.delay(2000)
                    default:
                        break
                }
            }
            await q.delay(5000)
            q.global.inventory = false
            logger.info('Farm', 'Inventory', 'Paused: ' + q.global.inventory)
            if (q.config.commands.hunt) {
                hunt(q, V)
            }
            if (q.config.commands.battle) {
                if (q.config.commands.hunt) {
                    await q.delay(2000)
                    battle(q, V)
                }
            }
        })
    } else {
        if (q.global.captchadetected) {
            return
        }
        q.global.inventory = true
        logger.info('Farm', 'Inventory', 'Paused: ' + q.global.inventory)
        logger.info('Farm', 'Inventory', 'Getting Inventory ...')
        await V.send({
            content: 'owo ' + commandrandomizer(['inv', 'inventory']),
        }).then(async () => {
            let z = null
            do {
                let h = await V.messages.fetch({ limit: 1 })
                if (h.size > 0) {
                    z = h.last()
                    if (z.author.id !== '408785106942164992') {
                        await new Promise((J) => setTimeout(J, 1000))
                    }
                }
            } while (z && z.author.id !== '408785106942164992')
            let a = z.content
            let I = []
            let v
            while ((v = /`([^`]+)`/g.exec(a)) !== null) {
                I.push(v[1])
            }
            if (
                q.global.gems.need.length > 0 &&
                q.config.settings.inventory.use.gems
            ) {
                q.global.gems.need.forEach((J) => {
                    switch (J) {
                        case 'gem1':
                            switch (true) {
                                case I.includes('057'):
                                    q.global.gems.use += '57 '
                                    break
                                case I.includes('056'):
                                    q.global.gems.use += '56 '
                                    break
                                case I.includes('055'):
                                    q.global.gems.use += '55 '
                                    break
                                case I.includes('054'):
                                    q.global.gems.use += '54 '
                                    break
                                case I.includes('053'):
                                    q.global.gems.use += '53 '
                                    break
                                case I.includes('052'):
                                    q.global.gems.use += '52 '
                                    break
                                case I.includes('051'):
                                    q.global.gems.use += '51 '
                                    break
                                default:
                                    break
                            }
                            break
                        case 'gem3':
                            switch (true) {
                                case I.includes('071'):
                                    q.global.gems.use += '71 '
                                    break
                                case I.includes('070'):
                                    q.global.gems.use += '70 '
                                    break
                                case I.includes('069'):
                                    q.global.gems.use += '69 '
                                    break
                                case I.includes('068'):
                                    q.global.gems.use += '68 '
                                    break
                                case I.includes('067'):
                                    q.global.gems.use += '67 '
                                    break
                                case I.includes('066'):
                                    q.global.gems.use += '66 '
                                    break
                                case I.includes('065'):
                                    q.global.gems.use += '65 '
                                    break
                                default:
                                    break
                            }
                            break
                        case 'gem4':
                            switch (true) {
                                case I.includes('078'):
                                    q.global.gems.use += '78 '
                                    break
                                case I.includes('077'):
                                    q.global.gems.use += '77 '
                                    break
                                case I.includes('076'):
                                    q.global.gems.use += '76 '
                                    break
                                case I.includes('075'):
                                    q.global.gems.use += '75 '
                                    break
                                case I.includes('074'):
                                    q.global.gems.use += '74 '
                                    break
                                case I.includes('073'):
                                    q.global.gems.use += '73 '
                                    break
                                case I.includes('072'):
                                    q.global.gems.use += '72 '
                                    break
                                default:
                                    break
                            }
                            break
                        case 'star':
                            switch (true) {
                                case I.includes('085'):
                                    q.global.gems.use += '85 '
                                    break
                                case I.includes('084'):
                                    q.global.gems.use += '84 '
                                    break
                                case I.includes('083'):
                                    q.global.gems.use += '83 '
                                    break
                                case I.includes('082'):
                                    q.global.gems.use += '82 '
                                    break
                                case I.includes('081'):
                                    q.global.gems.use += '81 '
                                    break
                                case I.includes('080'):
                                    q.global.gems.use += '80 '
                                    break
                                case I.includes('079'):
                                    q.global.gems.use += '79 '
                                    break
                                default:
                                    break
                            }
                            break
                        default:
                            break
                    }
                })
            } else {
                for (let J of I) {
                    switch (J) {
                        case '050':
                            use(
                                q,
                                V,
                                '' + commandrandomizer(['lb', 'lootbox']),
                                'all',
                                'inventory'
                            )
                            await q.delay(2000)
                            break
                        case '049':
                            use(q, V, 'lootbox fabled', 'all', 'inventory')
                            await q.delay(2000)
                            break
                        case '100':
                            use(
                                q,
                                V,
                                '' + commandrandomizer(['wc', 'crate']),
                                'all',
                                'inventory'
                            )
                            await q.delay(2000)
                        default:
                            break
                    }
                }
            }
            if (q.global.gems.use.length > 0) {
                use(q, V, 'use ' + q.global.gems.use, '', 'inventory')
                q.global.gems.need = []
                q.global.gems.use = ''
            }
            q.global.inventory = false
            logger.info('Farm', 'Inventory', 'Paused: ' + q.global.inventory)
        })
    }
}
async function hunt(q, V) {
    if (
        q.global.paused ||
        q.global.captchadetected ||
        q.global.use ||
        q.global.inventory ||
        q.global.checklist
    ) {
        return
    }
    if (q.global.battle) {
        await q.delay(1500)
    }
    q.global.hunt = true
    await V.send({
        content:
            commandrandomizer(['owo', q.config.settings.owoprefix]) +
            ' ' +
            commandrandomizer(['h', 'hunt']),
    }).then(async () => {
        q.global.total.hunt++
        logger.info('Farm', 'Hunt', 'Total Hunt: ' + q.global.total.hunt)
        if (q.config.settings.inventory.use.gems) {
            let X = null
            do {
                let z = await V.messages.fetch({ limit: 1 })
                if (z.size > 0) {
                    X = z.last()
                    if (
                        X.author.id !== '408785106942164992' &&
                        !X.content.includes('**\uD83C\uDF31 | !')
                    ) {
                        await new Promise((a) => setTimeout(a, 1000))
                    }
                }
            } while (
                X &&
                X.author.id !== '408785106942164992' &&
                !X.content.includes('**\uD83C\uDF31 | !')
            )
            let O = X.content
            q.global.gems.need = []
            q.global.gems.use = ''
            if (O) {
                let a = ['gem1', 'gem3', 'gem4', 'star']
                a.forEach((I) => {
                    if (!O.includes(I)) {
                        q.global.gems.need.push(I)
                    }
                })
                if (q.global.gems.need.length > 0) {
                    logger.warn('Farm', 'Hunt', 'Missing gems: ' + q.global.gems.need)
                }
            }
        }
        await q.delay(1000)
        q.global.hunt = false
    })
    if (q.config.settings.autophrases) {
        await elaina2(q, V)
    }
    await q.delay(10500)
    if (q.config.settings.inventory.check) {
        await inventory(q, V)
    }
    setInterval(async () => {
        if (
            q.global.paused ||
            q.global.captchadetected ||
            q.global.use ||
            q.global.inventory ||
            q.global.checklist
        ) {
            return
        }
        if (q.global.battle) {
            await q.delay(1500)
        }
        q.global.hunt = true
        await V.send({
            content:
                commandrandomizer(['owo', q.config.settings.owoprefix]) +
                ' ' +
                commandrandomizer(['h', 'hunt']),
        }).then(async () => {
            q.global.total.hunt++
            logger.info('Farm', 'Hunt', 'Total Hunt: ' + q.global.total.hunt)
            if (q.config.settings.inventory.use.gems) {
                let O = null
                do {
                    let a = await V.messages.fetch({ limit: 1 })
                    if (a.size > 0) {
                        O = a.last()
                        if (
                            O.author.id !== '408785106942164992' &&
                            !O.content.includes('**\uD83C\uDF31 | !')
                        ) {
                            await new Promise((I) => setTimeout(I, 1000))
                        }
                    }
                } while (
                    O &&
                    O.author.id !== '408785106942164992' &&
                    !O.content.includes('**\uD83C\uDF31 | !')
                )
                let C = O.content
                q.global.gems.need = []
                q.global.gems.use = ''
                if (C) {
                    let I = ['gem1', 'gem3', 'gem4', 'star']
                    I.forEach((F) => {
                        if (!C.includes(F)) {
                            q.global.gems.need.push(F)
                        }
                    })
                    if (q.global.gems.need.length > 0) {
                        logger.warn('Farm', 'Hunt', 'Missing gems: ' + q.global.gems.need)
                    }
                }
            }
            q.global.hunt = false
        })
        if (q.config.settings.autophrases) {
            await elaina2(q, V)
        }
        await q.delay(10500)
        if (q.config.settings.inventory.check) {
            await inventory(q, V)
        }
    }, 16200)
}
async function battle(q, V) {
    if (
        q.global.paused ||
        q.global.captchadetected ||
        q.global.use ||
        q.global.checklist ||
        q.global.inventory
    ) {
        return
    }
    if (q.global.hunt) {
        await q.delay(1500)
    }
    q.global.battle = true
    await V.send({
        content:
            commandrandomizer(['owo', q.config.settings.owoprefix]) +
            ' ' +
            commandrandomizer(['b', 'battle']),
    }).then(() => {
        q.global.total.battle++
        logger.info('Farm', 'Battle', 'Total Battle: ' + q.global.total.battle)
        q.global.battle = false
    })
    setInterval(async () => {
        if (
            q.global.paused ||
            q.global.captchadetected ||
            q.global.use ||
            q.global.checklist ||
            q.global.inventory
        ) {
            return
        }
        if (q.global.hunt) {
            await q.delay(1500)
        }
        q.global.battle = true
        await V.send({
            content:
                commandrandomizer(['owo', q.config.settings.owoprefix]) +
                ' ' +
                commandrandomizer(['b', 'battle']),
        }).then(async () => {
            q.global.total.battle++
            logger.info('Farm', 'Battle', 'Total Battle: ' + q.global.total.battle)
            q.global.battle = false
        })
    }, 18400)
}
async function use(q, V, y, X, O) {
    if (q.global.paused && O !== 'inventory') {
        return
    }
    q.global.use = true
    await V.send({
        content:
            commandrandomizer(['owo', q.config.settings.owoprefix]) +
            ' ' +
            y +
            ' ' +
            X,
    })
    logger.info('Farm', 'Use', y)
    await q.delay('5000')
    q.global.use = false
}
async function sell(q, V) {
    let X
    await V.send({
        content:
            commandrandomizer(['owo', q.config.settings.owoprefix]) + ' sell ' + X,
    }).then(async () => { })
}
async function elaina2(V, y) {
    if (V.global.captchadetected) {
        return
    }
    V.fs.readFile('./phrases/phrases.json', 'utf8', async (C, z) => {
        const a = JSON.parse(z)
        const I = a.phrases
        if (!I || !I.length) {
            return logger.alert(
                'Farm',
                'Phrases',
                'Phrases array is undefined or empty.'
            )
        }
        let F = Math.floor(Math.random() * I.length)
        let v = I[F]
        const d = { content: v }
        await y.send(d)
        logger.info('Farm', 'Phrases', 'Successfuly Sended')
    })
}
