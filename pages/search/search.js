// pages/search/search.js

import { countSubscriptions } from 'pubsub-js';
import request from '../../utils/request';
Page({

  /**
   * 页面的初始数据
   */
  data: {
  hotSearchList:[],
  searchSongList:[],
  inSearch:false,
  isinput:false,
  timer: '',
  historyList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   this.getHotSearch()
   if(wx.getStorageSync('searchHistory')){
     this.setData({
     historyList:wx.getStorageSync('searchHistory')
   })
  }
  },
 async getHotSearch(){
  let hotSearchList= await request('/search/hot/detail')
  this.setData({
    hotSearchList:hotSearchList.data
  })
 },
 changeSearch(){
   this.setData({
     inSearch:!this.data.inSearch,
     isinput:false
   })
   
 },
 toBack(){
   wx.navigateBack()
 },
 //清除历史记录
 clearHistory(){
   this.setData({
     historyList:[]
   })
   wx.setStorageSync('searchHistory', [])
 },
 // 点击搜索的歌曲 跳往songDetail Page 并添加搜索记录

 async handleSong(event){
   console.log(event.currentTarget.id)
   let rs=this.data.historyList
   let songDeatil = await request('/song/detail',{ids: event.currentTarget.id})
   if(rs.indexOf(songDeatil.songs[0].name)===-1)
   rs.push(songDeatil.songs[0].name)
   let historyList =rs
   this.setData({
     historyList
   })
   wx.setStorageSync('searchHistory', this.data.historyList)
   wx.navigateTo({
     url: '/pages/songDetail/songDetail?song='+event.currentTarget.id,
   })
 },
 async getSearchSong(keywords){
 let searchSongList = await request ('/cloudsearch',{keywords,limit:10})
 this.setData({
   inSearch:true,
   searchSongList:searchSongList.result.songs
 })
 if(keywords==null){
   this.setData({
     searchSongList:[]
   })
 }
 
 },
bounce(cd, wait) {
  // 定义一个定时器
  let timer;
  // 返回一个函数
  return function() {
  // 清除定时器
clearTimeout(timer)
  // 定义定时器
  timer = setTimeout(function(r) {
      cd(r)
   }, wait);
 }
},

 handleInput(event){
   
   let r=event.detail.value 
   if(r==''){
     this.setData({
       searchSongList:[]
     })
   }
   let timer= this.data.timer
   if(!this.data.isinput){
   this.getSearchSong(r);
   this.setData({
    isinput:true
  })
  }
   else{
   

   clearTimeout(timer)
   
   timer=setTimeout(()=>this.getSearchSong(r),300)
   this.setData({
     timer
   })
  
   }
   

   

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