<template>
  <div class="fp-textarea">
    <textarea
      ref="textarea"
      v-bind="$attrs"
      class="fp-textarea__inner"
      :style="textareaCalcStyle"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
    ></textarea>
  </div>
</template>
<script>
import calcTextareaHeight from './calcTextareaHeight'
export default {
  name: 'AutosizeTextarea',
  inheritAttrs: false,
  data () {
    return {
      textareaCalcStyle: {},
      isComposing: false
    }
  },
  props: {
    value: [String, Number],
    autosize: {
      type: [Boolean, Object],
      default: false
    }
  },
  computed: {
    nativeValue () {
      return this.value === null || this.value === undefined ? '' : String(this.value)
    }
  },
  watch: {
    value (val) {
      this.$nextTick(this.resizeTextarea)
    },
    nativeValue () {
      this.setNativeValue()
    }
  },
  methods: {
    setNativeValue () {
      const textarea = this.$refs.textarea
      if (!textarea) return
      if (textarea.value === this.nativeValue) return
      textarea.value = this.nativeValue
    },
    // 处理非拉丁语言输入问题（如拼音输入法）
    handleCompositionStart () {
      this.isComposing = true
    },
    handleCompositionEnd (event) {
      this.isComposing = false
      this.handleInput(event)
    },
    handleInput (event) {
      if (this.isComposing) return
      this.$emit('input', event.target.value)
    },
    resizeTextarea () {
      const { autosize } = this
      if (!autosize) {
        this.textareaCalcStyle = {
          minHeight: calcTextareaHeight(this.$refs.textarea).minHeight
        }
        return
      }
      const minRows = autosize.minRows
      const maxRows = autosize.maxRows
      this.textareaCalcStyle = calcTextareaHeight(this.$refs.textarea, minRows, maxRows)
    }
  },
  mounted () {
    this.setNativeValue()
    this.resizeTextarea()
  }
}
</script>
<style lang="css" scoped>
.fp-textarea{
  position: relative;
  display: inline-block;
  font-size: 14px;
  /* 不设置宽度会出现滚动条 */
  width: 100%;
}
.fp-textarea__inner{
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
.fp-textarea__inner:focus {
  outline: none;
  border-color: #409eff;
}
</style>
