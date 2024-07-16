const PAGE = {
    init: function () {
        this.bind();
    },
    bind: function () {
        $('body').on('click', '.delete', this.handleDelete)
    },
    handleDelete: function (e) {
        e.preventDefault();
        let id = $(e.currentTarget).data('id');
        console.log(id);
        $.ajax({
            url: '/api/role/delete/' + id,
            type: 'DELETE',
            success: function (data) {
                if (data.error_code === 0) {
                    alert('删除成功！')
                    location.reload()
                } else {
                    alert(data.message)
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
}

PAGE.init()