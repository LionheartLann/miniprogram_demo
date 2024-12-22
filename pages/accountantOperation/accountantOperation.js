// pages/accountantOperation/accountantOperation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 'shipping', // Default tab
    shippingData: {
      serialNumber: 'WHSC-FH-20231001-001',
      receivingUnit: 'Example Unit',
      project: 'Example Project',
      shipper: '系统自动抓取',
      shippingTime: '2023-10-01 10:00',
      actualQuantity: 100,
      materialCategory: 'Example Material',
      issueRemarks: '无',
      initiatedTime: '2023-10-01 09:00',
      accountant: '系统自动抓取'
    },
    receivingData: {
      serialNumber: 'WHSC-SH-20231001-001',
      orderNumber: '123456',
      supplier: 'Example Supplier',
      receiver: '系统自动抓取',
      receivingTime: '2023-10-01 08:00',
      stored: '是',
      accountingTime: '2023-10-01 08:30',
      accountant: '系统自动抓取',
      issueRemarks: '无'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  },

  /**
   * 处理标签切换事件
   */
  onTabChange(event) {
    this.setData({
      activeTab: event.currentTarget.dataset.tab
    });
  }
})