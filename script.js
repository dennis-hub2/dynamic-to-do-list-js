document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new li element and set its textContent to taskText
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Add a class to the li element for styling
        taskItem.classList.add('task-item');

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Assign an onclick event to the remove button that removes the li element from taskList
        removeButton.onclick = () => {
            taskList.removeChild(taskItem);
        };

        // Append the remove button to the li element, then append the li to taskList
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // Clear the task input field
        taskInput.value = "";
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', addTask);

    // Event listener for pressing "Enter" key in the task input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Function to add a new task
    function addTask(taskText, save = true) {
        if (taskText.trim() === "") {
            alert("Please enter a task.");
            return;
        }

        // Create a new li element and set its textContent to taskText
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;
        taskItem.classList.add('task-item');

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Assign an onclick event to the remove button that removes the li element from taskList
        removeButton.onclick = () => {
            taskList.removeChild(taskItem);
            updateLocalStorage(); // Update Local Storage when a task is removed
        };

        // Append the remove button to the li element, then append the li to taskList
        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);

        // Clear the task input field
        taskInput.value = "";

        // Save to Local Storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to update Local Storage
    function updateLocalStorage() {
        const tasks = Array.from(taskList.children).map(taskItem => taskItem.textContent.replace('Remove', '').trim());
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Event listener for the "Add Task" button
    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    // Event listener for pressing "Enter" key in the task input field
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});

});
