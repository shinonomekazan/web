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
