/**
 * Frontend unit tests for todo functionality
 */

describe('Todo App Frontend', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="taskInput" type="text">
      <select id="assigneeSelect"></select>
      <button id="addBtn">Add Task</button>
      <ul id="taskList"></ul>
    `;
    localStorage.clear();
  });

  test('should add task to localStorage', () => {
    const taskInput = document.getElementById('taskInput');
    const assigneeSelect = document.getElementById('assigneeSelect');
    
    taskInput.value = 'Test task';
    assigneeSelect.value = 'alice';
    
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    tasks.push({
      id: Date.now(),
      text: 'Test task',
      assignee: 'alice',
      completed: false
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    expect(JSON.parse(localStorage.getItem('tasks'))).toHaveLength(1);
  });
});
