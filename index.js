#!/usr/bin/env node

const Runner = require('./runner')
const path = require('path')

const runner = new Runner()
const run = async () => {
    const files = await runner.collectFiles(process.cwd())
    await runner.runFiles()
}

run()