DROP TABLE IF EXISTS ad_tags;
DROP TABLE IF EXISTS ad;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS tags;

CREATE TABLE IF NOT EXISTS categories 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS tags
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR(50) NOT NULL
);

CREATE TABLE ad 
(
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	owner VARCHAR(100) NOT NULL,
	price INT DEFAULT 0,
    picture VARCHAR(100),
    location VARCHAR(100),
	createdAt DATE DEFAULT CURRENT_TIMESTAMP,
	category_id INTEGER NOT NULL DEFAULT 3,
	FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE ad_tags 
(
    ad_id INTEGER,
    tag_id INTEGER,
    FOREIGN KEY (ad_id) REFERENCES ad(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id),
    PRIMARY KEY (ad_id, tag_id)
);

DELETE FROM ad;
DELETE FROM sqlite_sequence WHERE name='ad';
DELETE FROM categories;
DELETE FROM sqlite_sequence WHERE name='categories';
DELETE FROM tags;
DELETE FROM sqlite_sequence WHERE name='tags';



INSERT INTO categories (id, name) values 
(1, 'vêtement'),
(2, 'voiture'),
(3, 'autre');

INSERT INTO tags (name) VALUES
('urgent'),
('nouveau'),
('occasion'),
('réduction'),
('remise'),
('unique'),
('promo'),
('livraison gratuite'),
('limité'),
('vendu'),
('en stock'),
('exclusif'),
('édition limitée'),
('très demandé'),
('bon état');

INSERT INTO ad_tags (ad_id, tag_id) VALUES
-- robe de soirée
(1, 1),
(1, 3),
-- chemise en soie
(2, 1),
(2, 2),
-- chaussures de randonnée
(3, 1),
(3, 3),
-- voiture de collection
(4, 2),
(4, 4);


INSERT INTO ad (title, description, owner, price, location, createdAt, category_id) VALUES 
('robe de soirée', 'portée une seule fois, en excellent état', 'marie', 100, 'Paris', DATE('now'), 1),
('chemise en soie', 'neuve, jamais portée, taille 40', 'pierre', 50, 'Lyon', DATE('now'), 1),
('chaussures de randonnée', 'peu portées, taille 42', 'julie', 30, 'Marseille', DATE('now'), 1),
('voiture de collection', 'année 1965, en parfait état, 4 places', 'michel', 25000, 'Toulouse', DATE('now'), 2),
('citadine électrique', 'neuve, zéro émission, 2 places', 'laura', 15000, 'Nantes', DATE('now'), 2),
('monospace familial', '7 places, climatisation, GPS, année 2018', 'françois', 20000, 'Strasbourg', DATE('now'), 2),
('bureau en bois massif', 'style Louis XV, en parfait état', 'sophie', 500, 'Lille', DATE('now'), 3),
('appareil photo numérique', 'marque Canon, 20 méga-pixels, peu utilisé', 'thomas', 100, 'Rennes', DATE('now'), 3),
('guitare électrique', 'marque Gibson, année 1990, en parfait état', 'emilie', 500, 'Grenoble', DATE('now'), 3),
('console de jeux vidéo', 'Nintendo Switch, peu utilisée', 'lucas', 200, 'Bordeaux', DATE('now'), 3),
('machine à coudre', 'marque Singer, peu utilisée, en parfait état', 'claire', 80, 'Montpellier', DATE('now'), 3),
('télévision 4K', 'marque Samsung, 55 pouces, peu utilisée', 'olivier', 400, 'Nice', DATE('now'), 3),
('ordinateur portable', 'marque Apple MacBook Pro, 16 pouces, peu utilisé', 'charlotte', 1500, 'Tours', DATE('now'), 3),
('smartphone', 'marque Samsung Galaxy S21, peu utilisé, en parfait état', 'adrien', 300, 'Dijon', DATE('now'), 3),
('trottinette électrique', 'marque Xiaomi Mi Scooter Pro 2, peu utilisée', 'léa', 200, 'Caen', DATE('now'), 3),
('vélo de course', 'marque Specialized Tarmac, taille 56, peu utilisé', 'maxime', 1000, 'Brest', DATE('now'), 3),
('canapé convertible', 'marque Ikea, 2 places, peu utilisé', 'camille', 150, 'Limoges', DATE('now'), 3),
('réfrigérateur', 'marque Bosch, peu utilisé, en parfait état', 'benjamin', 200, 'Amiens', DATE('now'), 3),
('lave-linge', 'marque Whirlpool, peu utilisé, en parfait état', 'marie', 150, 'Perpignan', DATE('now'), 3),
('micro-ondes', 'marque Samsung, peu utilisé, en parfait état', 'pierre', 50, 'Clermont-Ferrand', DATE('now'), 3);