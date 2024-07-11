// const DX = {
//     init: function () {
//         this.bind()
//     },
//     bind: function () {
//         $('#page-nav-list').bind('click', this.handleActive)
//     },
//     handleActive: function () {
//         $.ajax({
//             success: function (e) {
//                 let className = e.target.className;
//                 console.log(className);
//                 let nav = e.target.parentNode;
//                 if (className === 'page-nav-item') {
//                     // 在这里放置你的逻辑代码
//                     let isACtive = nav.className.indexOf('active');
//                     if (isACtive > 0) {
//                         nav.className = 'nav'
//                     } else {
//                         nav.className += 'active'
//                     }
//                 }
//             }
//         })

//     }
// }

// DX.init()

const DX = {
    init: function () {
        this.bind();
    },
    bind: function () {
        $('#page-nav-list').on('click', event => this.handleActive(event)); // 使用.on()和箭头函数保持上下文
    },
    handleActive: function (e) {
        $.ajax({
            success: function () {
                let className = e.target.className;
                console.log(className);
                let nav = e.target.parentNode;
                if (className === 'page-nav-item') {
                    let isActive = nav.className.includes('active'); // 使用.includes()提高代码可读性
                    nav.className = isActive ? nav.className.replace('active', '') : nav.className + 'active';
                }
            }
        });
    }
};

DX.init();