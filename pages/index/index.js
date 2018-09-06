//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util')

Page({
  data: {
    bannerList: [],
    appList: [],
    showStarTips: false,
    starTipsImagePath: null,
    windowHeight: null
  },
  onLoad: function (options) {
    // 场景值1011、1012、1013：扫码二维码进入
    if ([1011, 1012, 1013].indexOf(app.globalData.scene) != -1) {
      // 二维码带参数
      if (options.appId) {
        var opts = {
          appId: options.appId
        }
        if (options.path) {
          opts.path = decodeURIComponent(options.path)
        }
        wx.navigateToMiniProgram(opts);
      }
    }
    // 场景值1037，1038：小程序跳转进入
    if ([1037, 1038].indexOf(app.globalData.scene) != -1) {
      // 二维码带参数
      if (options.appId) {
        var opts = {
          appId: options.appId
        }
        if (options.path) {
          opts.path = decodeURIComponent(options.path)
        }
        wx.navigateToMiniProgram(opts);
      }
    }
    // 显示当前页面的转发按钮
    wx.showShareMenu({
      withShareTicket: true
    })
    this.getBannerList()
    this.getAppList()
    var sysInfo = wx.getSystemInfoSync()
    var starTipsImagePath = ''
    // if (sysInfo.system.indexOf('iOS') !== -1) { // ios
    //   starTipsImagePath = '../../images/star-tips-ios.png'
    // } else {  // android
    //   starTipsImagePath = '../../images/star-tips-android.png'
    // }
    starTipsImagePath = '../../images/star-tips.png'
    this.setData({
      starTipsImagePath: starTipsImagePath,
      windowHeight: sysInfo.windowHeight
    })
  },
  getBannerList: function() {   // 获取BannerList
    var self = this;
    wx.request({
      url: util.baseUrl + '/api/apps/',
      data: {
        type: 'applyToBanner'
      },
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        self.setData({
          bannerList: res.data
        })
      }
    })
  },
  getAppList: function() {    // 获取AppList
    var self = this;
    wx.request({
      url: util.baseUrl + '/api/apps/',
      data: {
        type: 'applyToList'
      },
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        self.setData({
          appList: res.data
        })
      }
    })
  },
  onShareAppMessage: function (options) {
    app.aldstat.sendEvent('分享小程序', {
      from: options.from
    });
    return {
      title: '不好意思，这个我一定要分享一下，因为...',
      path: 'pages/index/index',
      imageUrl: '../../images/share-image.png'
    }
  },
  handleStarApp: function(e) {
    app.aldstat.sendEvent('点击收藏', '成功');
    this.setData({
      showStarTips: true
    });
  },
  handleClose: function() {
    this.setData({
      showStarTips: false
    });
  },
  handleTapBanner: function(e) {
    var appId = e.currentTarget.dataset.appid
    var appTitle = e.currentTarget.dataset.apptitle
    app.aldstat.sendEvent('跳转小程序', {
      appId: appId,
      名称: appTitle,
      出处: 'Banner'
    });
  },
  handleTapApp: function(e) {
    var appId = e.currentTarget.dataset.appid
    var appTitle = e.currentTarget.dataset.apptitle
    app.aldstat.sendEvent('跳转小程序', {
      appId: appId,
      名称: appTitle,
      出处: 'List'
    });
  }
})
