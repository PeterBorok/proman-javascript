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
                <div class="board-header"><span class="board-title">${board.title}</span>
                    <button class="board-add">Add Card</button>
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

    createBoard: function () {
        let addNewBoard = document.querySelector("#create-board");
        addNewBoard.addEventListener("click", function (e) {

            if (e.detail === 1) {
                dataHandler.createNewBoard(function (data) {
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
        let boardColumnContents = document.createElement('div');
        boardColumnContents.setAttribute('class', 'board-column-content');
        const boardColumns = document.querySelector(`.board-column-${statusId}-${boardId}`);
        boardColumns.appendChild(boardColumnContents);
        dom.changeCardStatus();


        for (let card of cards) {
            if (boardId === card.board_id && statusId === card.status_id) {
                htmlCardsString = `<div class="card"><div class="card-remove"><i class="fas fa-trash-alt"></i></div>` +
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

    createNewCard: function () {
        let addNewCardButtons = document.querySelectorAll('.board-add');
        for (let addNewCardButton of addNewCardButtons) {
            addNewCardButton.addEventListener('click', function () {
                const boardId = addNewCardButton.nextElementSibling.dataset.number;
                dataHandler.createNewCard(boardId, (data) => {

                });
            })
        }
    },

     changeCardStatus: function() {
        const cards = document.querySelectorAll('.card');
        console.log(cards)
        const columns = document.querySelectorAll('.board-column');
        for (let card of cards) {
            card.setAttribute('draggable', 'true');
            card.setAttribute('ondragstart', 'dragStartHandler(event)')
        }
        for (let column of columns) {
            column.setAttribute('ondrop', 'dropHandler(event)');
            column.setAttribute('ondragover', 'dragOver(event)');
        }
     },

    ondragstart: function dragStartHandler(event) {

    }
};
