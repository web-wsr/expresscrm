const PAGE = {
    init: function () {
        this.bind()
    },
    bind: function () {
        $('#roleFilter').bind('click', this.handleFilter)
    },

    handleFilter: function () {
        let roleId = $('#adminRole').val()
        roleId = Number(roleId)
        console.log(roleId);
        $.ajax({
            url: '/api/admin',
            type: 'GET',
            data: { roleId: roleId },
            beforeSend: function () {
                $('#roleFilter').attr('disabled', true)
            },
            success: function (res) {
                if (res.error_code === 0) {
                    alert('获取成功')
                    console.log(res);
                    // 更新DOM以显示筛选后的结果
                    // 例如，清空并重新填充表格
                    $('#adminTable tbody').empty();
                    // 根据返回数据填充表格
                    res.data.forEach(function (item) {
                        $('#adminTable tbody').append(`
                            <tr>
                                <td>${item.id}</td>
                                <td>${item.name}</td>
                                <td>${item.phone}</td>
                                <td>${item.roles.map(role => role.name).join(', ')}</td>
                                <td>
                                    <a href="/admin/admin/${item.id}/edit">编辑</a>
                                    <a class="delete" data-id="${item.id}" href="#">删除</a>
                                </td>
                            </tr>
                        `)
                    })
                } else {
                    alert(data.message)
                }
            },
            error: function (err) {
                console.log(err)
            },
            complete: function () {
                $('#roleFilter').attr('disabled', false)
            }
        })
    }
}

PAGE.init()