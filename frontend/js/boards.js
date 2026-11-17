const modal = new bootstrap.Modal('#boardModal');
const form = document.getElementById('boardForm');
const nameInput = document.getElementById('boardName');
const descInput = document.getElementById('boardDesc');
const formError = document.getElementById('boardFormError');
let editingId = null;

async function loadBoards() {
  const boards = await api('/boards');
  const box = document.getElementById('boards');
  box.replaceChildren();
  if (boards.length === 0) {
    box.appendChild(el('p', 'text-secondary', 'Brak tablic. Dodaj pierwszą.'));
    return;
  }
  for (const b of boards) {
    const body = el('div', 'card-body');
    const info = el('div', 'small');
    info.append(el('div', '', 'Utworzył(a): ' + b.ownerName), el('div', '', 'Aktywne zadania: ' + b.activeTasks));
    body.append(el('h2', 'h5', b.name), el('p', 'text-secondary', b.description || 'Brak opisu'), info);
    const open = el('a', 'btn btn-primary btn-sm', 'Otwórz');
    open.href = 'board.html?id=' + b.id;
    const edit = el('button', 'btn btn-outline-primary btn-sm', 'Edytuj');
    edit.type = 'button';
    edit.addEventListener('click', () => openForm(b));
    const del = el('button', 'btn btn-outline-danger btn-sm', 'Usuń');
    del.type = 'button';
    del.addEventListener('click', () => removeBoard(b));
    const footer = el('div', 'card-footer bg-white d-flex gap-2');
    footer.append(open, edit, del);
    const card = el('div', 'card board-card h-100 shadow-sm');
    card.append(body, footer);
    const col = el('div', 'col-12 col-md-6 col-lg-4');
    col.appendChild(card);
    box.appendChild(col);
  }
}

function openForm(board) {
  editingId = board ? board.id : null;
  document.getElementById('boardModalTitle').textContent = board ? 'Edycja tablicy' : 'Nowa tablica';
  nameInput.value = board ? board.name : '';
  descInput.value = board && board.description ? board.description : '';
  nameInput.classList.remove('is-invalid');
  formError.textContent = '';
  modal.show();
}

async function removeBoard(board) {
  if (!confirm('Usunąć tablicę „' + board.name + '”?')) return;
  try {
    await api('/boards/' + board.id, 'DELETE');
    loadBoards();
  } catch (err) {
    alert(err.message);
  }
}

document.getElementById('newBoardBtn').addEventListener('click', () => openForm(null));

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  const valid = name.length >= 1 && name.length <= 80;
  nameInput.classList.toggle('is-invalid', !valid);
  if (!valid) return;
  try {
    await api(editingId ? '/boards/' + editingId : '/boards', editingId ? 'PUT' : 'POST',
      { name, description: descInput.value.trim() });
    modal.hide();
    loadBoards();
  } catch (err) {
    formError.textContent = err.message;
  }
});

initHeader().then(loadBoards);
