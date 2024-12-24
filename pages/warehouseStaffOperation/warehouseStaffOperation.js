Page({
    data: {
        isEditing: false,
        type: "shipping", // shipping 或 receiving
        formData: {
            // 基础字段
            serialNumber: "",
            status: "",
            initiatedTime: "",
            accountant: "",

            // 发货单特有字段
            shipper: "",
            shippingTime: "",
            receivingUnit: "",
            project: "",

            // 收货单特有字段
            receiver: "",
            receivingTime: "",
            supplier: "",
            orderNumber: "",

            // 仓管员负责的字段
            storageLocation: "A区-01-01",
            inventoryStatus: "正常",
            warehouseRemarks: "",
            shelfNumber: "S-01",
            quantity: "100",
            materialCode: "M-001",
            batchNumber: "B-001",
        },
        editableFields: [
            "storageLocation",
            "inventoryStatus",
            "warehouseRemarks",
            "shelfNumber",
            "quantity",
            "materialCode",
            "batchNumber",
        ],
    },

    onLoad(options) {
        const { id, type } = options;
        this.setData({ type });
        // 根据id和type加载对应的数据
        console.log("Loading details for:", id, type);
    },

    navigateBack() {
        wx.navigateBack();
    },

    isFieldEditable(field) {
        return this.data.editableFields.includes(field);
    },

    toggleEdit() {
        if (this.data.isEditing) {
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

    saveChanges() {
        wx.showLoading({
            title: "保存中...",
        });

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

    // 导出当前单据
    exportCurrentOrder() {
        wx.showLoading({
            title: "导出中...",
        });

        setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
                title: "导出成功",
                icon: "success",
            });
        }, 1500);
    },
});
