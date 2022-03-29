const { JSDOM } = require('jsdom')
const path = require('path')

const render = async (filename) => {
    const filepath = path.join(process.cwd(), filename)

    const dom = await JSDOM.fromFile(filepath, {
        runScripts: 'dangerously',
        resources: 'usable',
    })

    return new Promise((resolve, reject) => {
        dom.window.document.addEventListener('DOMContentLoaded', () => {
            resolve(dom)
        })
    })
}

module.exports = render