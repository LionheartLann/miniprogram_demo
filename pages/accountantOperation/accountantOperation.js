Page({
  data: {
    receivingTasks: [
      { id: '123456', status: '待填写', statusClass: 'red' },
      { id: '654321', status: '已完成', statusClass: 'green' }
    ],
    shippingTasks: [
      { id: '654321', status: '已完成', statusClass: 'green' },
      { id: '123456', status: '待审核', statusClass: 'yellow' }
    ]
  },

  onSearchInput(e) {
    this.setData({
      searchQuery: e.detail.value
    });
  },

  onSearch() {
    // Implement search logic here
    wx.showToast({
      title: '搜索功能待实现',
      icon: 'none'
    });
  },

  viewTask(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: `查看任务: ${id}`,
      icon: 'none'
    });
    // Navigate to the task detail page
  },

  editTask(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: `编辑任务: ${id}`,
      icon: 'none'
    });
    // Navigate to the task edit page
  },

  addReceivingTask() {
    wx.navigateTo({
      url: '/pages/shipmentForm/shipmentForm?role=做账员'
    });
  },

  addShippingTask() {
    wx.navigateTo({
      url: '/pages/shipmentForm/shipmentForm?role=做账员'
    });
  },

  exportLedgerB() {
    wx.showToast({
      title: '导出台账B功能待实现',
      icon: 'none'
    });
  },

  exportLedgerC() {
    wx.showToast({
      title: '导出台账C功能待实现',
      icon: 'none'
    });
  }
}); 