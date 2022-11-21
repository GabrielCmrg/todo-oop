export default class Task {
  constructor(id, name, completed, onDelete, boardId) {
    this.id = id;
    this.name = name;
    this.completed = completed;
    this.boardId = boardId;
    this.onDelete = onDelete;
    this.container = document.createElement("li");
  }

  toggleTask() {
    this.completed = !this.completed;

    const taskContainer = this.container;
    taskContainer.classList.toggle("completed");
  }

  getTaskView() {
    const taskContainer = this.container;
    taskContainer.classList.add("task");
    taskContainer.dataset.taskId = this.id;
    taskContainer.dataset.boardId = this.boardId;
    if (this.completed) {
      taskContainer.classList.add("completed");
    }

    const taskCheckbox = document.createElement("input");
    taskCheckbox.id = `checkbox-${this.id}-${Date.now()}`;
    taskCheckbox.classList.add("checkbox");
    taskCheckbox.type = "checkbox";
    taskCheckbox.checked = this.completed;
    taskCheckbox.addEventListener("click", () => this.toggleTask());
    taskContainer.appendChild(taskCheckbox);

    const taskName = document.createElement("label");
    taskName.classList.add("task-name");
    taskName.textContent = this.name;
    taskName.htmlFor = taskCheckbox.id;
    taskContainer.appendChild(taskName);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", () =>
      this.onDelete(this.boardId, this.id)
    );
    taskContainer.appendChild(deleteButton);

    return taskContainer;
  }
}
