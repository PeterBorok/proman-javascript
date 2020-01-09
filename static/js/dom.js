// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },

    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
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

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
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
            console.log(htmlStatusesString);
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

        for (let card of cards) {
            if (boardId === card.board_id && statusId === card.status_id) {
                htmlCardsString = `<div class="card"><div class="card-remove"><i class="fas fa-trash-alt"></i></div>` +
                    `<div class="card-title">${card.title}</div></div>`;
                boardColumnContents.insertAdjacentHTML('beforeend', htmlCardsString);
            }
        }
    }


};
