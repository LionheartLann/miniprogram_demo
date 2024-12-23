Page({
  data: {},

  selectRole(e) {
    const role = e.currentTarget.dataset.role;
    if (role === 'accountant') {
      wx.navigateTo({
        url: '/pages/shippingInspectionForm/shippingInspectionForm'
      });
    } else {
      wx.showToast({
        title: `选择的角色是: ${role}`,
        icon: 'success',
        duration: 2000,
        success: () => {
          let targetPage = '';
          if (role === '做账员') {
            targetPage = '/pages/shippingInspectionForm/shippingInspectionForm';
          } else {
            targetPage = '/pages/shipmentForm/shipmentForm';
          }
          wx.navigateTo({
            url: `${targetPage}?role=${role}`
          });
        }
      });
    }
  }
}); 