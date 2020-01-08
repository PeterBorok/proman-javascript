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

        let boardsContainer = document.querySelector('.board-container');

        for (let board of boards) {
            let section = document.createElement('section');
            section.setAttribute('class', 'board');
            section.dataset.boardIdSet = `${board.id}`;
            let boardHeader = document.createElement('div');
            boardHeader.setAttribute('class', 'board-header');
            let spanHeader = document.createElement('span');
            spanHeader.innerHTML = `${board.title}`;
            spanHeader.setAttribute('class', 'board-title');
            let addButton = document.createElement('button');
            addButton.setAttribute('class', 'board-add');
            addButton.innerHTML = 'Add Card';
            let toggleButton = document.createElement('button');
            toggleButton.setAttribute('class', 'board-toggle');
            let iTag = document.createElement('i');
            iTag.setAttribute('class', 'fas fa-trash-alt');

            toggleButton.appendChild(iTag);
            boardHeader.appendChild(spanHeader);
            boardHeader.appendChild(addButton);
            boardHeader.appendChild(toggleButton);
            section.appendChild(boardHeader);
            boardsContainer.appendChild(section);
        }
    },

    loadStatuses: function () {
        dataHandler.getStatuses(function (statuses) {
            dom.showStatuses(statuses)
        });
    },

    showStatuses: function (statuses, boardId) {
        let section = document.querySelectorAll("section");
        for (let board of section) {
            if (board.dataset.boardIdSet == boardId) {
                for(let status of statuses) {
                    let boardColumns = document.createElement('div');
                    boardColumns.setAttribute('class', 'board-columns');
                    let boardColumn = document.createElement('div');
                    boardColumn.setAttribute('class', 'board-column');
                    let spanHeader = document.createElement('span');
                    spanHeader.innerHTML = `${status.title}`;
                    spanHeader.setAttribute('class', 'board-title');
                    let boardColumnContent = document.createElement('div');
                    boardColumnContent.setAttribute('class', 'board-column-content');

                    boardColumn.appendChild(spanHeader);
                    boardColumn.appendChild(boardColumnContent);
                    boardColumns.appendChild(boardColumn);

                    section.appendChild(boardColumns);
                }
            }
        }
    },

    loadCards: function () {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(function (cards) {
            dom.showCards(cards);
        })
    },
    showCards: function (boards, statuses, cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let boardsContainer = document.querySelector('.board-container');

        for (let board of boards) {
            for (let status of statuses) {
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
                    card.appendChild(trash);
                    card.appendChild(cardTitle);
                }
            }
        }
        // here comes more features
    },
};
