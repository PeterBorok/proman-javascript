import connection
from psycopg2 import sql
import bcrypt


@connection.connection_handler
def get_boards(cursor):
    cursor.execute("""
                    SELECT * FROM boards
    """)
    boards = cursor.fetchall()
    return boards


@connection.connection_handler
def get_cards(cursor, board_id):
    cursor.execute("""
                    SELECT * FROM cards
                    WHERE board_id=%(board_id)s;
    """,
                   {"board_id": board_id})
    cards = cursor.fetchall()
    return cards


@connection.connection_handler
def get_one_card(cursor, card_id):
    cursor.execute("""
                SELECT * FROM cards
                WHERE id=%(card_id)s;
    """,
                   {"card_id": card_id})
    card = cursor.fetchone()
    return card


@connection.connection_handler
def change_status(cursor, card_id, status_id):
    cursor.execute("""
                UPDATE cards
                SET status_id=%(status_id)s
                WHERE id=%(card_id)s;
    """,
                   {"card_id": card_id, "status_id": status_id})


@connection.connection_handler
def add_new_board(cursor, board_id, board_title):
    cursor.execute("""
                    INSERT INTO boards
                    (id, title)
                    VALUES (%(board_id)s, %(board_title)s)
    """,
                   {'id': board_id, 'title': board_title})


@connection.connection_handler
def add_new_card(cursor, board_id, card_id, card_title, status_id):
    cursor.execute("""
                    INSERT INTO cards
                    (id, board_id, title, status_id)
                    VALUES (%(card_id)s, %(board_id)s, %(card_title)s, %(status_id)s) 
    """,
                   {'id': card_id, 'board_id': board_id, 'title': card_title, 'status_id': status_id})