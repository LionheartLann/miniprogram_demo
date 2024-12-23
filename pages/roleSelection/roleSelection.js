Page({
  data: {
    currentRole: ''
  },

  async onSelectRole(e) {
    const role = e.currentTarget.dataset.role;
    this.setData({ currentRole: role });
    
    if (role === '做账员') {
      // 跳转到做账员的发货检查表页面
      wx.navigateTo({
        url: '/pages/shippingInspectionForm/shippingInspectionForm',
        success: () => {
          // 存储角色信息到本地
          wx.setStorageSync('userRole', role);
        },
        fail: (error) => {
          console.error('Navigation failed:', error);
          wx.showToast({
            title: '页面跳转失败',
            icon: 'none'
          });
        }
      });
    } else if (role === '发货师傅') {
      wx.navigateTo({
        url: '/pages/shippingStaffForm/shippingStaffForm'
      });
    } else if (role === '接车师傅') {
      wx.navigateTo({
        url: '/pages/receivingStaffForm/receivingStaffForm'
      });
    } else if (role === '仓管员') {
      wx.navigateTo({
        url: '/pages/warehouseStaffForm/warehouseStaffForm',
        success: () => {
          // 存储角色信息到本地
          wx.setStorageSync('userRole', role);
        },
        fail: (error) => {
          console.error('Navigation failed:', error);
          wx.showToast({
            title: '页面跳转失败',
            icon: 'none'
          });
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 清除之前的角色信息
    wx.removeStorageSync('userRole');
  }
}); 