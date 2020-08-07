-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         5.7.24 - MySQL Community Server (GPL)
-- SO del servidor:              Win64
-- HeidiSQL Versión:             10.2.0.5599
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Volcando estructura de base de datos para dbgestionocupacion
DROP DATABASE IF EXISTS `dbgestionocupacion`;
CREATE DATABASE IF NOT EXISTS `dbgestionocupacion` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dbgestionocupacion`;

-- Volcando estructura para tabla dbgestionocupacion.activities
DROP TABLE IF EXISTS `activities`;
CREATE TABLE IF NOT EXISTS `activities` (
  `act_id` int(11) NOT NULL AUTO_INCREMENT,
  `req_id` int(11) DEFAULT NULL,
  `act_trello_name` varchar(200) DEFAULT NULL,
  `act_description_trello` varchar(200) DEFAULT NULL,
  `act_card_id` varchar(50) DEFAULT NULL,
  `act_init_date` datetime DEFAULT '9999-12-31 00:00:00',
  `act_init_real_date` datetime DEFAULT NULL,
  `act_end_date` datetime DEFAULT '9999-12-31 00:00:00',
  `act_real_end_date` datetime DEFAULT NULL,
  `act_estimated_hours` float DEFAULT NULL,
  `act_desv_percentage` int(11) DEFAULT NULL,
  `act_day_desv` int(11) DEFAULT NULL,
  `act_id_parent` int(11) DEFAULT NULL,
  `act_id_parent2` int(11) DEFAULT NULL,
  `act_id_prelacion` int(11) DEFAULT NULL,
  `act_id_project_task` int(11) DEFAULT NULL,
  `act_id_user_trello` varchar(50) DEFAULT NULL,
  `act_time_loaded` float DEFAULT NULL,
  `act_status` varchar(10) NOT NULL DEFAULT 'Active',
  `act_porcent` int(11) NOT NULL DEFAULT '0',
  `act_title` varchar(50) NOT NULL,
  `act_mail` varchar(50) DEFAULT NULL,
  `act_trello_user` varchar(50) NOT NULL,
  PRIMARY KEY (`act_id`),
  KEY `req_id_idx` (`req_id`),
  CONSTRAINT `request_id` FOREIGN KEY (`req_id`) REFERENCES `request` (`req_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=793 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla dbgestionocupacion.activities: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
REPLACE INTO `activities` (`act_id`, `req_id`, `act_trello_name`, `act_description_trello`, `act_card_id`, `act_init_date`, `act_init_real_date`, `act_end_date`, `act_real_end_date`, `act_estimated_hours`, `act_desv_percentage`, `act_day_desv`, `act_id_parent`, `act_id_parent2`, `act_id_prelacion`, `act_id_project_task`, `act_id_user_trello`, `act_time_loaded`, `act_status`, `act_porcent`, `act_title`, `act_mail`, `act_trello_user`) VALUES
	(49, 52, 'LOG-MA15-Modelo de Existencia y Disponibilidad', NULL, NULL, '2020-06-01 08:00:00', NULL, '2020-06-26 12:00:00', NULL, 240, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'true', '', ''),
	(50, 52, 'Inicio solicitud', NULL, '5f22f6f1e7af5a74227ea95d', '2020-06-01 08:00:00', NULL, '2020-06-05 17:00:00', NULL, 40, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'false', 'eleon@intelix.biz', 'Enmanuel Leon'),
	(51, 52, 'Existencia Propia y Proveedor', NULL, NULL, '2020-06-08 08:00:00', NULL, '2020-06-12 12:00:00', NULL, 68, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'true', '', ''),
	(52, 52, 'Implementación de Ajustes de entrada y salida proveedor', NULL, '5f22f6ef5bda30039244252e', '2020-06-08 08:00:00', NULL, '2020-06-10 17:00:00', NULL, 36, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'true', '', ''),
	(53, 52, 'Creación de nuevos tipos de ajuste', NULL, '5f22f6ef6051d74bb7c929c6', '2020-06-08 08:00:00', NULL, '2020-06-08 17:00:00', NULL, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'false', 'eleon@intelix.biz', 'Enmanuel Leon'),
	(54, 52, 'Validación y completación para los nuevos tipos de ajuste', NULL, '5f22f6f04050262a4dd5cba3', '2020-06-09 08:00:00', '2020-07-06 16:00:00', '2020-06-10 17:00:00', '2020-07-09 16:00:00', 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2.8, 'Active', 50, 'false', 'eleon@intelix.biz', 'Enmanuel Leon'),
	(55, 52, 'Modificación en réplica de Ajuste para llevar data a LEGACY', NULL, '5f22f6f0cdb01a26fb110de0', '2020-06-08 08:00:00', NULL, '2020-06-09 12:00:00', NULL, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'false', 'eleon@intelix.biz', 'Enmanuel Leon'),
	(56, 52, 'Implementación de ventas propias y proveedor', NULL, NULL, '2020-06-09 13:00:00', NULL, '2020-06-10 17:00:00', NULL, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'true', '', ''),
	(57, 52, 'Ventas propias', NULL, '5f22f6f04c70c160272436d3', '2020-06-09 13:00:00', NULL, '2020-06-10 10:00:00', NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'false', 'eleon@intelix.biz', 'Enmanuel Leon'),
	(58, 52, 'Ventas proveedor', NULL, '5f22f6ee9a23ff513107d8f5', '2020-06-10 10:00:00', NULL, '2020-06-10 17:00:00', NULL, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'false', 'eleon@intelix.biz', 'Enmanuel Leon'),
	(59, 52, 'Implementación de Ajustes de entrada y salida proveedor', NULL, '5f22f6ef5bda30039244252e', '2020-06-11 08:00:00', NULL, '2020-06-11 17:00:00', NULL, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 60, 'false', 'eleon@intelix.biz', 'Enmanuel Leon'),
	(60, 52, 'Implementación de réplica que calcule y almacene las unidades necesarias para la Existencia propia y proveedor en la nueva tabla', NULL, '5f22f6ee8d2fb88b8cae518d', '2020-06-11 08:00:00', NULL, '2020-06-12 12:00:00', NULL, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'false', '', 'Enmanuel Leon'),
	(61, 52, 'Disponibilidad Propia', NULL, NULL, '2020-06-12 08:00:00', NULL, '2020-06-18 12:00:00', NULL, 64, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'true', '', ''),
	(62, 52, 'Implementación de Fórmula de Existencia propia', NULL, '5f22f6ef7179437de221ff82', '2020-06-12 08:00:00', NULL, '2020-06-15 17:00:00', NULL, 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'false', 'eleon@intelix.biz', 'Enmanuel Leon'),
	(63, 52, 'Implementación de Fórmula de Mercancia en cuarentena propia', NULL, '5f22f6f0a229662e083e8860', '2020-06-12 13:00:00', NULL, '2020-06-16 12:00:00', NULL, 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'false', 'eleon@intelix.biz', 'Enmanuel Leon'),
	(64, 52, 'Implementación de Fórmula de Mercancia en cuarentena propia', NULL, '5f22f6f0a229662e083e8860', '2020-06-16 08:00:00', NULL, '2020-06-17 17:00:00', NULL, 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'false', 'eleon@intelix.biz', 'Enmanuel Leon'),
	(65, 52, 'Implementación de Función de Disponibilidad Propia', NULL, '5f22f6ef7e47e883f55b02cf', '2020-06-16 13:00:00', NULL, '2020-06-18 12:00:00', NULL, 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'false', 'eleon@intelix.biz', 'Enmanuel Leon'),
	(66, 52, 'Disponibilidad Proveedor', NULL, NULL, '2020-06-18 08:00:00', NULL, '2020-06-25 12:00:00', NULL, 60, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'true', '', ''),
	(67, 52, 'Implementación de Fórmula de Existencia proveedor2', NULL, '5f22f6ef405ff271ae198724', '2020-06-18 08:00:00', NULL, '2020-06-19 12:00:00', NULL, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'false', 'eleon@intelix.biz', 'Enmanuel Leon'),
	(68, 52, 'Implementación de Fórmula de Mercancia en cuarentena proveedor', NULL, '5f22f6f0afcac48a5c994d38', '2020-06-18 13:00:00', NULL, '2020-06-22 12:00:00', NULL, 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 10, 'false', 'eleon@intelix.biz', 'Enmanuel Leon'),
	(69, 52, 'Implementación de Fórmula de Ventas proveedor en tránsito', NULL, '5f22f6eff835956a8869eddd', '2020-06-19 13:00:00', NULL, '2020-06-23 12:00:00', NULL, 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 50, 'false', 'eleon@intelix.biz', 'Enmanuel Leon'),
	(70, 52, 'Implementación de Función de Disponibilidad Proveedor', NULL, '5f22f6efa748087b03432307', '2020-06-22 13:00:00', NULL, '2020-06-25 12:00:00', NULL, 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 51, 'false', 'eleon@intelix.biz', 'Enmanuel Leon'),
	(71, 52, 'Disponibilidad Total', NULL, NULL, '2020-06-25 13:00:00', NULL, '2020-06-26 12:00:00', NULL, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'true', '', ''),
	(72, 52, 'Implementación de Función de Disponibilidad Total', NULL, '5f22f6ef2977f88e09e242eb', '2020-06-25 13:00:00', NULL, '2020-06-26 12:00:00', NULL, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 'Active', 0, 'false', 'eleon@intelix.biz', 'Enmanuel Leon');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;

-- Volcando estructura para tabla dbgestionocupacion.booking
DROP TABLE IF EXISTS `booking`;
CREATE TABLE IF NOT EXISTS `booking` (
  `boo_id` int(11) NOT NULL AUTO_INCREMENT,
  `cli_id` int(11) NOT NULL,
  `req_id` int(11) NOT NULL,
  `usr_id` int(11) NOT NULL,
  `boo_duration` int(20) DEFAULT NULL,
  `boo_start_date` date NOT NULL,
  `boo_end_date` date NOT NULL,
  `boo_percentage` float NOT NULL,
  PRIMARY KEY (`boo_id`),
  KEY `cli_id` (`cli_id`),
  KEY `usr_id` (`usr_id`),
  KEY `req_id` (`req_id`),
  CONSTRAINT `cli_id` FOREIGN KEY (`cli_id`) REFERENCES `client` (`cli_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `req_id` FOREIGN KEY (`req_id`) REFERENCES `request` (`req_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `usr_id` FOREIGN KEY (`usr_id`) REFERENCES `user` (`usr_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla dbgestionocupacion.booking: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
REPLACE INTO `booking` (`boo_id`, `cli_id`, `req_id`, `usr_id`, `boo_duration`, `boo_start_date`, `boo_end_date`, `boo_percentage`) VALUES
	(1, 1, 47, 1, NULL, '2020-07-01', '2020-08-08', 50),
	(3, 1, 47, 2, NULL, '2020-07-29', '2020-08-08', 50),
	(4, 1, 45, 2, NULL, '2020-07-28', '2020-08-04', 50),
	(5, 1, 45, 3, NULL, '2020-07-28', '2020-08-13', 80),
	(6, 1, 51, 4, NULL, '2020-07-29', '2020-08-11', 100),
	(7, 1, 48, 6, NULL, '2020-07-29', '2020-08-12', 20),
	(8, 1, 48, 5, NULL, '2020-07-28', '2020-08-07', 20);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;

-- Volcando estructura para tabla dbgestionocupacion.branch
DROP TABLE IF EXISTS `branch`;
CREATE TABLE IF NOT EXISTS `branch` (
  `ram_id` int(11) NOT NULL AUTO_INCREMENT,
  `ram_name` varchar(45) DEFAULT NULL,
  `board_id` varchar(50) DEFAULT NULL,
  `list_id` varchar(50) DEFAULT NULL,
  `board_custom_create` char(1) DEFAULT '0',
  PRIMARY KEY (`ram_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla dbgestionocupacion.branch: ~12 rows (aproximadamente)
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
REPLACE INTO `branch` (`ram_id`, `ram_name`, `board_id`, `list_id`, `board_custom_create`) VALUES
	(1, 'Principal', '5f2cad591900077ee14994ae', '5f2cad5f741e5171ae390a41', '1'),
	(2, 'Ramo Moda', '5f24367d933c1a54a2b6e78e', '5f24452ee2765e54b3aad27a', '0'),
	(3, 'Beco', '5f24369a912da48cdcae46c9', '5f2445008ff1c42f92a51e0b', '0'),
	(4, 'Abstracta', '5f2436acd53dd97eb485c2fd', '5f243f052043ff59974ca6b1', '0'),
	(5, 'Amand', '5f2436e02a33777dddb656dd', '5f2444f8e6c9048771af9189', '0'),
	(6, 'Ramo Inmobiliario', '5f2436f8d5b1cc2f4063cc27', '5f2444d399415a5534f90f03', '0'),
	(7, 'Ramo Logistico', '5f243705405e220adbe09766', '5f2444a8abdafe539df04b0d', '0'),
	(8, 'Beconsult', '5f24371e4d21a37e8cc86b98', '5f2444a2e99e7a0c2a6b2d4c', '0'),
	(9, 'EPA', '5f24372d34e3d37452093fab', '5f24449a01cb8a7c0c3aa697', '0'),
	(10, 'Ramo Automotriz', '5f24373aee52aa3102ab1e46', '5f2444902e44a25e241d8b31', '0'),
	(11, 'Ramo Mayoreo', '5f24374b78e584792fee1a3d', '5f244488937cf95b50ca5156', '0'),
	(12, 'Intelix', '5f2437597b3dd65a06fc4473', '5f2444822ec6ec870decbd9a', '0');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;

-- Volcando estructura para tabla dbgestionocupacion.client
DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `cli_id` int(11) NOT NULL AUTO_INCREMENT,
  `cli_name` varchar(45) NOT NULL,
  PRIMARY KEY (`cli_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla dbgestionocupacion.client: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
REPLACE INTO `client` (`cli_id`, `cli_name`) VALUES
	(1, 'Mayoreo');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;

-- Volcando estructura para tabla dbgestionocupacion.clockify_task
DROP TABLE IF EXISTS `clockify_task`;
CREATE TABLE IF NOT EXISTS `clockify_task` (
  `clo_id` int(11) NOT NULL AUTO_INCREMENT,
  `clo_task_name` varchar(45) DEFAULT NULL,
  `clo_description` varchar(200) DEFAULT NULL,
  `clo_date` datetime DEFAULT '9999-12-31 00:00:00',
  `clo_time` time DEFAULT NULL,
  `clo_poject_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`clo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla dbgestionocupacion.clockify_task: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `clockify_task` DISABLE KEYS */;
/*!40000 ALTER TABLE `clockify_task` ENABLE KEYS */;

-- Volcando estructura para tabla dbgestionocupacion.database_reg
DROP TABLE IF EXISTS `database_reg`;
CREATE TABLE IF NOT EXISTS `database_reg` (
  `reg_id` int(11) NOT NULL AUTO_INCREMENT,
  `reg_update_time` datetime NOT NULL,
  PRIMARY KEY (`reg_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla dbgestionocupacion.database_reg: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `database_reg` DISABLE KEYS */;
/*!40000 ALTER TABLE `database_reg` ENABLE KEYS */;

-- Volcando estructura para tabla dbgestionocupacion.label_trello
DROP TABLE IF EXISTS `label_trello`;
CREATE TABLE IF NOT EXISTS `label_trello` (
  `lab_id` int(11) NOT NULL AUTO_INCREMENT,
  `lab_0_or_2` varchar(45) DEFAULT NULL,
  `lab_2_or_5` varchar(45) DEFAULT NULL,
  `lab_5_or_more` varchar(45) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`lab_id`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `branch_id` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`ram_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla dbgestionocupacion.label_trello: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `label_trello` DISABLE KEYS */;
REPLACE INTO `label_trello` (`lab_id`, `lab_0_or_2`, `lab_2_or_5`, `lab_5_or_more`, `branch_id`) VALUES
	(4, '5f2cb13066b10d2cff1a8d10', '5f2cb1310f2cf71a0628f6ff', '5f2cb1313fadb65617b5a10d', 1);
/*!40000 ALTER TABLE `label_trello` ENABLE KEYS */;

-- Volcando estructura para tabla dbgestionocupacion.request
DROP TABLE IF EXISTS `request`;
CREATE TABLE IF NOT EXISTS `request` (
  `req_id` int(11) NOT NULL AUTO_INCREMENT,
  `board_id` varchar(50) DEFAULT NULL,
  `project_id` varchar(50) DEFAULT NULL,
  `task_id` varchar(50) DEFAULT NULL,
  `req_ms_project` text,
  `cli_id` int(11) DEFAULT NULL,
  `coa_id` int(11) DEFAULT NULL,
  `req_title` varchar(200) DEFAULT NULL,
  `req_description` varchar(1024) DEFAULT NULL,
  `req_responsable` varchar(45) DEFAULT NULL,
  `req_order_priority` int(11) DEFAULT NULL,
  `req_date` date DEFAULT NULL,
  `req_init_date` date DEFAULT '9999-12-31',
  `req_final_date` date DEFAULT '9999-12-31',
  `req_real_final_date` date DEFAULT NULL,
  `sta_id` varchar(45) DEFAULT NULL,
  `req_advance_ptge` float DEFAULT NULL,
  `req_deviations_ptge` float DEFAULT NULL,
  `req_client_completed_deliverables` varchar(1024) DEFAULT NULL,
  `req_client_pending_activities` varchar(1024) DEFAULT NULL,
  `req_client_comments` varchar(1024) DEFAULT NULL,
  `req_intelix_completed_deliverables` varchar(1024) DEFAULT NULL,
  `req_intelix_pending_activities` varchar(1024) DEFAULT NULL,
  `req_intelix_comments` varchar(1024) DEFAULT NULL,
  `req_last_update_date` date DEFAULT NULL,
  `rty_id` int(11) DEFAULT NULL,
  `tea_id` int(11) DEFAULT NULL,
  `req_comitee` int(11) DEFAULT NULL,
  `req_comitee_points_discuss` varchar(1024) DEFAULT NULL,
  `req_day_desv` int(11) DEFAULT NULL,
  `req_cargar` varchar(45) DEFAULT 'true',
  PRIMARY KEY (`req_id`),
  KEY `cli_id_idx` (`cli_id`),
  KEY `coa_id` (`coa_id`),
  KEY `rty_id` (`rty_id`),
  KEY `tea_id` (`tea_id`),
  CONSTRAINT `client_id` FOREIGN KEY (`cli_id`) REFERENCES `client` (`cli_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla dbgestionocupacion.request: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
REPLACE INTO `request` (`req_id`, `board_id`, `project_id`, `task_id`, `req_ms_project`, `cli_id`, `coa_id`, `req_title`, `req_description`, `req_responsable`, `req_order_priority`, `req_date`, `req_init_date`, `req_final_date`, `req_real_final_date`, `sta_id`, `req_advance_ptge`, `req_deviations_ptge`, `req_client_completed_deliverables`, `req_client_pending_activities`, `req_client_comments`, `req_intelix_completed_deliverables`, `req_intelix_pending_activities`, `req_intelix_comments`, `req_last_update_date`, `rty_id`, `tea_id`, `req_comitee`, `req_comitee_points_discuss`, `req_day_desv`, `req_cargar`) VALUES
	(40, '5ee2fe80dd1a4b0ca12b8514', NULL, NULL, 'LOG-MA15-Modelo de Existencia y Disponibilidad.mpp', 1, NULL, 'prueba 13', NULL, 'Joe Doe', NULL, '9999-12-31', '9999-12-31', '9999-12-31', '9999-12-31', 'open', 67, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, 'false'),
	(45, '5ecc545f367f7d139208c139', NULL, NULL, NULL, 1, NULL, 'Centro de Desarrollo - Productos Intelix Capítulo ABX', NULL, 'Joe Doe', NULL, '9999-12-31', '9999-12-31', '9999-12-31', '9999-12-31', 'open', 13, 34, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 14, 'false'),
	(46, '5ee2f4d36ec4910464b7e906', NULL, NULL, NULL, 1, NULL, 'preuba12', NULL, 'Joe Doe', NULL, '9999-12-31', '9999-12-31', '9999-12-31', '9999-12-31', 'open', 45, 23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 'false'),
	(47, '5ed18e8039bdeb21ec923c5e', NULL, NULL, NULL, 1, NULL, 'Modificaciones de la página Web de Beconsult', NULL, 'Joe Doe', NULL, '9999-12-31', '9999-12-31', '9999-12-31', '9999-12-31', 'open', 34, 45, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, 'false'),
	(48, '5edb080749b93c4eb29534ea', NULL, NULL, NULL, 1, NULL, 'Prueba', NULL, 'Joe Doe', NULL, '9999-12-31', '9999-12-31', '9999-12-31', '9999-12-31', 'open', 22, 14, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 33, 'false'),
	(49, '5ee3b950f3ce406448212735', NULL, NULL, 'LOG-MA15-Modelo de Existencia y Disponibilidad.mpp', 1, NULL, 'prueba 14', NULL, 'Joe Doe', NULL, '9999-12-31', '9999-12-31', '9999-12-31', '9999-12-31', 'open', 14, 23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 45, 'false'),
	(50, '5ef232463d057744796935ce', NULL, NULL, 'LOG-MA15-Modelo de Existencia y Disponibilidad.mpp', 1, NULL, 'prueba 15', NULL, 'Joe Doe', NULL, '9999-12-31', '9999-12-31', '9999-12-31', '9999-12-31', 'open', 30, 54, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 23, 'false'),
	(51, '', NULL, NULL, 'LOG-MA15-Modelo de Existencia y Disponibilidad.mpp', 1, NULL, 'Prueba 17', NULL, 'Joe Doe', NULL, '9999-12-31', '9999-12-31', '9999-12-31', '9999-12-31', 'open', 20, 76, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 56, 'false'),
	(52, '5f22f59bf88a9a121c1cf35e', NULL, NULL, 'Gestion de solicitudes.mpp', 1, NULL, 'Gestion de solicitudes', NULL, NULL, NULL, '9999-12-31', '9999-12-31', '9999-12-31', '9999-12-31', 'open', 20, 76, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 56, 'true');
/*!40000 ALTER TABLE `request` ENABLE KEYS */;

-- Volcando estructura para tabla dbgestionocupacion.tickets
DROP TABLE IF EXISTS `tickets`;
CREATE TABLE IF NOT EXISTS `tickets` (
  `tic_id` int(11) NOT NULL AUTO_INCREMENT,
  `tic_title` varchar(200) DEFAULT NULL,
  `tic_description` mediumtext,
  `tic_branch` varchar(45) DEFAULT NULL,
  `tic_subsidiary` varchar(45) DEFAULT NULL,
  `tic_deparment` varchar(45) DEFAULT NULL,
  `tic_usr_ci` varchar(20) DEFAULT NULL,
  `tic_category` varchar(255) DEFAULT NULL,
  `tic_priority` varchar(15) DEFAULT NULL,
  `tic_assigned_to` varchar(255) DEFAULT NULL,
  `tic_date` date DEFAULT NULL,
  `tic_last_update_date` date DEFAULT NULL,
  `tic_sol_date` date DEFAULT NULL,
  `tic_closing_date` date DEFAULT NULL,
  `tic_clockify_time` time DEFAULT '00:00:00',
  `tic_sla` int(11) DEFAULT NULL,
  `tic_card_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`tic_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1911030009 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla dbgestionocupacion.tickets: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
REPLACE INTO `tickets` (`tic_id`, `tic_title`, `tic_description`, `tic_branch`, `tic_subsidiary`, `tic_deparment`, `tic_usr_ci`, `tic_category`, `tic_priority`, `tic_assigned_to`, `tic_date`, `tic_last_update_date`, `tic_sol_date`, `tic_closing_date`, `tic_clockify_time`, `tic_sla`, `tic_card_id`) VALUES
	(1911030008, 'Fwd: equipos Laptops', '&lt;div dir="ltr"&gt;Buen Día Ana&lt;div&gt; &lt;/div&gt;&lt;div&gt;Merbelin y yo estaremos revisando la información y planificando los cambios necesarios.&lt;/div&gt;&lt;div&gt; &lt;/div&gt;&lt;div&gt;Cualquier duda te preguntamos&lt;/div&gt;&lt;div&gt;Saludos&lt;br /&gt;&lt;br /&gt;&lt;div class="gmail_quote"&gt;&lt;div class="gmail_attr" dir="ltr"&gt;---------- Forwarded message ---------&lt;br /&gt;De: &lt;strong class="gmail_sendername" dir="auto"&gt;Ana Sanz&lt;/strong&gt; &lt;span dir="auto"&gt;&lt;&lt;a href="mailto:asanz@capuy.com"&gt;asanz@capuy.com&lt;/a&gt;&gt;&lt;/span&gt;&lt;br /&gt;Date: sáb., 2 nov. 2019 a las 13:42&lt;br /&gt;Subject: equipos Laptops&lt;br /&gt;To: Nancy Gomez &lt;&lt;a href="mailto:ngomez@walkiria.biz"&gt;ngomez@walkiria.biz&lt;/a&gt;&gt;&lt;/div&gt;&lt;br /&gt;&lt;br /&gt;&lt;div dir="ltr"&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;Hola Buenos dias &lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt; &lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;Nancy los equipos  deben quedar así:&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt; &lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;Capuy/ usuarios:&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;- Laptop: Gabriel Hernandez (usa la que tenía en LPG)&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;- Laptop: Asesor de ventas 1 (vacante)&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;- PC: Amarelis Graterol &lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;- PC: Reubicar para asesor 3. &lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt; &lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;BoConcept CM / usuarios&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;- Liliana López (se queda con la que tenía en LM)&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;- Reubicar las  PC hacia area de counter. (sólo hay 1) &lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt; &lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;BoConcept LM&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;- Rossana Campo (usa una que estaba asignada a Capuy)&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;- Isael Planas&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;- Maria Alessandra Alcedo&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;quitar la PC de tienda y disponerla para otra locación&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt; &lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;BoConcept LPG&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;- Nancy Arellano&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;- Marbely Peña&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;- Reubicar la PC a área de caja. (consultar si Nancy la usa o ella usa lapto) &lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt; &lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;En abstracta CCCT estamos OK&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt; &lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;En abstracta LM con 5 estamos OK&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;2 en oficina. 1 en nivel 1 y 2 en PB que habría que reubicar. &lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;por lo que podemos disponer del resto.&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt; &lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;Saludos,&lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt;Ana &lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt; &lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt; &lt;/div&gt;&lt;div style="font-family: verdana,sans-serif; font-size: small;"&gt; &lt;/div&gt;&lt;div&gt;&lt;div dir="ltr" data-smartmail="gmail_signature"&gt;&lt;div dir="ltr"&gt;&lt;div&gt;&lt;div dir="ltr"&gt;&lt;div dir="ltr"&gt;&lt;div dir="ltr"&gt;&lt;div dir="ltr"&gt;&lt;div dir="ltr"&gt;&lt;div dir="ltr"&gt;&lt;div dir="ltr"&gt;&lt;div dir="ltr"&gt;&lt;div dir="ltr"&gt;&lt;div dir="ltr"&gt;&lt;div dir="ltr"&gt;&lt;div dir="ltr"&gt;&lt;div style="font-family: tahoma,sans-serif;"&gt;&lt;span style="color: #444444; font-size: small; font-family: arial, helvetica, sans-serif;"&gt;&lt;strong&gt;Ana Sanz&lt;/strong&gt;&lt;/span&gt;&lt;/div&gt;&lt;div&gt;&lt;span style="font-size: small; color: #666666; font-family: arial, helvetica, sans-serif;"&gt;Jefe de Ventas&lt;/span&gt;&lt;/div&gt;&lt;div&gt;&lt;span style="font-size: small; color: #666666; font-family: arial, helvetica, sans-serif;"&gt;Abstracta - BoConcept - Capuy&lt;/span&gt;&lt;/div&gt;&lt;div style="font-size: 12.8px;"&gt;&lt;div style="font-size: 12.8px;"&gt;&lt;div style="font-size: 12.8px;"&gt;&lt;span style="font-size: 12.8px;"&gt;&lt;span style="color: #666666; font-family: arial, helvetica, sans-serif;"&gt;+58 212-526.67.72&lt;/span&gt;&lt;/span&gt;&lt;/div&gt;&lt;div style="font-size: 12.8px;"&gt;&lt;span style="font-size: 12.8px;"&gt;&lt;span style="color: #666666; font-family: arial, helvetica, sans-serif;"&gt;+58 414-293.88.95&lt;/span&gt;&lt;/span&gt;&lt;/div&gt;&lt;div style="font-size: 12.8px;"&gt;&lt;span style="color: #999999; font-family: arial, helvetica, sans-serif;"&gt;&lt;strong&gt;&lt;a style="color: #1155cc;" href="http://www.beco.com.ve/" target="_blank" rel="noopener"&gt;www.becocompania.com.ve&lt;/a&gt; &lt;/strong&gt;&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;div dir="ltr"&gt;&lt;p style="font-size: 12.8px;"&gt;&lt;img src="https://drive.google.com/a/capuy.com/uc?id=19OsxnkgmLYV3i6-2x7HzlEflTGe8hMqG&amp;export=download" alt="image" /&gt;&lt;br /&gt;&lt;br /&gt;&lt;/p&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;br style="clear: both;" /&gt;&lt;div&gt; &lt;/div&gt;-- &lt;br /&gt;&lt;div class="gmail_signature" dir="ltr" data-smartmail="gmail_signature"&gt;&lt;div dir="ltr"&gt;&lt;div&gt;&lt;div dir="ltr"&gt;&lt;div&gt;&lt;div dir="ltr"&gt;&lt;div&gt;&lt;div dir="ltr"&gt;&lt;div&gt;&lt;div dir="ltr"&gt;&lt;div dir="ltr"&gt;&lt;div dir="ltr"&gt;&lt;div dir="ltr"&gt;&lt;div dir="ltr"&gt;&lt;div&gt;&lt;div style="font-size: 12.8px; font-family: tahoma,sans-serif;"&gt;&lt;span style="font-family: arial, helvetica, sans-serif;"&gt;&lt;span style="font-size: small; color: #444444;"&gt;&lt;strong&gt;Nancy Gómez&lt;/strong&gt;&lt;/span&gt;&lt;br /&gt;&lt;/span&gt;&lt;/div&gt;&lt;div style="font-size: 12.8px; font-family: tahoma,sans-serif;"&gt;&lt;span style="font-size: 12.8px;"&gt;&lt;span style="color: #999999; font-family: arial, helvetica, sans-serif;"&gt;Gerencia de Procesos de Sistemas&lt;/span&gt;&lt;/span&gt;&lt;/div&gt;&lt;div style="font-size: 12.8px;"&gt;&lt;div style="font-size: 12.8px;"&gt;&lt;div style="font-size: 12.8px;"&gt;&lt;span style="color: #999999; font-size: 12.8px;"&gt;&lt;span style="font-family: arial, helvetica, sans-serif;"&gt;+58 212-238.88.11 / ext. 2473&lt;/span&gt;&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;&lt;div style="font-size: 12.8px;"&gt;&lt;span style="color: #999999; font-family: arial, helvetica, sans-serif;"&gt;&lt;strong&gt;&lt;a style="color: #1155cc;" href="http://www.beco.com.ve/" target="_blank" rel="noopener"&gt;www.becocompania.com.ve&lt;/a&gt; &lt;/strong&gt;&lt;/span&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;div style="text-align: center;"&gt; &lt;/div&gt;&lt;div style="text-align: left;"&gt;&lt;img src="https://docs.google.com/uc?export=download&amp;id=172JG_4TbPPOrPDxLywI71VwldSn1oPKF&amp;revid=0B58Ka6L7w8a8MjVlb2xRSC94UTNpaTdRSGxZK1pUNzZMeEU4PQ" alt="image" /&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;', 'Principal', 'Ramo Moda', 'Abstracta', '14406213', 'Computadores y Perifericos > Traslados/movimientos', 'Medium', 'José José, González Rodríguez ( INT-VE-347 )', '2019-11-03', '2020-02-18', '2020-02-12', '2020-02-18', '00:00:00', NULL, '5f2cb13205707b7ec6c42615');
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;

-- Volcando estructura para tabla dbgestionocupacion.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `usr_id` int(11) NOT NULL AUTO_INCREMENT,
  `usr_name` varchar(45) DEFAULT NULL,
  `usr_email` varchar(45) DEFAULT NULL,
  `usr_ci` varchar(20) DEFAULT NULL,
  `usr_id_trello` int(11) DEFAULT NULL,
  `usr_id_clockify` int(11) DEFAULT NULL,
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla dbgestionocupacion.user: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`usr_id`, `usr_name`, `usr_email`, `usr_ci`, `usr_id_trello`, `usr_id_clockify`) VALUES
	(1, 'Enmanuel Leon', 'eleon@intelix.biz', NULL, NULL, NULL),
	(2, 'Alejandro Sanchez', 'asanchezb@intelix.biz', NULL, NULL, NULL),
	(3, 'Alejandro Gonzalez', 'agonzalez@intelix.biz', NULL, NULL, NULL),
	(4, 'Angel Narvaez', 'anarvaez@intelix.biz', NULL, NULL, NULL),
	(5, 'Ramon Vielma', 'rvielma94@gmail.com', NULL, NULL, NULL),
	(6, 'Juan Rodriguez', 'juanchojjrc@gmail.com', NULL, NULL, NULL),
	(7, 'Enmanuel Leon', 'eleon@intelix.biz', NULL, NULL, NULL),
	(8, 'José José, González Rodríguez ( INT-VE-347 )', NULL, '14406213', NULL, NULL),
	(9, 'Torres Galarraga, Pedro Elías ( INT-VE-53 )', NULL, '18760371', NULL, NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
