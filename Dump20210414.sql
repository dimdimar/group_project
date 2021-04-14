-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: ra1.anystream.eu    Database: foundain_express
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_id` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('2021-03-21 19:40:15','2021-03-21 19:40:15',1,'research'),('2021-03-21 19:40:16','2021-03-21 19:40:16',2,'innovation'),('2021-03-21 19:40:16','2021-03-21 19:40:16',3,'charity'),('2021-03-21 19:40:16','2021-03-21 19:40:16',4,'animal-friendly'),('2021-03-21 19:40:16','2021-03-21 19:40:16',5,'sports'),('2021-03-21 19:40:16','2021-03-21 19:40:16',6,'other');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorygroup`
--

DROP TABLE IF EXISTS `categorygroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorygroup` (
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `group_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`group_id`,`category_id`),
  KEY `charity_id_idx` (`group_id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `fk_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_group_id` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorygroup`
--

LOCK TABLES `categorygroup` WRITE;
/*!40000 ALTER TABLE `categorygroup` DISABLE KEYS */;
INSERT INTO `categorygroup` VALUES ('2021-04-12 12:28:48','2021-04-12 12:28:48',3,1);
/*!40000 ALTER TABLE `categorygroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `donation`
--

DROP TABLE IF EXISTS `donation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `donation` (
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `donation_id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `enabled` varchar(10) NOT NULL DEFAULT '"true"',
  PRIMARY KEY (`donation_id`),
  UNIQUE KEY `donation_id` (`donation_id`),
  KEY `fk_user_id_idx` (`user_id`),
  KEY `fk_charity_id_idx` (`group_id`),
  CONSTRAINT `fk_donation_group_id` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`),
  CONSTRAINT `fk_donation_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `donation`
--

LOCK TABLES `donation` WRITE;
/*!40000 ALTER TABLE `donation` DISABLE KEYS */;
INSERT INTO `donation` VALUES ('2021-04-03 09:24:10','2021-04-03 09:24:10',1,10,7,4,'\"true\"'),('2021-04-03 09:31:00','2021-04-03 09:31:00',2,6,7,4,'\"true\"'),('2021-04-03 09:33:02','2021-04-03 09:33:02',3,9,7,4,'\"true\"'),('2021-04-03 17:02:45','2021-04-03 17:02:45',4,100,7,4,'\"true\"'),('2021-04-03 17:05:35','2021-04-03 17:05:35',5,80,7,4,'\"true\"'),('2021-04-03 17:42:01','2021-04-03 17:42:01',6,86,9,4,'\"true\"'),('2021-04-04 16:57:35','2021-04-04 16:57:35',7,113,7,4,'\"true\"'),('2021-04-04 17:05:57','2021-04-04 17:05:57',8,65,7,4,'\"true\"'),('2021-04-04 17:09:35','2021-04-04 17:09:35',9,43,7,4,'\"true\"'),('2021-04-04 17:13:50','2021-04-04 17:13:50',10,25,7,4,'\"true\"'),('2021-04-11 13:00:09','2021-04-11 13:00:09',11,54,7,5,'\"true\"'),('2021-04-11 13:00:59','2021-04-11 13:00:59',12,99,7,5,'\"true\"'),('2021-04-11 14:06:29','2021-04-11 14:06:29',13,11,7,5,'\"true\"'),('2021-04-11 16:41:58','2021-04-11 16:41:58',14,45,7,4,'\"true\"'),('2021-04-11 16:57:49','2021-04-11 16:57:49',15,9,7,4,'\"true\"'),('2021-04-11 17:23:42','2021-04-11 17:23:42',16,54,7,4,'\"true\"'),('2021-04-11 17:42:09','2021-04-11 17:42:09',17,53,7,4,'\"true\"'),('2021-04-11 17:44:11','2021-04-11 17:44:11',18,88,7,4,'\"true\"'),('2021-04-11 18:08:28','2021-04-11 18:08:28',19,15,7,4,'\"true\"'),('2021-04-11 18:10:50','2021-04-11 18:10:50',20,43,7,4,'\"true\"'),('2021-04-11 18:54:45','2021-04-11 18:54:45',21,33,7,4,'\"true\"'),('2021-04-11 18:55:58','2021-04-11 18:55:58',22,55,7,3,'\"true\"'),('2021-04-11 19:04:37','2021-04-11 19:04:37',23,77,7,3,'\"true\"'),('2021-04-11 19:07:21','2021-04-11 19:07:21',24,88,7,4,'\"true\"'),('2021-04-11 19:50:53','2021-04-11 19:50:53',25,123,3,5,'\"true\"'),('2021-04-12 16:05:25','2021-04-12 16:05:25',26,54,7,3,'\"true\"'),('2021-04-12 16:06:17','2021-04-12 16:06:17',27,35,7,3,'\"true\"'),('2021-04-12 17:57:45','2021-04-12 17:57:45',28,123,3,3,'\"true\"'),('2021-04-12 18:28:11','2021-04-12 18:28:11',29,123,23,3,'\"true\"');
/*!40000 ALTER TABLE `donation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `follow_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`follow_id`),
  UNIQUE KEY `follow_id` (`follow_id`),
  KEY `fk_follow_user_id_idx` (`user_id`),
  KEY `fk_follow_charity_id_idx` (`group_id`),
  CONSTRAINT `fk_follow_charity_id` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`),
  CONSTRAINT `fk_follow_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
INSERT INTO `follow` VALUES ('2021-04-07 07:49:19','2021-04-07 07:49:19',4,6,3),('2021-04-08 10:46:09','2021-04-08 10:46:09',20,3,4),('2021-04-10 08:56:44','2021-04-10 08:56:44',27,3,3),('2021-04-12 18:25:30','2021-04-12 18:25:30',29,23,3),('2021-04-14 19:12:50','2021-04-14 19:12:50',32,7,5),('2021-04-14 19:12:50','2021-04-14 19:12:50',33,7,4),('2021-04-14 19:12:52','2021-04-14 19:12:52',34,7,3);
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `groups` (
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `group_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `followers` double DEFAULT NULL,
  `approved` varchar(255) DEFAULT NULL,
  `minDonations` double DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `targetFunds` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`group_id`),
  UNIQUE KEY `charity_id` (`group_id`),
  KEY `fk_user_group_idx` (`user_id`),
  FULLTEXT KEY `fts` (`title`),
  FULLTEXT KEY `fts1` (`description`),
  CONSTRAINT `fk_user_group` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES ('2021-04-01 05:56:17','2021-03-11 05:56:17',3,' Breast Cancern Research','Mit\'s Breast Cancern Research',1027,'true',5,'enabled',1,'27dd7df9f9a0912989149a44f7d02449',10000,3),('2021-04-03 09:18:05','2021-04-03 09:18:05',4,'Mars landing ','First human land on Mars',NULL,'true',5,'enabled',2,'9f866376ceb376eec73fe2e3cd6f7380',1000000,5),('2021-04-09 19:26:55','2021-04-09 19:26:55',5,'Moon\'s landing','moon\'s landing never happened.It\'s a scam.',NULL,NULL,10,NULL,NULL,NULL,5000,8);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `text` text,
  `image` varchar(100) DEFAULT NULL,
  `group_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`),
  KEY `user_post_fk_idx` (`user_id`),
  KEY `group_post_fk_idx` (`group_id`),
  CONSTRAINT `group_post_fk` FOREIGN KEY (`group_id`) REFERENCES `groups` (`group_id`),
  CONSTRAINT `user_post_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,3,'Αυτο ειναι το πρωτο Post που εχει εμφανιστει σε αυτην την σελιδα γι αυτο ειναι και το καλυτερο',NULL,3,'2021-04-08 10:54:52'),(2,3,'Κι αυτο ειναι το πρωτο post απο την μερια του site!',NULL,5,'2021-04-10 23:55:05'),(3,7,'Helloooooo',NULL,4,'2021-04-11 18:51:46'),(4,7,'yooooolo',NULL,5,'2021-04-11 19:09:09'),(5,7,'fgfsg',NULL,5,'2021-04-11 19:09:55'),(6,3,'123stop\r\n',NULL,3,'2021-04-12 15:30:04'),(7,7,'ti leei re ',NULL,3,'2021-04-14 19:12:32');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `emailAddress` varchar(255) DEFAULT NULL,
  `emailStatus` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_role` varchar(255) DEFAULT 'simple',
  `passwordResetToken` varchar(255) DEFAULT NULL,
  `profile_pic` text,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `emailAddress` (`emailAddress`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('2021-03-24 14:02:18','2021-03-24 14:02:18',3,'Mitsos','Katsaridas','+306972397830','Ελλάδα','katsaridas@hotmail.com',NULL,'$2a$08$xVM/ZljIBOklnXblw9r5cOA4Jg.zHG.5pxMuQDPmRuGEjY7vSQDHa','admin',NULL,'815fcaa3b995a19120fdf442a038856e'),('2021-03-24 14:03:38','2021-03-24 14:03:38',4,'John','Doe','6982355260','Greece','johndoe@hotmail.com',NULL,'$2a$08$mNnsVMTlIRdmurrnaVJL9es365qa49kwYz79S3pXEDkfbNu/zv7xW','simple',NULL,NULL),('2021-03-24 15:09:17','2021-03-24 15:09:17',5,'dimitris','dimarakis','6972397830','Ελλάδα','dimdimar@hotmail.com',NULL,'$2a$08$Lv6QDidP4ZRh/uKIDMCGCO9wgm.1pm16oWmdRMrcb1jmbp90Q89NO','admin','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbEFkZHJlc3MiOiJkaW1kaW1hckBob3RtYWlsLmNvbSIsImlhdCI6MTYxODI1MjMzMCwiZXhwIjoxNjE4MjUyNjMwfQ.RKuVi7tUqj8xeArpMdmaOocIV5xMWcvu9FPcBFEIL00',NULL),('2021-03-26 11:25:34','2021-03-26 11:25:34',6,'charis','koufy','698745214','greece','koufy@hotmail.com',NULL,'$2a$08$R.alEUzemwgdCA8i1jNVPuzvXTOaNbeFBecRR3YDntW7w0iJydcAO','simple',NULL,NULL),('2021-04-03 08:23:48','2021-04-03 08:23:48',7,'Mike','Vak','56574756547','Spain','vak@hotmail.com',NULL,'$2a$08$FuYZsUGn8twjx5xOpAAK7u3v9xL6Ddnx0lFuijXme/UfMbhAU2a/a','admin','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbEFkZHJlc3MiOiJ2YWtAaG90bWFpbC5jb20iLCJpYXQiOjE2MTgxNDUwMTQsImV4cCI6MTYxODE0NTMxNH0.DS4Ok1CWweao5FTshonlkPpSw6jpJwkG93EVGDhMJyM',NULL),('2021-04-03 17:40:25','2021-04-03 17:40:25',8,'jeff','Bezos','575757539387','USA','jeff@hotmail.com',NULL,'$2a$08$5kVMPDFFGNVIBAPg1Yurm.uZmrBB3b.uKUdtZlkj6v/C5W9yUq0Ye','simple',NULL,NULL),('2021-04-03 17:41:05','2021-04-03 17:41:05',9,'bob','mastoras','9854954854','italy','mastoras@hotmail.com',NULL,'$2a$08$b8VD/8k2eJNrf3CUFA/n/OnBOoJDMTpEzzPF1CJil.9pRUjngV.QC','simple',NULL,NULL),('2021-04-05 22:15:04','2021-04-05 22:15:04',10,'luca','doncic','5898569854','slovenia','yololo@hotmail.com',NULL,'$2a$08$9MtYkPXIQeGzcmGdc6dzIeW2kbmbrtzhZPYdmCthRANjd1QT0/FxG','simple',NULL,NULL),('2021-04-05 22:24:39','2021-04-05 22:24:39',11,'bob1','mastoras1','7598935539','neverland','nomatter@hotmail.com',NULL,'$2a$08$N74CijEkI/m1Kd0xaY/YNu6uAc19ktjhGy.dJYtoWPoRaqFqhrR4G','simple',NULL,NULL),('2021-04-07 04:55:35','2021-04-07 04:55:35',12,'nikos','koukos','83853858393','panama','koukos@hotmail.com',NULL,'$2a$08$P1oP93RGlB4mAFjZJ/B1rOuUECX96PyK9JVtgZzonSnPVvrlv2nAe','simple',NULL,NULL),('2021-04-07 05:08:59','2021-04-07 05:08:59',13,'mikros','nikolas','353953983493','albania','test1@hotmail.com',NULL,'$2a$08$4sNSNxBTKAlU9WukePKQ3etSKZgT1yBUsiOiEBeBJ3vcSBjQgBhJK','simple',NULL,NULL),('2021-04-07 05:10:11','2021-04-07 05:10:11',14,'mikros1','nikolas1','353953983493','slovakia','test2@hotmail.com',NULL,'$2a$08$UKv9zdnPpQCNV3hzZ6WENuaBzC5HNyOEm09ZJMwQyoFQlKCCQNqN2','simple','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbEFkZHJlc3MiOiJ0ZXN0MkBob3RtYWlsLmNvbSIsImlhdCI6MTYxODI0OTE2MCwiZXhwIjoxNjE4MjQ5NDYwfQ.ENgXUqflU7Xg8ChSCiYfyUjopsURnbA3al3zFWQ9cTk',NULL),('2021-04-07 05:21:57','2021-04-07 05:21:57',15,'test3','test3','35465435','test3','test3@hotmail.com',NULL,'$2a$08$L52BCGnfutFyNxzYuovYWuomFoE3Ru1dlTOf1yMuwe/s38i24rXhm','simple',NULL,NULL),('2021-04-07 05:34:28','2021-04-07 05:34:28',16,'jack','sparrow','354545343','panama','test54321cristianoRonaldo@mailinator.com',NULL,'$2a$08$crz5nhmweI2XTuVrVT4Izuw.SaEqjYPngYqh9bbJ0Bek4r.1mxiFm','simple',NULL,NULL),('2021-04-07 05:35:41','2021-04-07 05:35:41',17,'jack','sparrow','354545343','panama','test5@hotmail.com','verified','$2a$08$uaN9n3sdHcVvLG.HLggJguElmcOFr.T5EGZk.E02Hqb5PwHCdc72y','simple',NULL,NULL),('2021-04-07 05:39:42','2021-04-07 05:39:42',18,'test6','test6','46543654363','Germany','test6@hotmail.com','verified','$2a$08$rOJkGicX0/i0ipy4CMsAR.vbHFesZlWeMYTAiDZSyhy8A5o2cm0yO','simple',NULL,NULL),('2021-04-07 19:18:59','2021-04-07 19:18:59',19,'nikos','mortis','538563756','jamaica','mortis@hotmail.com',NULL,'$2a$08$jxcOTFpu/xmznkjPHZwd9OhR2jFSqBb8ixR1WGYd8wNYQU19Rvd1m','simple','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbEFkZHJlc3MiOiJtb3J0aXNAaG90bWFpbC5jb20iLCJpYXQiOjE2MTgwNTkxNTQsImV4cCI6MTYxODA1OTQ1NH0.C_QIMxQkYevs1o3aPyX9zfL1arqy27IJwpsa8iOeg3M',NULL),('2021-04-07 19:20:25','2021-04-07 19:20:25',20,'petros','nikolaou','3653754367','jamaica','nikolaou@hotmail.com','verified','$2a$08$CE3A4noUNa10B3UmMj.VueX5E2npRwjCPWIb1xxCzuiKBpwYbqkuW','simple','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbEFkZHJlc3MiOiJuaWtvbGFvdUBob3RtYWlsLmNvbSIsImlhdCI6MTYxODA3NDU1MSwiZXhwIjoxNjE4MDc0ODUxfQ.To9bt_Wb_jfdzmPg_XLVcaAZo2QftW4ysBaaWy0RsY4',NULL),('2021-04-10 08:25:16','2021-04-10 08:25:16',21,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'simple','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbEFkZHJlc3MiOiJtb3J0aXNAaG90bWFpbC5jb20iLCJpYXQiOjE2MTgwNDMxMTYsImV4cCI6MTYxODA0MzQxNn0._Ap_eSsdfrebrvMyO1IxXCC7McKvsIVSqqzV6-ABqKI',NULL),('2021-04-12 16:38:39','2021-04-12 16:38:39',22,'Δημήτρης','Δημαράκης','+306972397830','Ελλάδα','a@hotmail.com',NULL,'$2a$08$ob/G/EFziy0kg5c/J5m/NucNA6UsqfYChPJkR7d7.p0X9cdI1Xmgu','simple',NULL,NULL),('2021-04-12 18:24:38','2021-04-12 18:24:38',23,'giorgos','tade','123456','greece','giorgos@hotmail.com',NULL,'$2a$08$E0ULoupYc4BeXW.YHBXeLOmvRZtAKCXIueTMog4Pd2XZukBFjw9oi','simple',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_is_friend`
--

DROP TABLE IF EXISTS `user_is_friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_is_friend` (
  `friend_one_id` int(11) NOT NULL,
  `friend_two_id` int(11) NOT NULL,
  `connection` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`friend_one_id`,`friend_two_id`),
  KEY `fk_friend_two_idx` (`friend_two_id`) /*!80000 INVISIBLE */,
  KEY `idx_connection` (`connection`),
  CONSTRAINT `fk_friend_one` FOREIGN KEY (`friend_one_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `fk_friend_two` FOREIGN KEY (`friend_two_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_is_friend`
--

LOCK TABLES `user_is_friend` WRITE;
/*!40000 ALTER TABLE `user_is_friend` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_is_friend` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-14 23:02:10
