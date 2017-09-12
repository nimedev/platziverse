'use strict'

const debug = require('debug')('platziverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const setupConfig = require('platziverse-config')
const db = require('./')

const prompt = inquirer.createPromptModule()

const showPrompt = () => (process.argv.includes('-y') || process.argv.includes('--yes'))

async function setup () {
  if (!showPrompt()) {
    const answer = await prompt([
      {
        type: 'confirm',
        name: 'setup',
        message: 'This will destroy your database, are you sure?'
      }
    ])

    if (!answer.setup) {
      return console.log('Nothing happened :)')
    }
  }

  const config = setupConfig({
    setup: true,
    logging: s => debug(s)
  })

  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

setup()
