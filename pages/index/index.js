//index.js  
//获取应用实例  
var Bmob = require('../../utils/bmob.js');
var app = getApp()
var currentdate = app.globalData.date;
var res;
var len;


Page({
  data: {
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,

    items: "",
      

    location: ["All", "Amherst", "Boston", "New York City", "Logan Airport", "BDL Airport", "JFK Airport"],
    index1: 0,
    index2: 0,

    da:currentdate,
    curdate: currentdate,

    start: "All",
    end: "All",

    
  },
  onLoad: function () {
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });

    var Diary = Bmob.Object.extend("event_data");
    var query = new Bmob.Query(Diary);
    // 查询所有数据
    query.find({
      success: function (results) {
        console.log("共查询到 " + results.length + " 条记录");
        len = results.length;
        // 循环处理查询到的数据
        res = results;
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
    for(var i=0; i<len; i++){
    this.data.items = [{ id: res[i].get("id"), gender: res[i].get("gender"), name: res[i].get("name"), 
    phone: res[i].get("phone"), wechat: res[i].get("wechat"), 
    qidian:res[i].get("from"), date: res[i].get("date"), time:res[i].get("time"), 
    zhongdian: res[i].get("to"), usertype: res[i].get("person"), mode: res[i].get("mode"), 
    seat: res[i].get("seat")}].concat(this.data.items),

    this.setData({
      items: this.data.items
    })
  }

  },

  onShow:function(){
  },

  copyWechat:function(e){
    var self = this;
    wx.setClipboardData({
      data: e.currentTarget.dataset.name,
      success: function (res) {
        // self.setData({copyTip:true}),  
        wx.showModal({
          title: '提示',
          content: '微信号"'+e.currentTarget.dataset.name+'"复制成功，'+'请粘贴至搜索框添加好友',
          success: function (res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    }); 
  },

  bindStartChange: function (e) {
    console.log('index1 发生选择改变，携带值为', e.detail.value);
    this.setData({
      index1: e.detail.value,
    })
    this.data.start = this.data.location[this.data.index1]
    console.log('出发地城市为 ', this.data.start)
  },

  bindEndChange: function (e) {
    console.log('index2 发生选择改变，携带值为', e.detail.value);

    this.setData({
      index2: e.detail.value
    })
    this.data.end = this.data.location[this.data.index2]
    console.log('目的地城市为 ', this.data.end)
  },

  bindDateChange: function (e) {
    this.setData({
      da: e.detail.value
    })
    console.log('date is ', e.detail.value)
  },

  callmeTap: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  }, 


  onPullDownRefresh() {
    　　console.log('--------下拉刷新-------')
    　　wx.showNavigationBarLoading() //在标题栏中显示加载
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      
  },


  onReachBottom: function () {
    // Do something when page reach bottom.
    console.log('circle 下一页');
  },

  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;
    var t=e.currentTarget.dataset.t;

    if (t == 0) {
      this.setData({
        items: ""
      })
      var Diary = Bmob.Object.extend("event_data");
      var query = new Bmob.Query(Diary);
      // 查询所有数据
      query.find({
        success: function (results) {
          console.log("共查询到 " + results.length + " 条记录");
          len = results.length;
          // 循环处理查询到的数据
          res = results;
        },
        error: function (error) {
          console.log("查询失败: " + error.code + " " + error.message);
        }
      });

      for (var i = 0; i < len; i++) {
        this.data.items = [{
          id: res[i].get("id"), gender: res[i].get("gender"), name: res[i].get("name"),
          phone: res[i].get("phone"), wechat: res[i].get("wechat"),
          qidian: res[i].get("from"), date: res[i].get("date"), time: res[i].get("time"),
          zhongdian: res[i].get("to"), usertype: res[i].get("person"), mode: res[i].get("mode"),
          seat: res[i].get("seat")
        }].concat(this.data.items),

          this.setData({
            items: this.data.items
          })
      }
    }

    if(t==1){
      this.setData({
        items: ""
      })
      var Diary = Bmob.Object.extend("event_data");
      var query = new Bmob.Query(Diary);
      query.equalTo("person", "车找人");
      // 查询所有数据
      query.find({
        success: function (results) {
          console.log("共查询到 " + results.length + " 条记录");
          len = results.length;
          // 循环处理查询到的数据
          res = results;
        },
        error: function (error) {
          console.log("查询失败: " + error.code + " " + error.message);
        }
      });

      for (var i = 0; i < len; i++) {
        this.data.items = [{
          id: res[i].get("id"), gender: res[i].get("gender"), name: res[i].get("name"),
          phone: res[i].get("phone"), wechat: res[i].get("wechat"),
          qidian: res[i].get("from"), date: res[i].get("date"), time: res[i].get("time"),
          zhongdian: res[i].get("to"), usertype: res[i].get("person"), mode: res[i].get("mode"),
          seat: res[i].get("seat")
        }].concat(this.data.items),

          this.setData({
            items: this.data.items
          })
      }
      
    }

    else if(t=2){
      this.setData({
        items: ""
      })
      var Diary = Bmob.Object.extend("event_data");
      var query = new Bmob.Query(Diary);
      query.equalTo("person", "人找车");
      // 查询所有数据
      query.find({
        success: function (results) {
          console.log("共查询到 " + results.length + " 条记录");
          len = results.length;
          // 循环处理查询到的数据
          res = results;
        },
        error: function (error) {
          console.log("查询失败: " + error.code + " " + error.message);
        }
      });

      for (var i = 0; i < len; i++) {
        this.data.items = [{
          id: res[i].get("id"), gender: res[i].get("gender"), name: res[i].get("name"),
          phone: res[i].get("phone"), wechat: res[i].get("wechat"),
          qidian: res[i].get("from"), date: res[i].get("date"), time: res[i].get("time"),
          zhongdian: res[i].get("to"), usertype: res[i].get("person"), mode: res[i].get("mode"),
          seat: res[i].get("seat")
        }].concat(this.data.items),

          this.setData({
            items: this.data.items
          })
      }
    }

     if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }

})
