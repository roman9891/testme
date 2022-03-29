const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const render = require('./render')

const forbiddenDirs = ['node_modules']

class Runner {
    constructor() {
        this.testFiles = []
    }

    async runFiles() {
        for (let file of this.testFiles) {
            const beforeEaches = []
            global.render = render
            global.assert = require('assert')
            global.beforeEach = (fn) => {
                beforeEaches.push(fn)
            }
            global.it = async (desc, fn) => {
                beforeEaches.forEach(beforeEachFunction => beforeEachFunction())
                try {
                    await fn()
                    console.log(chalk.green(`\tOK - ${desc}`))
                } catch(error) {
                    const message = error.message.replace(/\n/g, '\n\t\t')
                    console.log(chalk.red(`\tX - ${desc}`))
                    console.log(chalk.red('\n\t', message))
                }    
            }
            
            try {
                console.log(chalk.gray(`--- ${file.shortName}`))
                require(file.name)
            } catch(error) {
                console.log(error)
            }
        }
    }

    async collectFiles(targetPath) {
        const files = await fs.promises.readdir(targetPath)

        for (let file of files) {
            const filepath = path.join(targetPath, file)
            const stats = await fs.promises.lstat(filepath)

            if (stats.isFile() && file.includes('.test.js')) this.testFiles.push({ name: filepath, shortName: file })
            else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
                const childFiles = await fs.promises.readdir(filepath)

                files.push(...childFiles.map(f => path.join(file, f)))
            }
        }
    }
}

module.exports = Runner