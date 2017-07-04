// profile.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { gender: 'male', value: '男', checked: 'true' },
      { gender: 'female', value: '女'},
    ],
    userInfo: {},
    phoneNum: {},
    wechatId: {},
    location: {}
  },

  radioChange: function (e) {
    console.log('gender：', e.detail.value)
  },

  numChange: function(e){
    this.setData({
      phoneNum: e.detail.value
    })
    console.log('num：',e.detail.value)
  },

  idChange: function (e) {
    this.setData({
      wechatId: e.detail.value
    })
    console.log('id：', e.detail.value)
  },

  locChange: function (e) {
    this.setData({
      location: e.detail.value
    })
    console.log('location：', e.detail.value)
  },

  submit: function(){
    if(this.data.userInfo.length == 0|| this.data.phoneNum.length <10){
      this.setData({
        phoneNum: "",
        wechatId: "",
        location: ""
      })
      var b = this.showCancel()
    }
    else{
      this.setData({
        userInfo: this.data.userInfo,
        phoneNum: this.data.phoneNum,
        wechatId: this.data.wechatId,
        location: this.data.location
      })
      console.log(this.data)
      var a = this.showSuccess()
    }
  },

  showSuccess: function() {
    wx.showToast({
      title: '提交成功',
      icon: 'success'
    });
  },

  showCancel: function () {
    wx.showToast({
      title: '请正确填写信息',
      icon: 'loading'
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})