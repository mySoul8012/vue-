const OSS = require('ali-oss')

export function client(data) {
  // 后端提供数据
  return new OSS({
    region: "oss-cn-shanghai.aliyuncs.com", // *****.aliyuncs.com
    accessKeyId: "LTAIJWp5hlHt0VGY",
    accessKeySecret: "XV0cLY8QUCEkmaujp8fw2BK3aMm6ph",
    bucket: "weixinxiaocengxu"
  })
}
