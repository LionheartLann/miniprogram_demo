Page({
  data: {
    showModal: false,
    currentRoleId: '',
    newPage: {
      name: '',
      path: ''
    },
    pathIndex: -1,
    availablePaths: [
      { name: '收货表单', path: '/pages/receivingStaffForm/receivingStaffForm' },
      { name: '发货表单', path: '/pages/shippingStaffForm/shippingStaffForm' },
      { name: '仓库管理', path: '/pages/warehouseStaffForm/warehouseStaffForm' },
      { name: '做账操作', path: '/pages/accountantOperation/accountantOperation' }
    ],
    roles: [
      {
        id: 'warehouseStaff',
        name: '仓管员',
        pages: [
          { id: 1, name: '仓库管理', path: '/pages/warehouseStaffForm/warehouseStaffForm', enabled: true },
          { id: 2, name: '仓库操作', path: '/pages/warehouseStaffOperation/warehouseStaffOperation', enabled: true },
          { id: 3, name: '用户管理', path: '/pages/systemManagement/userManagement/userManagement', enabled: true },
          { id: 4, name: '权限管理', path: '/pages/systemManagement/permissionManagement/permissionManagement', enabled: true }
        ]
      },
      {
        id: 'receivingStaff',
        name: '收货员',
        pages: [
          { id: 5, name: '收货表单', path: '/pages/receivingStaffForm/receivingStaffForm', enabled: true },
          { id: 6, name: '收货操作', path: '/pages/receivingStaffOperation/receivingStaffOperation', enabled: true },
          { id: 7, name: '收货检查', path: '/pages/receivingInspectionForm/receivingInspectionForm', enabled: true }
        ]
      },
      {
        id: 'shippingStaff',
        name: '发货员',
        pages: [
          { id: 8, name: '发货表单', path: '/pages/shippingStaffForm/shippingStaffForm', enabled: true },
          { id: 9, name: '发货操作', path: '/pages/shippingStaffOperation/shippingStaffOperation', enabled: true },
          { id: 10, name: '发货检查', path: '/pages/shippingInspectionForm/shippingInspectionForm', enabled: true }
        ]
      },
      {
        id: 'accountant',
        name: '做账员',
        pages: [
          { id: 11, name: '做账操作', path: '/pages/accountantOperation/accountantOperation', enabled: true }
        ]
      }
    ]
  },

  // 切换权限状态
  togglePermission(e) {
    const { roleId, pageId } = e.currentTarget.dataset;
    const { checked } = e.detail;
    
    const roles = this.data.roles.map(role => {
      if (role.id === roleId) {
        const pages = role.pages.map(page => {
          if (page.id === pageId) {
            return { ...page, enabled: checked };
          }
          return page;
        });
        return { ...role, pages };
      }
      return role;
    });
    
    this.setData({ roles });
  },

  // 保存权限设置
  savePermissions() {
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
  },

  // 显示添加页面权限弹窗
  showAddPageModal(e) {
    const { roleId } = e.currentTarget.dataset;
    this.setData({
      showModal: true,
      currentRoleId: roleId,
      newPage: {
        name: '',
        path: ''
      },
      pathIndex: -1
    });
  },

  // 隐藏弹窗
  hideModal() {
    this.setData({
      showModal: false
    });
  },

  // 监听页面名称输入
  onPageNameInput(e) {
    this.setData({
      'newPage.name': e.detail.value
    });
  },

  // 监听路径选择
  onPathSelect(e) {
    const index = e.detail.value;
    this.setData({
      pathIndex: index,
      'newPage.path': this.data.availablePaths[index].path
    });
  },

  // 确认添加页面权限
  confirmAddPage() {
    const { currentRoleId, newPage } = this.data;
    
    if (!newPage.name || !newPage.path) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    const roles = this.data.roles.map(role => {
      if (role.id === currentRoleId) {
        const newId = role.pages.length + 1;
        const pages = [...role.pages, {
          id: newId,
          name: newPage.name,
          path: newPage.path,
          enabled: true
        }];
        return { ...role, pages };
      }
      return role;
    });

    this.setData({
      roles,
      showModal: false
    });

    wx.showToast({
      title: '添加成功',
      icon: 'success'
    });
  }
}); 