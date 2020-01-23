// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
        dom.loadedPage();
        dom.loadBoards();
        dom.createBoard();


    },

    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
            dom.toggleButtons();
            dom.deleteBoard();
            dom.createNewCard();
        });
    },

    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let boardList = '';

        for (let board of boards) {

            boardList += `
            <section class="board-${board.id} board">
                <div class="board-header"><span class="board-title" contenteditable="true">${board.title}</span>
                    <button class="board-add" data-number="${board.id}">Add Card</button>
                    <button class="deleteBoard">Delete board <i class="fas fa-trash-alt"></i></button>
                    <button class="board-toggle" data-number="${board.id}"><i class="fas fa-chevron-down"></i></button>
                </div>
            </section>`;
            dom.loadStatuses(board.id);
        }
        const outerHtml = `
            <ul class="board-container">
                ${boardList}
            </ul>`;
        let boardAll = document.createElement('div');
        boardAll.setAttribute('class', 'board-tables');
        let x = document.getElementsByTagName('body');
        x[0].appendChild(boardAll);
        let boardsContainer = document.querySelector('.board-tables');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
    },

    clearBoard: function () {
        document.querySelector(".board-tables").innerHTML = "";
    },

    clearBoardById: function () {
        this.closest('.board').innerHTML = "";
    },

    createBoard: function () {
        let addNewBoard = document.querySelector("#create-board");
        addNewBoard.addEventListener("click", function (e) {
            if (e.detail === 1) {
                dataHandler.createNewBoard(function () {
                    dom.clearBoard();
                    dom.loadBoards();
                })
            }
        })

    },

    loadStatuses: function (boardId) {
        dataHandler.getStatuses(function (statuses) {
            dom.showStatuses(statuses, boardId);
        });
    },

    showStatuses: function (statuses, boardId) {
        let htmlStatusesString = '';
        let boardColumns = document.createElement('div');
        boardColumns.setAttribute('class', 'board-columns');
        const section = document.querySelector(`.board-${boardId}`);
        section.appendChild(boardColumns);

        for (let status of statuses) {
            htmlStatusesString = `<div class="board-column board-column-${status.id}-${boardId}">` +
                `<div class="board-column-${status.id} board-column-title">${status.title}</div>` +
                `<div class="board-column-${status.id} board-column-content"></div>` +
                `</div>`;
            let element = document.createElement('div');
            element.insertAdjacentHTML('beforeend', htmlStatusesString);
            boardColumns.insertAdjacentHTML('beforeend', htmlStatusesString);
            dom.loadCards(boardId, status.id);
        }

    },

    loadCards: function (boardId, statusId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, statusId, function (cards) {
            dom.showCards(boardId, statusId, cards);
        })
    },
    showCards: function (boardId, statusId, cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let htmlCardsString = '';

        let boardColumn = document.querySelector(`.board-column-${statusId}-${boardId}`);
        let boardColumnContents = boardColumn.querySelector(".board-column-content");
        for (let card of cards) {
            if (boardId == card.board_id && statusId == card.status_id) {
                htmlCardsString = `<div class="card" data-number="${card.id}"><div class="card-remove"><i class="fas fa-trash-alt"></i></div>` +
                    `<div class="card-title">${card.title}</div></div>`;
                boardColumnContents.insertAdjacentHTML('beforeend', htmlCardsString);
            }
        }
    },

    toggleButtons: function () {
        let boards = document.querySelectorAll('.board-toggle');
        for (let button of boards) {
            button.addEventListener('click', function () {
                    const content = button.parentElement.parentElement.querySelector('.board-columns');
                    content.classList.toggle('hidden');
                }
            )
        }
    },

    loadedPage: function () {
        window.addEventListener('load', function () {
            let loading = document.querySelector('#boards');
            loading.classList.toggle('hidden');
        })
    },

    clearCards: function (boardId, statusId) {
        let boardColumn = document.querySelector(`.board-column-${statusId}-${boardId}`);
        boardColumn.querySelector(".board-column-content").innerHTML = "";

    },

    createNewCard: function () {
        let addNewCardButtons = document.querySelectorAll('.board-add');
        for (let newCardButton of addNewCardButtons) {
            newCardButton.addEventListener("click", function (e) {
                if (e.detail === 1) {
                    let boardId = newCardButton.dataset.number;
                    let statusId = 2;
                    dataHandler.createNewCard(boardId, statusId, function () {
                        dom.clearCards(boardId, statusId);
                        dom.loadCards(boardId, statusId);
                    })
                }
            })
        }
    },
    deleteBoard: function () {
        let deleteBoards = document.querySelectorAll('.deleteBoard');
        for (let deleteBoard of deleteBoards) {
            deleteBoard.addEventListener('click', function (event) {
                let boardId = parseInt(this.parentElement.querySelector('.board-toggle').dataset.number);
                let board = this.closest('.board');
                board.remove();
                dataHandler.deleteBoard(boardId, function () {
                    dom.clearBoardById();
                    dom.loadBoards();
                });
            })
        }

    }
};
