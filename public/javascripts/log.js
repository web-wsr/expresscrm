// 添加客户数据的脚本逻辑

const PAGE = {
    init: function () {
        this.bind()
    },
    bind: function () {
        $('#clueSubmit').bind('click', this.handleEditclueSubmit)
        $('#logSubmit').bind('click', this.handleAddLogSubmit)
    },
    handleEditclueSubmit: function () {
        let id = $('#clueId').val()
        let status = $('#clueStatus').val()
        let remark = $('#clueRemark').val()
        let user_id = $('#clueUserId').val()
        status = Number(status)
        if (!id || !status || !remark || !user_id) {
            alert('请填写完整信息 嘻嘻')
            return
        }

        $.ajax({
            // 填写正确的url地址
            url: '/api/clue/' + id,
            type: 'PUT',
            data: {
                remark, status, user_id
            },
            beforeSend: function () {
                $('#clueSubmit').attr('disabled', true)
            },
            success: function (data) {
                if (data.code === 200) {
                    alert('编辑成功，^-^')
                } else {
                    alert(data.message)
                }
            },
            // error: function (err) {
            //     // console.log(err);
            //     alert(data.message)
            // },
            error: function (xhr, status, error) {
                if (xhr.status === 403) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        alert(response.message);
                    } catch (e) {
                        // Handle parsing error or non-JSON response
                        alert('An error occurred while processing your request.');
                    }
                } else {
                    console.log(error);
                }
            },
            complete: function () {
                $('#clueSubmit').attr('disabled', false)
            }
        })
    },
    handleAddLogSubmit: function () {
        let content = $('#logContent').val()
        let id = $('#clueId').val()
        if (!content) {
            alert('请填写完整信息')
            return
        }

        $.ajax({
            url: '/api/clue/' + id + '/log',
            type: 'POST',
            data: { content },
            beforeSend: function () {
                $('#logSubmit').attr('disabled', true)
            },
            success: function (data) {
                if (data.code === 200) {
                    alert('添加成功，^_^')
                    location.reload()
                } else {
                    alert(data.message)
                }
            },
            // error: function (err) {
            //     console.log(err);
            // },
            error: function (xhr, status, error) {
                if (xhr.status === 403) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        alert(response.message);
                    } catch (e) {
                        // Handle parsing error or non-JSON response
                        alert('An error occurred while processing your request.');
                    }
                } else {
                    console.log(error);
                }
            },
            complete: function () {
                $('#logSubmit').attr('disabled', false)
            }
        })
    }
}

PAGE.init()