import Board from "./board.js";

function onDuplicateBoard(board) {
  const boardsContainer = document.querySelector(".boards");
  const newBoardId = board.id + 1;
  const newBoardTitle = `${board.title} Copy`;
  const newBoard = new Board(
    newBoardId,
    newBoardTitle,
    board.onDuplicate,
    onDeleteBoard
  );

  const boardContainer = newBoard.getBoardView();
  boardsContainer.appendChild(boardContainer);
  boards.push(newBoard);
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

function handleNewBoardInputKeypress(e) {
  if (e.key === "Enter") {
    onAddBoard(e.target.value);
    e.target.value = "";
  }
}

const boardPessoal = new Board(1, "Title", onDuplicateBoard, onDeleteBoard);
boardPessoal.createTask("tarefa 1");
boardPessoal.createTask("tarefa 2");
boardPessoal.createTask("tarefa 3", true);
boardPessoal.createTask("tarefa 4");
boardPessoal.createTask("tarefa 5", true);

let boards = [boardPessoal];

function renderizarBoards(boards) {
  const boardsContainer = document.querySelector(".boards");

  boards.forEach((board) => {
    const boardContainer = board.getBoardView();

    boardsContainer.appendChild(boardContainer);
  });
}
renderizarBoards(boards);

const newBoardInput = document.querySelector(".new-board-input");
newBoardInput.addEventListener("keypress", handleNewBoardInputKeypress);
