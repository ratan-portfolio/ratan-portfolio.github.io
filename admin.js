// admin.js - password-protected editor that saves to localStorage
const ADMIN_PASSWORD = "Ratanmandal11@#";

const loginBox = document.getElementById('loginBox');
const editor = document.getElementById('editor');
const loginBtn = document.getElementById('loginBtn');
const adminPass = document.getElementById('adminPass');

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

function loadState(){ return JSON.parse(localStorage.getItem('portfolio_state') || "null") || defaults; }
function saveState(obj){ localStorage.setItem('portfolio_state', JSON.stringify(obj)); }

// login
function isLogged(){ return sessionStorage.getItem('admin_logged') === '1'; }
function showEditor(){ loginBox.style.display='none'; editor.style.display='block'; populateForm(); }

if(isLogged()) showEditor();

loginBtn.addEventListener('click', ()=>{
  const val = adminPass.value.trim();
  if(val === ADMIN_PASSWORD){
    sessionStorage.setItem('admin_logged','1');
    showEditor();
  } else alert('Password incorrect.');
});

// elements
const f_brandName = document.getElementById('f_brandName');
const f_heroTitle = document.getElementById('f_heroTitle');
const f_heroDesc = document.getElementById('f_heroDesc');
const f_ctaBtn = document.getElementById('f_ctaBtn');
const projectsList = document.getElementById('projectsList');
const addProject = document.getElementById('addProject');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');

function populateForm(){
  const s = loadState();
  f_brandName.value = s.brandName || '';
  f_heroTitle.value = s.heroTitle || '';
  f_heroDesc.value = s.heroDesc || '';
  f_ctaBtn.value = s.ctaBtn || '';
  renderProjectsEditor(s.projects || []);
}

function renderProjectsEditor(projects){
  projectsList.innerHTML = '';
  projects.forEach((p, idx) => {
    const div = document.createElement('div'); div.className = 'project-item';
    div.innerHTML = `
      <div style="display:flex;gap:8px;margin-bottom:8px">
        <input data-idx="${idx}" data-field="tag" placeholder="Tag" value="${escapeHtml(p.tag||'')}" />
        <input data-idx="${idx}" data-field="title" placeholder="Title" value="${escapeHtml(p.title||'')}" />
      </div>
      <textarea data-idx="${idx}" data-field="text" placeholder="Text" style="width:100%">${escapeHtml(p.text||'')}</textarea>
      <div style="margin-top:8px;display:flex;gap:8px">
        <button data-action="up" data-idx="${idx}" class="btn">↑</button>
        <button data-action="down" data-idx="${idx}" class="btn">↓</button>
        <button data-action="del" data-idx="${idx}" class="btn danger">Delete</button>
      </div>
    `;
    projectsList.appendChild(div);
  });
  projectsList.querySelectorAll('button[data-action]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const action = btn.getAttribute('data-action');
      const idx = Number(btn.getAttribute('data-idx'));
      const cur = loadState().projects || [];
      if(action === 'up' && idx>0){ [cur[idx-1], cur[idx]] = [cur[idx], cur[idx-1]]; }
      if(action === 'down' && idx < cur.length-1){ [cur[idx+1], cur[idx]] = [cur[idx], cur[idx+1]]; }
      if(action === 'del'){ cur.splice(idx,1); }
      saveState({...loadState(), projects:cur});
      renderProjectsEditor(cur);
    });
  });
}

function getCurrentState(){
  const items = projectsList.querySelectorAll('[data-idx]');
  const seen = new Set(); const projects = [];
  items.forEach(el=>{
    const idx = el.getAttribute('data-idx');
    if(seen.has(idx)) return; seen.add(idx);
    const tagEl = projectsList.querySelector(`input[data-idx="${idx}"][data-field="tag"]`);
    const titleEl = projectsList.querySelector(`input[data-idx="${idx}"][data-field="title"]`);
    const textEl = projectsList.querySelector(`textarea[data-idx="${idx}"][data-field="text"]`);
    projects.push({ tag: tagEl?.value || '', title: titleEl?.value || '', text: textEl?.value || '' });
  });
  return {
    brandName: f_brandName.value,
    heroTitle: f_heroTitle.value,
    heroDesc: f_heroDesc.value,
    ctaBtn: f_ctaBtn.value,
    projects
  };
}

saveBtn.addEventListener('click', ()=>{
  const payload = {...loadState(), ...getCurrentState()};
  saveState(payload);
  alert('Saved! Open the public page and refresh to see updates.');
});

resetBtn.addEventListener('click', ()=>{
  if(!confirm('Reset to template defaults?')) return;
  saveState(defaults);
  populateForm();
  alert('Reset complete.');
});

exportBtn.addEventListener('click', ()=>{
  const data = JSON.stringify(loadState(), null, 2);
  const blob = new Blob([data], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'portfolio_state.json';
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});

addProject.addEventListener('click', ()=>{
  const cur = loadState().projects || [];
  cur.push({ tag:'New', title:'New Project', text:'Project description...' });
  saveState({...loadState(), projects:cur});
  renderProjectsEditor(cur);
});

function escapeHtml(s){ return s ? s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;') : ''; }
