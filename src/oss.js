
const oss = require('ali-oss')
const uuid = require('uuid')

const co = require('co')
const { URL } = require('url')

const http = require('http')
const { base64Buffer, base64Ext } = require('./util')

function OssClient(config, host) {
  this.store = new oss(config)
  this.host = host
}
// 上传本地文件
OssClient.prototype.uploadRaw = co.wrap(function* (filename, file, options) {
  yield this.store.put(filename, file, options);
  return ['http:/', this.host, filename].join('/')
})

OssClient.prototype.uploadLocalFile = co.wrap(function* (diretory, file, options) {
  const genId = uuid.v4()
  const extention = file.split('.').pop()
  const obj = `${diretory}/${genId}.${extention}`
  yield this.store.put(obj, file, options);
  return ['http:/', this.host, obj].join('/')
})

OssClient.prototype.uploadBuffer = co.wrap(function* (diretory, extention, buffer, options) {
  const genId = uuid.v4()
  const obj = `${diretory}/${genId}.${extention}`
  yield this.store.put(obj, buffer, options);
  return ['http:/', this.host, obj].join('/')
})

OssClient.prototype.uploadUrl = function (diretory, url, options) {
  var self = this
  url = url.startsWith('https') ? url.replace(/^https/, 'http') : url
  const reqOptions = new URL(url);
  const extention = reqOptions.pathname.split('.', 2).pop()
  return new Promise((r) => {
    const req = http.request(reqOptions, (res) => {
      r(this.uploadBuffer(diretory, extention, res, options))
    })
    req.end()
  })
}

OssClient.prototype.checkUrlExist = co.wrap(function* (ossUrl, IfModifiedSince) {
  try {
    const options = IfModifiedSince ? { headers: { 'If-Modified-Since': IfModifiedSince } } : {}
    const result = yield store.head(ossUrl, options)
    return result.status === 200
  } catch (e) {
    return false
  }
})

OssClient.prototype.getUrlStream = co.wrap(function* (ossUrl, IfModifiedSince) {
  const result = yield this.store.getStream(urlToObject(ossUrl))
  return result.stream
})
OssClient.prototype.getUrlBuffer = co.wrap(function* (ossUrl) {
  const result = yield this.store.get(urlToObject(ossUrl))
  return result.content
})

OssClient.prototype.saveBase64 = async function (diretory, base64Img, options) {
  const ext = base64Ext(base64Img)
  return this.uploadBuffer(diretory, ext, base64Buffer(base64Img), options)
}

OssClient.prototype.remove = co.wrap(function* (ossUrl) {
  yield this.store.delete(urlToObject(ossUrl))
  return true
})

function urlToObject(url) {
  return (new URL(url)).pathname.replace(/^\//, '')
}

module.exports = OssClient

