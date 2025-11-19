// Editable single-page portfolio - site renderer (no overlay admin code here)
const DEFAULTS = {
  brand: "Your Name",
  heroTitle: "Hi — I'm Your Name",
  heroSubtitle: "Frontend developer • UI/UX designer • Creative coder",
  resumeLink: "#",
  graphicsLink: "#",
  aboutText: "I design and build accessible, performant websites.",
  infoLocation: "City, Country",
  infoEmail: "hello@example.com",
  infoPhone: "+91 98765 43210",
  contactText: "Interested in working together? Drop a message.",
  skills: [
    {name:"HTML",level:85},
    {name:"CSS",level:80},
    {name:"JavaScript",level:70},
    {name:"React",level:65}
  ],
  projects: [
    { tag:"UI/UX", title:"Project A", text:"Short description", link:"#"},
    { tag:"Web", title:"Project B", text:"Short description", link:"#"},
    { tag:"Branding", title:"Project C", text:"Short description", link:"#"}
  ],
  footerNote: "Built with care • Editable"
};

function loadState(){ try{ return JSON.parse(localStorage.getItem('portfolio_state')) || DEFAULTS } catch(e){ return DEFAULTS } }
function saveState(obj){ localStorage.setItem('portfolio_state', JSON.stringify(obj)) }

let state = loadState();

/* --- render fields --- */
function renderAll(){
  // top / hero
  document.querySelector('[data-key="brand"]').textContent = state.brand || DEFAULTS.brand;
  document.querySelector('[data-key="brandCopy"]').textContent = state.brand || DEFAULTS.brand;

  // nav labels (static)
  document.querySelector('[data-key="navHome"]').textContent = "Home";
  document.querySelector('[data-key="navAbout"]').textContent = "About";
  document.querySelector('[data-key="navSkills"]').textContent = "Skills";
  document.querySelector('[data-key="navProjects"]').textContent = "Projects";
  document.querySelector('[data-key="navContact"]').textContent = "Contact";

  document.querySelector('[data-key="heroTitle"]').textContent = state.heroTitle || DEFAULTS.heroTitle;
  document.querySelector('[data-key="heroSubtitle"]').textContent = state.heroSubtitle || DEFAULTS.heroSubtitle;
  const resumeBtn = document.getElementById('resumeBtn');
  if(resumeBtn) resumeBtn.href = state.resumeLink || DEFAULTS.resumeLink;
  const graphicsBtn = document.getElementById('graphicsBtn');
  if(graphicsBtn) graphicsBtn.href = state.graphicsLink || DEFAULTS.graphicsLink;
  const resumeNavBtn = document.getElementById('resumeNavBtn');
  if(resumeNavBtn) resumeNavBtn.href = state.resumeLink || DEFAULTS.resumeLink;

  // about
  const aboutText = document.querySelector('[data-key="aboutText"]');
  if(aboutText) aboutText.textContent = state.aboutText || DEFAULTS.aboutText;
  const infoLocation = document.querySelector('[data-key="infoLocation"]');
  if(infoLocation) infoLocation.textContent = state.infoLocation || DEFAULTS.infoLocation;
  const infoEmail = document.querySelector('[data-key="infoEmail"]');
  if(infoEmail) infoEmail.textContent = state.infoEmail || DEFAULTS.infoEmail;
  const infoPhone = document.querySelector('[data-key="infoPhone"]');
  if(infoPhone) infoPhone.textContent = state.infoPhone || DEFAULTS.infoPhone;

  // contact
  const contactText = document.querySelector('[data-key="contactText"]');
  if(contactText) contactText.textContent = state.contactText || DEFAULTS.contactText;

  // skills
  const skillsList = document.getElementById('skillsList'); if(skillsList){ skillsList.innerHTML = '';
    (state.skills||[]).forEach(s=>{
      const row = document.createElement('div'); row.className='skill-row';
      row.innerHTML = `<div style="width:20%">${s.name}</div><div class="skill-bar"><div class="skill-fill" style="width:${s.level}%"></div></div><div style="width:50px;text-align:right">${s.level}%</div>`;
      skillsList.appendChild(row);
    });
  }

  // projects
  const grid = document.getElementById('projectsGrid'); if(grid){ grid.innerHTML = '';
    (state.projects||[]).forEach(p=>{
      const card = document.createElement('div'); card.className='project-card';
      card.innerHTML = `<div class="project-thumb">${p.tag}</div><div class="project-title">${p.title}</div><p class="project-text">${p.text}</p><a class="btn secondary" href="${p.link||'#'}" target="_blank">View</a>`;
      grid.appendChild(card);
    });
  }

  const footerNote = document.querySelector('[data-key="footerNote"]');
  if(footerNote) footerNote.textContent = state.footerNote || DEFAULTS.footerNote;
  const brandCopy = document.querySelector('[data-key="brandCopy"]');
  if(brandCopy) brandCopy.textContent = state.brand || DEFAULTS.brand;
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
}
renderAll();

/* contact demo */
const contactSend = document.getElementById('contactSend');
if(contactSend){
  contactSend.addEventListener('click', ()=> {
    alert('Demo contact form — configure a backend or form provider to receive messages.');
  });
}

/* sync if storage changed in another tab (so site updates automatically) */
window.addEventListener('storage', (e)=> {
  if(e.key === 'portfolio_state'){ state = loadState(); renderAll(); }
});
// Editable single-page portfolio - site renderer (no overlay admin code here)
const DEFAULTS = {
  brand: "Your Name",
  heroTitle: "Hi — I'm Your Name",
  heroSubtitle: "Frontend developer • UI/UX designer • Creative coder",
  resumeLink: "#",
  graphicsLink: "#",
  aboutText: "I design and build accessible, performant websites.",
  infoLocation: "City, Country",
  infoEmail: "hello@example.com",
  infoPhone: "+91 98765 43210",
  contactText: "Interested in working together? Drop a message.",
  skills: [
    {name:"HTML",level:85},
    {name:"CSS",level:80},
    {name:"JavaScript",level:70},
    {name:"React",level:65}
  ],
  projects: [
    { tag:"UI/UX", title:"Project A", text:"Short description", link:"#"},
    { tag:"Web", title:"Project B", text:"Short description", link:"#"},
    { tag:"Branding", title:"Project C", text:"Short description", link:"#"}
  ],
  footerNote: "Built with care • Editable"
};

function loadState(){ try{ return JSON.parse(localStorage.getItem('portfolio_state')) || DEFAULTS } catch(e){ return DEFAULTS } }
function saveState(obj){ localStorage.setItem('portfolio_state', JSON.stringify(obj)) }

let state = loadState();

/* --- render fields --- */
function renderAll(){
  // top / hero
  document.querySelector('[data-key="brand"]').textContent = state.brand || DEFAULTS.brand;
  document.querySelector('[data-key="brandCopy"]').textContent = state.brand || DEFAULTS.brand;

  // nav labels (static)
  document.querySelector('[data-key="navHome"]').textContent = "Home";
  document.querySelector('[data-key="navAbout"]').textContent = "About";
  document.querySelector('[data-key="navSkills"]').textContent = "Skills";
  document.querySelector('[data-key="navProjects"]').textContent = "Projects";
  document.querySelector('[data-key="navContact"]').textContent = "Contact";

  document.querySelector('[data-key="heroTitle"]').textContent = state.heroTitle || DEFAULTS.heroTitle;
  document.querySelector('[data-key="heroSubtitle"]').textContent = state.heroSubtitle || DEFAULTS.heroSubtitle;
  const resumeBtn = document.getElementById('resumeBtn');
  if(resumeBtn) resumeBtn.href = state.resumeLink || DEFAULTS.resumeLink;
  const graphicsBtn = document.getElementById('graphicsBtn');
  if(graphicsBtn) graphicsBtn.href = state.graphicsLink || DEFAULTS.graphicsLink;
  const resumeNavBtn = document.getElementById('resumeNavBtn');
  if(resumeNavBtn) resumeNavBtn.href = state.resumeLink || DEFAULTS.resumeLink;

  // about
  const aboutText = document.querySelector('[data-key="aboutText"]');
  if(aboutText) aboutText.textContent = state.aboutText || DEFAULTS.aboutText;
  const infoLocation = document.querySelector('[data-key="infoLocation"]');
  if(infoLocation) infoLocation.textContent = state.infoLocation || DEFAULTS.infoLocation;
  const infoEmail = document.querySelector('[data-key="infoEmail"]');
  if(infoEmail) infoEmail.textContent = state.infoEmail || DEFAULTS.infoEmail;
  const infoPhone = document.querySelector('[data-key="infoPhone"]');
  if(infoPhone) infoPhone.textContent = state.infoPhone || DEFAULTS.infoPhone;

  // contact
  const contactText = document.querySelector('[data-key="contactText"]');
  if(contactText) contactText.textContent = state.contactText || DEFAULTS.contactText;

  // skills
  const skillsList = document.getElementById('skillsList'); if(skillsList){ skillsList.innerHTML = '';
    (state.skills||[]).forEach(s=>{
      const row = document.createElement('div'); row.className='skill-row';
      row.innerHTML = `<div style="width:20%">${s.name}</div><div class="skill-bar"><div class="skill-fill" style="width:${s.level}%"></div></div><div style="width:50px;text-align:right">${s.level}%</div>`;
      skillsList.appendChild(row);
    });
  }

  // projects
  const grid = document.getElementById('projectsGrid'); if(grid){ grid.innerHTML = '';
    (state.projects||[]).forEach(p=>{
      const card = document.createElement('div'); card.className='project-card';
      card.innerHTML = `<div class="project-thumb">${p.tag}</div><div class="project-title">${p.title}</div><p class="project-text">${p.text}</p><a class="btn secondary" href="${p.link||'#'}" target="_blank">View</a>`;
      grid.appendChild(card);
    });
  }

  const footerNote = document.querySelector('[data-key="footerNote"]');
  if(footerNote) footerNote.textContent = state.footerNote || DEFAULTS.footerNote;
  const brandCopy = document.querySelector('[data-key="brandCopy"]');
  if(brandCopy) brandCopy.textContent = state.brand || DEFAULTS.brand;
  const y = document.getElementById('year'); if(y) y.textContent = new Date().getFullYear();
}
renderAll();

/* contact demo */
const contactSend = document.getElementById('contactSend');
if(contactSend){
  contactSend.addEventListener('click', ()=> {
    alert('Demo contact form — configure a backend or form provider to receive messages.');
  });
}

/* sync if storage changed in another tab (so site updates automatically) */
window.addEventListener('storage', (e)=> {
  if(e.key === 'portfolio_state'){ state = loadState(); renderAll(); }
});
