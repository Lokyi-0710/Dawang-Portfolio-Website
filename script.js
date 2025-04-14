const cursorBg = document.querySelector('.cursor-bg-layer');
const staticBg = document.querySelector('.static-bg-layer');

let cursorX = 0;
let cursorY = 0;
let staticX = 0;
let staticY = 0;

let lastMoveTime = Date.now();
let underCursorControl = false;

function animateBackground() {
  const now = Date.now();
  const timeSinceMove = now - lastMoveTime;

  if (timeSinceMove > 500) {
    underCursorControl = false;
  }

  if (!underCursorControl) {
    // 自动滚动：两个图层方向不一样 + 速率不同
    cursorX += 1.5;
    cursorY += 1.8;

    staticX -= 2.6;
    staticY += 2.4;
  }

  cursorBg.style.backgroundPosition = `${cursorX}px ${cursorY}px`;
  staticBg.style.backgroundPosition = `${staticX}px ${staticY}px`;

  requestAnimationFrame(animateBackground);
}

document.addEventListener('mousemove', (e) => {
  underCursorControl = true;
  lastMoveTime = Date.now();

  // 鼠标控制动态层
  cursorX = -e.clientX / 2.5;
  cursorY = -e.clientY / 2.5;

  // 鼠标控制 static 图层：错位控制
  staticX = -e.clientX / 8;
  staticY = -e.clientY / 10;
});

animateBackground();
