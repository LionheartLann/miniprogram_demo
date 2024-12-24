// pages/accountantOperation/accountantOperation.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        isEditing: false,
        materialCategories: ["原材料", "成品", "半成品", "工具", "其他"],
        materialCategoryIndex: 0,
        formData: {
            serialNumber: "WHSC-FH-20231001-001",
            shipper: "张三",
            shippingTime: "2023-10-01 10:00",
            initiatedTime: "2023-10-01 09:00",
            accountant: "李四",
            status: "待发货",
            receivingUnit: "某施工单位",
            project: "工程项目A",
            quantity: "100",
            materialCategory: "原材料",
            remarks: "",
            accountingRemarks: "",
        },
        editableFields: [
            "receivingUnit",
            "project",
            "quantity",
            "materialCategory",
            "accountingRemarks",
        ],
    },

    navigateBack() {
        wx.navigateBack();
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 这里可以根据传入的参数加载具体数据
        // const { id } = options;
        // this.loadDetailData(id);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {},

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {},

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {},

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {},

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {},

    /**
     * 处理标签切换事件
     */
    onTabChange(event) {
        this.setData({
            activeTab: event.currentTarget.dataset.tab,
        });
    },

    isFieldEditable(field) {
        return this.data.editableFields.includes(field);
    },

    toggleEdit() {
        if (this.data.isEditing) {
            // 取消编辑，恢复原始数据
            wx.showModal({
                title: "提示",
                content: "确定要取消编辑吗？未保存的修改将丢失",
                success: (res) => {
                    if (res.confirm) {
                        this.setData({
                            isEditing: false,
                        });
                    }
                },
            });
        } else {
            this.setData({
                isEditing: true,
            });
        }
    },

    onInputChange(e) {
        const { field } = e.currentTarget.dataset;
        const { value } = e.detail;

        this.setData({
            [`formData.${field}`]: value,
        });
    },

    onCategoryChange(e) {
        const index = e.detail.value;
        this.setData({
            materialCategoryIndex: index,
            "formData.materialCategory": this.data.materialCategories[index],
        });
    },

    saveChanges() {
        wx.showLoading({
            title: "保存中...",
        });

        // 模拟保存操作
        setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
                title: "保存成功",
                icon: "success",
                duration: 2000,
            });

            this.setData({
                isEditing: false,
            });
        }, 1500);
    },
});
