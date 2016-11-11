<template>
	<div class="container" id="index">
		<a href="" class="mpaper-logo"></a>

		<ul class="mpaper-menu" :class="{'active': isActive}" :style="styleObject">
			<li v-for="menu in menus" :class="menu.icon">
				{{ menu.title }}
			</li>
		</ul>

		<ul class="mpaper-news">
			<li v-for="msg in msgs">
				{{ msg }}
			</li>
		</ul>
	</div>
</template>

<script>
	let menu = [
		{
			title: "经济解读",
			icon: "icon-economy"
		},
		{
			title: "市场动态",
			icon: "icon-market"
		},
		{
			title: "今日必看",
			icon: "icon-today"
		},
		{
			title: "环球透视",
			icon: "icon-world"
		}
	];

	let msg = [
		'1这是林诗诗诗诗这是林诗诗诗诗',
		'2这是林诗诗诗诗这是林诗诗诗诗',
		'3603这是林诗诗诗诗这是林诗诗诗诗',
		'4这是林诗诗诗诗这是林诗诗诗诗'
	];

	export default {
		name: 'mpaper',
		data () {
		    return {
		    	list: [0,1,2,3,4,5,6,7,8,9,10],
				msgs: msg,
				isActive: false,
				menus: menu
		    }
		},
		computed: {
			styleObject () {
			  	return {
			  		height: document.body.clientWidth * 1.1875 + 'px'
			  	}
			}
		},
		created () {
			var _this = this;
			setTimeout(function(){
				_this.isActive = true;
			}, 500)
		}
	}
</script>

<style lang="sass">
	$maxW: 640px;
	$menusW: 80px;
	$menusH: $menusW;

	div, ul, a, li {
		box-sizing: border-box;
	}

	html, body {
		margin: 0 auto;
		font-size: 14px;
	}

	ul, li {
		padding-left: 0;
		margin: 0 auto;
		list-style: none;
	}

	#index {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		max-width: $maxW;
		margin: 0 auto;
		background: #20afe1 url("./assets/bg.png") no-repeat;
		background-position: 75px left;
		background-size: contain;
	}

	.container {
	}

	.mpaper-logo {
		width: 128px;
		height: 31px;
		margin-top: 20px;
		margin-left: 20px;
		background: url("./assets/logo.png") no-repeat;
		background-size: 100%;
		display: block;
	}

	.mpaper-menu {
		position: fixed;
		z-index: -1;
		top: 77px;
		left: - 52%;
		width: 100% * 1.1875;
		max-width: $maxW;
		margin: 0 auto;
		border-radius: 360px;
		transform: rotate(-180deg);
		transition: 1s;

		&.active {
			transform: rotate(0);
		}

		li {
			position: absolute;
			width: $menusW;
			height: $menusH;
			background-color: #ed9d25;
			border-radius: $menusW/2;
			border: 2px solid #fff;
			padding-top: 42px;
			color: #fff;
			text-align: center;
			margin-top: -$menusW/2;
			margin-left: -$menusW/2;

			&:before {
				content: "";
				position: absolute;
				top: 8px;
				left: 0;
				right: 0;
				width: 35px;
				height: 30px;
				margin: 0 auto;
				background: url("./assets/sp1.png") no-repeat;
				background-size: 100%;
			}
			// 计算公式为left: 50% + abs(sin(20+$i*40))/2; top: 50% - cos(20+$i*40)/2;
			// 由于sass @for和三角函数不是很熟，暂时这样写
			&:nth-child(1) {
				left: 80%;
				top: 10%;
			}

			&:nth-child(2) {
				left: 97%;
				top: 35%;
			}

			&:nth-child(3) {
				left: 97%;
				top: 65%;
			}

			&:nth-child(4) {
				left: 80%;
				top: 90%;
			}
		}
	}

	.mpaper-news {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 40px;
		line-height: 40px;
		max-width: $maxW;
		padding-left: 50px;
		overflow: hidden;
		text-align: left;

		&:before {
			content: "";
			position: absolute;
			left: 10px;
			width: 40px;
			height: 40px;
			background: url("./assets/sp5.png") center no-repeat;
			background-size: 60%;
		}

		li {
			animation: myMove 10s infinite;
			transform-style: preserve-3d;
			// transform-origin: 10% 0 1040px;
		}
	}
</style>