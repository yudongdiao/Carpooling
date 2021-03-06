// profile.js
var Bmob = require('../../utils/bmob.js');
var app = getApp();
var iniUserName = "";
var temp = "";



Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { gender: 'male', value: '男' },
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
      var Diary = Bmob.Object.extend("personal_data");
      var personal_data = new Diary();
      personal_data.set("sex", this.data.gender);
      personal_data.set("phone", this.data.phoneNum);
      personal_data.set("name", this.data.userName);
      personal_data.set("wechat", this.data.wechatId);
      //添加数据，第一个入口参数是null
      personal_data.save(null, {
        success: function (result) {
          // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
          console.log("日记创建成功, objectId:" + result.id);
        },
        error: function (result, error) {
          // 添加失败
          console.log('创建日记失败');
        }
      });
      // this.setData({
      //   userName: this.data.userName,
      //   phoneNum: this.data.phoneNum,
      //   wechatId: this.data.wechatId,
      // })
      app.globalData.userName = this.data.userName
      app.globalData.gender = this.data.gender
      app.globalData.wechatId = this.data.wechatId
      app.globalData.phoneNum = this.data.phoneNum

      wx.setStorageSync('userName', this.data.userName)
      wx.setStorageSync('gender', this.data.gender)
      wx.setStorageSync('wechatId', this.data.wechatId)
      wx.setStorageSync('phoneNum', this.data.phoneNum)

      console.log(this.data)
      var a = this.showSuccess()
      var b = setTimeout(this.back,1000)
      var Diary = Bmob.Object.extend("diary");
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

    that = this;
    //获取存储信息
    wx.getStorage({
      key: 'userName',
      success: function (res) {
        // success
        that.setData({
          userName: res.data
        })
      }
    })

    wx.getStorage({
      key: 'gender',
      success: function (res) {
        // success
        that.setData({
          gender: res.data
        })
      }
    })

    wx.getStorage({
      key: 'phoneNum',
      success: function (res) {
        // success
        that.setData({
          phoneNum: res.data
        })
      }
    })

    wx.getStorage({
      key: 'wechatId',
      success: function (res) {
        // success
        that.setData({
          wechatId: res.data
        })
      }
    })

    if (this.data.gender == 'male') {
      this.data.items[0].checked = "true"
    }
    else {
      this.data.item[1].checked = "true"
    }
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

