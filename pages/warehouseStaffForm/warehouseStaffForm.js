import { getShippingData, getReceivingData } from '../../utils/dataService';

Page({
  data: {
    searchQuery: '',
    allOrders: [],
    orders: [],
    currentPage: 1,
    totalPages: 5,
    typedPage: '',
    isShippingSelected: true,
    isReceivingSelected: false,
    shippingOrders: [],
    receivingOrders: []
  },

  onLoad(options) {
    const shippingData = getShippingData();
    const receivingData = getReceivingData();
    
    this.setData({
      shippingOrders: shippingData,
      receivingOrders: receivingData,
      allOrders: shippingData,
      orders: shippingData.slice(0, 10),
      totalPages: Math.ceil(shippingData.length / 10)
    });
  },

  // 切换发货/收货列表
  switchTab(e) {
    const type = e.currentTarget.dataset.type;
    const isShipping = type === 'shipping';
    const orders = isShipping ? this.data.shippingOrders : this.data.receivingOrders;
    
    this.setData({
      isShippingSelected: isShipping,
      isReceivingSelected: !isShipping,
      allOrders: orders,
      orders: orders.slice(0, 10),
      currentPage: 1,
      totalPages: Math.ceil(orders.length / 10),
      searchQuery: ''
    }, () => {
      // 切换标签后重新加载数据
      this.loadData();
    });
  },

  navigateToDetails(e) {
    const id = e.currentTarget.dataset.id;
    const type = this.data.isShippingSelected ? 'shipping' : 'receiving';
    wx.navigateTo({
      url: `/pages/warehouseStaffOperation/warehouseStaffOperation?id=${id}&type=${type}`
    });
  },

  onSearchInput(e) {
    this.setData({ searchQuery: e.detail.value });
  },

  onSearch() {
    const query = this.data.searchQuery.toLowerCase();
    const filteredOrders = this.data.allOrders.filter(order => 
      order.serialNumber.toLowerCase().includes(query)
    );
    this.setData({
      orders: filteredOrders.slice(0, 10),
      currentPage: 1,
      totalPages: Math.ceil(filteredOrders.length / 10)
    });
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
    return '';
  },

  getStatusTagClass(status) {
    const statusMap = {
      '待发货': 'status-pending',
      '已发货': 'status-shipped',
      '发货中': 'status-in-transit',
      '发货完成': 'status-completed',
      '发货异常': 'status-error',
      '待收货': 'status-pending',
      '已收货': 'status-received',
      '收货中': 'status-in-transit',
      '收货完成': 'status-completed',
      '收货异常': 'status-error'
    };
    return statusMap[status] || '';
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
  }
}); 