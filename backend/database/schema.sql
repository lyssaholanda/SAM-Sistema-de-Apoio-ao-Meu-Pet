-- SAM - Sistema de Apoio ao Meu Pet


CREATE TABLE owner (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash CHAR(60) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pet (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    owner_id INT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    species ENUM("Dog", "Cat", "Bird", "Rabbit", "Rodent", "Other") NOT NULL,
    breed VARCHAR(255),
    birth_date DATE,
    weight DECIMAL(5,2),
    photo_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM("Active", "Deceased", "Archived") DEFAULT "Active",
    CONSTRAINT fk_pet_owner FOREIGN KEY (owner_id) REFERENCES owner(id) on DELETE CASCADE
);


CREATE TABLE vaccine (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pet_id INT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    application_date DATE NOT NULL,
    next_dose_date DATE,
    vet_clinic VARCHAR(255),
    notes VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vaccine_pet FOREIGN KEY (pet_id) REFERENCES pet(id) on DELETE CASCADE
);

CREATE TABLE event_type (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE event (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pet_id INT UNSIGNED NOT NULL,
    event_type_id INT UNSIGNED NOT NULL,
    event_datetime DATETIME NOT NULL,
    description VARCHAR(255),
    reminder ENUM('On time', '1 hour before', '1 day before', '3 days before'),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_event_pet FOREIGN KEY (pet_id) REFERENCES pet(id) on DELETE CASCADE,
    CONSTRAINT fk_event_event_type FOREIGN KEY (event_type_id) REFERENCES event_type(id) on DELETE RESTRICT
);

CREATE TABLE memory (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pet_id INT UNSIGNED NOT NULL, 
    title VARCHAR(255) NOT NULL,
    description VARCHAR(500),
    memory_date DATE,
    photo_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_memory_pet_id FOREIGN KEY (pet_id) REFERENCES pet(id) on DELETE CASCADE
);

-- Seed data para os tipos de ventos iniciais

INSERT INTO event_type (name) VALUES
('Consultation'),
('Medication'),
('Vaccine'),
('Grooming'),
('Exam'),
('Other');