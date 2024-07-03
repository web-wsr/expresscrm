const DX = {
    init: function () {
        this.bind()
    },
    bind: function () {
        $('#page-nav-list').bind('click', this.handleActive)
    },
    handleActive: function (e) {
        let className = e.target.className
        console.log(className);
        let nav = e.target.parentNode
        if (className === 'page-nav-item') {
            let isACtive = nav.className.indexOf('active');
            if (isACtive > 0) {
                nav.className = 'nav'
            } else {
                nav.className += 'active'
            }
        }
    }
}

DX.init()