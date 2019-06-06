<template>
  <div class="fp-textarea">
    <div
      v-if="autosize"
      class="fp-textarea__inner-frame"
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

/* 将内部div与textarea属性中与宽高、字体和文字换行方式相关的等统一起来 */
.fp-textarea__inner,
.fp-textarea__inner-frame{
  /* 宽高相关属性 */
  padding: 5px 15px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  width: 100%;
  /* 文字相关属性 */
  font-family: inherit;
  font-size: inherit;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  text-align: start;
}

.fp-textarea__inner-frame{
  visibility: hidden;
}

.fp-textarea__inner{
  display: block;
  resize: vertical;
  color: #606266;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.fp-textarea__inner:focus {
  outline: none;
  border-color: #409eff;
}
.fp-textarea-autosize{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
