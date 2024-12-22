Page({
  data: {
    materialCategories: ['类别1', '类别2', '类别3'],
    yesNoOptions: ['是', '否'],
    selectedMaterialCategory: '请选择物料类别',
    selectedTimeDifference: '请选择',
    selectedQuantityMatch: '请选择',
    formData: {
      unit: '',
      project: '',
      receiver: '',
      documentQuantity: '',
      handoverNumber: '',
      actualQuantity: '',
      materialCategory: '',
      remarks: '',
      timeDifference: '',
      quantityMatch: '',
      checkTime: ''
    }
  },

  onInput(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [`formData.${field}`]: e.detail.value
    });
  },

  onPickerChange(e) {
    const { field } = e.currentTarget.dataset;
    const value = e.detail.value;
    const options = field === 'materialCategory' ? this.data.materialCategories : this.data.yesNoOptions;
    this.setData({
      [`formData.${field}`]: options[value],
      [`selected${field.charAt(0).toUpperCase() + field.slice(1)}`]: options[value]
    });
  },

  onSave() {
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });
    // Implement save logic here
  },

  onSubmit() {
    wx.showToast({
      title: '提交成功',
      icon: 'success'
    });
    // Implement submit logic here
  }
}); 