declare module "eglass-utils" {
	import { Readable } from "stream";
	type result = Promise<string> | Error
	export class OssClient {
		constructor(config?: { accessKeyId: string, accessKeySecret: string, bucket: string, region: string, internal: boolean },
			host?: string)
		/**
		 * 上传本地文件
		 * @param diretory  oss目录
		 * @param file 			本地文件
		 * @param options 	options
		 */
		uploadLocalFile(diretory: string, file: string, options?): result
		/**
		 * 上传本地文件不适用 uuid
		 * @param filename  oss目录+文件名
		 * @param file 			本地文件
		 * @param options 	options
		 */
		uploadRaw(filename: string, file: string, options?): result
		/**
		 * 
		 * @param diretory 	oss目录
		 * @param extention 文件后缀
		 * @param buffer 		node buffer
		 * @param options 	{}
		 */
		uploadBuffer(diretory: string, extention: string, buffer: Buffer, options?): result
		/**
		 * 
		 * @param diretory 	oss目录	
		 * @param url 		 	公网文件链接
		 * @param options 	{}
		 */
		uploadUrl(diretory: string, url: string, options?): result

		/**
		 * 
		 * @param url oss 文件链接
		 */
		getUrlStream(url: string): Promise<Readable>

		/**
		 * 
		 * @param url oss 文件链接
		 */
		getUrlBuffer(url: string): Promise<Buffer>

		/**
		 * @param diretory
		 * @param base64 
		 */
		saveBase64(diretory: string, base64: string): result
		remove(ossUrl: string): Promise<boolean>
	}
}

