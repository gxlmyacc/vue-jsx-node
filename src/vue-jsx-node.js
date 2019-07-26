import Vue from 'vue';

function camelize(str) {
  return str.replace(/-(\w)/g, function (_, c) { return c ? c.toUpperCase() : ''; });
}
function renderContentStr(h, context, content, { classes, styles }) {
  const domProps = {};
  classes.push('vue-jsx-node');
  if (context.props.pre) styles.push({
    wordBreak: 'break-all',
    whiteSpace: 'pre'
  });
  if (context.props.text) domProps.innerText = content;
  else domProps.innerHTML = context.props.sanitize && Vue.$sanitize ? Vue.$sanitize(content) : content;
  return h(context.props.tag, Object.assign(context.data, {
    calss: classes,
    style: styles,
    domProps
  }));
}

function renderContentFn(h, context, content) {
  const renderThis = context.props.context || context.parent;
  const $emit = (event, payload, ...args) => {
    if (!event || !context.listeners) return;
    const handler = context.listeners[event];
    if (!handler) return;
    return handler.call(renderThis, payload, ...args);
  };

  const datas = {
    slots: context.slots,
    $emit,
    $parent: context.parent,
    $children: context.children,
    $scopedSlots: context.scopedSlots,
    $props: context.props,
    $slots: context.$slots,
    $listeners: context.listeners
  };
  // console.log('renderContentFn', datas, context);
  Object.keys(context.data.attrs).forEach(key => datas[camelize(key)] = context.data.attrs[key]);
  return content.call(renderThis, h, datas, context.props.context || context);
}

function mergeContext(node, context, { classes, styles }) {
  if (!node || !node.data) return node;
  const data = node.data;
  if (!data.class) data.class = [];
  else if (!Array.isArray(data.class)) data.class = [data.class];
  node.data.class.push(...classes);

  if (!data.style) data.style = [];
  else if (!Array.isArray(data.style)) data.style = [data.style];
  data.style.push(...styles);

  if (!data.attrs) data.attrs = {};
  Object.assign(data.attrs, context.data.attrs);

  if (!data.on) data.on = {};
  Object.keys(context.listeners).forEach(key => {
    if (data.on[key]) return;
    data.on[key] = context.listeners[key];
  });

  if (!data.directives) data.directives = [];
  if (context.data.directives) data.directives.push(...context.data.directives);

  Object.keys(context.data).forEach(key => {
    if (['class', 'style', 'attrs', 'on', 'directives'].includes(key)) return;
    data[key] = context.data[key];
  });

  // console.log('vue-jsx-node', node, context);
  return node;
}

export default {
  name: 'VueJsxNode',
  functional: true,
  abstract: true,
  inheritAttrs: false,
  props: {
    content: {
      type: [String, Object, Array, Function],
      default: null
    },
    context: {
      type: Object,
      default: null,
    },
    sanitize: {
      type: Boolean,
      default: true,
    },
    text: {
      type: Boolean,
      default: false,
    },
    pre: {
      type: Boolean,
      default: false,
    },
    defaultSlotName: {
      type: String,
      default: 'default'
    },
    tag: {
      type: String,
      default: 'div'
    }
  },
  render(h, context) {
    const content = context.props.content;
    const classes = [];
    if (context.data.class) classes.push(context.data.class);
    if (context.data.staticClass) classes.push(context.data.staticClass);
    const styles = [];
    if (context.data.style) styles.push(context.data.style);
    if (context.data.staticStyle) styles.push(context.data.staticStyle);

    if (content && typeof content === 'string') {
      return renderContentStr(h, context, content, { classes, styles });
    }

    let node;
    if (typeof content === 'function') node = renderContentFn(h, context, content);
    else node = content || context.slots()[context.props.defaultSlotName] || null;

    return mergeContext(node, context, { classes, styles });
  },
};