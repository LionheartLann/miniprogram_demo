import { getReceivingData } from "../../utils/dataService";

Page({
    data: {
        searchQuery: "",
        allOrders: [],
        orders: [],
        currentPage: 1,
        totalPages: 5,
        typedPage: "",
        isShippingSelected: false,
        isReceivingSelected: true,
        statusBarHeight: 0,
        navBarHeight: 0,
    },

    onLoad(options) {
        const fullData = getReceivingData();
        // this.setData({
        //     allOrders: fullData,
        // });
        // this.setData({
        //     totalPages: Math.ceil(fullData.length / 10),
        // });
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

    navigateToDetails(e) {
        const id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: `/pages/receivingStaffOperation/receivingStaffOperation?id=${id}`,
        });
    },

    onSearchInput(e) {
        this.setData({ searchQuery: e.detail.value });
    },

    onSearch() {
        const query = this.data.searchQuery.toLowerCase();
        const filteredOrders = this.data.allOrders.filter((order) =>
            order.serialNumber.toLowerCase().includes(query)
        );
        this.setData({
            orders: filteredOrders.slice(0, 10),
            currentPage: 1,
            totalPages: Math.ceil(filteredOrders.length / 10),
        });
    },

    loadData() {
        const pageSize = 10;
        const startIndex = (this.data.currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const pageItems = this.data.allOrders.slice(startIndex, endIndex);
        this.setData({
            orders: pageItems,
        });
    },

    getStatusClass(status) {
        return ""; // 移除行背景色
    },

    getStatusTagClass(status) {
        switch (status) {
            case "待收货":
                return "status-pending";
            case "已收货":
                return "status-received";
            case "收货中":
                return "status-in-transit";
            case "收货完成":
                return "status-completed";
            case "收货异常":
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
});
