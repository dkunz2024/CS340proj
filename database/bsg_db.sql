-- Denton Kunz & Garrett Berliner, Group 15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;



DROP TABLE IF EXISTS customers;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE customers(
    id INT(11) AUTO_INCREMENT NOT NULL,
    customer_name varchar(30) NOT NULL,
    total_dropoff INT NOT NULL,
    total_recycle INT,
    PRIMARY KEY(id),
    UNIQUE KEY id (id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


LOCK TABLES customers WRITE;
/*!40000 ALTER TABLE customers DISABLE KEYS */;
INSERT INTO customers VALUES (1, 'UHDS', 1234567, 123456), (2, 'Barnes & Nobles', 8989, 8900), (3, 'Starbucks', 987654, 98765), (4, 'Nintendo', 5, 0);
/*!40000 ALTER TABLE customers ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS drop_off_orders;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE drop_off_orders(
    id INT(11) NOT NULL,
    dropoff_id INT AUTO_INCREMENT NOT NULL,
    weight INT NOT NULL,
    recyclable_weight INT NOT NULL,
    PRIMARY KEY(dropoff_id),
    UNIQUE KEY dropoff_id(dropoff_id),
    FOREIGN KEY (id) REFERENCES customers (id)
) ENGINE=InnoDB AUTO_INCREMENT=1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES drop_off_orders WRITE;
/*!40000 ALTER TABLE drop_off_orders DISABLE KEYS */;
INSERT INTO drop_off_orders VALUES (0, 1, 4000, 3000), (1, 2, 1230567, 120456), (2, 3, 4000, 4000), (2, 4, 4989, 4900), (3, 5, 987654, 98765), (4, 6, 5, 0);
/*!40000 ALTER TABLE drop_off_orders ENABLE KEYS */;
UNLOCK TABLES;



DROP TABLE IF EXISTS sales_orders;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE sales_orders(
    id INT(11) NOT NULL,
    order_id INT AUTO_INCREMENT NOT NULL,
    weight INT NOT NULL,
    material varchar(255) NOT NULL,
    PRIMARY KEY(order_id),
    UNIQUE KEY order_id(order_id),
    FOREIGN KEY (id) REFERENCES customers (id)

) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES sales_orders WRITE;
/*!40000 ALTER TABLE sales_orders DISABLE KEYS */;
INSERT INTO sales_orders VALUES (1, 1, 100000, 'paper'), (1, 2, 2000, 'cardboard'), (3, 3, 234567, 'paper'), (4, 4, 50000, 'copper'), (4, 5, 50150, 'cardboard');
/*!40000 ALTER TABLE sales_orders ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS waste_location;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE waste_location(
    location_id INT AUTO_INCREMENT NOT NULL,
    location_name varchar(255) NOT NULL,
    cost INT NOT NULL,
    PRIMARY KEY(location_id),
    UNIQUE KEY location_id(location_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES waste_location WRITE;
/*!40000 ALTER TABLE waste_location DISABLE KEYS */;
INSERT INTO waste_location VALUES (1, 'Big Bulky Bens', 700), (2, 'Wittle Waste Wallys', 700);
/*!40000 ALTER TABLE waste_location ENABLE KEYS */;
UNLOCK TABLES;

DROP TABLE IF EXISTS waste_orders;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE waste_orders(
    waste_id INT AUTO_INCREMENT NOT NULL ,
    dropoff_id2 INT NOT NULL,
    weight INT NOT NULL,
    location_id2 INT NOT NULL,
    PRIMARY KEY(waste_id),
    UNIQUE KEY waste_id(waste_id),
    FOREIGN KEY (dropoff_id2) REFERENCES drop_off_orders(dropoff_id),
    FOREIGN KEY (location_id2) REFERENCES waste_location(location_id)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES waste_orders WRITE;
/*!40000 ALTER TABLE waste_orders DISABLE KEYS */;
INSERT INTO waste_orders VALUES (1, 1, 1000, 1), (2, 2, 1110000, 1), (3, 2, 111, 2), (4, 4, 89, 2), (5, 5, 888889, 1), (6, 6, 5, 2);
/*!40000 ALTER TABLE waste_orders ENABLE KEYS */;
UNLOCK TABLES;

--Test table making
DESCRIBE customers; 
DESCRIBE drop_off_orders; 
DESCRIBE sales_orders; 
DESCRIBE waste_orders; 
DESCRIBE waste_location; 

--Inserting Temporary Data
-- INSERT INTO customers(id, customer_name, total_dropoff, total_recycle) VALUES (1, 'UHDS', 1234567, 123456), (2, 'Barnes & Nobles', 8989, 8900), (3, 'Starbucks', 987654, 98765), (4, 'Nintendo', 5, 0);
-- INSERT INTO drop_off_orders(id, drop_off_id, weight, recyclable_weight) VALUES (1, 1, 4000, 3000), (1, 2, 1230567, 120456), (2, 3, 4000, 4000), (2, 4, 4989, 4900), (3, 5, 987654, 98765), (4, 6, 5, 0);
-- INSERT INTO sales_orders(id, order_id, weight, material) VALUES (1, 1, 100000, 'paper'), (1, 2, 2000, 'cardboard'), (3, 3, 234567, 'paper'), (4, 4, 50000, 'copper'), (4, 5, 50150, 'cardboard');
-- INSERT INTO waste_orders(waste_id, drop_off_id, weight, location_id) VALUES (1, 1, 1000, 1), (2, 2, 1110000, 1), (3, 2, 111, 2), (4, 4, 89, 2), (5, 5, 888889, 1), (6, 6, 5, 2);
-- INSERT INTO waste_location(location_id, location_name, cost) VALUES (1, 'Big Bulky Bens', 700), (2, 'Wittle Waste Wallys', 700);