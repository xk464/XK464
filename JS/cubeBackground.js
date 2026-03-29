// 封装3D立方体背景的初始化与交互逻辑
export function initCubeBackground(containerSelector = 'body') {
  // 创建容器和立方体结构
  const container = document.createElement('div');
  container.className = 'container';
  const cube = document.createElement('div');
  cube.className = 'cube';
  const faces = ['front', 'back', 'left', 'right', 'top', 'bottom'];
  faces.forEach(face => {
    const div = document.createElement('div');
    div.className = `face ${face}`;
    cube.appendChild(div);
  });
  container.appendChild(cube);
  // 挂载到指定容器
  const parent = document.querySelector(containerSelector);
  parent.appendChild(container);

  // 交互逻辑
  function updateCubeTransform(x, y, width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    const dx = (x - centerX) / centerX;
    const dy = (y - centerY) / centerY;
    const rotateY = dx * 1080 + 45;
    const rotateX = -dy * 1080 + 35;
    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  // 鼠标
  document.addEventListener('mousemove', (e) => {
    updateCubeTransform(e.clientX, e.clientY, window.innerWidth, window.innerHeight);
  });
  // 触摸
  document.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      updateCubeTransform(touch.clientX, touch.clientY, window.innerWidth, window.innerHeight);
      e.preventDefault();
    }
  }, { passive: false });
}

// 注入样式（只注入一次）
function injectCubeStyles() {
  if (document.getElementById('cube-bg-style')) return;
  const style = document.createElement('style');
  style.id = 'cube-bg-style';
  style.textContent = `
  .container {
    position: fixed;
    left: 50%;
    top: 50%;
    perspective: 1800px;
    transform: translate(-50%, -50%);
  }
  .cube {
    position: relative;
    width: 320px;
    height: 320px;
    transform-style: preserve-3d;
    transition: transform 0.15s ease-out;
    transform: rotateX(35deg) rotateY(45deg);
  }
  .face {
    position: absolute;
    width: 320px;
    height: 320px;
    border: 2px solid rgba(255,255,255,0.9);
    background: linear-gradient(135deg, rgba(0,212,255,0.7) 0%, rgba(9,9,121,0.7) 50%, rgba(255,0,255,0.7) 100%);
    box-shadow: 0 0 25px rgba(0,212,255,0.8), 0 0 40px rgba(255,0,255,0.6), inset 0 0 20px rgba(255,255,255,0.3);
    backdrop-filter: blur(3px);
    animation: glow 4s linear infinite;
  }
  .front  { transform: translateZ(160px); background: linear-gradient(45deg, rgba(0,212,255,0.7), rgba(255,0,255,0.7)); }
  .back   { transform: rotateY(180deg) translateZ(160px); background: linear-gradient(135deg, rgba(255,0,255,0.7), rgba(0,212,255,0.7)); }
  .left   { transform: rotateY(-90deg) translateZ(160px); background: linear-gradient(90deg, rgba(0,212,255,0.7), rgba(255,0,255,0.7)); }
  .right  { transform: rotateY(90deg) translateZ(160px); background: linear-gradient(270deg, rgba(255,0,255,0.7), rgba(0,212,255,0.7)); }
  .top    { transform: rotateX(90deg) translateZ(160px); background: linear-gradient(0deg, rgba(0,212,255,0.7), rgba(255,0,255,0.7)); }
  .bottom { transform: rotateX(-90deg) translateZ(160px); background: linear-gradient(180deg, rgba(255,0,255,0.7), rgba(0,212,255,0.7)); }
  @keyframes glow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
  body { min-height: 100vh; background: #000; overflow: hidden; }
  `;
  document.head.appendChild(style);
}

// 自动注入样式
injectCubeStyles();
