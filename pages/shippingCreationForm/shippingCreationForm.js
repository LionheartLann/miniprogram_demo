Page({
data: {
receivingUnit: '',
project: '',
actualQuantity: '',
materialCategory: '',
issueRemarks: ''
},
onInput(e) {
const { field } = e.currentTarget.dataset;
this.setData({
[field]: e.detail.value
});
},
onSubmit() {
// Example of how you might handle form submission
const {
receivingUnit,
project,
actualQuantity,
materialCategory,
issueRemarks
} = this.data;
// Validate or process data as needed
if (!receivingUnit || !project || !actualQuantity) {
wx.showToast({
title: '请填写必要字段',
icon: 'none'
});
return;
}
// Perform any necessary API calls or local data storage
wx.showToast({
title: '提交成功',
icon: 'success'
});
// Possibly navigate back or to another page
wx.navigateBack();
}
});