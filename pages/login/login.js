Page({
  data: {
    username: '',
    password: ''
  },

  onInput(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [field]: e.detail.value
    });
  },

  onLogin() {
    const { username, password } = this.data;
    const VALID_USERNAME = 'admin';
    const VALID_PASSWORD = 'admin';

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 2000,
        success: () => {
          wx.navigateTo({
            url: '/pages/roleSelection/roleSelection'
          });
        }
      });
    } else {
      wx.showToast({
        title: '用户名或密码错误',
        icon: 'none'
      });
    }
  }
}); 