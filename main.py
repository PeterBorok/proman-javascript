from flask import Flask, render_template, url_for
from util import json_response

import data_handler

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    boards = data_handler.get_boards()
    return render_template('index.html', boards=boards)


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-cards/<int:board_id>/<int:status_id>")
@json_response
def get_cards_for_board(board_id: int, status_id: int):
    """
    All cards that belongs to a board
    :param status_id: id of the statuses board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards(board_id, status_id)


@app.route("/get-statuses")
@json_response
def get_statuses():
    return data_handler.get_statuses()


@app.route("/create-new-board")
@json_response
def create_new_board():
    data_handler.create_new_board()
    return data_handler.get_boards()

@app.route("/delete-board/<int:board_id>")
@json_response
def delete_board(board_id: int):
    data_handler.delete_board(board_id)

    return data_handler.get_boards()


@app.route("/create-new-card/<int:board_id>/<int:status_id>")
@json_response
def create_new_card(board_id: int, status_id: int):
    data_handler.create_new_card(board_id, status_id)
    return data_handler.get_cards(board_id, status_id)

@app.route("/delete-card/<int:card_id>")
@json_response
def delete_card(card_id: int):
    data_handler.delete_card(card_id)

    return data_handler.get_cards()


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
