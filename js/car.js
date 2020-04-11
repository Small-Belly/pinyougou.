$(function () {
    //1.全选 ,全不选功能精选
    //就是把全选按钮(checkall)的状态赋值给 三个小的按钮(j-checkbox) 就可以了
    //事件可以使用change
    $('.checkall').change(function () {
        $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));
        if ($(this).prop("checked")) {
            // 让所有的商品添加 check-cart-item 类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(".cart-item").removeClass("check-cart-item");
        }
    })
    //2.如果小复选框被选中的个数等于小复选框的个数,那么全选按钮选上,否则全选按钮不选
    $('.j-checkbox').change(function () {
        //:checked
        if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }
        if ($(this).prop("checked")) {
            // 让所有的商品添加 check-cart-item 类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            // check-cart-item 移除
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    })
    /* 
        3.增减商品数量模块
        首先声明一个变量,当我们点击 + (.increment),就让这个值++,然后赋值给文本框
        当我们点击 - (.decrement),就让这个值--,然后赋值给文本框(.itxt)
    */
    $('.increment').click(function () {
        var n = $(this).siblings('.itxt').val();
        // console.log(n);
        n++;
        $(this).siblings('.itxt').val(n);
        /* 
            4.计算小计模块,根据文本框的值 * 当前商品的价格  就是商品的小计
            当前商品的价格  p
        */
        var p = $(this).parents('.p-num').siblings('.p-price').html(); //单价
        // console.log(p);
        //字符串截取 substr(1) 截取 ￥ 
        p = p.substr(1);
        //最后计算的结果如果想要保留2位小数，通过toFixed(2)方法
        var price = (p * n).toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
        getSum();
    })
    $('.decrement').click(function () {
        var n = $(this).siblings('.itxt').val();
        // console.log(n);
        if (n <= 1) {
            return false;
        }
        n--;
        $(this).siblings('.itxt').val(n);
        //  --
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
        getSum();
    })
    /* 
    5.用户修改文本框的值   计算     小计模块
    */
    $('.itxt').change(function () {
        var n = $(this).val();
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
        getSum();
    });
    /* 
        购物车计算总计和总额
        封装函数getSum()
    */
    getSum();

    function getSum() {
        var count = 0; //总件数
        var money = 0; //总价格
        //(1)小件总数   .itxt是表单 ,val();
        $('.itxt').each(function (index, ele) {
            // console.log(index);
            // console.log($(ele));
            count += parseInt($(ele).val());
            // console.log(count);
            $('.amount-sum em').text(count);
        });
        $('.p-sum').each(function (index, ele) {
            //console.log(index);
            //console.log($(ele).text()); //￥29.80
            money += parseFloat($(ele).text().substr(1));
            $('.price-sum em').text('￥' + money.toFixed(2));
        });
    }

    /* 
        6.购物车删除商品模块
    */
    //(1) 商品后面的删除按钮
    $('.p-action a').click(function () {
        $(this).parents('.cart-item').remove();
        getSum();
    })
    //(2) 删除选中的商品
    /* 
        先判断小的复选框按钮，如果选中，则删除对应的商品
    */
    $('.remove-batch a').click(function () {
        $('.j-checkbox:checked').parents('.cart-item').remove();
        getSum();
    });
    //(3) 删除全部商品
    $('.clear-all').click(function () {
        $('.cart-item').remove();
        getSum();
    });
});