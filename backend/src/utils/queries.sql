
CREATE TABLE IF NOT EXISTS ad (

	id INTEGER PRIMARY KEY AUTOINCREMENT,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	owner VARCHAR(100) NOT NULL,
	price INT,
    picture VARCHAR(100),
    location VARCHAR(100),
	createdAt DATE

);

DELETE FROM ad;

DELETE FROM sqlite_sequence WHERE name='ad';

INSERT INTO ad (title, description, owner, price, picture, location, createdAt) VALUES
('Robe de soirée', 'Robe de soirée noire en dentelle, taille 38, portée une seule fois.', 'Sophie', 100, 'robe-soiree.jpg', 'Bordeaux', '2023-03-14'),
('Appartement T3 à Paris', 'Appartement de 60m² avec 2 chambres, situé dans le quartier du Marais à Paris.', 'Marie', 1500, 'appart-paris.jpg', 'Paris', '2023-03-13'),
('Bureau en bois massif', 'Bureau en chêne massif, avec 2 tiroirs, en très bon état.', 'Pierre', 200, 'bureau-bois.jpg', 'Lyon', '2023-03-12'),
('T2 avec terrasse à Bordeaux', 'Appartement T2 de 40m² avec terrasse de 10m², situé dans le quartier des Chartrons à Bordeaux.', 'Sophie', 700, 't2-bordeaux.jpg', 'Bordeaux', '2023-03-11'),
('Pantalon en cuir', 'Pantalon en cuir noir, taille 40, en très bon état.', 'Antoine', 150, 'pantalon-cuir.jpg', 'Paris', '2023-03-10'),
('Maison avec jardin à Lyon', 'Maison de 120m² avec 4 chambres et jardin de 200m², située dans le quartier de Gerland à Lyon.', 'Émilie', 1200, 'maison-jardin-lyon.jpg', 'Lyon', '2023-03-09'),
('Canapé convertible', 'Canapé convertible en tissu gris, avec matelas et sommier, en très bon état.', 'Lucas', 300, 'canape-convertible.jpg', 'Bordeaux', '2023-03-08'),
('Appartement haussmannien à Paris', 'Appartement de 100m² avec 3 chambres, situé dans un immeuble haussmannien du 8ème arrondissement de Paris.', 'Julie', 3000, 'haussmannien-paris.jpg', 'Paris', '2023-03-07'),
('Table basse en verre', 'Table basse en verre et métal, avec 2 étagères, en très bon état.', 'Maxime', 100, 'table-basse-verre.jpg', 'Lyon', '2023-09-01'),
('T3 avec balcon à Bordeaux', 'Appartement T3 de 60m² avec balcon de 5m², situé dans le quartier de Caudéran à Bordeaux.', 'Léa', 900, 't3-balcon-bordeaux.jpg', 'Bordeaux', '2023-03-05'),
('Veste en jean', 'Veste en jean bleu, taille 42, en très bon état.', 'Thomas', 50, 'veste-jean.jpg', 'Paris', '2023-03-04'),
('Maison de campagne à Lyon', 'Maison de campagne de 200m² avec 5 chambres, située à 30 minutes de Lyon.', 'Clara', 1500, 'maison-campagne-lyon.jpg', 'Lyon', '2023-03-03'),
('Chaussures de sport', 'Chaussures de sport pour homme, taille 44, en très bon état.', 'Hugo', 30, 'chaussures-sport.jpg', 'Bordeaux', '2023-03-02'),
('Appartement avec vue sur la Tour Eiffel à Paris', 'Appartement de 70m² avec 2 chambres et vue sur la Tour Eiffel, situé dans le 16ème arrondissement de Paris.', 'Charlotte', 2500, 'vue-tour-eiffel-paris.jpg', 'Paris', '2023-03-01'),
('Lampe de bureau', 'Lampe de bureau LED', 'Arthur', 20, 'lampe-bureau.jpg', 'Lyon', '2023-02-28');