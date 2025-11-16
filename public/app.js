/* app.js — minimal front-end persistence using localStorage */


const STORAGE_KEY = 'simplesurvey_surveys_v1';


// ----- storage helpers -----
function loadSurveys() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function saveSurveys(surveys) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(surveys));
}
function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}


// ----- table rendering index.html + list.html -----
function renderSurveyTable() {
  const tbody = document.getElementById('surveyTbody');
  if (!tbody) return;


  const table = tbody.closest('table');
  const ths = table ? Array.from(table.querySelectorAll('thead th')) : [];
  const colCount = ths.length;


  // Detects if this table has a "questions" column
  const hasQuestionsCol = ths.some(th =>
    th.textContent.trim().toLowerCase() === 'questions'
  );


  const surveys = loadSurveys();
  tbody.innerHTML = '';


  if (surveys.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = colCount || 4; // fallback to 4
    td.textContent = 'No surveys yet. Create one to get started.';
    tr.appendChild(td);
    tbody.appendChild(tr);
  return;
  }


  surveys.forEach(s => {
    const tr = document.createElement('tr');


    // For iD
    let td = document.createElement('td');
    td.textContent = s.id;
    tr.appendChild(td);


    // For title
    td = document.createElement('td');
    td.textContent = s.title;
    tr.appendChild(td);


    // For description
    td = document.createElement('td');
    td.textContent = s.description;
    tr.appendChild(td);


    // For questions if and only if this table has that column
    if (hasQuestionsCol) {
      td = document.createElement('td');
      td.textContent = Array.isArray(s.questions) ? s.questions.length : 0;
      tr.appendChild(td);
    }


    // For actions
    const tdActions = document.createElement('td');
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => { location.href = `create.html?id=${encodeURIComponent(s.id)}`; };
    tdActions.appendChild(editBtn);


    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.style.marginLeft = '8px';
    delBtn.onclick = () => {
      if (!confirm('Delete this survey?')) return;
      saveSurveys(loadSurveys().filter(x => x.id !== s.id));
      renderSurveyTable();
    };
    tdActions.appendChild(delBtn);


    tr.appendChild(tdActions);
    tbody.appendChild(tr);
  });
}


// ----- create/update form binding by creating create.html -----
function bindCreateForm() {
  const form = document.getElementById('surveyForm');
  if (!form) return;               // not on this page


  const titleEl = document.getElementById('title');
  const descEl  = document.getElementById('description');
  const qEl     = document.getElementById('questions');


  // If we arrived with ?id=..., has to prefill for editing
  const url = new URL(location.href);
  const editId = url.searchParams.get('id');
  if (editId) {
    const s = loadSurveys().find(x => x.id === editId);
    if (s) {
      titleEl.value = s.title || '';
      descEl.value  = s.description || '';
      qEl.value     = (s.questions || []).map(q => q.text).join(', ');
    }
  }


  form.addEventListener('submit', (e) => {
    e.preventDefault();


    const title = titleEl.value.trim();
    const description = descEl.value.trim();
    // split comma separated questions into an array of id, text
    const questions = qEl.value
     .split(',')
      .map(t => t.trim())
      .filter(Boolean)
      .map(text => ({ id: uid(), text }));


    const surveys = loadSurveys();


    if (editId) {
      const idx = surveys.findIndex(x => x.id === editId);
      if (idx !== -1) {
        surveys[idx] = { ...surveys[idx], title, description, questions };
        saveSurveys(surveys);
        alert('Survey updated.');
      }
    } else {
      const newSurvey = {
        id: uid(),
        title,
        description,
        questions,
        isActive: true,
        createdAt: new Date().toISOString()
      };
      surveys.unshift(newSurvey);
      saveSurveys(surveys);
      alert('Survey created.');
    }


    // After submited, go to list view
    location.href = 'list.html';
  });
}


// ----- boot -----
document.addEventListener('DOMContentLoaded', () => {
  renderSurveyTable();
  bindCreateForm();
});


