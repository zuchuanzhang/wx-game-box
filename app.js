//app.js
var aldstat = require("./utils/ald-stat.js");

App({
  onLaunch: function (options) {
    // 场景值
    console.log(options)
    this.globalData.scene = options.scene
    // 场景值1037、1038：通过小程序跳转进入
    if (this.globalData.scene == 1037 || this.globalData.scene == 1038) {
      console.log("来源小程序（入口）")
      if (options.referrerInfo.extraData) {
        this.aldstat.sendEvent('来源小程序（入口）', {
          appId: options.referrerInfo.extraData.appId,
          小程序名称: options.referrerInfo.extraData.appName
        });
      }
    } else if (options.referrerInfo) {
      console.log("'来源公众号（入口）'")
      this.aldstat.sendEvent('来源公众号（入口）', {
        appId: options.referrerInfo.appId
      });
    }
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //     let appid = "wx0ade9fe6fbeaa89c";
    //     let secret = "30b4479008133cfc5a4bec430d9f8e70";
    //     wx.request({
    //       url: `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${res.code}&grant_type=authorization_code`,
    //       success: e => {
    //         console.log(e)
    //       }
    //     })
    //   }
    // })
  },
  globalData: {
    scene: null
  }
})