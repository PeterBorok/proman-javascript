--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6


DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS statuses CASCADE;


CREATE TABLE boards
(
    id    SERIAL PRIMARY KEY NOT NULL,
    title text
);


CREATE TABLE cards
(
    id        SERIAL PRIMARY KEY NOT NULL,
    board_id  int                NOT NULL,
    title     text,
    status_id int                NOT NULL,
    orderd    int
);


CREATE TABLE statuses
(
    id    SERIAL PRIMARY KEY NOT NULL,
    title text
);


alter table cards
	add constraint fk_status_id
		foreign key (status_id) references statuses (id);

alter table cards
	add constraint fk_board_id
		foreign key (board_id) references boards (id);


INSERT INTO boards
VALUES (1, 'Board 1');
INSERT INTO boards
VALUES (2, 'Board 2');
SELECT pg_catalog.setval('boards_id_seq', 2, true);

INSERT INTO statuses
VALUES (0, 'new');
INSERT INTO statuses
VALUES (1, 'in progress');
INSERT INTO statuses
VALUES (2, 'testing');
INSERT INTO statuses
VALUES (3, 'done');

INSERT INTO cards
VALUES (1, 1, 'new card 1', 0, 0);
INSERT INTO cards
VALUES (2, 2, 'new card 2', 0, 1);
INSERT INTO cards
VALUES (3, 1, 'in progress card', 1, 0);
SELECT pg_catalog.setval('cards_id_seq', 3, true);


