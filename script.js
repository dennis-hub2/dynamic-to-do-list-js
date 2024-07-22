document.addEventListener('DOMContentLoaded', () => {
    // Load tasks from Local Storage when the page loads
    loadTasks();

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a new task
    // 1. Create the addTask Function:
    // Define a function named addTask. This function will be responsible for adding new tasks to the list.
    function addTask(taskText, save = true) {
        // Inside addTask, retrieve and trim the value from the task input field. Store this value in a variable named taskText.
        taskText = taskText.trim();

        // Check if taskText is not empty (“”). If it is empty, use alert to prompt the user to enter a task.
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Task Creation and Removal:
        // Within the addTask function, if taskText is not empty:
        // Create a new li element. Set its textContent to taskText.
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a new button element for removing the task. Set its textContent to “Remove”, and give it a class name of ‘remove-btn’.
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');
        
        // Assign an onclick event to the remove button that, when triggered, removes the li element from taskList.
        removeButton.onclick = () => {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText);
        };

        // Append the remove button to the li element, then append the li to taskList.
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear the task input field by setting taskInput.value to an empty string.
        taskInput.value = '';

        // Save the task to Local Storage
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    // Function to save a task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to load tasks from Local Storage and display them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' to avoid saving again
    }

    // Attach Event Listeners:
    // Add an event listener to addButton that calls addTask when the button is clicked.
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value;
        addTask(taskText);
    });

    // Add an event listener to taskInput for the ‘keypress’ event to allow tasks to be added by pressing the “Enter” key.
    // Inside this event listener, check if event.key is equal to ‘Enter’ before calling addTask.
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value;
            addTask(taskText);
        }
    });
});
