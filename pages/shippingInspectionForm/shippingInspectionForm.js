// pages/shippingInspectionForm/shippingInspectionForm.js
import { getShippingData } from "../../utils/dataService"; // <-- import the utility

Page({
    /**
     * 页面的初始数据
     */
    data: {
        searchQuery: "",
        allOrders: [], // store all 100 items here
        orders: [], // store only the current page’s items
        currentPage: 1,
        totalPages: 5,
        typedPage: "",
        isShippingSelected: true,
        isReceivingSelected: false,
        statusBarHeight: 0,
        navBarHeight: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const fullData = getShippingData();

        let sysInfo = wx.getSystemInfoSync();
        // 获取微信小程序胶囊布局位置信息
        let rect = wx.getMenuButtonBoundingClientRect();
        let navBarHeight =
            (rect.top - sysInfo.statusBarHeight) * 2 + rect.height;
        this.setData({
            statusBarHeight: sysInfo.statusBarHeight,
            navBarHeight: navBarHeight,
            totalPages: Math.ceil(fullData.length / 10),
            allOrders: fullData,
        });
        this.loadData();
    },

    navigateBack() {
        wx.navigateBack();
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

    onSearchInput(e) {
        this.setData({
            searchQuery: e.detail.value,
        });
    },

    onSearch() {
        const { searchQuery } = this.data;
        if (searchQuery) {
            // Implement search logic here
            wx.showToast({
                title: `搜索: ${searchQuery}`,
                icon: "none",
            });
        } else {
            wx.showToast({
                title: "请输入流水号",
                icon: "none",
            });
        }
    },

    navigateToDetails() {
        wx.navigateTo({
            url: "/pages/accountantOperation/accountantOperation",
        });
    },

    navigateToShipping() {
        this.setData({
            isShippingSelected: true,
            isReceivingSelected: false,
        });
        wx.redirectTo({
            url: "/pages/shippingInspectionForm/shippingInspectionForm",
        });
    },

    navigateToReceiving() {
        this.setData({
            isShippingSelected: false,
            isReceivingSelected: true,
        });
        wx.redirectTo({
            url: "/pages/receivingInspectionForm/receivingInspectionForm",
        });
    },
    onFabTap() {
        // Navigate to the shipping creation form page
        wx.navigateTo({
            url: "/pages/shippingCreationForm/shippingCreationForm",
        });
    },

    getStatusClass(status) {
        return ""; // 移除行背景色
    },

    getStatusTagClass(status) {
        switch (status) {
            case "待发货":
                return "status-pending";
            case "已发货":
                return "status-shipped";
            case "发货中":
                return "status-in-transit";
            case "发货完成":
                return "status-completed";
            case "发货异常":
                return "status-error";
            default:
                return "";
        }
    },

    onPrevPage() {
        if (this.data.currentPage > 1) {
            this.setData({ currentPage: this.data.currentPage - 1 });
            this.loadData();
        }
    },
    onNextPage() {
        if (this.data.currentPage < this.data.totalPages) {
            this.setData({ currentPage: this.data.currentPage + 1 });
            this.loadData();
        }
    },
    onPageInput(e) {
        this.setData({ typedPage: e.detail.value });
    },
    onGoPage() {
        const page = parseInt(this.data.typedPage, 10);
        if (page && page >= 1 && page <= this.data.totalPages) {
            this.setData({ currentPage: page });
            this.loadData();
        } else {
            wx.showToast({
                title: "页数超出范围",
                icon: "none",
            });
        }
    },
    loadData() {
        // For example, page size = 10
        const pageSize = 10;
        const startIndex = (this.data.currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const pageItems = this.data.allOrders.slice(startIndex, endIndex);
        this.setData({
            orders: pageItems,
        });
    },
});
