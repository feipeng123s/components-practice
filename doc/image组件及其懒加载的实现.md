### image事件

- onabort

  > 当用户放弃图像的加载时调用的事件

- onerror

  >在加载图像的过程中发生错误时调用

- onload

  > 当图像加载完毕时调用

这里我们主要用到后面两个事件，在加载失败时显示失败样式，在加载成功时处理成功回调

### 简易版image-view

```vue
<template>
  <div class="image-wrapper">
    <slot v-if="isLoading" name="loading"></slot>
    <slot v-else-if="error" name="error"></slot>
    <img
      v-else
      v-bind="$attrs"
      :src="src"
    />
  </div>
</template>
<script>
export default {
  name: 'image-view',
  props: {
    src: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isLoading: true,
      error: false
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
      img.onload = this.loadHandler
      img.onerror = this.errorHandler

      img.src = this.src
    },
    loadHandler () {
      this.isLoading = false
    },
    errorHandler () {
      this.error = true
    }
  }
}
</script>
<style lang="css" scoped>
.image-wrapper{
  display: inline-block;
}
img{
  width: 100%;
  height: 100%;
}
</style>
```



### 设置图片适应方式

如果我们设置image-view的宽高都为100px，但是图片的比例不是1:1，这种情况如何显示呢？

可以使用css中的`object-fit`属性：

- `contain` 按原比例显示图片，按宽度和高度都不超过img标签宽高的最大比例显示
- `fill` 自动拉伸缩放图片，直到填充整个img标签
- `cover` 按原比例显示图片，直到图片覆盖了整个img标签
- `scale-down` 内容的尺寸与 `none` 或 `contain` 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些
- `none` 保持其原有尺寸

但是IE11及以下不支持，我们需要自定义polyfill

```javascript
// 检查浏览器是否支持object-fit属性
const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined
```

```vue
<template>
  <div class="image-wrapper">
    <slot v-if="isLoading" name="loading"></slot>
    <slot v-else-if="error" name="error"></slot>
    <img
      v-else
      v-bind="$attrs"
      :src="src"
      :style="imgStyle"
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
       return isSupportObjectFit() ? {'object-fit': fit} : this.getImgStyle(fit)
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
```

还存在的问题：在polyfill实现contain等没填充满的情况时，图片未居中

### 图片的懒加载

有一个现成的方案：[vue-lazyload](<https://github.com/hilongjw/vue-lazyload>)

但是，我们还是要探究原理。

#### 获取父级滚动容器

> 通常这个滚动容器需要组件传过来一个id或者直接是HTMLElement

#### 监听容器滚动，触发图片加载

> 监听父级滚动容器的滚动，当图片距离底部指定距离时，开始渲染图片

懒加载其实在组件挂载之后就开始加载图片了，只是在即将滚动到该图片时才渲染图片（加载好的情况下）