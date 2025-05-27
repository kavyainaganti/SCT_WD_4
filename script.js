let tasks = [];
const taskInput = document.getElementById('taskInput');
const taskDateTime = document.getElementById('taskDateTime');
const taskList = document.getElementById('taskList');
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
});
function addTask() {
    const text = taskInput.value.trim();
    const dateTime = taskDateTime.value;
    
    if (text === '') {
        alert('Please enter a task description');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text,
        completed: false,
        dueDate: dateTime || null,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskDateTime.value = '';
}
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';
    
    let filteredTasks = tasks;
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    filteredTasks.sort((a, b) => {
        const now = new Date();
    
        const aOverdue = a.dueDate ? new Date(a.dueDate) < now : false;
        const bOverdue = b.dueDate ? new Date(b.dueDate) < now : false;
        
        if (aOverdue && !bOverdue) return -1;
        if (!aOverdue && bOverdue) return 1;
    
        if (a.dueDate && b.dueDate) {
            return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (a.dueDate) {
            return -1;
        } else if (b.dueDate) {
            return 1;
        }
        
        
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = task-item ${task.completed ? 'completed' : ''};
        taskItem.dataset.id = task.id;
        
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));
        
       
        let textElement;
        if (task.editing) {
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.className = 'edit-input';
            editInput.value = task.text;
            editInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    saveEditedTask(task.id, editInput.value);
                }
            });
            textElement = editInput;
        } else {
            const taskText = document.createElement('span');
            taskText.className = task-text ${task.completed ? 'completed' : ''};
            taskText.textContent = task.text;
            textElement = taskText;
        }
    
        let dueDateElement = document.createElement('span');
        if (task.dueDate) {
            const dueDate = new Date(task.dueDate);
            const now = new Date();
            const isOverdue = dueDate < now && !task.completed;
            
            dueDateElement.className = task-due ${isOverdue ? 'overdue' : ''};
            dueDateElement.textContent = `Due: ${format
