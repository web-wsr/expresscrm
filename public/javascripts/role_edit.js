const PAGE = {
    init: function () {
        this.bind()
    },
    bind: function () {
        $('#roleSubmit').bind('click', this.handleSubmit)
    },

    handleSubmit: function () {
        const id = $('#roleId').val();
        const roleSlug = $('#roleSlug').val();
        const roleName = $('#roleName').val();
        const roleDesc = $('#roleDesc').val();
        const stringArray = $('.premission-checkbox:checked').map(function () {
            return this.id
        }).get()
        let permissions = stringArray.map(id => +id)
        console.log(permissions);
        console.log(roleSlug);
        console.log(roleName);
        console.log(roleDesc);
        console.log(id);
        if (!roleSlug || !roleName || !roleDesc || !permissions) {

            alert('请填写完整信息')
            return
        }

        $.ajax({
            url: '/api/role/' + id,
            type: 'PUT',
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
                    alert('保存成功')
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