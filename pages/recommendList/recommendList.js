// pages/recommendList/recommendList.js
import request from '../../utils/request';
import PubSub, { subscribe } from 'pubsub-js'
const appInterFace = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  date:'',
  songList:[],
  isLogin:false,
  index:0,
  isRandom : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    this.setData({
      date:new Date().getMonth()+1+'/'+new Date().getDate(),
      isRandom: appInterFace.globalData.isRandomPlay
    })
  this.setData({
    isLogin:wx.getStorageSync('isLogin')
  })
  if(this.data.isLogin==false){
    
    
    wx.reLaunch({
      url: '../login/login',
    })
    wx.showToast({
      title: '请先登录',
    })
  }
 
 
  this.getSongList()
  
  PubSub.subscribe('switchType',(msg,data)=>{
    let index;
    
  if(data==="next"){
    index=this.data.index+1
  }else{
    index=this.data.index-1
  }
  index=(index+this.data.songList.length)%this.data.songList.length
  PubSub.subscribe('randomFlag',(msg,isRandom)=>{
    
   this.setData({
   isRandom
   })
  })
  if(this.data.isRandom){
    index = parseInt(Math.random()*this.data.songList.length)
    
  }
  
  let musicId=this.data.songList[index].id;
  this.setData({
    index
  })
  PubSub.publish('getMusicId',musicId)
  
  })

  
 
  },
 playAll(){
   let sid = this.data.songList[0].id;
  wx.navigateTo({
    url: '/pages/songDetail/songDetail?song='+JSON.stringify(sid),
  })
 },
 async getSongList(){
 let songList=await request("/recommend/songs");
 this.setData({
    songList:songList.data.dailySongs
   })
   console.log(this.data.songList)
 
 
 },
 toSongUtile(event){
   
   let sid =event.currentTarget.id
   this.setData({
     index:event.currentTarget.dataset.index
   })
   
   wx.navigateTo({
     url: '/pages/songDetail/songDetail?song='+JSON.stringify(sid),
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