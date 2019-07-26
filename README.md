# vue-jxs-node

[![NPM version](https://img.shields.io/npm/v/vue-jsx-node.svg?style=flat)](https://npmjs.com/package/vue-jsx-node)
[![NPM downloads](https://img.shields.io/npm/dm/vue-jsx-node.svg?style=flat)](https://npmjs.com/package/vue-jsx-node)

this is a vue component that can render html string or jsx by vnode or render function


## install

To begin, you'll need to install `vue-jsx-node`:

```bash
npm install vue-jsx-node --save
```

## usage
to use `vue-jsx-node`, first, you need regisiter it to Vue,
```js
import Vue from 'vue';
import VueJsxNode from 'vue-jsx-node';

Vue.use(VueJsxNode);
```
then use it as a vue component:
```html
<template>
  <div class="container">
    <!-- render a jsx node -->
    <vue-jsx-node :content="aJsxNode" />
    <!-- render a html string  -->
    <vue-jsx-node :content="aHtmlStr" pre />
    <!-- render a jsx node by render function  -->
    <vue-jsx-node class="some-class" :content="aRenderFn" :some-str.sync="someStr", @click="handleClick">
      default string
    </vue-jsx-node>
  </div>
</template>

<script>

export default {

  data() {
    return {
      inputStr: '',
      someStr: 'hahaha',
      aHtmlStr: `<div class="html-string">
        <span>dddddd</span>
        aaaa
      </div>`
    };
  },
  
  computed: {
    aJsxNode() {
      return (<div>
        <input v-model={this.inputStr} />
      </div>);
    },
    aHtmlStr() {
      return 
    }
  },
  methods: {
    /**
     * a render function demo
     * @param {Function} h  - Vue.$createElement function
     * @param {Object} attrs - some data than from VueJsxNode`s attrs、props、slots、children、eventListener
     * @param {Object} attrs.slots - see [Vue Functional-Components](https://vuejs.org/v2/guide/render-function.html#Functional-Components)
     * @param {Object} attrs.$parent - see [Vue Functional-Components](https://vuejs.org/v2/guide/render-function.html#Functional-Components)
     * @param {Object} attrs.$children - see [Vue Functional-Components](https://vuejs.org/v2/guide/render-function.html#Functional-Components)
     * @param {Object} attrs.$scopedSlots - see [Vue Functional-Components](https://vuejs.org/v2/guide/render-function.html#Functional-Components)
     * @param {Object} attrs.$props - see [Vue Functional-Components](https://vuejs.org/v2/guide/render-function.html#Functional-Components)
     * @param {Object} attrs.$listeners - see [Vue Functional-Components](https://vuejs.org/v2/guide/render-function.html#Functional-Components)
     * @param {Object} attrs.$emit - send event to event handler than binding to vue-jsx-node
     * @param {Object} attrs.[any] - attrs that binding to vue-jsx-node
     * @param {Object} [context] - vue-jsx-node is a Functional-Component，so context is the context argument of its render function
     */
    aRenderFn(h, { someStr, $emit, $children, slots }, context) {
      if (!this.inputStr) return $children; // or return slots().default; 

      return (<div>
        <span>{someStr}</span>
        <input v-model={this.inputStr} />
        <button onClick={()=>$emit('click')}>Click me</button>
      </div>)
    },
    handleClick() {
      console.log('you click the button');
    }
  }

};
</script>
```

## License

[MIT](./LICENSE)
