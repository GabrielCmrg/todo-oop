import BoardPanel from "./boardPanel.js";

function handleNewBoardInputKeypress(e) {
  if (e.key === "Enter") {
    panel.createBoard(e.target.value);
    e.target.value = "";
  }
}

const newBoardInput = document.querySelector(".new-board-input");
newBoardInput.addEventListener("keypress", handleNewBoardInputKeypress);

const panel = new BoardPanel();
panel.createBoard("Title");
const boards = panel.boards;

const boardPessoal = boards[0];
boardPessoal.createTask("tarefa 1");
boardPessoal.createTask("tarefa 2");
boardPessoal.createTask("tarefa 3", true);
boardPessoal.createTask("tarefa 4");
boardPessoal.createTask("tarefa 5", true);

const boardsContainer = panel.container;
boards.forEach((board) => {
  const boardContainer = board.getBoardView();

  boardsContainer.appendChild(boardContainer);
});
