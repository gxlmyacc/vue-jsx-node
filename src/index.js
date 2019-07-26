import VueJsxNode from './vue-jsx-node';

export default {
  install(Vue, options = {}) {
    Vue.component(VueJsxNode.name, VueJsxNode);
  }
};
