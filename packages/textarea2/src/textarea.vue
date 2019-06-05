<!-- 参考Expanding Text Areas Made Elegant(http://alistapart.com/article/expanding-text-areas-made-elegant/) -->
<!-- 思路就是让其它具有自适应性的元素撑开父元素，同时margin、padding、border以及文字换行行为与textarea一致即可 -->
<!-- 不同浏览器中textarea的表现可能不一致 -->
<!-- 将本组件放入其它容器中时，由于组件中与textarea元素同级的div元素的存在，当value为空时，会出现空白幽灵节点的问题影响父级元素的高度 -->
<template>
  <div class="fp-textarea">
    <div
      v-if="autosize"
      class="fp-textarea__inner2"
      :style="textareaCalcStyle"
    >{{value}}</div>
    <textarea
      v-bind="$attrs"
      ref="textarea"
      :value="value"
      @input="$emit('input', $event.target.value)"
      class="fp-textarea__inner"
      :class="{'fp-textarea-autosize': autosize}"
      :style="textareaCalcStyle"
    ></textarea>
  </div>
</template>
<script>
import calcTextareaHeight from '../../textarea/src/calcTextareaHeight'
export default {
  name: 'AutosizeTextarea2',
  inheritAttrs: false,
  props: {
    value: {
      required: true
    },
    autosize: [Boolean, Object]
  },
  data () {
    return {
      textareaCalcStyle: {}
    }
  },
  methods: {
    resizeTextarea () {
      this.textareaCalcStyle = {
        minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
      }
    }
  },
  mounted () {
    this.resizeTextarea()
  }
}
</script>
<style lang="css" scoped>
.fp-textarea{
  position: relative;
  display: inline-block;
  font-size: 14px;
  width: 100%;
}
.fp-textarea__inner, .fp-textarea__inner2{
  display: block;
  resize: vertical;
  padding: 5px 15px;
  box-sizing: border-box;
  width: 100%;
  font-family: inherit;
  font-size: inherit;
  color: #606266;
  background-color: #fff;
  background-image: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.fp-textarea-autosize{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.fp-textarea__inner:focus {
  outline: none;
  border-color: #409eff;
}
.fp-textarea__inner2{
  /* 中文强制换行 */
  white-space: pre-wrap;
  /* 英文强制换行 */
  /* word-break:break-all; */
  /* overflow-wrap: break-word; */
  word-break: break-word;
  text-align: start;
  visibility: hidden;
}
</style>
