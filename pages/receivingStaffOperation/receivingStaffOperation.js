Page({
  data: {
    isEditing: false,
    formData: {
      // 不可编辑字段
      serialNumber: 'WHSC-SH-20231001-001',
      receiver: '张三',
      receivingTime: '2023-10-01 10:00',
      initiatedTime: '2023-10-01 09:00',
      accountant: '李四',
      status: '待收货',
      supplier: '供应商A',
      orderNumber: 'PO-20231001-001',

      // 可编辑字段（接车师傅负责的字段）
      actualQuantity: '100',
      materialStatus: '完好',
      receivingRemarks: '',
      isStored: '是',
      storageLocation: 'A区-01-01',
      qualityStatus: '合格'
    },
    editableFields: [
      'actualQuantity',
      'materialStatus',
      'receivingRemarks',
      'isStored',
      'storageLocation',
      'qualityStatus'
    ]
  },

  onLoad(options) {
    const { id } = options;
    // 根据id加载数据
    console.log('Loading details for:', id);
  },

  isFieldEditable(field) {
    return this.data.editableFields.includes(field);
  },

  toggleEdit() {
    if (this.data.isEditing) {
      wx.showModal({
        title: '提示',
        content: '确定要取消编辑吗？��保存的修改将丢失',
        success: (res) => {
          if (res.confirm) {
            this.setData({
              isEditing: false
            });
          }
        }
      });
    } else {
      this.setData({
        isEditing: true
      });
    }
  },

  onInputChange(e) {
    const { field } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({
      [`formData.${field}`]: value
    });
  },

  saveChanges() {
    wx.showLoading({
      title: '保存中...'
    });

    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 2000
      });

      this.setData({
        isEditing: false
      });
    }, 1500);
  }
}); 