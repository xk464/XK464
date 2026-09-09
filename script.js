// ========== 导航栏滚动效果 ==========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ========== 移动端菜单 ==========
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});
// 点击链接后关闭菜单
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ========== 安装指引 Tab 切换 ==========
const guideTabs = document.querySelectorAll('.guide-tab');
const guideContents = document.querySelectorAll('.guide-content');
guideTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        guideTabs.forEach(t => t.classList.remove('active'));
        guideContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('guide-' + target).classList.add('active');
    });
});

// ========== 滚动淡入动画 ==========
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.feature-card, .platform-card, .preview-card, .download-card, .guide-step')
    .forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

// ========== 平滑滚动（处理固定导航高度偏移） ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 64;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ========== 年份自动更新 ==========
const yearEl = document.querySelector('.footer-bottom p');
if (yearEl) {
    yearEl.textContent = yearEl.textContent.replace('2026', new Date().getFullYear());
}
