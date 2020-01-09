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
            <section class="board">
                <div class="board-header"><span class="board-title">${board.title}</span>
                    <button class="board-add">Add Card</button>
                    <button class="board-toggle" data-number="${board.id}"><i class="fas fa-chevron-down"></i></button>
                </div>
                <div class="board-columns" data-number="${board.id}">
                    <div class="board-column">
                        <div class="board-column-title">New</div>
                        <div class="board-column-content column-0${board.id}" ></div>
                    </div>
                    <div class="board-column">
                        <div class="board-column-title">In Progress</div>
                        <div class="board-column-content column-1${board.id} "></div>
                    </div>
                    <div class="board-column">
                        <div class="board-column-title">Testing</div>
                        <div class="board-column-content column-2${board.id} "></div>
                    </div>
                    <div class="board-column">
                        <div class="board-column-title">Done</div>
                        <div class="board-column-content column-3${board.id} "></div>
                    </div>
                </div>
            </section>`;

            dom.loadCards(board.id);
        }
        const outerHtml = `
            <ul class="board-container">
                ${boardList}
            </ul>`;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
    },

    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(boardId, function (cards) {
            dom.showCards(boardId, cards);
        })
    },
    showCards: function (boardId, cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let numOfBoardColumns = document.querySelectorAll('.board-column');

        for (let i = 1; i <= numOfBoardColumns.length; i++) {
            for (let item of cards) {
                let card = document.createElement('div');
                card.setAttribute('class', 'card');
                let cardRemove = document.createElement('div');
                cardRemove.setAttribute('class', 'card-remove');
                let trash = document.createElement('i');
                trash.setAttribute('class', "fas fa-trash-alt");
                let cardTitle = document.createElement('div');
                cardTitle.setAttribute('class', 'card-title');
                cardTitle.innerHTML = `${item.title}`;

                card.appendChild(cardRemove);
                cardRemove.appendChild(trash);
                card.appendChild(cardTitle);
            }
        }
        let boardColumns = document.querySelector('.board-column');
        boardColumns.appendChild(card);

    },
};
