import Vue from 'vue';
import vueResource from 'vue-resource';
import App from './App'
import vueCompoent from './components/index';

console.log(vueResource(Vue));

/* eslint-disable no-new */
vueCompoent.install(Vue);

new Vue({
  el: 'body',
  components: { App }
})

