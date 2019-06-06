自适应textarea，就是说在textarea中文本内容高度超过textarea本身时，textarea控件的高度会自动变化到包裹住所有内容。我所了解的有两种实现方案：

## 使用js动态调整textarea高度

> 在input事件触发时，动态计算包裹住当前文本所需高度，然后将其设为textarea的高度

element-ui就是使用该方式实现，具体实现方式见[github textarea](<https://github.com/feipeng123s/components-practice/tree/master/packages/textarea>)

## 利用其它元素的自适应性来获得高度，textarea绝对定位来自适应

参考：[Expanding Text Areas Made Elegant](<http://alistapart.com/article/expanding-text-areas-made-elegant/>)

```html
<div class="my-textarea">
  <div class="textarea-frame"></div>
  <textarea class="textarea-inner"></textarea>
</div>
<style>
    .my-textarea{
        position: relative;
        display: inline-block;
        width: 400px;
    }
    .textarea-frame{
        visibility: hidden;
    }
    .textarea-inner{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
```

取textarea的文本内容为value，使得.textarea-frame的innerHtml为value，这样就利用div的自适应性获得了文本的高度且visibility为hidden，而textarea为绝对定位，就获得了自适应的高度。

**注意：要使div文本的高度与textarea中文本的高度相同，必须要统一两者的字体相关属性、自动换行相关属性，同时margin、border、padding这些与宽高相关的属性也必须一致。**

```css
.textarea-frame,
.textarea-inner{
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
```

存在的问题：

1. 在textarea的value为空时，必须设置min-height的最小高度为rows=1时的高度，否则就塌了
2. 在textarea的value为空时，会出现空白幽灵节点的问题，撑高父容器的高度。

具体实现方式见[github textarea2](<https://github.com/feipeng123s/components-practice/tree/master/packages/textarea2>)