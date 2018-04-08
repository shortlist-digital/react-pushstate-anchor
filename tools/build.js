const fs = require('fs')
const execSync = require('child_process').execSync
const prettyBytes = require('pretty-bytes')
const gzipSize = require('gzip-size')

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv)
  })

console.log('Building CommonJS modules ...')

exec('./node_modules/.bin/babel src/lib -d . --ignore __tests__', {
  BABEL_ENV: 'cjs'
})

console.log('\nBuilding ES modules ...')

exec('./node_modules/.bin/babel src/lib -d es --ignore __tests__', {
  BABEL_ENV: 'es'
})

console.log('\nBuilding react-pushstate-anchor.js ...')

exec('./node_modules/.bin/rollup -c -f umd -o umd/react-pushstate-anchor.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'development'
})

console.log('\nBuilding react-pushstate-anchor.min.js ...')

exec('./node_modules/.bin/rollup -c -f umd -o umd/react-pushstate-anchor.min.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'production'
})

const size = gzipSize.sync(
  fs.readFileSync('umd/react-pushstate-anchor.min.js')
)

console.log('\ngzipped, the UMD build is %s', prettyBytes(size))
