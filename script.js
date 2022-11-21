import Task from "./task.js";

function onDuplicateBoard(board) {
  const boardsContainer = document.querySelector(".boards");
  const newBoard = structuredClone(board);
  const lastBoardId = boards[boards.length - 1].id;
  newBoard.id = lastBoardId + 1;
  newBoard.title = `${newBoard.title} Copy`;

  const boardContainer = getBoardView(newBoard);
  boardsContainer.appendChild(boardContainer);
  boards.push(newBoard);
}

function onBoardTitleClick(boardId) {
  const newTitle = prompt("Novo titulo do board");
  if (!newTitle) {
    alert("Insira o novo título!");
    return;
  }

  const boardTitleElement = document.querySelector(
    `.board-${boardId} .board-title`
  );
  boardTitleElement.textContent = newTitle;
}

function onDeleteBoard(boardId) {
  boards = boards.filter((board) => board.id !== boardId);

  const boardContainer = document.querySelector(`[data-board-id="${boardId}"]`);
  boardContainer.remove();
}

function onAddBoard(newBoardTitle) {
  const lastBoardId = boards[boards.length - 1]?.id || 0;
  const board = {
    id: lastBoardId + 1,
    title: newBoardTitle,
    tasks: [],
  };
  boards.push(board);

  const boardsContainer = document.querySelector(".boards");
  const boardContainer = getBoardView(board);
  boardsContainer.appendChild(boardContainer);
}

function onDeleteTask(boardId, taskId) {
  const board = boards.find((board) => board.id === boardId);
  board.tasks = board.tasks.filter((task) => task.id !== taskId);

  const taskContainer = document.querySelector(
    `[data-task-id="${taskId}"][data-board-id="${boardId}"]`
  );
  taskContainer.remove();
}

function onAddTask(boardId, newTaskName) {
  const board = boards.find((board) => board.id === Number(boardId));
  const lastTaskId = board.tasks[board.tasks.length - 1].id;
  const task = {
    id: lastTaskId + 1,
    name: newTaskName,
    completed: false,
  };
  board.tasks.push(task);

  const tasksContainer = document.querySelector(
    `[data-board-id="${boardId}"] .tasks`
  );
  const taskContainer = getTaskView(Number(boardId), task);
  tasksContainer.appendChild(taskContainer);
}

function handleNewTaskInputKeypress(e) {
  if (e.key === "Enter") {
    onAddTask(e.target.dataset.boardId, e.target.value);
    e.target.value = "";
  }
}

function handleNewBoardInputKeypress(e) {
  if (e.key === "Enter") {
    onAddBoard(e.target.value);
    e.target.value = "";
  }
}

function getBoardView(board) {
  const boardContainer = document.createElement("div");
  boardContainer.classList.add("board");
  boardContainer.dataset.boardId = board.id;

  const htmlRow = document.createElement("div");
  htmlRow.classList.add("row");

  const duplicateButton = document.createElement("button");
  duplicateButton.classList.add("duplicate-button");
  duplicateButton.textContent = "Duplicate board";
  duplicateButton.addEventListener("click", () => onDuplicateBoard(board));
  htmlRow.appendChild(duplicateButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "X";
  deleteButton.addEventListener("click", () => onDeleteBoard(board.id));
  htmlRow.appendChild(deleteButton);

  boardContainer.appendChild(htmlRow);

  const boardTitle = document.createElement("p");
  boardTitle.classList.add("board-title");
  boardTitle.textContent = board.title;
  boardTitle.addEventListener("click", () => onBoardTitleClick(board.id));
  boardContainer.appendChild(boardTitle);

  const tasksContainer = document.createElement("ul");
  tasksContainer.classList.add("tasks");
  boardContainer.appendChild(tasksContainer);

  board.tasks.forEach((task) => {
    const taskContainer = task.getTaskView();
    tasksContainer.appendChild(taskContainer);
  });

  const newTaskInput = document.createElement("input");
  newTaskInput.dataset.boardId = board.id;
  newTaskInput.classList.add("new-task-input");
  newTaskInput.type = "text";
  newTaskInput.placeholder = "Nova tarefa";
  newTaskInput.addEventListener("keypress", handleNewTaskInputKeypress);
  boardContainer.appendChild(newTaskInput);

  return boardContainer;
}

const boardPessoal = {
  id: 1,
  title: "Title",
  tasks: [
    new Task(1, "tarefa 1", false, onDeleteTask, 1),
    new Task(2, "tarefa 2", false, onDeleteTask, 1),
    new Task(3, "tarefa 3", true, onDeleteTask, 1),
    new Task(4, "tarefa 4", false, onDeleteTask, 1),
    new Task(5, "tarefa 5", true, onDeleteTask, 1),
  ],
};

let boards = [boardPessoal];

function renderizarBoards(boards) {
  const boardsContainer = document.querySelector(".boards");

  boards.forEach((board) => {
    const boardContainer = getBoardView(board);

    boardsContainer.appendChild(boardContainer);
  });
}
renderizarBoards(boards);

const newBoardInput = document.querySelector(".new-board-input");
newBoardInput.addEventListener("keypress", handleNewBoardInputKeypress);
