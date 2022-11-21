// pages/index/index.js
import request from "../../utils/request";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    background: [{}],
    recommend:[],
    topList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // wx.request({
    //   url: "http://localhost:3000/banner",
    //   data: { type: 2 },
    //   success:(res)=>{
    //     console.log(res.data);
    //   },
    //   fail:(err)=>{
    //     console.log("请求失败："+err.errMsg);
    //   }
    // });
  let result=await request("/banner",{ type: 2 });
  
   this.setData({
     background:result.banners
   });
  let  recommend=await request("/top/playlist/highquality",{limit:10});
  
  this.setData({
    recommend:recommend.playlists
  })
  
 
  
    let rs=await request("/toplist/detail")
    let topList = rs.list.slice(0,5)
    console.log(topList)
   this.setData({
     topList
   })
  
 
},
 async getRecommendSong(){
 wx.redirectTo({
   url: '../recommendList/recommendList',
 })
 
 },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
