const PAGE = {
    init: function () {
        this.bind()
    },
    bind: function () {
        $('#adminSubmit').on('click', this.handleSubmit)
    },
    handleSubmit: function () {
        let name = $('#adminName').val();
        let phone = $('#adminPhone').val();
        let password = $('#adminPassword').val();
        let roleIds = $('#adminRole').val();
        // 转化为数组
        roleIds = Array.from(roleIds).map(id => +id);
        console.log(roleIds);

        if (!name || !phone || !password || !roleIds) {
            alert('请填写完整信息')
            return
        }
        $.ajax({
            type: 'POST',
            url: '/api/admin/create',
            data: JSON.stringify({
                name: name,
                phone: phone,
                password: password,
                roleIds: roleIds
            }),
            contentType: 'application/json',
            beforeSend: function () {
                $('#adminSubmit').attr('disabled', true)
            },
            success: function (data) {
                console.log(data);
                if (data.error_code === 0) {
                    alert('创建成功')
                } else {
                    alert(data.message)
                }
            },
            error: function (err) {
                console.log(err)
            },
            complete: function () {
                $('#adminSubmit').attr('disabled', false)
            }
        })
    }
}

PAGE.init()