// Simple editor + save to localStorage + CTA placeholder behavior
const defaults = {
  brandName: "Juan Pablo",
  navAbout: "About Me",
  navProjects: "Projects",
  navExperience: "Experiences",
  navTestimonials: "Testimonials",
  navFAQ: "FAQ",
  getInTouch: "Get in Touch",
  heroTitle: "Collaboration & \nSuccess is the Key",
  heroDesc: "The success of the collaboration is my priority on every project I worked on.",
  projectTag: "UI/UX Design",
  projectTitle: "Crypts - Crypto Landing Page Responsive",
  projectText: "It's a gateway to a world of financial opportunities and technological innovation...",
  faqQ: "Are you available to work on an hourly rate or is this a project-based engagement?",
  email: "hello@juanpablo.com",
  phone: "+1 (201) 895-3801",
  ctaText: "Send me your email to discuss new project"
};

const yearSpan = document.querySelector('#year');
yearSpan.textContent = new Date().getFullYear();

// load or set defaults
function loadState(){
  const saved = JSON.parse(localStorage.getItem('portfolio_state') || "{}");
  const state = {...defaults, ...saved};
  Object.keys(state).forEach(k=>{
    const el = document.querySelector(`[data-key="${k}"]`);
    if(el) el.innerText = state[k];
  });
}
loadState();

function gatherEditable(){
  const els = document.querySelectorAll('[data-key]');
  const obj = {};
  els.forEach(el=> obj[el.getAttribute('data-key')] = el.innerText);
  return obj;
}

const editToggle = document.getElementById('editToggle');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
let editing = false;

editToggle.addEventListener('click', () => {
  editing = !editing;
  document.querySelectorAll('[data-key]').forEach(el=>{
    el.contentEditable = editing ? "true" : "false";
    el.classList.toggle('editing', editing);
  });
  editToggle.textContent = editing ? 'Exit Edit' : 'Edit';
});

saveBtn.addEventListener('click', ()=>{
  const state = gatherEditable();
  localStorage.setItem('portfolio_state', JSON.stringify(state));
  alert('Saved locally in browser. To push to GitHub, add the files to your repo.');
});

resetBtn.addEventListener('click', ()=>{
  if(confirm('Reset to template defaults?')){
    localStorage.removeItem('portfolio_state');
    loadState();
  }
});

// CTA send behaviour (demo)
document.getElementById('ctaBtn').addEventListener('click', ()=>{
  const email = document.getElementById('ctaEmail').value.trim();
  if(!email){ alert('Please enter an email'); return; }
  alert('Thanks — this is a demo. In a real site wire this to your backend or form provider.');
});

// initialize front content from defaults if fresh
if(!localStorage.getItem('portfolio_state')) {
  localStorage.setItem('portfolio_state', JSON.stringify(defaults));
  loadState();
}
