// 退出登录的脚本逻辑
const PAGE = {
    init: function () {
        this.bind()
    },
    bind: function () {
        $('#logout').bind('click', this.handleLogout);
    },
    handleLogout: function () {
        $.ajax({
            url: '/api/logout',
            type: 'POST',
            success: function (res) {
                if (res.code === 0) {
                    alert('退出成功！')
                    location.reload()
                }
            }
        })
    },

}
PAGE.init()