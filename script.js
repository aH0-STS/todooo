document.getElementById('add-btn').addEventListener('click', addTask);

// Function to add a new task
function addTask() {
    const taskName = document.getElementById('task-name').value.trim();
    const dueDate = document.getElementById('due-date').value;
    const priority = document.getElementById('priority').value;

    if (taskName && dueDate) {
        const taskItem = createTaskElement(taskName, dueDate, priority);

        document.getElementById('todo-list').appendChild(taskItem);

        resetForm();
    } else {
        alert('Please fill in both the task name and the due date.');
    }
}

// Function to create a task element
function createTaskElement(name, date, priority) {
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <span><strong>${name}</strong> - ${date} (${priority})</span>
        <button class="delete-btn">Delete</button>
    `;

    li.querySelector('span').addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    return li;
}

// Function to reset the form
function resetForm() {
    document.getElementById('task-name').value = '';
    document.getElementById('due-date').value = '';
    document.getElementById('priority').value = 'Medium';
}

// Save tasks to local storage before the page unloads
window.addEventListener('beforeunload', saveTasks);

// Load tasks from local storage when the page loads
window.addEventListener('load', loadTasks);

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.todo-item').forEach(item => {
        tasks.push({
            text: item.querySelector('span').innerText,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskItem = createTaskElementFromStorage(task);
        document.getElementById('todo-list').appendChild(taskItem);
    });
}

// Function to create a task element from storage data
function createTaskElementFromStorage(task) {
    const [name, datePriority] = task.text.split(' - ');
    const [date, priority] = datePriority.match(/(.*) \((.*)\)/).slice(1, 3);

    const taskItem = createTaskElement(name, date, priority);
    if (task.completed) {
        taskItem.classList.add('completed');
    }

    return taskItem;
}
