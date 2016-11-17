<template>
	<div id="details">
		<header>
			<h1>
				<img src="../assets/mpaper/logo.png">
			</h1>

			<h2>{{ msg }}</h2>
		</header>

		<main>
			<section class="content">
				<dl>
					<template v-for="(item, index) in lists">
						<dt :class="{ 'active': index == isShow }" @click="showMsg(index)">{{ item.post_title }}</dt>
						<dd>{{ item.post_excerpt }}</dd>
					</template>
				</dl>
				<div class="link-more">
					<a href="/">返回</a>		
					<a href="http://m.ch-jht.com/index.html">查看更多资讯</a>
				</div>
			</section>
		</main>
	</div>
</template>

<script>
	import { getMenuDetails } from '../services/menu-details.js';

	export default {
		name: 'mpaper-details',
		data () {
			return {
				isShow: -1,
			}
		},
		computed: {
			msg () {
				return this.getUrlJson().title;
			},
			lists () {
				let id = this.getUrlJson().id;
				return getMenuDetails(id);
			}
		},
		methods: {
			getUrlJson () {
				let url = decodeURI(location.href);
				let	url_json = {};
				url = url.split("?"),
				url = url[1].split('&');
				for(var i = 0;i<url.length;i++){
				    var str = url[i].split('=');
				    url_json[str[0]]=str[1];
				}
				return url_json;
			},
			showMsg (i) {
				this.isShow = i == this.isShow ? '-1' : i;
			}
		}
	}
</script>

<style lang="sass">
	// clearfix
	@mixin clearfix($extend: true) {
	    @if $extend {
	        @extend %clearfix;
	    }
	    @else {
	        &::before,
	        &::after {
	            content: "";
	            display: table;
	        }
	        &::after {
	            clear: both;
	        }
	    }
	}

	%clearfix {
	    @include clearfix(false);
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

	$maxW: 414px;
	$menusW: 80px;
	$menusH: $menusW;
	$padding: 15px;

	#details, body {
	    background: #e2e2e2;
	}
	header {
	    width: 100%;
	    height: 50px;
	    background: #296297;
	    padding: 0 $padding;
	    h1 {
	        float: left;
	        margin: 0 auto;
	        height: 100%;
	    }

	    img {
	        height: 100%;
	        padding: 10px 0;
	    }

	    h2 {
	        float: right;
	        color: #fff;
	    }
	}

	main {
	    padding: $padding;
	}
	.content {
	    background: #fff;
	    @extend %clearfix;

	    dl {
	        position: relative;
	        margin: 0 auto;

	        &.dth dt {
	            height: auto;
	        }

	        &:after {
	            content: "";
	            position: absolute;
	            left: 10px;
	            right: 10px;
	            bottom: 0;
	            height: 1px;
	            background-color: #ccc;
	        }
	    }

	    dt {
	        position: relative;
	        padding: 10px 35px;
	        height: 2em;
	        line-height: 1.25;
	        overflow: hidden;

	        &:before {
	            content: "";
	            position: absolute;
	            top: 12px;
	            left: 12px;
	            background: url(../assets/mpaper/spriter.png) no-repeat;
	            background-position: -35px -60px;
	            width: 14px;
	            height: 10px;
	        }
	        
	        &:after {
	            content: "";
	            position: absolute;
	            left: 10px;
	            right: 10px;
	            top: 0;
	            height: 1px;
	            background-color: #ccc;
	        }

	        &:first-child {
	            &:after {
	                display: none;
	            }
	        }

	        &.active {
	            color: #0867dc;
	            
	            &:before {
	                background-image: url(../assets/mpaper/spriter.png);
	                background-position: -21px -60px;
	                width: 14px;
	                height: 10px;
	            }
	            
	            & + dd {
	                background-color: #d9f2ff;
	                padding-top: 10px;
	                padding-bottom: 10px;
	                display: block;
	                max-height: 9999px;
	                transform: scaleY(1);
	                animation: slideDown .5s ease-in-out;
	                animation-fill-mode:forwards;
	                transition: max-height 1s ease-in-out;
	                
	                &:before {
	                    content: "";
	                    position: absolute;
	                    left: 10px;
	                    right: 10px;
	                    top: 0;
	                    height: 1px;
	                    background-color: #ccc;
	                }
	            }
	        }
	    }
	    dd {
	        margin: 0 auto;
	        padding: 0 30px;
	        background-color: #ffe;
	        transform-origin: 50% 0%;
	        max-height: 0;
	        line-height: 1.5;
	        color: #030303;
	        transform: scaleY(0);
	        animation: slideUp .4s ease-out;
	        transition: max-height .6s ease-out;
	        display: none;
	        text-align: justify;
	    }
	}

	.link-more {
	    padding: 40px $padding $padding;

	    a:last-child {
	        float: right;
	    }
	}

	@keyframes slideDown {
	  0% {
	    -moz-transform: scaleY(0.1);
	    -ms-transform: scaleY(0.1);
	    -o-transform: scaleY(0.1);
	    -webkit-transform: scaleY(0.1);
	    transform: scaleY(0.1);
	  }

	  40% {
	    -moz-transform: scaleY(1.04);
	    -ms-transform: scaleY(1.04);
	    -o-transform: scaleY(1.04);
	    -webkit-transform: scaleY(1.04);
	    transform: scaleY(1.04);
	  }

	  60% {
	    -moz-transform: scaleY(0.98);
	    -ms-transform: scaleY(0.98);
	    -o-transform: scaleY(0.98);
	    -webkit-transform: scaleY(0.98);
	    transform: scaleY(0.98);
	  }

	  80% {
	    -moz-transform: scaleY(1.04);
	    -ms-transform: scaleY(1.04);
	    -o-transform: scaleY(1.04);
	    -webkit-transform: scaleY(1.04);
	    transform: scaleY(1.04);
	  }

	  100% {
	    -moz-transform: scaleY(0.98);
	    -ms-transform: scaleY(0.98);
	    -o-transform: scaleY(0.98);
	    -webkit-transform: scaleY(0.98);
	    transform: scaleY(0.98);
	  }

	  80% {
	    -moz-transform: scaleY(1.02);
	    -ms-transform: scaleY(1.02);
	    -o-transform: scaleY(1.02);
	    -webkit-transform: scaleY(1.02);
	    transform: scaleY(1.02);
	  }

	  100% {
	    -moz-transform: scaleY(1);
	    -ms-transform: scaleY(1);
	    -o-transform: scaleY(1);
	    -webkit-transform: scaleY(1);
	    transform: scaleY(1);
	  }
	}

	@keyframes slideUp {
	  0% {
	    -moz-transform: scaleY(1);
	    -ms-transform: scaleY(1);
	    -o-transform: scaleY(1);
	    -webkit-transform: scaleY(1);
	    transform: scaleY(1);
	  }

	  60% {
	    -moz-transform: scaleY(0.98);
	    -ms-transform: scaleY(0.98);
	    -o-transform: scaleY(0.98);
	    -webkit-transform: scaleY(0.98);
	    transform: scaleY(0.98);
	  }

	  80% {
	    -moz-transform: scaleY(1.02);
	    -ms-transform: scaleY(1.02);
	    -o-transform: scaleY(1.02);
	    -webkit-transform: scaleY(1.02);
	    transform: scaleY(1.02);
	  }

	  100% {
	    -moz-transform: scaleY(0);
	    -ms-transform: scaleY(0);
	    -o-transform: scaleY(0);
	    -webkit-transform: scaleY(0);
	    transform: scaleY(0);
	  }
	}
</style>