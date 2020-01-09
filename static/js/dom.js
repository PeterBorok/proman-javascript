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
            </section>`;

            dom.loadStatuses();
        }
        const outerHtml = `
            <ul class="board-container">
                ${boardList}
            </ul>`;

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.insertAdjacentHTML("beforeend", outerHtml);
    },
    loadStatuses: function () {
        dataHandler.getStatuses(function (statuses) {
            dom.showStatuses(statuses);
        });
    },

    showStatuses: function (statuses) {
        let htmlStatusesString = '';

        for (let status of statuses) {
            htmlStatusesString = `<div class="board-columns" >` +
                `<div class="board-column-${status.id}">${status.title}</div>` +
                `</div>`;
            console.log(htmlStatusesString);
            let element = document.createElement('div');
            element.insertAdjacentHTML('beforeend', htmlStatusesString);
            const selectBoard = document.querySelector(".board");
            selectBoard.appendChild(element);

            // consdt column = document.querySelector(`.board-column-${status.id}`);
            // column.appendChild(element);
            // console.log(column);
        }

    }
    // loadCards: function (boardId) {
    //     // retrieves cards and makes showCards called
    //     dataHandler.getCardsByBoardId(boardId, function (cards) {
    //         dom.showCards(boardId, cards);
    //     })
    // },
    // showCards: function (boardId, cards) {
    //     // shows the cards of a board
    //     // it adds necessary event listeners also
    //     let numOfBoardColumns = document.querySelectorAll('.board-column');
    //     let cardList = "";
    //
    //     for (let i = 1; i <= numOfBoardColumns.length; i++) {
    //         for (let item of cards) {
    //             if (item.status_id == `${i}`) {
    //                 let card = document.createElement('div');
    //                 card.setAttribute('class', 'card');
    //                 let cardRemove = document.createElement('div');
    //                 cardRemove.setAttribute('class', 'card-remove');
    //                 let trash = document.createElement('i');
    //                 trash.setAttribute('class', "fas fa-trash-alt");
    //                 let cardTitle = document.createElement('div');
    //                 cardTitle.setAttribute('class', 'card-title');
    //                 cardTitle.innerHTML = `${item.title}`;
    //
    //                 card.appendChild(cardRemove);
    //                 cardRemove.appendChild(trash);
    //                 card.appendChild(cardTitle);
    //                 cardList += card;
    //                 document.querySelector(`.board-column-container-${item.status_id}${item.board_id}`).appendChild(cardList)
    //             }
    //         }
    //     }
    // }
};
