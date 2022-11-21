// pages/songDetail/songDetail.js
import PubSub from 'pubsub-js'
import dayjs from 'dayjs'
import request from "../../utils/request";

const appInterFace= getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  isPlay:false,
  sid:"",
  song:{},
  songDetail:{},
  backgroundAudioManager:{},
  durationTime:'',
  currentTime:'',
  currentBarWidth :'',
  isRandomPlay:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
    this.setData({
      sid:options.song,
      isPlay:appInterFace.globalData.isPlay,
      backgroundAudioManager:appInterFace.globalData.backgroundAudioManager,
      isRandomPlay:appInterFace.globalData.isRandomPlay

    })
   appInterFace.globalData.isPlay=this.data.isPlay;
  
   if(this.data.sid===appInterFace.globalData.musicId&&appInterFace.globalData.isPlay===this.data.isPlay){
  this.reInMusic()
   }else{
    this.getSongDetail();}
    appInterFace.globalData.musicId=options.song
    PubSub.subscribe('getMusicId',(msg,musicId)=>{
      this.setData({
        sid:musicId
      })
      appInterFace.globalData.musicId=musicId
      
      this.getSongDetail();
     })
 
},
  handleSwitch(event){

   PubSub.publish('switchType',event.currentTarget.id)


  },
 async reInMusic(){
  let song = await request("/song/url",{id:this.data.sid})
  let songDetail = await request("/song/detail",{ids : this.data.sid})
  this.setData({
    songDetail:songDetail.songs[0],
    song:song.data[0]
  })
  this.getSongTime()

 },
 getSongTime(){
  let durationTime= dayjs(this.data.songDetail.dt-1800000).format('mm:ss')
  appInterFace.globalData.backgroundAudioManager.onTimeUpdate(()=>{
    let currentTime= dayjs(appInterFace.globalData.backgroundAudioManager.currentTime*1000-1800000).format('mm:ss')
    let currentBarWidth= (appInterFace.globalData.backgroundAudioManager.currentTime*1000)/this.data.songDetail.dt*200
      this.setData({
        durationTime,
        currentTime,
        currentBarWidth
      }
      )
      
    })
 },
 async getSongDetail(){
   let song = await request("/song/url",{id:this.data.sid})
   let songDetail = await request("/song/detail",{ids : this.data.sid})
   
  
   

   this.setData({
     songDetail:songDetail.songs[0],
     song:song.data[0],
    
   })

   let backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.src=this.data.song.url
    backgroundAudioManager.title=this.data.songDetail.name;
    backgroundAudioManager.singer=this.data.songDetail.ar[0].name;
    backgroundAudioManager.epname=this.data.songDetail.al.name;
    backgroundAudioManager.coverImgUrl=this.data.songDetail.al.picUrl;
    backgroundAudioManager.onEnded(()=>{
      PubSub.publish('switchType','next')
      PubSub.subscribe('getMusicId',(msg,musicId)=>{
       this.setData({
         sid:musicId
       })})
      })
   backgroundAudioManager.onPlay(()=>{
   this.setData({
     isPlay:true
   })
   appInterFace.globalData.isPlay=true;
   appInterFace.globalData.musicId=this.data.sid
   }) 
   backgroundAudioManager.onPause(()=>{
    this.setData({
      isPlay:false
    })
    appInterFace.globalData.isPlay=false;
   
    }) 
    backgroundAudioManager.onStop(()=>{
      this.setData({
        isPlay:false
      })
      appInterFace.globalData.isPlay=false;
 
      }) 
   wx.setNavigationBarTitle({
     title: '正在播放:'+this.data.songDetail.name,
   })
   this.setData({
    backgroundAudioManager
   })
   appInterFace.globalData.backgroundAudioManager=backgroundAudioManager
   this.getSongTime()
 },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  isplay(){
  this.setData({
    isPlay:!this.data.isPlay
  })
  
  this.data.isPlay?this.data.backgroundAudioManager.play():this.data.backgroundAudioManager.pause()
  appInterFace.globalData.isPlay=this.data.isPlay  
},
ranDomPlay(){
  this.setData({
    isRandomPlay:!this.data.isRandomPlay
  })
  appInterFace.globalData.isRandomPlay=this.data.isRandomPlay
  if(appInterFace.globalData.isRandomPlay){
    PubSub.publish('randomFlag',true)
  }
},
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