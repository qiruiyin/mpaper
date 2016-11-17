import Vue from 'vue';
import routes from './routes';

new Vue({
	el: '#app',
	data: {
		currentRoute: window.location.pathname
	},
	computed: {
		ViewComponent () {
			console.log(routes);
			const matchingView = routes[this.currentRoute]
			return matchingView
				? require('./pages/' + matchingView + '.vue')
				: require('./pages/404.vue')
		}
	},
	render (h) {
		return h(this.ViewComponent)
	}
});

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
});

