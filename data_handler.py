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
                    WHERE board_id=$(board_id)s;
    """,
                   {"board_id": board_id})
    cards = cursor.fetchall()
    return cards


@connection.connection_handler
def get_one_card(cursor, card_id):
    cursor.execute("""
                SELECT * FROM cards
                WHERE id=$(card_id)s;
    """,
                   {"card_id": card_id})
    card = cursor.fetchone()
    return card


@connection.connection_handler
def change_status(cursor, card_id, status_id):
    cursor.execute("""
                UPDATE cards
                SET status_id=$(status_id)s
                WHERE id=$(card_id)s;
    """,
                   {"card_id": card_id, "status_id": status_id})

