Page({
  data: {
    roles: [
      {
        id: 1,
        name: '系统管理员',
        status: 'active',
        userCount: 3,
        permissionCount: 12,
        description: '拥有系统所有权限，可以管理其他角色和用户',
        createTime: '2024-03-20 10:00:00'
      },
      {
        id: 2,
        name: '仓库管理员',
        status: 'active',
        userCount: 5,
        permissionCount: 8,
        description: '负责仓库日常运营，管理库存和出入库操作',
        createTime: '2024-03-20 11:30:00'
      },
      {
        id: 3,
        name: '普通用户',
        status: 'inactive',
        userCount: 10,
        permissionCount: 4,
        description: '基础查看权限，无法进行重要操作',
        createTime: '2024-03-20 14:15:00'
      }
    ]
  },

  toggleRoleStatus(e) {
    const { id, status } = e.currentTarget.dataset;
    const newStatus = status === 'active' ? 'inactive' : 'active';
    
    // 更新角色状态
    const roles = this.data.roles.map(role => {
      if (role.id === id) {
        return { ...role, status: newStatus };
      }
      return role;
    });
    
    this.setData({ roles });
  },

  managePermissions(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/systemManagement/permissionManagement/permissionManagement?roleId=${id}`
    });
  },

  deleteRole(e) {
    const { id } = e.currentTarget.dataset;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这个角色吗？',
      success: (res) => {
        if (res.confirm) {
          const roles = this.data.roles.filter(role => role.id !== id);
          this.setData({ roles });
        }
      }
    });
  },

  showAddRoleModal() {
    // 显示添加角色的弹窗或跳转到添加页面
    wx.showToast({
      title: '新增角色功能开发中',
      icon: 'none'
    });
  }
}); 