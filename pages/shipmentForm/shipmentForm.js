Page({
  data: {
    role: '', // This should be set based on the role selected in roleSelection
    fields: []
  },

  onLoad(options) {
    const role = options.role; // Assume role is passed as a query parameter
    this.setData({ role });
    this.initializeFields(role);
  },

  initializeFields(role) {
    let fields = [];
    switch (role) {
      case '做账员':
        fields = [
          { label: '发货流水号', field: 'shipmentNumber', type: 'text', placeholder: '自动生成', disabled: true },
          { label: '领料单位', field: 'unit', type: 'text', placeholder: '请输入领料单位' },
          { label: '施工项目', field: 'project', type: 'text', placeholder: '请输入施工项目' },
          { label: '实物发货人', field: 'shipper', type: 'text', placeholder: '自动抓取', disabled: true },
          { label: '单据数量', field: 'documentQuantity', type: 'number', placeholder: '请输入单据数量' },
          { label: '交接单号', field: 'handoverNumber', type: 'text', placeholder: '请输入交接单号' },
          { label: '发货师傅发货时间', field: 'shipmentTime', type: 'text', placeholder: '自动抓取', disabled: true },
          { label: '实际出库数量', field: 'actualQuantity', type: 'number', placeholder: '请输入实际出库数量' },
          { label: '物料类别', field: 'materialCategory', type: 'picker', options: ['类别1', '类别2'], selected: '请选择物料类别' },
          { label: '发货问题备注', field: 'remarks', type: 'textarea', placeholder: '请输入备注' }
        ];
        break;
      case '发货师傅':
        fields = [
          { label: '领料单位', field: 'unit', type: 'text', placeholder: '请输入领料单位' },
          { label: '施工项目', field: 'project', type: 'text', placeholder: '请输入施工项目' },
          { label: '领料人', field: 'receiver', type: 'text', placeholder: '请输入领料人' },
          { label: '实物发货人', field: 'shipper', type: 'text', placeholder: '自动抓取', disabled: true },
          { label: '单据数量', field: 'documentQuantity', type: 'number', placeholder: '请输入单据数量' },
          { label: '交接单号', field: 'handoverNumber', type: 'text', placeholder: '请输入交接单号' },
          { label: '发货师傅发货时间', field: 'shipmentTime', type: 'text', placeholder: '自动抓取', disabled: true }
        ];
        break;
      // Add cases for other roles
    }
    this.setData({ fields });
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
    const options = this.data.fields.find(f => f.field === field).options;
    this.setData({
      [`formData.${field}`]: options[value],
      [`fields[${this.data.fields.findIndex(f => f.field === field)}].selected`]: options[value]
    });
  },

  onSubmit() {
    wx.showToast({
      title: '提交成功',
      icon: 'success'
    });
    // Implement form submission logic here
  }
}); 