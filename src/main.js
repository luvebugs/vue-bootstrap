import Vue from 'vue';
import App from './App'
// import vueCompoent from './components/index';
import editor from './components/editor/index';
import editorConfig from './components/editor/editor.config';

/* eslint-disable no-new */
// vueCompoent.install(Vue);
editor.install(Vue, editorConfig);
new Vue({
  el: '#app',
  template: '<App/>',
  components: {App}
})

