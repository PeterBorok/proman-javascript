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
def get_cards(cursor, board_id, status_id):
    cursor.execute("""
                    SELECT * FROM cards
                    WHERE board_id=%(board_id)s AND status_id=%(status_id)s;
    """,
                   {"board_id": board_id, "status_id": status_id})
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
def create_new_board(cursor):
    cursor.execute('''
                        SELECT MAX(id) from boards
                        ''')
    seq = cursor.fetchone()
    seq = seq['max'] + 1

    cursor.execute('''
                        INSERT INTO boards (title) VALUES (%(seq)s)
                        ''',
                   {'seq': seq})


@connection.connection_handler
def create_new_card(cursor, board_id, status_id):
    cursor.execute("""
                        INSERT INTO cards (board_id, title, status_id, orderd)
                        VALUES (%(board_id)s, 'New Card', %(status_id)s, 0)
    """,
                   {'board_id': board_id, 'status_id': status_id})


@connection.connection_handler
def get_statuses(cursor):
    cursor.execute("""
                        SELECT * from statuses 
        """)
    statuses = cursor.fetchall()
    return statuses


@connection.connection_handler
def delete_board(cursor, board_id):
    cursor.execute('''
                        DELETE FROM  boards
                        WHERE id = %(board_id)s;
                        ''',
                   {'board_id': board_id})

@connection.connection_handler
def delete_card(cursor, card_id):
    cursor.execute('''
                        DELETE FROM cards
                        WHERE id = %(card_id)s;
                        ''',
                   {'card_id': card_id})
