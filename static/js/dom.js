// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardsContainer = document.querySelector('.board-container');

        for(let board of boards){
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
            dom.loadStatus(statuses)
        })
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
