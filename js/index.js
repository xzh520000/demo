var car = document.getElementById("c"); //购物车表格对象
var count = 0;//购物车商品数量
var foods = [
    { foodName: '章鱼小丸子', imgSrc: './images/0efd616.jpg', money: '22', sales: '月销量20份', id: ['10元起送', '免配送费', '30分钟送达'] },
    { foodName: '粉丝煲', imgSrc: './images/3a31d.jpg', money: '32', sales: '月销量20份', id: ['10元起送', '免配送费', '15分钟送达'] },
    { foodName: '蒸饺', imgSrc: './images/4c981e4.jpg', money: '18', sales: '月销量20份', id: ['10元起送', '免配送费', '35分钟送达'] },
    { foodName: '盖浇饭', imgSrc: './images/b53a0f.jpg', money: '60', sales: '月销量20份', id: ['10元起送', '免配送费', '55分钟送达'] },
]
//生成商品
function getGoods() {
    var goods = document.getElementById('goods')
    for (var i = 0; i < foods.length; i++) {
        ulNode = document.createElement('ul')
        liNode = document.createElement('li')
        liNode.setAttribute('id', 'liNode')
        ulNode.setAttribute('id', 'ulNode')
        imgNode = document.createElement('img')
        spanNode = document.createElement('span')
        ps = document.createElement('p')
        ps.setAttribute('id', 'ps')
        spanNode.innerHTML = foods[i].foodName;
        ps.innerHTML = foods[i].money;
        btn = document.createElement('button')
        btn.setAttribute('id', 'btn')
        btn.innerHTML = '加入购物车'
        btn.onclick = function (obj) {
            if (checkGoods(this.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML)) {
                var tr = car.insertRow();
                tr.insertCell(0).innerHTML = "<input type='checkbox' name='gs' onclick='checkSelect()'>"
                tr.insertCell(1).innerHTML = this.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
                tr.insertCell(2).innerHTML = this.previousElementSibling.previousElementSibling.innerHTML;
                tr.insertCell(3).innerHTML = "<input type='button' value='-' onclick='reduce(this)'><span>1</span><input type='button' onclick='add(this)' value='+'>";
                tr.insertCell(4).innerHTML = "<input type='button' value='删除' onclick='deleteGoods(this)'>";
                count++;
                document.getElementById("num").innerHTML = count;
            }
        }
        imgNode.src = foods[i].imgSrc;
        liNode.appendChild(imgNode);
        liNode.appendChild(spanNode);
        liNode.appendChild(ps);
        goods.appendChild(ulNode);
        ulNode.appendChild(liNode);
        for (var j = 0; j < foods[i].id.length; j++) {
            var aNodes = document.createElement('span')
            aNodes.setAttribute('id', 'aNodes')
            // aNodes.innerHTML = foods[i].id[j]
        }
        liNode.appendChild(aNodes);
        liNode.appendChild(btn);
    }

}
getGoods();



// 判断购物车是否有这个商品
function checkGoods(name) {
    var f = true;
    for (var i = 1; i < car.rows.length; i++) {
        if (name == car.rows[i].cells[1].innerHTML) {
            f = false;
            break;
        }
    }
    return f;
}


// 全选的功能
function checkAll(obj) {
    var gs = document.getElementsByName("gs");
    for (var i = 0; i < gs.length; i++) {
        gs[i].checked = obj.checked;
    }
    pay();
}
// 判断全选按钮是否要勾选
function checkSelect() {
    var c = 0;
    var gs = document.getElementsByName("gs");
    for (var i = 0; i < gs.length; i++) {
        if (gs[i].checked) {
            c++
        }
    }
    document.getElementById("s").checked = c == gs.length;
    pay()
}
// 数量的加减
function reduce(obj) {
    var n = parseInt(obj.nextElementSibling.innerHTML);
    if (n > 1) {
        n--;
        obj.nextElementSibling.innerHTML = n;
    }
    pay();
}
function add(obj) {
    var n = parseInt(obj.previousElementSibling.innerHTML);
    n++;
    obj.previousElementSibling.innerHTML = n;
    pay()
}

// 删除商品
function deleteGoods(obj) {
    car.deleteRow(obj.parentNode.parentNode.rowIndex);
    count--;
    document.getElementById("num").innerHTML = count; ``
    pay()
}
//删除选中项目  
function deleteSelected() {
    var gs = document.getElementsByName("gs");
    for (var i = gs.length - 1; i >= 0; i--) {
        if (gs[i].checked) {
            deleteGoods(gs[i]);
        }
        console.log(c);
    }
}
// 结算 
function pay() {
    var gs = document.getElementsByName("gs");
    var sum = 0;
    for (var i = 0; i < gs.length; i++) {
        if (gs[i].checked) {
            sum += parseInt(car.rows[i + 1].cells[2].innerHTML) * parseInt(car.rows[i + 1].cells[3].children[1].innerHTML);
        }
    }
    document.getElementById("money").innerHTML = sum;
}
// 显示和隐藏
function showCar() {
    document.getElementById("car").style.display = "block";
    document.getElementById("goods").style.display = "none";
}
function showGoods() {
    document.getElementById("car").style.display = "none";
    document.getElementById("goods").style.display = "block";

}
