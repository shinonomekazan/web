// burgerを有効にするためのbulma公式サンプルより抜粋
function activateBurgers() {
	document.querySelectorAll(".burger").forEach(function (el) {
		el.addEventListener("click", function () {
			var target = el.dataset.target;
			target = document.getElementById(target);
			el.classList.toggle("is-active");
			target.classList.toggle("is-active");
		});
	});
}

activateBurgers();

//ドロップダウンのスマホ対応
$(function(){
    //useragentを参照しています。
    var isPC = !(/^Mozilla/5.0 ((iPhone;|iPod;|Linux; U; Android|Linux; Android)/i.test(navigator.userAgent));

    //ハンバーガーメニュー
    $(".navbar-burger").on("click",function(){
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    });

    //ドロップダウン
    if(isPC){
        //PCではBulmaのcssの動きで開閉します
    }else{
        $(".has-dropdown").on("click",function(){
            var $this = $(this);
            $this.toggleClass("is-active");
            $this.find(".navbar-dropdown").slideToggle();
        });
        $(".has-dropdown .navbar-dropdown").hide();
    }
});