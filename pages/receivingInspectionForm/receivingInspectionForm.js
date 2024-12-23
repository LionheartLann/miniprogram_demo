// pages/receivingInspectionForm/receivingInspectionForm.js
import { getReceivingData } from '../../utils/dataService'; // <-- import the utility

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchQuery: '',
    allOrders: [],
    orders: [],
    currentPage: 1,
    totalPages: 5,
    typedPage: '',
    isShippingSelected: false,
    isReceivingSelected: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const fullData = getReceivingData();
    this.setData({
      allOrders: fullData
    });
    this.setData({
      totalPages: Math.ceil(fullData.length / 10)
    });
    this.loadData();
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
   * 页面上拉���事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  onSearchInput(e) {
    this.setData({
      searchQuery: e.detail.value
    });
  },

  onSearch() {
    const { searchQuery } = this.data;
    if (searchQuery) {
      wx.showToast({
        title: `搜索: ${searchQuery}`,
        icon: 'none'
      });
    } else {
      wx.showToast({
        title: '请输入流水号',
        icon: 'none'
      });
    }
  },

  navigateToDetails(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/receivingOperation/receivingOperation?id=${id}`
    });
  },

  navigateToShipping() {
    this.setData({
      isShippingSelected: true,
      isReceivingSelected: false
    });
    wx.navigateTo({
      url: '/pages/shippingInspectionForm/shippingInspectionForm'
    });
  },

  navigateToReceiving() {
    this.setData({
      isShippingSelected: false,
      isReceivingSelected: true
    });
    wx.navigateTo({
      url: '/pages/receivingInspectionForm/receivingInspectionForm'
    });
  },

  onPrevPage() {
    if (this.data.currentPage > 1) {
      this.setData({ currentPage: this.data.currentPage - 1 });
      this.loadData();
    }
  },

  onNextPage() {
    if (this.data.currentPage < this.data.totalPages) {
      this.setData({ currentPage: this.data.currentPage + 1 });
      this.loadData();
    }
  },

  onPageInput(e) {
    this.setData({ typedPage: e.detail.value });
  },

  onGoPage() {
    const page = parseInt(this.data.typedPage, 10);
    if (page && page >= 1 && page <= this.data.totalPages) {
      this.setData({ currentPage: page });
      this.loadData();
    } else {
      wx.showToast({
        title: '页数超出范围',
        icon: 'none'
      });
    }
  },

  loadData() {
    const pageSize = 10;
    const startIndex = (this.data.currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pageItems = this.data.allOrders.slice(startIndex, endIndex);
    this.setData({
      orders: pageItems
    });
  },

  getStatusClass(status) {
    return ''; // 移除行背景色
  },

  getStatusTagClass(status) {
    switch (status) {
      case '待收货':
        return 'status-pending';
      case '已收货':
        return 'status-received';
      case '收货中':
        return 'status-in-transit';
      case '收货完成':
        return 'status-completed';
      case '收货异常':
        return 'status-error';
      default:
        return '';
    }
  }
})