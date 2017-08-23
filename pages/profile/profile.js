// profile.js
var app = getApp();
var iniUserName = "";
var temp = "";

var Diary = Bmob.Object.extend("diary");
var diary = new Diary();
diary.set("title", "hello");
diary.set("content", "hello world");
//添加数据，第一个入口参数是null
diary.save(null, {
  success: function (result) {
    // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
    console.log("日记创建成功, objectId:" + result.id);
  },
  error: function (result, error) {
    // 添加失败
    console.log('创建日记失败');

  }
});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { gender: 'male', value: '男', checked: 'true' },
      { gender: 'female', value: '女'},
    ],
    userName: "",
    phoneNum: "",
    wechatId: "",
    gender: 'male'
  },

  nameChange: function(e){
    this.setData({
      userName: e.detail.value
    })
    console.log('name: ',this.data.userName)
  },

  radioChange: function (e) {
    console.log('gender：', e.detail.value)
    this.setData({
      gender: e.detail.value,
    })
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

  submit: function(){
    if(this.data.userName == ""){
      var that = this
      //调用应用实例的方法获取全局数据
      app.getUserInfo(function (userInfo) {
        //更新数据
        that.setData({
          userInfo: userInfo
        })
        iniUserName = userInfo.nickName
        console.log('???')
      })

      this.setData({
        userName: iniUserName
      })
    }
    if(this.data.phoneNum.length <10){
      this.setData({
        phoneNum: ""
      })
      var b = this.showCancel()
    }
    else if (this.data.wechatId=="") {
      var b = this.showCancel()
    }
    else{
      // this.setData({
      //   userName: this.data.userName,
      //   phoneNum: this.data.phoneNum,
      //   wechatId: this.data.wechatId,
      // })
      app.globalData.userName = this.data.userName
      app.globalData.gender = this.data.gender
      app.globalData.wechatId = this.data.wechatId
      app.globalData.phoneNum = this.data.phoneNum

      console.log(this.data)
      var a = this.showSuccess()
      var b = setTimeout(this.back,1000)
    }
  },


  showSuccess: function() {
    wx.showToast({
      title: '提交成功',
      icon: 'success',
    });
  },

  back:function(){
    wx.navigateBack({
      url: '../me/me'
    })
  },

  showCancel: function () {
    wx.showToast({
      title: '请填写必填信息',
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
      console.log(userInfo.nickName)
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

