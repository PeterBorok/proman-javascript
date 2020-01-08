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
            let boardHeader = document.createElement('div');
            boardHeader.setAttribute('class', 'board-header');
            let boardTitle = document.createElement('board-title');
            boardTitle.setAttribute('class', 'board-title');
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

    loadStatus: function () {
        dataHandler.getStatus(function (status) {
            dom.showStatuses(statuses)
        })
    }

    showStatuses: function (boards, statuses) {
        let boardsContainer = document.querySelector('.board-container');

        for (let board of boards) {
            let boardIfExists = document.querySelector('.board');
            boardIfExists.setAttribute('class', 'board');
            for (let status of statuses) {
                let boardColumns = document.createElement('div');
                boardColumns.setAttribute('class', 'board-columns');
                let boardColumn = document.createElement('div');
                boardColumn.setAttribute('class', 'board-column');
                let boardColumnTitle = document.createElement('board-column-title');
                let spanHeader = document.createElement('span');
                spanHeader.innerHTML = `${status.title}`;
                spanHeader.setAttribute('class', 'board-title');
                boardColumnTitle.setAttribute('class', 'board-column-title');
                let boardColumnContent = document.createElement('div');
                boardColumnContent.setAttribute('class', 'board-column-content');

                boardColumn.appendChild(boardColumnTitle);
                boardColumn.appendChild(boardColumnContent);
                boardColumns.appendChild(boardColumn);
                boardIfExists.appendChild(boardColumns);
                boardsContainer.appendChild(boardIfExists);

            }
        }
    }

    loadCards: function () {
        // retrieves cards and makes showCards called
        dataHandler.getCardsByBoardId(function (cards) {
            dom.showCards(cards);
        })
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let boardsContainer = document.querySelector('.board-container');

        for (let card in b)
            let section = document.querySelector('.board');

    },
    // here comes more features
};
