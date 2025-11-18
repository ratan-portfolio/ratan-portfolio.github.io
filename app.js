// app.js - render page content, animations, scroll reveals, and local edit state support
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
    { tag: "Branding", title: "Travel Experience", text: "Design and UI for travel agency." },
    { tag: "Web App", title: "Dashboard Pro", text: "Admin dashboard with charts & controls." }
  ]
};

const yearSpan = document.getElementById('year');
if(yearSpan) yearSpan.textContent = new Date().getFullYear();

function loadState(){
  const saved = JSON.parse(localStorage.getItem('portfolio_state') || "{}");
  return {...defaults, ...saved};
}
let state = loadState();

// render key-value fields
function renderFields(){
  document.querySelectorAll('[data-key]').forEach(el=>{
    const key = el.getAttribute('data-key');
    if(state[key] !== undefined) el.textContent = state[key];
  });
}
renderFields();

// render project stack
function renderProjects(){
  const container = document.getElementById('projectStack');
  if(!container) return;
  container.innerHTML = '';
  // back + mid layers
  const back = document.createElement('div'); back.className = 'card-back hidden'; container.appendChild(back);
  const mid = document.createElement('div'); mid.className = 'card-mid hidden'; container.appendChild(mid);

  // front card will be the active project (first)
  state.projects.forEach((p, i) => {
    const card = document.createElement('article');
    card.className = 'card card-front hidden';
    card.innerHTML = `
      <div class="card-left">
        <div class="device-mock"><div class="mock-screen">${p.title}</div></div>
      </div>
      <div class="card-right">
        <span class="tag">${p.tag}</span>
        <h3 class="card-title">${p.title}</h3>
        <p class="card-text">${p.text}</p>
      </div>
    `;
    // stack order: show first prominently, others become mid/back via CSS arrangement on hover/JS
    container.appendChild(card);
  });
  // reveal with slight stagger
  const els = container.querySelectorAll('.hidden');
  els.forEach((el, idx)=> setTimeout(()=> el.classList.add('reveal'), 120 * idx));
}
renderProjects();

// Scroll reveal with IntersectionObserver
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('reveal');
    }
  });
}, {threshold: 0.12});
document.querySelectorAll('.hero, .projects, .footer, .faq-card, .contact-wrap').forEach(el => io.observe(el));

// CTA demo
document.getElementById('ctaBtnInline')?.addEventListener('click', ()=>{
  const val = document.getElementById('ctaEmail').value.trim();
  if(!val){ alert('Please enter an email'); return; }
  alert('Thanks! This demo does not send mail. Use Netlify Forms / Formspree to integrate.');
});

// listen for storage change (if admin updates in other tab)
window.addEventListener('storage', (e)=>{
  if(e.key === 'portfolio_state'){
    state = loadState();
    renderFields();
    renderProjects();
  }
});
