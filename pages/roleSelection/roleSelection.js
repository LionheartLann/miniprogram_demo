Page({
  data: {},

  selectRole(e) {
    const role = e.currentTarget.dataset.role;
    wx.showToast({
      title: `选择的角色是: ${role}`,
      icon: 'success',
      duration: 2000,
      success: () => {
        // Navigate to the appropriate page based on the selected role
        let targetPage = '';
        if (role === '做账员') {
          targetPage = '/pages/accountantOperation/accountantOperation';
        } else {
          targetPage = '/pages/shipmentForm/shipmentForm';
        }
        wx.navigateTo({
          url: `${targetPage}?role=${role}`
        });
      }
    });
  }
}); 