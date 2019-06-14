<template>
  <div class="image-wrapper">
    <slot v-if="isLoading" name="loading"></slot>
    <slot v-else-if="error" name="error"></slot>
    <img
      v-else
      v-bind="$attrs"
      :src="src"
      :style="imgStyle"
      style="text-align:center;"
    />
  </div>
</template>
<script>
const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined

const ObjectFit = {
  NONE: 'none',
  CONTAIN: 'contain',
  COVER: 'cover',
  FILL: 'fill',
  SCALE_DOWN: 'scale-down'
}
export default {
  name: 'image-view',
  props: {
    src: {
      type: String,
      default: ''
    },
    // 图片适应方式：同object-fit取值
    fit: String
  },
  data () {
    return {
      isLoading: true,
      error: false,
      imgWidth: 0,
      imgHeight: 0
    }
  },

  computed: {
    imgStyle () {
      const {fit} = this
      if (fit) {
        // return isSupportObjectFit() ? {'object-fit': fit} : this.getImgStyle(fit)
        return this.getImgStyle(fit)
      }
    }
  },

  watch: {
    src (val) {
      this.loadImage()
    }
  },
  mounted () {
    this.loadImage()
  },
  methods: {
    loadImage () {
      this.isLoading = true
      this.error = false

      // 使用image对象来加载图片，可以提前缓存图片
      const img = new Image()
      img.onload = e => this.loadHandler(e, img)
      img.onerror = this.errorHandler

      img.src = this.src
    },
    loadHandler (e, img) {
      this.getImgWH(img)
      this.isLoading = false
    },
    errorHandler () {
      this.error = true
    },

    // 获取图片宽高
    getImgWH (img) {
      Object.keys(this.$attrs)
        .forEach(key => {
          const value = this.$attrs[key]
          img.setAttribute(key, value)
        })
      this.imgWidth = img.width
      this.imgHeight = img.height
      console.log(img.width, img.height)
    },
    getImgStyle (fit) {
      const {imgWidth, imgHeight} = this
      // 获取img容器的高度
      const {
        clientWidth: containerWidth,
        clientHeight: containerHeight
      } = this.$el

      if (!imgWidth || !imgHeight || !containerWidth || !containerHeight) return

      const isVertical = imgWidth / imgHeight < 1

      if (fit === ObjectFit.SCALE_DOWN) {
        const isSmaller = imgWidth < containerWidth && imgHeight < containerHeight
        fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN
      }

      switch (fit) {
        case ObjectFit.NONE:
          return {width: 'auto', height: 'auto'}
        case ObjectFit.CONTAIN:
          return isVertical ? {width: 'auto'} : {height: 'auto'}
        case ObjectFit.COVER:
          return isVertical ? {height: 'auto'} : {width: 'auto'}
        // 默认为fill
        default:
          return {}
      }
    }
  }
}
</script>
<style lang="css" scoped>
.image-wrapper{
  display: inline-block;
  overflow: hidden;
}
img{
  width: 100%;
  height: 100%;
}
</style>
