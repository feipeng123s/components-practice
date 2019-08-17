<template>
    <div class="contain">
        <div class="collapse-title" @click="titleClickHandler">
            <slot name="title"></slot>
        </div>
        <div ref="wrapper" class="collapse-wrapper" @transitionend="changeStyle">
            <div ref="content" class="collapse-content">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'collapse',
    data () {
        return {
            expand: false
        }
    },
    methods: {
        titleClickHandler () {
            let wrapper = this.$refs.wrapper
            let content = this.$refs.content

            this.expand = !this.expand
            if (this.expand) {
                wrapper.style.display = 'block'
            }

            let height = content.clientHeight
            wrapper.style.height = this.expand ? 0 : height + 'px'
            window.requestAnimationFrame(() => {
                wrapper.style.height = this.expand ? height + 'px' : 0
            })
        },
        
        changeStyle () {
            let wrapper = this.$refs.wrapper
            if (!this.expand) {
                wrapper.style.display = 'none'
            } else {
                wrapper.style.height = null
            }
        }
    }
}
</script>
<style lang="css" scoped>
.collapse-wrapper{
    overflow: hidden;
    transition: height 0.5s;
}
.collapse-content{
    border: 1px solid #c6c6c6;
    box-sizing: border-box;
}
</style>
