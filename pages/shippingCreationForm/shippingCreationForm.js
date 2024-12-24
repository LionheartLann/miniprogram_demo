Page({
    data: {
        receivingUnit: "",
        project: "",
        actualQuantity: "",
        materialCategories: ["原材料", "成品", "半成品", "工具", "其他"],
        selectedCategory: "",
        currentUser: "系统自动获取", // 这里应该是从登录信息中获取
        issueRemarks: "",
        submitTime: "",
    },

    onLoad() {
        // 设置当前时间
        const now = new Date();
        this.setData({
            submitTime: now.toLocaleString(),
        });
    },
    navigateBack() {
        wx.navigateBack();
    },

    onInput(e) {
        const { field } = e.currentTarget.dataset;
        this.setData({
            [field]: e.detail.value,
        });
    },

    onMaterialCategoryChange(e) {
        const index = e.detail.value;
        this.setData({
            selectedCategory: this.data.materialCategories[index],
        });
    },

    onSubmit() {
        const { receivingUnit, project, actualQuantity, selectedCategory } =
            this.data;

        // 验证必填字段
        if (
            !receivingUnit ||
            !project ||
            !actualQuantity ||
            !selectedCategory
        ) {
            wx.showToast({
                title: "请填写必要信息",
                icon: "none",
            });
            return;
        }

        // 提交表单
        wx.showLoading({
            title: "提交中...",
        });

        // 模拟提交
        setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
                title: "提交成功",
                icon: "success",
                duration: 2000,
                success: () => {
                    // 延迟返回上一页
                    setTimeout(() => {
                        wx.navigateBack();
                    }, 2000);
                },
            });
        }, 1500);
    },
});
