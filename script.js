const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

function createId() {
  return Math.random().toString(36).slice(2, 10);
}

function renderEmptyState() {
  if (list.children.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = 'No tasks yet. Add your first task above.';
    list.appendChild(li);
  }
}

function createItemElement(task) {
  const li = document.createElement('li');
  li.className = 'item';
  li.dataset.id = task.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'checkbox';
  checkbox.checked = task.completed === true;

  const title = document.createElement('div');
  title.className = 'title' + (task.completed ? ' completed' : '');
  title.textContent = task.text;

  const actions = document.createElement('div');
  actions.className = 'actions';

  const completeBtn = document.createElement('button');
  completeBtn.className = 'icon-btn complete';
  completeBtn.title = 'Mark complete';
  completeBtn.setAttribute('aria-label', 'Mark complete');
  completeBtn.innerHTML = '✓';

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'icon-btn delete';
  deleteBtn.title = 'Delete';
  deleteBtn.setAttribute('aria-label', 'Delete task');
  deleteBtn.innerHTML = '🗑';

  actions.appendChild(completeBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(checkbox);
  li.appendChild(title);
  li.appendChild(actions);

  return li;
}

function getTasks() {
  try {
    const raw = localStorage.getItem('tasks');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const tasks = getTasks();
  const newTask = { id: createId(), text: trimmed, completed: false };
  tasks.push(newTask);
  saveTasks(tasks);

  const el = createItemElement(newTask);
  if (list.firstChild && list.firstChild.classList.contains('empty')) {
    list.removeChild(list.firstChild);
  }
  list.appendChild(el);
}

function toggleTask(id, completed) {
  const tasks = getTasks().map(t => t.id === id ? { ...t, completed } : t);
  saveTasks(tasks);
}

function deleteTask(id) {
  const tasks = getTasks().filter(t => t.id !== id);
  saveTasks(tasks);
}

function syncTitleState(li, completed) {
  const title = li.querySelector('.title');
  if (!title) return;
  if (completed) {
    title.classList.add('completed');
  } else {
    title.classList.remove('completed');
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  addTask(input.value);
  input.value = '';
  input.focus();
});

list.addEventListener('click', (e) => {
  const target = e.target;
  const li = target.closest('.item');
  if (!li) return;
  const id = li.dataset.id;

  if (target.classList.contains('delete')) {
    li.remove();
    deleteTask(id);
    renderEmptyState();
    return;
  }

  if (target.classList.contains('complete')) {
    const checkbox = li.querySelector('.checkbox');
    checkbox.checked = true;
    toggleTask(id, true);
    syncTitleState(li, true);
    return;
  }
});

list.addEventListener('change', (e) => {
  const target = e.target;
  if (target.classList.contains('checkbox')) {
    const li = target.closest('.item');
    const id = li.dataset.id;
    toggleTask(id, target.checked);
    syncTitleState(li, target.checked);
  }
});

function init() {
  list.innerHTML = '';
  const tasks = getTasks();
  tasks.forEach(t => list.appendChild(createItemElement(t)));
  renderEmptyState();
}

init();
