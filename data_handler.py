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
    # cursor.execute("""
    #                 INSERT INTO boards
    #                 (id, title)
    #                 VALUES (%(board_id)s, %(board_title)s)
    # """,
    #                {'id': board_id, 'title': board_title})
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
def create_new_card(cursor, board_id, card_id, card_title, status_id):
    cursor.execute("""
                    INSERT INTO cards
                    (id, board_id, title, status_id)
                    VALUES (%(card_id)s, %(board_id)s, %(card_title)s, %(status_id)s) 
    """,
                   {'id': card_id, 'board_id': board_id, 'title': card_title, 'status_id': status_id})


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
