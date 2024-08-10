const fs2 = require('fs')
const { logger } = require('./logger')
const vF = (p3) => p3[Math.floor(Math.random() * p3.length)]
module.exports = async (p4, p5) => {
    if (p4.global.paused || p4.global.captchadetected) {
        return
    }
    logger.info('Farm', 'Paused', p4.global.paused)
    let v3 = p4.channels.cache.get(p4.config.commandschannelid)
    if (p4.config.settings.owoprefix.length <= 0) {
        p4.config.settings.owoprefix = 'owo'
    }
    if (p4.config.settings.inventory.check) {
        f(p4, v3, 'inventory')
    } else {
        if (p4.config.settings.checklist.check) {
            f(p4, v3)
        } else {
            await p4.delay(2000)
            if (p4.config.commands.hunt) {
                f5(p4, v3)
            }
            if (p4.config.commands.battle) {
                if (p4.config.commands.hunt) {
                    await p4.delay(2000)
                    f6(p4, v3)
                }
            }
        }
    }
}
async function f(p21, p22, p23) {
    await p22
        .send({
            content:
                vF(['owo', p21.config.settings.owoprefix]) +
                ' ' +
                vF(['cl', 'checklist']),
        })
        .then(async () => {
            p21.global.checklist = true
            logger.info('Farm', 'Checklist', 'Paused: ' + p21.global.checklist)
            logger.info('Farm', 'Checklist', 'Reading Checklist')
            let v6 = null
            do {
                let v8 = await p22.messages.fetch({ limit: 1 })
                if (v8.size > 0) {
                    v6 = v8.last()
                    if (v6.author.id !== '408785106942164992') {
                        await new Promise((p50) => setTimeout(p50, 1000))
                    }
                }
            } while (v6 && v6.author.id !== '408785106942164992' && !v6.embeds[0])
            await p21.delay(2000)
            let v9 = v6.embeds[0].description
            if (v9.includes('\u2611️ \uD83C\uDF89')) {
                logger.info('Farm', 'Checklist', 'Checklist Completed')
            } else {
                const v10 = v9.trim().split('\n')
                v10.forEach(async (p51) => {
                    switch (true) {
                        case p51.startsWith('\u2B1B \uD83C\uDF81') &&
                            p21.config.settings.checklist.types.daily:
                            await p22
                                .send({
                                    content:
                                        vF(['owo', p21.config.settings.owoprefix]) + ' daily',
                                })
                                .then(() => {
                                    logger.info('Farm', 'Checklist - Daily', 'Daily Claimed')
                                })
                            await p21.delay(3000)
                            break
                        case p51.startsWith('\u2B1B \uD83D\uDCDD') &&
                            p21.config.settings.checklist.types.vote:
                            logger.info(
                                'Farm',
                                'Checklist - Vote',
                                'Platform: ' + process.platform
                            )
                            let v12
                            let v13
                            switch (process.platform) {
                                case 'win32':
                                    v12 = 'start'
                                    v13 = (p52) => p21.childprocess.exec(p52)
                                    break
                                case 'darwin':
                                    v12 = 'open'
                                    v13 = (p53) =>
                                        p21.childprocess.spawn(p53, [
                                            'https://top.gg/bot/408785106942164992/vote',
                                        ])
                                    break
                                case 'android':
                                    return
                                case 'linux':
                                    v12 = 'xdg-open'
                                    v13 = (p54) =>
                                        p21.childprocess.spawn(p54, [
                                            'https://top.gg/bot/408785106942164992/vote',
                                        ])
                                    break
                                default:
                                    logger.warn(
                                        'Farm',
                                        'Checklist - Vote',
                                        'Unsupported platform!'
                                    )
                                    return
                            }
                            if (v12) {
                                logger.info('Farm', 'Checklist - Vote', 'Opening Browser.')
                                v13(v12 + ' https://top.gg/bot/408785106942164992/vote')
                            }
                            break
                        case p51.startsWith('\u2B1B \uD83C\uDF6A') &&
                            p21.config.settings.checklist.types.cookie:
                            await p22
                                .send({
                                    content:
                                        vF(['owo', p21.config.settings.owoprefix]) +
                                        ' cookie <@408785106942164992>',
                                })
                                .then(() => {
                                    logger.info('Farm', 'Checklist - Cookie', 'Cookie Sended')
                                })
                            await p21.delay(3000)
                            break
                    }
                })
            }
            await p21.delay(2000)
            for (let v14 = 0; v14 < 1000; v14++) {
                if (p21.global.captchadetected === false) {
                    p21.global.checklist = false
                    break
                }
                await p21.delay(1000)
            }
            if (p23 === 'inventory') {
                logger.info('Farm', 'Checklist', 'Paused: ' + p21.global.checklist)
                f2(p21, p22, 'checklist')
            } else {
                logger.info('Farm', 'Checklist', 'Paused: ' + p21.global.checklist)
                if (p21.config.commands.hunt) {
                    f5(p21, p22)
                }
                if (p21.config.commands.battle) {
                    if (p21.config.commands.hunt) {
                        await p21.delay(2000)
                        f6(p21, p22)
                    }
                }
            }
        })
}
async function f2(p55, p56, p57) {
    if (p57 === 'checklist') {
        if (p55.global.captchadetected) {
            return
        }
        p55.global.inventory = true
        logger.info('Farm', 'Inventory', 'Paused: ' + p55.global.inventory)
        logger.info('Farm', 'Inventory', 'Getting Inventory ...')
        await p56
            .send({
                content: 'owo ' + vF(['inv', 'inventory']),
            })
            .then(async () => {
                let v16 = null
                do {
                    let v18 = await p56.messages.fetch({ limit: 1 })
                    if (v18.size > 0) {
                        v16 = v18.last()
                        if (v16.author.id !== '408785106942164992') {
                            await new Promise((p109) => setTimeout(p109, 1000))
                        }
                    }
                } while (v16 && v16.author.id !== '408785106942164992')
                let v19 = v16.content
                let v20 = []
                let v22
                while ((v22 = /`([^`]+)`/g.exec(v19)) !== null) {
                    v20.push(v22[1])
                }
                for (let v23 of v20) {
                    switch (v23) {
                        case '050':
                            f7(p55, p56, '' + vF(['lb', 'lootbox']), 'all', 'inventory')
                            await p55.delay(2000)
                            break
                        case '049':
                            f7(p55, p56, 'lootbox fabled', 'all', 'inventory')
                            await p55.delay(2000)
                        case '100':
                            f7(p55, p56, '' + vF(['wc', 'crate']), 'all', 'inventory')
                            await p55.delay(2000)
                        default:
                            break
                    }
                }
                await p55.delay(5000)
                p55.global.inventory = false
                logger.info('Farm', 'Inventory', 'Paused: ' + p55.global.inventory)
                if (p55.config.commands.hunt) {
                    f5(p55, p56)
                }
                if (p55.config.commands.battle) {
                    if (p55.config.commands.hunt) {
                        await p55.delay(2000)
                        f6(p55, p56)
                    }
                }
            })
    } else {
        if (p55.global.captchadetected) {
            return
        }
        p55.global.inventory = true
        logger.info('Farm', 'Inventory', 'Paused: ' + p55.global.inventory)
        logger.info('Farm', 'Inventory', 'Getting Inventory ...')
        await p56
            .send({
                content: 'owo ' + vF(['inv', 'inventory']),
            })
            .then(async () => {
                let v25 = null
                do {
                    let v27 = await p56.messages.fetch({ limit: 1 })
                    if (v27.size > 0) {
                        v25 = v27.last()
                        if (v25.author.id !== '408785106942164992') {
                            await new Promise((p110) => setTimeout(p110, 1000))
                        }
                    }
                } while (v25 && v25.author.id !== '408785106942164992')
                let v28 = v25.content
                let v29 = []
                let v31
                while ((v31 = /`([^`]+)`/g.exec(v28)) !== null) {
                    v29.push(v31[1])
                }
                if (
                    p55.global.gems.need.length > 0 &&
                    p55.config.settings.inventory.use.gems
                ) {
                    p55.global.gems.need.forEach((p111) => {
                        switch (p111) {
                            case 'gem1':
                                switch (true) {
                                    case v29.includes('057'):
                                        p55.global.gems.use += '57 '
                                        break
                                    case v29.includes('056'):
                                        p55.global.gems.use += '56 '
                                        break
                                    case v29.includes('055'):
                                        p55.global.gems.use += '55 '
                                        break
                                    case v29.includes('054'):
                                        p55.global.gems.use += '54 '
                                        break
                                    case v29.includes('053'):
                                        p55.global.gems.use += '53 '
                                        break
                                    case v29.includes('052'):
                                        p55.global.gems.use += '52 '
                                        break
                                    case v29.includes('051'):
                                        p55.global.gems.use += '51 '
                                        break
                                    default:
                                        break
                                }
                                break
                            case 'gem3':
                                switch (true) {
                                    case v29.includes('071'):
                                        p55.global.gems.use += '71 '
                                        break
                                    case v29.includes('070'):
                                        p55.global.gems.use += '70 '
                                        break
                                    case v29.includes('069'):
                                        p55.global.gems.use += '69 '
                                        break
                                    case v29.includes('068'):
                                        p55.global.gems.use += '68 '
                                        break
                                    case v29.includes('067'):
                                        p55.global.gems.use += '67 '
                                        break
                                    case v29.includes('066'):
                                        p55.global.gems.use += '66 '
                                        break
                                    case v29.includes('065'):
                                        p55.global.gems.use += '65 '
                                        break
                                    default:
                                        break
                                }
                                break
                            case 'gem4':
                                switch (true) {
                                    case v29.includes('078'):
                                        p55.global.gems.use += '78 '
                                        break
                                    case v29.includes('077'):
                                        p55.global.gems.use += '77 '
                                        break
                                    case v29.includes('076'):
                                        p55.global.gems.use += '76 '
                                        break
                                    case v29.includes('075'):
                                        p55.global.gems.use += '75 '
                                        break
                                    case v29.includes('074'):
                                        p55.global.gems.use += '74 '
                                        break
                                    case v29.includes('073'):
                                        p55.global.gems.use += '73 '
                                        break
                                    case v29.includes('072'):
                                        p55.global.gems.use += '72 '
                                        break
                                    default:
                                        break
                                }
                                break
                            case 'star':
                                switch (true) {
                                    case v29.includes('085'):
                                        p55.global.gems.use += '85 '
                                        break
                                    case v29.includes('084'):
                                        p55.global.gems.use += '84 '
                                        break
                                    case v29.includes('083'):
                                        p55.global.gems.use += '83 '
                                        break
                                    case v29.includes('082'):
                                        p55.global.gems.use += '82 '
                                        break
                                    case v29.includes('081'):
                                        p55.global.gems.use += '81 '
                                        break
                                    case v29.includes('080'):
                                        p55.global.gems.use += '80 '
                                        break
                                    case v29.includes('079'):
                                        p55.global.gems.use += '79 '
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
                    for (let v32 of v29) {
                        switch (v32) {
                            case '050':
                                f7(p55, p56, '' + vF(['lb', 'lootbox']), 'all', 'inventory')
                                await p55.delay(2000)
                                break
                            case '049':
                                f7(p55, p56, 'lootbox fabled', 'all', 'inventory')
                                await p55.delay(2000)
                                break
                            case '100':
                                f7(p55, p56, '' + vF(['wc', 'crate']), 'all', 'inventory')
                                await p55.delay(2000)
                            default:
                                break
                        }
                    }
                }
                if (p55.global.gems.use.length > 0) {
                    f7(p55, p56, 'use ' + p55.global.gems.use, '', 'inventory')
                    p55.global.gems.need = []
                    p55.global.gems.use = ''
                }
                p55.global.inventory = false
                logger.info('Farm', 'Inventory', 'Paused: ' + p55.global.inventory)
            })
    }
}
async function f5(p116, p117) {
    if (
        p116.global.paused ||
        p116.global.captchadetected ||
        p116.global.use ||
        p116.global.inventory ||
        p116.global.checklist
    ) {
        return
    }
    if (p116.global.battle) {
        await p116.delay(1500)
    }
    p116.global.hunt = true
    await p117
        .send({
            content:
                vF(['owo', p116.config.settings.owoprefix]) + ' ' + vF(['h', 'hunt']),
        })
        .then(async () => {
            p116.global.total.hunt++
            logger.info('Farm', 'Hunt', 'Total Hunt: ' + p116.global.total.hunt)
            if (p116.config.settings.inventory.use.gems) {
                let v36 = null
                do {
                    let v38 = await p117.messages.fetch({ limit: 1 })
                    if (v38.size > 0) {
                        v36 = v38.last()
                        if (
                            v36.author.id !== '408785106942164992' &&
                            !v36.content.includes('**\uD83C\uDF31 | !')
                        ) {
                            await new Promise((p145) => setTimeout(p145, 1000))
                        }
                    }
                } while (
                    v36 &&
                    v36.author.id !== '408785106942164992' &&
                    !v36.content.includes('**\uD83C\uDF31 | !')
                )
                let v39 = v36.content
                p116.global.gems.need = []
                p116.global.gems.use = ''
                if (v39) {
                    let v40 = ['gem1', 'gem3', 'gem4', 'star']
                    v40.forEach((p146) => {
                        if (!v39.includes(p146)) {
                            p116.global.gems.need.push(p146)
                        }
                    })
                    if (p116.global.gems.need.length > 0) {
                        logger.warn(
                            'Farm',
                            'Hunt',
                            'Missing gems: ' + p116.global.gems.need
                        )
                    }
                }
            }
            await p116.delay(1000)
            p116.global.hunt = false
        })
    if (p116.config.settings.autophrases) {
        await f9(p116, p117)
    }
    await p116.delay(10500)
    if (p116.config.settings.inventory.check) {
        await f2(p116, p117)
    }
    setInterval(async () => {
        if (
            p116.global.paused ||
            p116.global.captchadetected ||
            p116.global.use ||
            p116.global.inventory ||
            p116.global.checklist
        ) {
            return
        }
        if (p116.global.battle) {
            await p116.delay(1500)
        }
        p116.global.hunt = true
        await p117
            .send({
                content:
                    vF(['owo', p116.config.settings.owoprefix]) + ' ' + vF(['h', 'hunt']),
            })
            .then(async () => {
                p116.global.total.hunt++
                logger.info('Farm', 'Hunt', 'Total Hunt: ' + p116.global.total.hunt)
                if (p116.config.settings.inventory.use.gems) {
                    let v41 = null
                    do {
                        let v43 = await p117.messages.fetch({ limit: 1 })
                        if (v43.size > 0) {
                            v41 = v43.last()
                            if (
                                v41.author.id !== '408785106942164992' &&
                                !v41.content.includes('**\uD83C\uDF31 | !')
                            ) {
                                await new Promise((p147) => setTimeout(p147, 1000))
                            }
                        }
                    } while (
                        v41 &&
                        v41.author.id !== '408785106942164992' &&
                        !v41.content.includes('**\uD83C\uDF31 | !')
                    )
                    let v44 = v41.content
                    p116.global.gems.need = []
                    p116.global.gems.use = ''
                    if (v44) {
                        let v45 = ['gem1', 'gem3', 'gem4', 'star']
                        v45.forEach((p148) => {
                            if (!v44.includes(p148)) {
                                p116.global.gems.need.push(p148)
                            }
                        })
                        if (p116.global.gems.need.length > 0) {
                            logger.warn(
                                'Farm',
                                'Hunt',
                                'Missing gems: ' + p116.global.gems.need
                            )
                        }
                    }
                }
                p116.global.hunt = false
            })
        if (p116.config.settings.autophrases) {
            await f9(p116, p117)
        }
        await p116.delay(10500)
        if (p116.config.settings.inventory.check) {
            await f2(p116, p117)
        }
    }, 16200)
}
async function f6(p149, p150) {
    if (
        p149.global.paused ||
        p149.global.captchadetected ||
        p149.global.use ||
        p149.global.checklist ||
        p149.global.inventory
    ) {
        return
    }
    if (p149.global.hunt) {
        await p149.delay(1500)
    }
    p149.global.battle = true
    await p150
        .send({
            content:
                vF(['owo', p149.config.settings.owoprefix]) + ' ' + vF(['b', 'battle']),
        })
        .then(() => {
            p149.global.total.battle++
            logger.info('Farm', 'Battle', 'Total Battle: ' + p149.global.total.battle)
            p149.global.battle = false
        })
    setInterval(async () => {
        if (
            p149.global.paused ||
            p149.global.captchadetected ||
            p149.global.use ||
            p149.global.checklist ||
            p149.global.inventory
        ) {
            return
        }
        if (p149.global.hunt) {
            await p149.delay(1500)
        }
        p149.global.battle = true
        await p150
            .send({
                content:
                    vF(['owo', p149.config.settings.owoprefix]) +
                    ' ' +
                    vF(['b', 'battle']),
            })
            .then(async () => {
                p149.global.total.battle++
                logger.info(
                    'Farm',
                    'Battle',
                    'Total Battle: ' + p149.global.total.battle
                )
                p149.global.battle = false
            })
    }, 18400)
}
async function f7(p160, p161, p162, p163, p164) {
    if (p160.global.paused && p164 !== 'inventory') {
        return
    }
    p160.global.use = true
    await p161.send({
        content:
            vF(['owo', p160.config.settings.owoprefix]) + ' ' + p162 + ' ' + p163,
    })
    logger.info('Farm', 'Use', p162)
    await p160.delay('5000')
    p160.global.use = false
}
async function f8(p169, p170) {
    let v51
    await p170
        .send({
            content: vF(['owo', p169.config.settings.owoprefix]) + ' sell ' + v51,
        })
        .then(async () => { })
}
async function f9(p173, p174) {
    if (p173.global.captchadetected) {
        return
    }
    p173.fs.readFile('./phrases/phrases.json', 'utf8', async (p177, p178) => {
        const v53 = JSON.parse(p178)
        const v54 = v53.phrases
        if (!v54 || !v54.length) {
            return logger.alert(
                'Farm',
                'Phrases',
                'Phrases array is undefined or empty.'
            )
        }
        let v55 = Math.floor(Math.random() * v54.length)
        let v56 = v54[v55]
        const v57 = { content: v56 }
        await p174.send(v57)
        logger.info('Farm', 'Phrases', 'Successfuly Sended')
    })
}
