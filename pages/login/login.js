Page({
  data: {
    username: '',
    password: ''
  },

  onUsernameInput(e) {
    this.setData({
      username: e.detail.value
    });
  },

  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  onLogin() {
    const { username, password } = this.data;

    // Commenting out the validation logic
    /*
    if (!username || !password) {
      wx.showToast({
        title: '请输入用户名和密码',
        icon: 'none'
      });
      return;
    }

    if (username !== 'expectedUsername' || password !== 'expectedPassword') {
      wx.showToast({
        title: '用户名或密码错误',
        icon: 'none'
      });
      return;
    }
    */

    // Proceed with login without validation
    wx.showToast({
      title: '登录成功',
      icon: 'success'
    });

    // Navigate to the next page or perform other actions
    wx.navigateTo({
      url: '/pages/roleSelection/roleSelection'
    });
  }
}); 