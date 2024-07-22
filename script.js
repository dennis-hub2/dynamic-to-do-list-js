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
});
