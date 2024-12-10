document.addEventListener('DOMContentLoaded', () => {
  const welcomeScreen = document.getElementById('welcomeScreen');
  const taskApp = document.getElementById('taskApp');
  const startBtn = document.getElementById('startBtn');
  const taskInput = document.getElementById('taskInput');
  const deadlineInput = document.getElementById('deadlineInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const priorityInput = document.getElementById('priorityInput');
  const completedTaskList = document.getElementById('completedTaskList');
  const clearCompletedBtn = document.getElementById('clearCompletedBtn');
  const emptyTaskMessage = document.getElementById('emptyTaskMessage');
    
  
  startBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    setTimeout(() => {
     welcomeScreen.style.display = 'none';
     taskApp.style.display = 'block';
     // Показ основной части с анимацией
     taskApp.classList.add('visible');
     taskApp.scrollIntoView({ behavior: 'smooth' });
        }, 500);
    });
  
  let tasks = [];
  let completedTasks = [];

  
  function addTask() {
    const taskTitle = taskInput.value.trim();
    const deadline = deadlineInput.value;
    const isPriority = priorityInput.checked;
  
    if (taskTitle && deadline) {
      const task = {
      id: Date.now(),
      title: taskTitle,
      deadline,
      isPriority,};
        
      tasks.push(task);
      sortTasks();
      renderTasks();
      taskInput.value = '';
      deadlineInput.value = '';
      priorityInput.checked = false;
      } else {
        alert('Please fill out the task and deadline.');
      }
    }
  
  addTaskBtn.addEventListener('click', addTask);
  
  function sortTasks() {
    tasks.sort((a, b) => {
    if (a.isPriority !== b.isPriority) return b.isPriority - a.isPriority;
      return new Date(a.deadline) - new Date(b.deadline);
      });
      renderTasks();
    }
  
  function renderTasks() {
    taskList.innerHTML = '';
    if (tasks.length === 0) {
      emptyTaskMessage.style.display = 'block';
      taskList.style.display = 'none';
    } else {
      emptyTaskMessage.style.display = 'none';
      taskList.style.display = 'block';
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      tasks.forEach((task) => {
      const li = document.createElement('li');
      const isTomorrow = task.deadline === tomorrowStr;
      li.className = `list-group-item d-flex justify-content-between align-items-center ${
      task.isPriority ? 'list-group-item-danger' : ''
      } ${isTomorrow ? 'glow' : ''}`;
      li.innerHTML = `
        <div class="d-flex align-items-center">
        <div class="circle me-3" onclick="markComplete(${task.id})" style="width: 20px; height: 20px; background-color: #ff66a3; border-radius: 50%; cursor: pointer;"></div>
        <div>
          <strong>${task.title}</strong>
          <small class="text-muted d-block">Due: ${task.deadline}</small>
        </div>
        </div>
        <div>
        <button class="btn btn-danger btn-sm" onclick="deleteTask(${task.id})">Delete</button>
        <button class="btn btn-secondary btn-sm" onclick="editTask(${task.id})">Edit</button>
        </div>
            `;
            taskList.appendChild(li);
          });
        }
        renderCompletedTasks();
    }

  function renderCompletedTasks() {
    completedTaskList.innerHTML = '';
    if (completedTasks.length === 0) {
      completedTasksSection.style.display = 'none';
    } else {
      completedTasksSection.style.display = 'block';
      completedTasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = 'list-group-item completed';
        li.innerHTML = `
        <div>
          <strong>${task.title}</strong>
          <small class="text-muted d-block">Completed</small>
        </div>
            `;
        completedTaskList.appendChild(li);
        });
      }
    }

  window.editTask = function (taskId) {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      const newTitle = prompt('Edit Task Title:', task.title);
      if (newTitle && newTitle.trim() !== '') {
        task.title = newTitle.trim();
        renderTasks();
      }
    }
  };

  window.markComplete = function (taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      completedTasks.push({ ...tasks[taskIndex], completed: true });
      tasks.splice(taskIndex, 1);
      renderTasks();
    }
  };
  window.deleteTask = function (taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    renderTasks();
  };
    
      // Clear Completed Tasks
  clearCompletedBtn.addEventListener('click', () => {
    completedTasks = [];
    renderCompletedTasks();
  });
  function sortTasks() {
     tasks.sort((a, b) => {
      if (a.isPriority !== b.isPriority) return b.isPriority - a.isPriority;
       return new Date(a.deadline) - new Date(b.deadline);
        });
      }
  });
  