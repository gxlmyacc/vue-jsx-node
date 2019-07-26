export default {
  install(Vue, options = { componentName: '' }) {
    const VueJsxNode = require('./vue-jsx-node')(Vue);
    Vue.component(options.componentName || VueJsxNode.name, VueJsxNode);
  }
};
