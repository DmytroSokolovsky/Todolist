const itemsContainer = document.getElementById("items");
const addButton = document.getElementById("add");
const addItem = document.getElementById("item__add");
const item = document.querySelector(".item");
const itemDescription = document.querySelector(".item__description");
const itemCompleted = document.querySelector(".item__completed");

const tasks = JSON.parse(localStorage.getItem("todo")) || [];

function getTasks() {
	let task;
	let completed;
	let div;
  let deleteItem;

	itemsContainer.innerHTML = "";

	tasks.forEach((value) => {
		div = document.createElement("div");
		div.classList.add("todoItem");

		task = document.createElement("textarea");
		task.value = value.description;
		task.classList.add("item__description");

		completed = document.createElement("input");
		completed.type = "checkbox";
		completed.classList.add("item__completed");
		completed.checked = value.completed;

    deleteItem = document.createElement("div");
    deleteItem.classList.add("item__delete");
    deleteItem.innerHTML = `&times`

		div.appendChild(completed);
		div.appendChild(task);
    div.appendChild(deleteItem);

		itemsContainer.appendChild(div);

		task.addEventListener("change", (e) => {
			updateTask(value.id, "description", e.target.value);
		});

		completed.addEventListener("change", (e) => {
			updateTask(value.id, "completed", e.target.checked);
		});

    deleteItem.addEventListener('click', () => {
      deleteTask(value.id)
    })
	});

	return tasks;
}

getTasks();

function updateTask(id, key, value) {
	let index = tasks.findIndex((task) => {
		return task.id === id;
	});

	if (index !== -1) {
		tasks[index][key] = value;
		setTasks(tasks);
	}
}

function deleteTask(id) {
  let index = tasks.findIndex((task) => {
    return task.id === id;
  });

  if (index !== -1) {
    tasks.splice(index, 1);
    setTasks(tasks);
    getTasks();
  }
}

function setTasks(tasks) {
	const newTasks = JSON.stringify(tasks);
	localStorage.setItem("todo", newTasks);
}

function addTask(description, completed) {
	tasks.push({
		description,
		completed,
		id: Date.now(),
	});
	setTasks(tasks);
	getTasks();
}

addButton.addEventListener("click", (e) => {
	itemDescription.value = "";
	itemCompleted.checked = false;
	item.style.display = "block";
});

addItem.addEventListener("click", (e) => {
	const description = itemDescription.value;
	const checked = itemCompleted.checked;
	addTask(description, checked);
	item.style.display = "none";
});
