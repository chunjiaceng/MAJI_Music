// pages/components/NavHeader.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      title:{
        type:String,
        value:"null"
      },
      nav:{
        type:String,
        value:"null"
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
  lookmore:function(){
    console.log(this.data);
  }
  }
})
