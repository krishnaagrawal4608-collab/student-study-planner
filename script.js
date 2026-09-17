let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask() {
    let subject = document.getElementById("subject").value;
    let task = document.getElementById("task").value;
    let date = document.getElementById("date").value;

    if (subject === "" || task === "" || date === "") {
        alert("Please fill all fields");
        return;
    }

    let newTask = {
        subject: subject,
        task: task,
        date: date,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    document.getElementById("subject").value = "";
    document.getElementById("task").value = "";
    document.getElementById("date").value = "";
}

function displayTasks() {
    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        let taskClass = tasks[i].completed ? "completed" : "";

        taskList.innerHTML += `
            <div class="task">
                <div class="task-info ${taskClass}">
                    <h3>${tasks[i].subject}</h3>
                    <p>${tasks[i].task}</p>
                    <p>Due: ${tasks[i].date}</p>
                </div>

                <div>
                    <button onclick="completeTask(${i})">✓</button>
                    <button onclick="deleteTask(${i})">Delete</button>
                </div>
            </div>
        `;
    }

    updateProgress();
}

function completeTask(index) {
    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);

    saveTasks();
    displayTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function updateProgress() {
    let total = tasks.length;
    let completed = 0;

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].completed) {
            completed++;
        }
    }

    let pending = total - completed;

    document.getElementById("totalTasks").innerText = total;
    document.getElementById("completedTasks").innerText = completed;
    document.getElementById("pendingTasks").innerText = pending;

    if (total === 0) {
        document.getElementById("progressText").innerText = "0% Completed";
        document.getElementById("progressFill").style.width = "0%";
        return;
    }

    let progress = Math.round((completed / total) * 100);

    document.getElementById("progressText").innerText =
        progress + "% Completed";

    document.getElementById("progressFill").style.width =
        progress + "%";
}



function filterTasks() {
    let search = document.getElementById("search").value.toLowerCase();
    let filter = document.getElementById("filter").value;

    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        let matchesSearch =
            tasks[i].task.toLowerCase().includes(search) ||
            tasks[i].subject.toLowerCase().includes(search);

        let matchesFilter =
            filter === "all" ||
            (filter === "completed" && tasks[i].completed) ||
            (filter === "pending" && !tasks[i].completed);

        if (matchesSearch && matchesFilter) {
            let taskClass = tasks[i].completed ? "completed" : "";

            taskList.innerHTML += `
                <div class="task">
                    <div class="task-info ${taskClass}">
                        <h3>${tasks[i].subject}</h3>
                        <p>${tasks[i].task}</p>
                        <p>Due: ${tasks[i].date}</p>
                    </div>

                    <div>
                        <button onclick="completeTask(${i})">✓</button>
                        <button onclick="deleteTask(${i})">Delete</button>
                    </div>
                </div>
            `;
        }
    }
}

function toggleTheme() {
    document.body.classList.toggle("dark");

    let button = document.getElementById("themeButton");

    if (document.body.classList.contains("dark")) {
        button.innerText = "☀️ Light Mode";
    } else {
        button.innerText = "🌙 Dark Mode";
    }
}







