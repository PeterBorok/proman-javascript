--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6

DROP TABLE IF EXISTS boards;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS statuses;


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


ALTER TABLE ONLY boards
    ADD CONSTRAINT fk_card_id FOREIGN KEY (id) REFERENCES cards (board_id);

ALTER TABLE ONLY statuses
    ADD CONSTRAINT fk_status_id FOREIGN KEY (id) REFERENCES cards (status_id);


INSERT INTO boards
VALUES (1, 'Board 1');
INSERT INTO boards
VALUES (2, 'Board 2');

INSERT INTO cards
VALUES (1, 1, 'new card 1', 0, 0);
INSERT INTO cards
VALUES (2, 1, 'new card 2', 0, 1);
INSERT INTO cards
VALUES (3, 1, 'in progress card', 1, 0);
INSERT INTO cards
VALUES (4, 1, 'planning', 2, 0);
INSERT INTO cards
VALUES (5, 1, 'done card 1', 3, 0);
INSERT INTO cards
VALUES (6, 1, 'done card 1', 3, 1);
INSERT INTO cards
VALUES (7, 2, 'new card 1', 0, 0);
INSERT INTO cards
VALUES (8, 2, 'new card 2', 0, 1);
INSERT INTO cards
VALUES (9, 2, 'in progress card', 1, 0);
INSERT INTO cards
VALUES (10, 2, 'planning', 2, 0);
INSERT INTO cards
VALUES (11, 2, 'done card 1', 3, 0);
INSERT INTO cards
VALUES (12, 2, 'done card 1', 3, 1);

INSERT INTO statuses
VALUES (0, 'new');
INSERT INTO statuses
VALUES (1, 'in progress');
INSERT INTO statuses
VALUES (2, 'testing');
INSERT INTO statuses
VALUES (3, 'done');

