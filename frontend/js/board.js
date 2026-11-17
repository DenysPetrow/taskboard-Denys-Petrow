const boardId = new URLSearchParams(window.location.search).get('id');
const LABELS = { low: 'Niski', medium: 'Średni', high: 'Wysoki' };
const STATUSES = ['todo', 'in_progress', 'done'];
const STATUS_LABELS = { todo: 'Do zrobienia', in_progress: 'W trakcie', done: 'Gotowe' };
const modal = new bootstrap.Modal('#taskModal');
const $ = (id) => document.getElementById(id);
const users = new Map();
let editingId = null;
let timer = null;

const fmt = (s) => (s ? s.slice(8, 10) + '.' + s.slice(5, 7) + '.' + s.slice(0, 4) : '');
const today = () => new Date().toLocaleDateString('sv'); // RRRR-MM-DD

function flash(text, type = 'success') {
  const a = el('div', 'alert alert-' + type + ' alert-dismissible', text);
  a.setAttribute('role', 'alert');
  const c = el('button', 'btn-close');
  c.type = 'button';
  c.setAttribute('data-bs-dismiss', 'alert');
  c.setAttribute('aria-label', 'Zamknij');
  a.appendChild(c);
  $('message').replaceChildren(a);
}

function button(text, onClick, cls = 'btn-outline-secondary') {
  const b = el('button', 'btn btn-sm ' + cls, text);
  b.type = 'button';
  b.addEventListener('click', onClick);
  return b;
}

function taskCard(t) {
  const user = users.get(t.assigneeId);
  const late = t.deadline && t.status !== 'done' && t.deadline < today();
  const meta = el('div', 'mb-1 small');
  meta.appendChild(el('span', 'badge prio-' + t.priority, 'Priorytet: ' + LABELS[t.priority]));
  if (t.deadline) {
    meta.appendChild(el('span', late ? 'ms-2 text-danger fw-bold' : 'ms-2 text-secondary',
      'Termin: ' + fmt(t.deadline) + (late ? ' (po terminie)' : '')));
  }
  const who = el('p', 'small text-secondary mb-2', 'Osoba: ' + (user ? user.firstName + ' ' + user.lastName : 'nieprzypisane'));
  const actions = el('div', 'd-flex flex-wrap gap-1');
  const i = STATUSES.indexOf(t.status);
  actions.appendChild(i < 2
    ? button('Przenieś do: ' + STATUS_LABELS[STATUSES[i + 1]], () => moveTask(t.id, STATUSES[i + 1]), 'btn-outline-primary')
    : button('Otwórz ponownie', () => moveTask(t.id, 'todo'), 'btn-outline-primary'));
  actions.append(button('Szczegóły', () => openTask(t.id)), button('Usuń', () => removeTask(t.id), 'btn-outline-danger'));
  const body = el('div', 'card-body p-3');
  body.append(el('h3', 'h6 fw-bold mb-1', t.title), meta, who, actions);
  const card = el('div', 'card shadow-sm task-' + t.priority);
  card.appendChild(body);
  return card;
}

async function loadTasks() {
  const p = new URLSearchParams();
  if ($('filterPriority').value) p.set('priority', $('filterPriority').value);
  if ($('filterAssignee').value) p.set('assigneeId', $('filterAssignee').value);
  if ($('filterQ').value.trim()) p.set('q', $('filterQ').value.trim());
  const qs = p.toString();
  let tasks;
  try {
    tasks = await api('/boards/' + boardId + '/tasks' + (qs ? '?' + qs : ''));
  } catch (err) {
    return flash(err.message, 'danger');
  }
  for (const status of STATUSES) {
    const list = tasks.filter((t) => t.status === status);
    $('count-' + status).textContent = list.length;
    $('col-' + status).replaceChildren(...(list.length
      ? list.map(taskCard)
      : [el('p', 'small text-secondary px-1', 'Brak zadań w tej kolumnie.')]));
  }
}

async function moveTask(id, status) {
  try {
    const t = await api('/tasks/' + id);
    await api('/tasks/' + id, 'PUT', {
      title: t.title, description: t.description, status,
      priority: t.priority, deadline: t.deadline, assigneeId: t.assigneeId
    });
    loadTasks();
  } catch (err) {
    flash(err.message, 'danger');
  }
}

async function removeTask(id) {
  if (!confirm('Usunąć to zadanie?')) return;
  try {
    await api('/tasks/' + id, 'DELETE');
    flash('Usunięto zadanie.');
    loadTasks();
  } catch (err) {
    flash(err.message, 'danger');
  }
}

// id = null: nowe zadanie; inaczej szczegóły i edycja z GET /api/tasks/:id
async function openTask(id) {
  editingId = id;
  $('taskForm').reset();
  $('taskTitle').classList.remove('is-invalid');
  $('taskFormError').textContent = '';
  $('taskInfo').textContent = '';
  $('taskModalTitle').textContent = 'Nowe zadanie';
  if (id) {
    try {
      const t = await api('/tasks/' + id);
      $('taskModalTitle').textContent = 'Zadanie: ' + t.title;
      $('taskTitle').value = t.title;
      $('taskDesc').value = t.description || '';
      $('taskStatus').value = t.status;
      $('taskPriority').value = t.priority;
      $('taskDeadline').value = t.deadline || '';
      $('taskAssignee').value = t.assigneeId || '';
      $('taskInfo').textContent = 'Utworzono: ' + fmt(t.createdAt);
    } catch (err) {
      return flash(err.message, 'danger');
    }
  }
  modal.show();
}

$('newTaskBtn').addEventListener('click', () => openTask(null));
$('filters').addEventListener('submit', (e) => e.preventDefault());
$('filterPriority').addEventListener('change', loadTasks);
$('filterAssignee').addEventListener('change', loadTasks);
$('filterQ').addEventListener('input', () => {
  clearTimeout(timer);
  timer = setTimeout(loadTasks, 300);
});
$('clearFilters').addEventListener('click', () => {
  $('filters').reset();
  loadTasks();
});

$('taskForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const title = $('taskTitle').value.trim();
  const valid = title.length >= 3 && title.length <= 100;
  $('taskTitle').classList.toggle('is-invalid', !valid);
  if (!valid) return;
  const task = {
    title,
    description: $('taskDesc').value.trim() || null,
    status: $('taskStatus').value,
    priority: $('taskPriority').value,
    deadline: $('taskDeadline').value || null,
    assigneeId: $('taskAssignee').value ? Number($('taskAssignee').value) : null
  };
  try {
    if (editingId) {
      await api('/tasks/' + editingId, 'PUT', task);
    } else {
      await api('/tasks', 'POST', { ...task, boardId: Number(boardId) });
    }
    modal.hide();
    flash(editingId ? 'Zapisano zmiany.' : 'Dodano zadanie.');
    loadTasks();
  } catch (err) {
    $('taskFormError').textContent = err.message;
  }
});

async function init() {
  if (!boardId) {
    window.location.href = 'boards.html';
    return;
  }
  await initHeader();
  const [boards, userList] = await Promise.all([api('/boards'), api('/users')]);
  const board = boards.find((b) => String(b.id) === boardId);
  if (!board) {
    window.location.href = 'boards.html';
    return;
  }
  $('crumb').textContent = board.name;
  $('boardTitle').textContent = board.name;
  $('boardDesc').textContent = board.description || '';
  for (const u of userList) {
    users.set(u.id, u);
    const name = u.firstName + ' ' + u.lastName;
    for (const id of ['taskAssignee', 'filterAssignee']) {
      const o = el('option', '', name);
      o.value = u.id;
      $(id).appendChild(o);
    }
  }
  loadTasks();
}

init();
