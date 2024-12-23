// pages/systemManagement/userManagement/userManagement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    currentRoleId: '',
    newUser: {
      name: '',
      phone: ''
    },
    roleUsers: [
      {
        roleId: 'warehouseStaff',
        roleName: '仓管员',
        users: [
          { id: 1, name: '张三', phone: '13800138001' },
          { id: 2, name: '李四', phone: '13800138002' }
        ]
      },
      {
        roleId: 'receivingStaff',
        roleName: '收货师傅',
        users: [
          { id: 3, name: '王五', phone: '13800138003' },
          { id: 4, name: '赵六', phone: '13800138004' }
        ]
      },
      {
        roleId: 'shippingStaff',
        roleName: '发货师傅',
        users: [
          { id: 5, name: '钱七', phone: '13800138005' },
          { id: 6, name: '孙八', phone: '13800138006' }
        ]
      },
      {
        roleId: 'accountant',
        roleName: '做账员',
        users: [
          { id: 7, name: '周九', phone: '13800138007' },
          { id: 8, name: '吴十', phone: '13800138008' }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 加载用户数据
    this.loadUsers();
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

  loadUsers() {
    // 模拟加载用户数据
    this.setData({
      users: [
        { id: 1, name: '张三' },
        { id: 2, name: '李四' }
      ]
    });
  },

  addUser() {
    // 添加用户逻辑
  },

  editUser(id) {
    // 编辑用户逻辑
  },

  deleteUser(id) {
    // 删除用户逻辑
  },

  // 显示添加用户弹窗
  showAddUserModal(e) {
    const { roleId } = e.currentTarget.dataset;
    this.setData({
      showModal: true,
      currentRoleId: roleId,
      newUser: {
        name: '',
        phone: ''
      }
    });
  },

  // 隐藏弹窗
  hideModal() {
    this.setData({
      showModal: false
    });
  },

  // 监听用户名输入
  onUserNameInput(e) {
    this.setData({
      'newUser.name': e.detail.value
    });
  },

  // 监听手机号输入
  onPhoneInput(e) {
    this.setData({
      'newUser.phone': e.detail.value
    });
  },

  // 确认添加用户
  confirmAddUser() {
    const { currentRoleId, newUser } = this.data;
    
    if (!newUser.name || !newUser.phone) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    if (!/^1\d{10}$/.test(newUser.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }

    const roleUsers = this.data.roleUsers.map(role => {
      if (role.roleId === currentRoleId) {
        const newId = Math.max(...role.users.map(u => u.id)) + 1;
        const users = [...role.users, {
          id: newId,
          name: newUser.name,
          phone: newUser.phone
        }];
        return { ...role, users };
      }
      return role;
    });

    this.setData({
      roleUsers,
      showModal: false
    });

    wx.showToast({
      title: '添加成功',
      icon: 'success'
    });
  },

  // 保存用户设置
  saveUsers() {
    wx.showLoading({ title: '保存中...' });
    
    // 这里添加实际的保存逻辑
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '保存成功',
        icon: 'success'
      });
    }, 1500);
  },

  // 返回上一页
  navigateBack() {
    wx.navigateBack();
  }
})