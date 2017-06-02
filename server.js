'use strict'

const http = require('http')

module.exports = http.createServer((req, res) => {
  // console.log(`${new Date()}: server - got request ${req.url}`)
  if (req.url === '/hang') {
    // console.log(`${new Date()}: server - hang! lol dont do shit! haha!`)
  } else if (req.url === '/hang2') {
    // console.log(`${new Date()}: server - hang2 write but dont end!`)
    res.write('lerkhawats')
  } else {
    res.end('ok')
  }
})
