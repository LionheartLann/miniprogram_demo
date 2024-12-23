Page({
  navigateToRoleManagement() {
    wx.navigateTo({
      url: '/pages/systemManagement/roleManagement/roleManagement'
    });
  },

  navigateToUserManagement() {
    wx.navigateTo({
      url: '/pages/systemManagement/userManagement/userManagement'
    });
  },

  navigateToPermissionManagement() {
    wx.navigateTo({
      url: '/pages/systemManagement/permissionManagement/permissionManagement'
    });
  }
}); 