
const PAGE = {
    init: function () {
        this.bind()
    },
    bind: function () {
        $('#roleSubmit').bind('click', this.handleSubmit)
    },

    handleSubmit: function () {
        let roleSlug = $('#roleSlug').val();
        let roleName = $('#roleName').val();
        let roleDesc = $('#roleDesc').val();

        const stringArray = $('.premission-checkbox:checked').map(function () {
            return this.id;
        }).get()
        let permissions = stringArray.map(id => +id)
        console.log(permissions);

        if (!roleSlug || !roleName || !roleDesc) {
            console.log(roleSlug);
            console.log(roleName);
            console.log(roleDesc);
            alert('请填写完整信息')
            return
        }

        // 发送请求：
        $.ajax({
            url: '/api/role',
            type: 'POST',
            data: JSON.stringify({
                name: roleName,
                slug: roleSlug,
                description: roleDesc,
                permissions: permissions
            }),
            contentType: 'application/json',
            beforeSend: function () {
                $('#roleSubmit').attr('disabled', true)
            },
            success: function (data) {
                if (data.code === 200) {
                    alert('创建成功')
                    location.href = '/admin/role'
                } else {
                    alert(data.message)
                }
            },
            error: function (err) {
                console.log(err)
            },
            complete: function () {
                $('#roleSubmit').attr('disabled', false)
            }
        })
    }
}

PAGE.init()