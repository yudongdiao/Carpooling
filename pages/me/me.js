var app = getApp()
Page({
  data: {
    motto: '',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../profile/profile'
    })
  },

  suggestTap: function () {
    wx.navigateTo({
      url: '../suggestion/suggestion'
    })
  },
  
  publishTap: function () {
    wx.navigateTo({
      url: '../publish/publish'
    })
  },

  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})