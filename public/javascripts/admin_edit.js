const PAGE = {
    init: function () {
        this.bind()
    },
    bind: function () {
        $('#adminSubmit').bind('click', this.handleSubmit)
    },

    handleSubmit: function () {
        let userId = $('#adminId').val();
        let name = $('#adminName').val();
        let phone = $('#adminPhone').val();
        let password = $('#adminPassword').val();
        let roleIds = $('#adminRole').val()
        roleIds = Array.from(roleIds).map(id => +id);
        console.log(roleIds);
        if (!name || !phone || !password || !roleIds) {
            alert('请填写完整信息')
            return
        }
        $.ajax({
            url: '/api/admin/' + userId,
            type: 'PUT',
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
                if (data.code === 200) {
                    alert('保存成功')
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