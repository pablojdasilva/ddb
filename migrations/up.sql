CREATE DATABASE `ddb-admin`;
-- `ddb-admin`.Team definition

CREATE TABLE `ddb-admin`.Team (
	Id BIGINT auto_increment NOT NULL,
	Name varchar(20) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
	LogoUrl varchar(200) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
	Website varchar(200) NOT NULL,
	UpdatedDate DATETIME NOT NULL,
	CreatedDate DATETIME NOT NULL,
	CONSTRAINT Team_PK PRIMARY KEY (Id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci;
DROP TABLE IF EXISTS `ddb-admin`.Team;


-- `ddb-admin`.Player definition

CREATE TABLE `ddb-admin`.Player (
	Id BIGINT auto_increment NOT NULL,
	TeamId BIGINT NULL,
	Name varchar(100) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
	Nickname varchar(25) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
	PictureUrl varchar(200) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
	CreatedDate DATETIME NOT NULL,
	UpdatedDate DATETIME NOT NULL,
	CONSTRAINT Player_PK PRIMARY KEY (Id),
	CONSTRAINT Player_Player_FK FOREIGN KEY (TeamId) REFERENCES `ddb-admin`.Player(Id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci;

CREATE DATABASE `ddb-ranking` /*!40100 DEFAULT CHARACTER SET latin1 */;


-- `ddb-ranking`.TeamRanking definition

CREATE TABLE `ddb-ranking`.TeamRanking (
	Id BIGINT auto_increment NOT NULL,
	TeamId BIGINT NOT NULL,
	`Position` BIGINT NOT NULL,
	Points BIGINT NOT NULL,
	Week BIGINT NOT NULL,
	`Year` BIGINT NOT NULL,
	CreatedDate DATETIME NOT NULL,
	UpdatedDate DATETIME NOT NULL,
	CONSTRAINT TeamRanking_PK PRIMARY KEY (Id),
	CONSTRAINT TeamRanking_Team_FK FOREIGN KEY (Id) REFERENCES `ddb-admin`.Team(Id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci;


-- `ddb-ranking`.PlayerRanking definition

CREATE TABLE `ddb-ranking`.PlayerRanking (
	Id BIGINT auto_increment NOT NULL,
	PlayerId BIGINT NOT NULL,
	`Position` BIGINT NOT NULL,
	Points BIGINT NOT NULL,
	Week BIGINT NOT NULL,
	`Year` BIGINT NOT NULL,
	CreatedDate DATETIME NOT NULL,
	UpdatedDate DATETIME NOT NULL,
	CONSTRAINT PlayerRanking_PK PRIMARY KEY (Id),
	CONSTRAINT PlayerRanking_Player_FK FOREIGN KEY (Id) REFERENCES `ddb-admin`.Player(Id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci;



CREATE DATABASE `ddb`;

-- ddb.Gender definition

CREATE TABLE ddb.Gender (
	Id BIGINT auto_increment NOT NULL,
	Name varchar(20) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
	CONSTRAINT Gender_PK PRIMARY KEY (Id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci;



-- ddb.`User` definition

CREATE TABLE `ddb.User` (
      `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` varchar(200) CHARACTER SET ascii NOT NULL,
  `Email` varchar(100) CHARACTER SET ascii NOT NULL,
  `PictureUrl` varchar(200) CHARACTER SET ascii DEFAULT NULL,
  `CreatedDate` datetime NOT NULL,
  `UpdatedDate` datetime NOT NULL,
  `GenderId` bigint(20) NOT NULL,
  PRIMARY KEY (`Id`),
  CONSTRAINT `User_Gender_FK` FOREIGN KEY (`Id`) REFERENCES `Gender` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3333 DEFAULT CHARSET=latin1;


-- ddb.TeamsOfTheWeek definition

CREATE TABLE ddb.TeamsOfTheWeek (
	Id BIGINT auto_increment NOT NULL,
	TeamId BIGINT NOT NULL,
	Week BIGINT NOT NULL,
	`Year` BIGINT NOT NULL,
	CreatedDate DATETIME NOT NULL,
	UpdatedDate DATETIME NOT NULL,
	CONSTRAINT TeamsOfTheWeek_PK PRIMARY KEY (Id),
	CONSTRAINT TeamsOfTheWeek_Team_FK FOREIGN KEY (Id) REFERENCES `ddb-admin`.Team(Id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci;


-- ddb.PlayersOfTheWeek definition

CREATE TABLE ddb.PlayersOfTheWeek (
	Id BIGINT auto_increment NOT NULL,
	PlayerId BIGINT NOT NULL,
	Week BIGINT NOT NULL,
	`Year` BIGINT NOT NULL,
	CreatedDate DATETIME NOT NULL,
	UpdatedDate DATETIME NOT NULL,
	CONSTRAINT PlayersOfTheWeek_PK PRIMARY KEY (Id),
	CONSTRAINT PlayersOfTheWeek_Player_FK FOREIGN KEY (Id) REFERENCES `ddb-admin`.Player(Id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci;


-- ddb.UserTeamRankingVote definition

CREATE TABLE ddb.UserTeamRankingVote (
	Id BIGINT auto_increment NOT NULL,
	TeamsOfTheWeekId BIGINT NOT NULL,
	TeamId BIGINT NOT NULL,
	UserId BIGINT NOT NULL,
	`Position` BIGINT NOT NULL,
	CreatedDate DATETIME NOT NULL,
	UpdatedDate DATETIME NOT NULL,
	CONSTRAINT UserTeamRankingVote_PK PRIMARY KEY (Id),
	CONSTRAINT UserTeamRankingVote_TeamsOfTheWeekId_FK FOREIGN KEY (Id) REFERENCES ddb.TeamsOfTheWeek(Id),
    CONSTRAINT UserTeamRankingVote_Team_FK FOREIGN KEY (Id) REFERENCES `ddb-admin`.Team(Id),
	CONSTRAINT UserTeamRankingVote_User_FK FOREIGN KEY (Id) REFERENCES ddb.`User`(Id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci;

-- ddb.UserPlayerRankingVote definition

CREATE TABLE ddb.UserPlayerRankingVote (
	Id BIGINT auto_increment NOT NULL,
	PlayerId BIGINT NOT NULL,
	PlayersOfTheWeekId BIGINT NOT NULL,
	UserId BIGINT NOT NULL,
	`Position` BIGINT NOT NULL,
	CreatedDate DATETIME NOT NULL,
	UpdatedDate DATETIME NOT NULL,
	CONSTRAINT UserPlayerRankingVote_PK PRIMARY KEY (Id),
	CONSTRAINT UserPlayerRankingVote_Player_FK FOREIGN KEY (Id) REFERENCES `ddb-admin`.Player(Id),
	CONSTRAINT UserPlayerRankingVote_PlayersOfTheWeekId_FK FOREIGN KEY (Id) REFERENCES ddb.PlayersOfTheWeek(Id),
	CONSTRAINT UserPlayerRankingVote_User_FK FOREIGN KEY (Id) REFERENCES ddb.`User`(Id)
)
ENGINE=InnoDB
DEFAULT CHARSET=latin1
COLLATE=latin1_swedish_ci;