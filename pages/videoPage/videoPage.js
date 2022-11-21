// pages/videoPage/videoPage.js
import request from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
  style:'',
  labelList:[],
  labelId:'',
  navid:[],
  videoList:[],
  vid:'',
  isTriggered:false,
  videoNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onSearch(){
  this.setData({
    style:"boder:5px solid black;color:black;"
  })
  },
  onLoad(options) {
  this.getLabelList();
  
  
  },
  async getLabelList(){
    let result = await request("/video/group/list");
    this.setData({
      labelList:result.data.slice(0,14)
      
    })

    let vid=this.data.labelList[0].id;
    
    this.getVideoList(vid);
  },
  async getVideoList(vid,offset=0){
    this.setData({
      vid
    })
  let video = await request("/video/group",{id:vid},offset);
  let index=0;
  
  let videoList=video.datas.map(item=>{
    item.id=index++
    return item;
  })
  this.setData({
    videoList,
    isTriggered:false
  })
  
  
  
  },
  toSearch(){
  wx.navigateTo({
    url: '/pages/search/search',
  })
  },
 handleFresher(event){
   this.getVideoList(this.data.vid);
   

 },

 async handleToLower(){
   let vid=this.data.vid;
  let video = await request("/video/group",{id:vid},++this.data.videoNum);
  this.setData({
    videoNum:this.data.videoNum++
  })
  let index=this.data.videoNum*8;
  let r=this.data.videoList
  
   r.push(...video.datas.map(item=>{
    item.id=index++
    return item;
  }))

  
  let videoList=r;
  
   this.setData({
     videoList
   })
 },
  labelTap(event){
    
    this.setData({
      labelId:event.target.dataset.type
      
    })
    let vid = this.data.labelList[event.target.dataset.type].id;
    this.getVideoList(vid);
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
    console.log("fresh")

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log('a')

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(event) {
   console.log(event)
   console.log(this.data.videoList)
   if(event.from==="button"){
    return{
      title:"转发该视频给好友",
      imageUrl:this.data.videoList[event.target.dataset.type].data.coverUrl
    }
   }else{
     return{
       title:"转发该页面给朋友",
       path:"./videoPage"
     }
   }
  }
})