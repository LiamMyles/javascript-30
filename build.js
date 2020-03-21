const path = require('path')
const fs = require('fs-extra')

fs.removeSync(path.join(__dirname, '.build'))

const readme = fs.readFileSync(path.join(__dirname, 'README.md'), { encoding: 'utf8' })

fs.ensureDirSync(path.join(__dirname, '.build'))

const showdown = require('showdown')
const converter = new showdown.Converter()
const html = converter.makeHtml(readme)

const updatedHtml = html.replace('/projects/', '/javascript-30/')

fs.writeFileSync(path.join(__dirname, '.build', 'index.html'), updatedHtml)

fs.copy(path.join(__dirname, 'projects'), path.join(__dirname, '.build'))
  .then(() => console.log('success!'))
  .catch(err => console.error(err))
