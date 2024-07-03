const PAGE = {
    init: function () {
        this.bind();
    },
    bind: function () {
        $('#userSubmit').bind('click', this.handleSubmit)
    },
    handleSubmit: function () {
        let name = $('#userName').val();
        let phone = $('#userPhone').val();
        let password = $('#userPassword').val();
        let role = $('#userRole').val();
        role = Number(role);

        if (!name || !phone || !password || !role) {
            alert('请填写完整信息');
            return;
        }

        $.ajax({
            url: '/api/user',
            type: 'POST',
            data: { name, phone, password, role },
            beforeSend: function () {
                $('#userSubmit').attr('disabled', true)
            },
            success: function (data) {
                if (data.code === 200) {
                    alert('新增成功');
                    // 刷新页面为get请求,地址为/admin/user,展示用户列表页
                    location.href = '/admin/user';
                } else {
                    alert(data.message)
                }
            },
            error: function (err) {
                console.log(err);
            },
            complete: function () {
                $('#userSubmit').attr('disabled', false)
            }
        })
    }
}

PAGE.init();