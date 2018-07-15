function getTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const taskList = document.getElementById('taskList');

  taskList.innerHTML = '';

  for (let i = 0; i < tasks.length; i++) {
    const task = {
      id: tasks[i].id,
      title: tasks[i].title,
      description: tasks[i].description,
      assignee: tasks[i].assignee,
      card: tasks[i].cardColor,
      status: tasks[i].status
    }

    taskList.innerHTML += `
    <div class="col s12 m6">
      <div class="card s6 ${task.card} z-depth-2">
        <div class="card-content white-text">
        <h5> ${task.title} </h5>
        <h6> ${task.description} </h6>
        <p>
          <span class="new badge green" data-badge-caption=""> ${task.status} </span>
        </p>
        <i class="material-icons md-14">account_circle</i> ${task.assignee}</p></br>
        <a href="#" class="waves-effect waves-light btn green lighten-1 col s6" onclick="updateStatus(\'${task.id}\')"><i class="material-icons md-14 right">check</i>Concluir</a>
        <a href="#" class="waves-effect waves-light btn red lighten-1 col s6" onclick="deleteTask(\'${task.id}\')"><i class="material-icons md-14 right">backspace</i>Apagar</a>
      </div>
    </div>
    `
  }

}

document.getElementById('tasksInput').addEventListener('submit', saveTask);

function saveTask(e) {
  function getInputValueById(inputId) {
    return document.getElementById(inputId).value;
  }

  const task = {
    id: chance.guid(),
    title: getInputValueById('titleInput'),
    description: getInputValueById('descriptionInput'),
    assignee: getInputValueById('assigneeInput'),
    cardColor: getInputValueById('cardColorInput'),
    status: 'Open'
  }

  if (localStorage.getItem('tasks') == null) {
    const tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  document.getElementById('tasksInput').reset();

	getTasks();

	e.preventDefault();
}

function updateStatus(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
			tasks[i].status = 'Done';
		}
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));

	getTasks();
}

function deleteTask(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));

  for (let i = 0; i < tasks.length; i++) {
		if (tasks[i].id == id) {
			tasks.splice(i, 1);
		}
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));

  getTasks();
}