import Task from "./task.js";

export default class Board {
  constructor(id, title, onDuplicate, onDelete) {
    this.id = id;
    this.title = title;
    this.nextTaskId = 1;
    this.tasks = [];
    this.onDuplicate = onDuplicate;
    this.onDelete = onDelete;
    this.container = document.createElement("div");
    this.createDOM();
  }

  deleteTask(taskId) {
    const filtered = [];
    let taskToDelete;
    this.tasks.forEach((task) => {
      if (task.id === taskId) {
        filtered.push(task);
      } else {
        taskToDelete = task;
      }
    });
    taskToDelete.removeFromDOM();
    this.tasks = filtered;
  }

  createTask(newTaskName, completed = false) {
    const newTask = new Task(
      this.nextTaskId,
      newTaskName,
      completed,
      (taskId) => this.deleteTask(taskId),
      this.id
    );
    this.tasks.push(newTask);
    this.nextTaskId++;
    const tasksContainer = this.container.querySelector(".tasks");
    const taskContainer = newTask.getTaskView();
    tasksContainer.appendChild(taskContainer);
  }

  onBoardTitleClick() {
    const newTitle = prompt("Novo titulo do board");
    if (!newTitle) {
      alert("Insira o novo título!");
      return;
    }

    const boardTitleElement = this.container.querySelector(".board-title");
    boardTitleElement.textContent = newTitle;
  }

  handleNewTaskInputKeypress(e) {
    if (e.key === "Enter") {
      this.createTask(e.target.value);
      e.target.value = "";
    }
  }

  createDOM() {
    const boardContainer = this.container;
    boardContainer.classList.add("board");
    boardContainer.dataset.boardId = this.id;

    const htmlRow = document.createElement("div");
    htmlRow.classList.add("row");

    const duplicateButton = document.createElement("button");
    duplicateButton.classList.add("duplicate-button");
    duplicateButton.textContent = "Duplicate board";
    duplicateButton.addEventListener("click", () => this.onDuplicate(this));
    htmlRow.appendChild(duplicateButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", () => this.onDelete(this.id));
    htmlRow.appendChild(deleteButton);

    boardContainer.appendChild(htmlRow);

    const boardTitle = document.createElement("p");
    boardTitle.classList.add("board-title");
    boardTitle.textContent = this.title;
    boardTitle.addEventListener("click", () => this.onBoardTitleClick());
    boardContainer.appendChild(boardTitle);

    const tasksContainer = document.createElement("ul");
    tasksContainer.classList.add("tasks");
    boardContainer.appendChild(tasksContainer);

    this.tasks.forEach((task) => {
      const taskContainer = task.getTaskView();
      tasksContainer.appendChild(taskContainer);
    });

    const newTaskInput = document.createElement("input");
    newTaskInput.dataset.boardId = this.id;
    newTaskInput.classList.add("new-task-input");
    newTaskInput.type = "text";
    newTaskInput.placeholder = "Nova tarefa";
    newTaskInput.addEventListener("keypress", (e) =>
      this.handleNewTaskInputKeypress(e)
    );
    boardContainer.appendChild(newTaskInput);
  }

  getBoardView() {
    return this.container;
  }
}
