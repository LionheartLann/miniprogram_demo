Page({
  data: {
    isEditing: false,
    formData: {
      // 不可编辑字段
      serialNumber: 'WHSC-FH-20231001-001',
      shipper: '张三',
      shippingTime: '2023-10-01 10:00',
      initiatedTime: '2023-10-01 09:00',
      accountant: '李四',
      status: '待发货',
      receivingUnit: '某施工单位',
      project: '工程项目A',

      // 可编辑字段（发货师傅负责的字段）
      actualQuantity: '100',
      materialStatus: '完好',
      shippingRemarks: '',
      isPackaged: '是',
      transportMethod: '货车'
    },
    editableFields: [
      'actualQuantity',
      'materialStatus',
      'shippingRemarks',
      'isPackaged',
      'transportMethod'
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
        content: '确定要取消编辑吗？未保存的修改将丢失',
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