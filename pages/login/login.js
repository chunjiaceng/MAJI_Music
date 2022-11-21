// pages/login/login.js
import request from '../../utils/request'
let phoneRegx=/^1[3456789]\d{9}$/;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  phone:"",
  password:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  async login(){

    let that=this;
//前端验证
    if(!phoneRegx.test(this.data.phone)){
   wx.showToast({
     title: '号码输入错误',
     icon:'error',
    
   })
   return;
   
   }
   if(!this.data.password){
     wx.showToast({
       title: '密码不能为空',
       icon:"error"
     })
     return;
   }
   //后端验证
  let result = await request('/login/cellphone',{phone:this.data.phone,password:this.data.password,isLogin:true})
  if(result.code===200){
    wx.showToast({
      title: '登录成功',
    })
    wx.setStorageSync('isLogin', true)
    wx.setStorageSync('userInfo', result)
    wx.switchTab({
      url: '/pages/personal/personal',
    })
    console.log("userInfo:",wx.getStorageSync('userInfo'))
  }else if(result.code===400){
    wx.showToast({
      title: '账号不存在',
      icon:"error"
    })}else if(result.code===502){
      wx.showToast({
        title: '密码错误',
        icon:"error"
      })}else{
      wx.showToast({
        title: '登录失败请重试',
        icon:"error"
      })
    }
  },

 
  handleInput(event){
    
    this.setData({
      [event.target.id]:event.detail.value
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