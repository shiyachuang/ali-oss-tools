# ali-oss-tools
对阿里云接口的二次封装

## Install

```bash
npm install ali-oss-tools --save
```
## use
新建一个文件 ali-oss-client.ts
```js
import {OssClient} from 'ali-oss-tools'
const config = {
  accessKeyId: 'your access key',
  accessKeySecret:  'your access secret',
  bucket: 'your bucket name',
  region: 'oss-cn-shanghai'
  internal: isProd
};
// Host 你的主机名，这个一般是可以cdn加速的。
const client = new OssClient(config, Host)
export default client
```
## method 
> 首先引入 ```import client from '../services/ali-oss-client'```

* 上传文件（file）
```js
/**
 * 上传本地文件
 * @param diretory oss目录
 * @param file 本地文件
 * @param options options
 */ 

const url = await client.uploadLocalFile('text', 'local/dev/text.txt')
console.log(url) // http://host/text/uqweo.txt
```
* uploadRaw
```js
/**
* 上传本地文件不使用 uuid
* @param filename  oss目录+文件名
* @param file	本地文件
* @param options options
*/
const url = await client.uploadRaw('text/aa.txt', 'local/dev/text.txt')
console.log(url) http://host/text/aa.txt
```


* 上传base64 常常用于保存图片(uuid)

```js
/**
* @param diretory
* @param base64 
*/
const url = await client.saveBase64('img', base64)
console.log(url) http://host/img/uuid.img
```
剩下的靠你自己去尝试了。
最后，
感谢我的小伙伴们！

