SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "-03:00";

CREATE TABLE `customer` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `district` varchar(255) DEFAULT '',
  `cep` varchar(255) DEFAULT '',
  `adress` varchar(255) DEFAULT '',
  `number` varchar(255) DEFAULT '',
  `complement` varchar(255) DEFAULT '',
  `name` varchar(255) DEFAULT '',
  `email` varchar(255) DEFAULT '',
  `phone` varchar(255) DEFAULT '',
  `note` varchar(255) DEFAULT '',
  `delet` enum('','*') NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;