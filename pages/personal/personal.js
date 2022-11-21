// pages/personal.js

import request from "../../utils/request";

let start_touch=0;
let move_touch=0;
let distance=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  covertransform:"translateY(0)",
  covertransition:"",
  userInfo:{},
  recentList:[],
  isLogin:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  
  if(wx.getStorageSync('userInfo')){
    
    this.setData({
    userInfo:wx.getStorageSync('userInfo'),
    isLogin:wx.getStorageSync('isLogin')
    })
  }
 
  
  
  this.getUserRecent()


  },
  
  async getUserRecent(){
   let result =await request("/record/recent/song",{limit:10});
   let recentList=result.data.list
   this.setData({
    recentList
  })
    
  },
  handleTouchStart(event){
  start_touch=event.changedTouches[0].clientY;
  this.setData({
    covertransition:""
  })
  },
  doLogin(){
    if(!this.userInfo){
  wx.redirectTo({
    url: '/pages/login/login',
  })
}
  },
  handleTouchMove(event){
   
    move_touch=event.changedTouches[0].clientY;
    distance=move_touch-start_touch;
    if(distance<=0){
      distance=0;
    }else if(distance>100){
      distance=100
    }

    //往下拉为正，向上则为负
   this.setData({
     covertransform:`translateY(${distance}rpx)`
   })
  
  },
  handleTouchEnd(){
   this.setData({
     covertransform:"translate(0)",
     covertransition:"transform 1s linear"
   })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})