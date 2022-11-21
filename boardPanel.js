import Board from "./board.js";

export default class BoardPanel {
  constructor() {
    this.boards = [];
    this.nextBoardId = 1;
    this.container = document.querySelector(".boards");
  }

  duplicateBoard(board) {
    const boardsContainer = this.container;
    const newBoardId = board.id + 1;
    const newBoardTitle = `${board.title} Copy`;
    const newBoard = new Board(
      newBoardId,
      newBoardTitle,
      board.onDuplicate,
      board.onDelete
    );

    board.tasks.forEach((task) =>
      newBoard.createTask(task.name, task.completed)
    );

    const boardContainer = newBoard.getBoardView();
    boardsContainer.appendChild(boardContainer);
    this.boards.push(newBoard);
  }

  deleteBoard(boardId) {
    const filtered = [];
    let boardToDelete;
    this.boards.forEach((board) => {
      if (board.id !== boardId) {
        filtered.push(board);
      } else {
        boardToDelete = board;
      }
    });
    boardToDelete.removeFromDOM();
    this.boards = filtered;
  }

  createBoard(boardTitle) {
    const newBoard = new Board(
      this.nextBoardId,
      boardTitle,
      (board) => this.duplicateBoard(board),
      (boardId) => this.deleteBoard(boardId)
    );
    this.boards.push(newBoard);
    this.nextBoardId++;
    const boardsContainer = this.container;
    const boardContainer = newBoard.getBoardView();
    boardsContainer.appendChild(boardContainer);
  }
}
