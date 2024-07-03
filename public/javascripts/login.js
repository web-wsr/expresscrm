const PAGE = {
    init: function () {
        this.bind();
    },
    bind: function () {
        $('#userSubmit').bind('click', this.handleSubmit)
    },

    handleSubmit: function () {
        let phone = $('#userPhone').val();
        let password = $('#userPassword').val();

        if (!phone || !password) {
            alert('请输入手机号和密码');
            return;
        }

        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: {
                phone: phone,
                password: password
            },
            beforeSend: function () {
                $('#userSubmit').attr('disabled', true);
            },
            success: function (data) {
                if (data.code === 200) {
                    alert('登录成功,^-^');
                    // 刷新页面发送get请求, 跳转用户列表页 / admin / user
                    // if (data.role === 1) {
                    //     location.href = '/admin/user';
                    // } else {
                    //     location.href = '/admin/clue';
                    // }
                    location.href = data.role == 1 ? '/admin/user' : '/admin/clue';
                    // location.href = '/admin/user';

                } else {
                    alert(data.message);
                }

            },
            error: function (err) {
                console.log(err);
            },
            complete: function () {
                $('#userSubmit').attr('disabled', false);
            }
        })
    }
}

PAGE.init();