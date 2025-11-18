// app.js - renders page, animations, scroll reveals, card parallax, storage sync
const defaults = {
  brandName: "Juan Pablo",
  navAbout: "About",
  navProjects: "Projects",
  navContact: "Contact",
  heroTitle: "Collaboration & Success is the Key",
  heroDesc: "The success of the collaboration is my priority on every project I work on.",
  ctaBtn: "Get in Touch",
  email: "hello@juanpablo.com",
  phone: "+1 (201) 895-3801",
  ctaText: "Send me your email to discuss a project",
  projects: [
    { tag: "UI/UX Design", title: "Crypts - Crypto Landing Page", text: "A modern responsive landing for a crypto product." },
    { tag: "Branding", title: "Travel Experience", text: "Design and UI for a travel brand." },
    { tag: "Web App", title: "Dashboard Pro", text: "Admin dashboard with charts & controls." }
  ]
};

const yearSpan = document.getElementById('year'); if(yearSpan) yearSpan.textContent = new Date().getFullYear();

function loadState(){ return JSON.parse(localStorage.getItem('portfolio_state') || "null") || defaults; }
let state = loadState();

// apply simple fields
function renderFields(){
  document.querySelectorAll('[data-key]').forEach(el=>{
    const k = el.getAttribute('data-key');
    if(state[k] !== undefined) el.textContent = state[k];
  });
}
renderFields();

// render stacked project cards
function renderProjects(){
  const container = document.getElementById('projectStack');
  if(!container) return;
  container.innerHTML = '';
  // add back/mid/front structure
  const back = document.createElement('div'); back.className = 'card-back hidden'; container.appendChild(back);
  const mid = document.createElement('div'); mid.className = 'card-mid hidden'; container.appendChild(mid);

  // create front cards (we'll put first project visible)
  state.projects.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'card card-front hidden';
    card.innerHTML = `
      <div class="card-left">
        <div class="device-mock"><div class="mock-screen">${p.tag}</div></div>
      </div>
      <div class="card-right">
        <span class="tag">${p.tag}</span>
        <h3 class="card-title">${p.title}</h3>
        <p class="card-text">${p.text}</p>
      </div>
    `;
    container.appendChild(card);
  });

  // staggered reveal
  const allHidden = container.querySelectorAll('.hidden');
  allHidden.forEach((el, idx) => setTimeout(()=> el.classList.add('revealed'), idx * 130 + 120));
}
renderProjects();

// Intersection-based reveal for hero & others
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e => {
    if(e.isIntersecting){
      const el = e.target;
      if(el.classList.contains('hero-title')) el.classList.add('revealed');
      el.classList.add('revealed');
    }
  });
}, {threshold: 0.12});

document.querySelectorAll('.hero-title, .hero-sub, .hero-cta, .projects, .footer, .contact-wrap').forEach(el => obs.observe(el));

// small timeout to reveal hero parts
setTimeout(()=> {
  document.querySelector('.hero-title')?.classList.add('revealed');
  document.querySelector('.hero-sub')?.classList.add('revealed');
  document.querySelector('.hero-cta')?.classList.add('revealed');
}, 350);

// header blur on scroll + big contact parallax
const header = document.getElementById('siteHeader');
const bigContact = document.getElementById('bigContact');
window.addEventListener('scroll', () => {
  const sc = window.scrollY;
  if(sc > 48) header.classList.add('header-scrolled'); else header.classList.remove('header-scrolled');
  if(bigContact){
    // parallax move (slower than scroll)
    bigContact.style.transform = `translateY(${sc * -0.08}px) translateX(${sc * 0.02}px)`;
  }
});

// simple card parallax on mousemove and scroll-based shift
(function cardParallax(){
  const stack = document.getElementById('projectStack');
  if(!stack) return;
  stack.addEventListener('mousemove', (ev)=>{
    const rect = stack.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const dx = (ev.clientX - cx) / rect.width;
    const dy = (ev.clientY - cy) / rect.height;
    // map to transforms
    const back = stack.querySelector('.card-back');
    const mid = stack.querySelector('.card-mid');
    const front = stack.querySelector('.card-front');
    if(back) back.style.transform = `translateY(${60 + dy*40}px) scale(.94) rotate(${ -3 + dx*2 }deg)`;
    if(mid) mid.style.transform = `translateY(${30 + dy*24}px) scale(.97) rotate(${ -1 + dx*1 }deg)`;
    if(front) front.style.transform = `translateY(${ -6 + dy*6 }px) scale(1.01) rotate(${ dx*0.6 }deg)`;
  });
  // reset on leave
  stack.addEventListener('mouseleave', ()=>{
    ['.card-back','.card-mid','.card-front'].forEach(sel=>{
      const el = stack.querySelector(sel);
      if(el) el.style.transform = '';
    });
  });
})();

// CTA demo (no backend)
document.getElementById('ctaBtnInline')?.addEventListener('click', ()=>{
  const val = document.getElementById('ctaEmail').value.trim();
  if(!val){ alert('Please enter an email'); return; }
  alert('Thanks — demo only. Integrate Netlify Forms / Formspree for production.');
});

// listen for admin edits (storage)
window.addEventListener('storage', (e) => {
  if(e.key === 'portfolio_state'){
    state = loadState();
    renderFields();
    renderProjects();
  }
});
