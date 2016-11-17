<template>
	<div class="container" id="index">
		<a href="" class="mpaper-logo"></a>
		<ul class="mpaper-menu" :class="{'active': isActive}" :style="styleObject">
			<li v-for="menu in menus">
				<a :href="'mpaper-details?id=' + menu.id + '&title=' + menu.label">{{ menu.label }}</a>
			</li>
		</ul>
		<div class="mpaper-news">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="msg in msgs">
						<a :href="'mpaper-details?id=' + msg.url_id + '&title=' + msg.url_title">{{ msg.post_title }}</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { getMenus } from '../services/menus.js';

	export default {
		name: 'mpaper',
		data () {
		    return {
		    	url: 'mpaper-details.html?id=',
				isActive: false
		    }
		},
		computed: {
			menus () {
				let menu = getMenus().Data;
				for (var i = menu.length - 1; i >= 0; i--) {
					if(menu[i].label == '财经热词') {
						menu[i].label = '经济解读';
						break;
					}
				}
				return this.sortData(menu);
			},
			msgs () {
				return this.sortData(getMenus().TopData);
			},
			styleObject () {
				let h = document.body.clientWidth;
					h = h > 414 ? '414' : h;
			  	return {
			  		height: h * 1.1875 + 'px'
			  	}
			}
		},
		methods: {
			sortData: function(data){
				let resData = [];
				[2, 1, 3, 0].forEach(function(key, ind){
					resData.push(data[key]);
				});
				return resData;
			}
		},
		created () {
			let _this = this;
			setTimeout(function(){
				_this.isActive = true;

				new Swiper('.swiper-container', {
					direction: 'vertical',
					loop: true,
					autoplay: true,
					speed: 1500
				});
			}, 500);
		}
	}
</script>

<style lang="sass">
	$maxW: 414px;
	$menusW: 80px;
	$menusH: $menusW;

	[v-cloak] {
		display: none;
	}

	div, ul, a, li, header, h1, img {
		box-sizing: border-box;
	}

	a {
	    outline:none;
		&:hover, &:active, &:focus, &:visited, &:-webkit-any-link  {
			color: inherit;
			text-decoration: none;
	        outline:none;
	        -webkit-tap-highlight-color: rgba(0,0,0,0);
	        -webkit-tap-highlight-color:transparent;
		} 
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
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		max-width: $maxW;
		margin: 0 auto;
		background-color: #20afe1;
	}

	.container {
	    position: absolute;
	    top: 0px;
	    width: 100%;
	    height: 100%;
	    margin: 0 auto;
	    background: url("../assets/mpaper/bg.png") no-repeat;
	    background-position: 0 0px;
	    background-size: 100%;
	}

	.mpaper-logo {
		width: 128px;
		height: 31px;
		margin-top: 20px;
		margin-left: 20px;
		background: url("../assets/mpaper/logo.png") no-repeat;
		background-size: 100%;
		display: block;
	}

	.mpaper-menu {
		position: absolute;
		top: 77px;
		left: - 52%;
		width: 100% * 1.1875;
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
			color: #fff;
			text-align: center;
			margin-top: -$menusW/2;
			margin-left: -$menusW/2;
			
			a {
				width: 100%;
				height: 100%;
				padding-top: 42px;
				display: block;
			}

			&:before {
				content: "";
				position: absolute;
				top: 12px;
				left: 0;
				right: 0;
				width: 35px;
				height: 30px;
				margin: 0 auto;
				background: url(../assets/mpaper/spriter.png) no-repeat;
	            background-position: 0px 0px;
			}
			// 计算公式为left: 50% + abs(sin(20+$i*40))/2; top: 50% - cos(20+$i*40)/2;
			// 由于sass @for和三角函数不是很熟，暂时这样写
			&:nth-child(1) {
				left: 80%;
				top: 10%;

				&:before {
	                background-image: url(../assets/mpaper/spriter.png);
	                background-position: 0px 0px;
	                width: 35px;
	                height: 30px; 
				}
			}

			&:nth-child(2) {
				left: 97%;
				top: 35%;

				&:before {
	                background-image: url(../assets/mpaper/spriter.png);
	                background-position: -35px 0px;
	                width: 35px;
	                height: 30px;
				}
			}

			&:nth-child(3) {
				left: 97%;
				top: 65%;

				&:before {
	                background-image: url(../assets/mpaper/spriter.png);
	                background-position: 0px -30px;
	                width: 35px;
	                height: 30px;
				}
			}

			&:nth-child(4) {
				left: 80%;
				top: 90%;

				&:before {
	                background-image: url(../assets/mpaper/spriter.png);
	                background-position: -35px -30px;
	                width: 35px;
	                height: 30px;
				}
			}
		}
	}

	.mpaper-news {
		position: absolute;
	    bottom: 0px;
		width: 100%;
	    max-width: $maxW;
	    height: 40px;
	    background: url(../assets/mpaper/footer.png) repeat;
	    
	    & > div {
	        position: fixed;
	        bottom: 0;
	        width: 100%;
	        height: 40px;
	        max-width: $maxW;
	        overflow: hidden;
	    }

	    .swiper-slide {
	    	position: relative;
	        text-align: left;
	        padding-left: 50px;
	        line-height: 40px;
	        overflow: hidden; /*自动隐藏文字*/
	        text-overflow: ellipsis;/*文字隐藏后添加省略号*/
	        white-space: nowrap;/*强制不换行*/

	        &:after {
	            content: "";
	            position: absolute;
	            top: 12px;
	            left: 18px;
	            width: 35px;
	            height: 30px;
	            background: url(../assets/mpaper/spriter.png) center no-repeat;
	            background-position: -70px 0px;
	            width: 21px;
	            height: 18px;
	        }

	        &:nth-child(4n) {
	            &:after {
	                background-image: url(../assets/mpaper/spriter.png);
	                background-position: -70px 0px;
	                width: 21px;
	                height: 18px;
	            }
	        }
	        &:nth-child(4n+1) {
	            &:after {
	                background-image: url(../assets/mpaper/spriter.png);
	                background-position: -70px -18px;
	                width: 21px;
	                height: 18px;
	            }
	        }
	        &:nth-child(4n+2) {
	            &:after {
	                background-image: url(../assets/mpaper/spriter.png);
	                background-position: -70px -36px;
	                width: 21px;
	                height: 18px;
	            }
	        }
	        &:nth-child(4n+3) {
	            &:after {
	                background-image: url(../assets/mpaper/spriter.png);
	                background-position: 0px -60px;
	                width: 21px;
	                height: 18px;
	            }
	        }
	    }
		
	}
</style>