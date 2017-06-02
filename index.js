'use strict'

const test = require('tape')
const http = require('http')
const server = require('./server')
const port = process.argv[2] || 8180
server.listen(port)

const get = (t, path, handler) => http.get(`http://localhost:${port}/${path}`, res => {
  t.pass(`${path}:${new Date()}: got response`)
  if (handler) {
    handler(res)
  } else {
    var data = ''
    res.on('data', chunk => {
      t.pass(`${path}:${new Date()}: got chunk! ${chunk}`)
      data += chunk
    })
    res.on('end', () => {
      t.pass(`${path}:${new Date()}: got end! ${data}`)
      t.end()
    })
    res.on('error', err => {
      t.pass(`${path}:${new Date()}: response error! ${err}`)
      t.end()
    })
  }
})
.on('error', err => {
  t.pass(`${path}:${new Date()}: request error! ${err}`)
  t.end()
})

test('send request get normal response', t => {
  get(t, 'not-hang')
})

test('send request never send response', t => {
  get(t, 'hang')
})

test('send request get response but never end', t => {
  get(t, 'hang2')
})

test('close up', t => {
  t.pass('reached the finish line!')
  server.close()
  t.end()
})
