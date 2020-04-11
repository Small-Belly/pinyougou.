window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var arrow_l = document.querySelector('.arrow-l')
    var arrow_r = document.querySelector('.arrow-r')
    //1.鼠标经过轮播图模块,左右按钮显示,离开隐藏按钮
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function () {
            arrow_r.click();
        }, 2000);
    })
    //2.根据图片,添加小圆点,并能点击
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    //获取每个li的宽度
    var focusWidth = focus.offsetWidth;
    for (var i = 0; i < ul.children.length; i++) {
        var li = document.createElement('li');
        //给li设置自定义属性
        li.setAttribute('index', i);
        ol.appendChild(li);
        //3.给每个小圆点排他,并添加点击事件
        li.addEventListener('click', function () {
            for (var k = 0; k < ol.children.length; k++) {
                ol.children[k].className = '';
            }
            this.className = 'current';
            //4.点击小圆圈,移动图片,就是移动ul
            //移动的距离:每个小圆圈*li的距离
            //获取li的自定义属性index
            var index = this.getAttribute('index');
            //把索引号给num和circle,一个控制按钮,一个控制小圆圈
            num = circle = index;
            animate(ul, -index * focusWidth);
        })
    }
    //默认第一个小圆点有样式
    ol.children[0].className = 'current';
    //5.克隆第一张图片到最后,cloneNode
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //6.点击右侧按钮,移动到下一张
    var num = 0;
    //节流阀
    /*  防止轮播图按钮连续点击造成播放过快。
     节流阀目的： 当上一个函数动画内容执行完毕， 再去执行下一个函数动画， 让事件无法连续触发。
     核心实现思路： 利用回调函数， 添加一个变量来控制， 锁住函数和解锁函数。 */
    var flag = true;
    //声明circle 控制小圆圈
    var circle = 0;
    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false; //开启节流阀
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            // console.log(num); //4
            animate(ul, -num * focusWidth, function () {
                flag = true; //打开
            });
            circle++;
            //如果circle == 4,说明走到最后克隆的图片上了
            if (circle == ul.children.length - 1) {
                circle = 0;
            }
            cricleChange();

        }
    })
    //7.点击左侧按钮,移动到上一张
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false;

            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function () {
                flag = true;
            });
            circle--;
            if (circle < 0) {
                circle = ol.children.length - 1; //索引4-1
            }
            cricleChange()
        }
    })
    //8.定时器
    var timer = setInterval(function () {
        arrow_r.click();
    }, 2500);

    function cricleChange() {
        for (var k = 0; k < ol.children.length; k++) {
            ol.children[k].className = '';
        }
        ol.children[circle].className = 'current';
    }
})