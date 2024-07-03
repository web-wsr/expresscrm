// 落地页的脚本逻辑
const PAGE = {
    init: function () {
        this.bind()
    },
    bind: function () {
        $('#userSubmit').bind('click', this.handleSubmit)
    },
    handleSubmit: function () {
        let name = $('#userName').val()
        let phone = $('#userPhone').val()
        // 线索来源,在url地址中获取
        let utm = PAGE.getUtm('utm')

        if (!name || !phone) {
            alert('请填写完整信息')
            return;
        }

        $.ajax({
            url: '/api/clue',
            type: 'POST',
            data: { name, phone, utm },
            beforesSend: function () {
                $('#userSubmit').attr('disabled', true)
            },
            success: function (data) {
                if (data.code === 200) {
                    alert('抢占成功,^-^')
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
    },
    getUtm: function (name) {
        const result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1) {
            return "";
        }
        return result[1];
    }
}

PAGE.init()
