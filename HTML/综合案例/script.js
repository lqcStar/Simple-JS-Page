//封装获取id的方法
function byId(id) {
    return typeof(id) === "string" ? document.getElementById(id) : id;
}



function slideImg() {
    var main = byId("main");
    //滑过清除计数器、离开继续
    var index = 0,
        timer = null,
        pics = byId("banner").getElementsByTagName("div"),
        dots = byId("dots").getElementsByTagName("span"),
        pre = byId("pre"),
        next = byId("next"),
        menu = byId("menu-content"),
        menuItems = menu.getElementsByClassName("menu-item"),
        subMenu = byId("sub-menu"),
        innerBox = subMenu.getElementsByClassName("inner-box")
        len = pics.length;


    main.onmouseover = function () {
        //滑过清除计数器
        if(timer) clearInterval(timer);
    }



    main.onmouseout = function () {
        timer = setInterval(function () {
            index++;
            if (index >= len){
                index = 0;
            }
            //切换图片
            changeImg();
        },3000)
    }


    //自动在main上触发离开事件
    main.onmouseout();



    //点击圆点切换，绑定事件
    for (var i = 0; i <len; i++){
        //给所有的span加上i,作为span的id属性
        dots[i].id = i;
        dots[i].onclick = function (ev) {
            //改变index为当前图片的id
            index = this.id;
            changeImg();
        }

    }




    //上下按钮切换图片
    next.onclick = function (ev) {
        index++;
        if(index >= len) index = 0;
        changeImg();
    }
    pre.onclick = function (ev) {
        index--;
        if(index < 0 ) index = len-1;
        changeImg();
    }




    function changeImg(){
        //遍历banner下所有的div，将其隐藏,遍历dots下所有span，清楚active类
        for (var i = 0; i < len; i++){
            pics[i].style.display = "none";
            dots[i].className = "";
        }
        pics[index].style.display = "block";
        dots[index].className = "active";
    }


    //导航菜单
    //遍历主菜单且绑定事件
    for (var j=0; j < menuItems.length; j++){
        //为每一个menu-item定义data-index属性，作为索引
        menuItems[j].setAttribute("data-index",j);
        menuItems[j].onmouseover = function () {
            subMenu.className = "sub-menu";
            var idx = this.getAttribute("data-index");
            for (var m=0; m<innerBox.length; m++){
                //遍历所有子菜单，将其都隐藏
                innerBox[m].style.display = "none";
                menuItems[m].style.background = "none";
            }
            menuItems[idx].style.background = "rgba(0,0,0,0.2)";
            innerBox[idx].style.display = "block";
        }
    }

    menu.onmouseout = function (ev) {
        subMenu.className = "sub-menu hide";
    }

    subMenu.onmouseover = function (ev) {
        this.className = "sub-menu";
    }
    subMenu.onmouseout = function (ev) {
        this.className = "sub-menu hide";
    }

}

slideImg()