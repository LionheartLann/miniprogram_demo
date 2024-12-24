Page({
    data: {
        isEditing: false,
        formData: {
            // 不可编辑字段
            serialNumber: "WHSC-SH-20231001-001",
            receiver: "张三",
            receivingTime: "2023-10-01 10:00",
            initiatedTime: "2023-10-01 09:00",
            accountant: "李四",
            status: "待收货",
            supplier: "供应商A",
            orderNumber: "PO-20231001-001",

            // 可编辑字段
            quantity: "100",
            stored: "是",
            accountingRemarks: "",
        },
        // 定义哪些字段可以编辑
        editableFields: ["quantity", "stored", "accountingRemarks"],
    },

    isFieldEditable(field) {
        return this.data.editableFields.includes(field);
    },

    navigateBack() {
        wx.navigateBack();
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

    onLoad(options) {
        // 获取传递的参数
        const { id } = options;
        console.log("Received ID:", id);

        // 这里可以根据 id 加载对应的数据
        // this.loadReceivingDetails(id);

        // 临时使用静态数据
        this.setData({
            formData: {
                serialNumber: id || "WHSC-SH-20231001-001",
                receiver: "张三",
                receivingTime: "2023-10-01 10:00",
                initiatedTime: "2023-10-01 09:00",
                accountant: "李四",
                status: "待收货",
                supplier: "供应商A",
                orderNumber: "PO-20231001-001",
                quantity: "100",
                stored: "是",
                accountingRemarks: "",
            },
        });
    },
});
