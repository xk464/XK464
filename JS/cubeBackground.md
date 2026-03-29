# cubeBackground.js 使用说明

## 功能简介

`cubeBackground.js` 封装了一个可复用的3D流光立方体背景组件，支持鼠标和触摸交互旋转。可在任意页面通过简单调用实现酷炫背景，无需复制结构、样式和脚本。

## 使用方法

1. 在 HTML 文件中以 ES6 模块方式引入：

```html
<script type="module">
  import { initCubeBackground } from './JS/cubeBackground.js';
  initCubeBackground();
</script>
```

2. 可选：指定挂载容器（默认挂载到 body）：

```js
initCubeBackground('#your-container');
```

3. 样式会自动注入，无需手动引入 CSS。

## 参数说明
- `containerSelector`：可选，CSS选择器字符串。指定立方体背景挂载的父容器，默认 'body'。

## 依赖说明
- 仅依赖原生 JS 和 DOM，无需第三方库。
- 需在支持 ES6 module 的环境下使用。

## 适用场景
- 作为网站/应用的动态背景
- 可复用到多个页面或项目
- 便于后续扩展和自定义

## 其他说明
- 若需自定义立方体尺寸、颜色、动画，可修改 cubeBackground.js 内部样式注入部分。
- 支持多次调用（会自动避免重复注入样式）。

---
如有疑问可随时联系开发者。
