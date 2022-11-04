CREATE TABLE `answer_record` (
                                 `id` varchar(60) NOT NULL,
                                 `question_id` varchar(60) DEFAULT NULL,
                                 `person_id` varchar(60) DEFAULT NULL,
                                 `start_time` datetime DEFAULT NULL,
                                 `end_time` datetime DEFAULT NULL,
                                 `ip_address` varchar(30) DEFAULT NULL,
                                 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

insert  into `answer_record`(`id`,`question_id`,`person_id`,`start_time`,`end_time`,`ip_address`) values ('8e536d5a67794204b511f56b4b9a6753','a16ea92ca99b4077a8aa0f1c1cdae555','2','2022-06-24 15:40:56','2022-06-24 15:41:41','111.29.104.130');

CREATE TABLE `answer_result` (
                                 `id` varchar(60) NOT NULL,
                                 `problem_id` varchar(60) DEFAULT NULL,
                                 `person_id` varchar(60) DEFAULT NULL,
                                 `value` text,
                                 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

insert  into `answer_result`(`id`,`problem_id`,`person_id`,`value`) values ('008dc95cf6434bb5b7f8ccbbec87fe50','dbae94f597174aeeb34f948f97b97768','2','3');
insert  into `answer_result`(`id`,`problem_id`,`person_id`,`value`) values ('1a7b8ade21f94edf8fdfb571a45ff2a2','aaee61f1f6164d1db4f566659351a058','2','1');
insert  into `answer_result`(`id`,`problem_id`,`person_id`,`value`) values ('6e53d9912b734d3bbbf0ec20cbccfd50','18ba244b650e450184c901298c806252','2','锄禾日当午，汗滴禾下土');
insert  into `answer_result`(`id`,`problem_id`,`person_id`,`value`) values ('cbb82016aae94c38b2fde95461222166','785e67fb879646729eff4d9f295b6262','2','1@@2@@3');
insert  into `answer_result`(`id`,`problem_id`,`person_id`,`value`) values ('d88179aa6ee041b6bbbb7b38cc77c8bc','ca97c5695e2e43528a5431d628af8ad6','2','5');

CREATE TABLE `problem` (
                           `id` varchar(64) NOT NULL,
                           `question_title` varchar(255) NOT NULL,
                           `question_type` tinyint(1) NOT NULL,
                           `question_option` text,
                           `questionnaire_id` varchar(64) NOT NULL,
                           `required` varchar(10) DEFAULT NULL,
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('18ba244b650e450184c901298c806252','测试填空题',2,'[]','a16ea92ca99b4077a8aa0f1c1cdae555','1');
insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('25ffb69239bb41f0ab504ccf07fc76fb','测试量表',4,'[{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"很满意\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"5\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"4\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"3\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"2\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"1\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"很不满意\",\"value\":0}]','d2e99fca74484b118821861ce0b0190d','1');
insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('4e09200c718e42c58dc88d645118e724','测试多选题',1,'[{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"1\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"2\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"3\",\"value\":0}]','d2e99fca74484b118821861ce0b0190d','1');
insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('785e67fb879646729eff4d9f295b6262','测试多选题',1,'[{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"1\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"2\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"3\",\"value\":0}]','a16ea92ca99b4077a8aa0f1c1cdae555','1');
insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('97b72e8b6af3422bae844b002b6a2feb','测试单选题',0,'[{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"1\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"2\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"3\",\"value\":0}]','d2e99fca74484b118821861ce0b0190d','1');
insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('a662b15a5dde4623b415ccaeaeb0c6b4','测试矩阵',3,'[{\"lineTitle\":\"测试矩阵\",\"optionGrade\":\"\",\"optionWord\":\"1\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"2\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"3\",\"value\":0}]','d2e99fca74484b118821861ce0b0190d','1');
insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('aaee61f1f6164d1db4f566659351a058','测试矩阵',3,'[{\"lineTitle\":\"测试矩阵\",\"optionGrade\":\"\",\"optionWord\":\"1\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"2\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"3\",\"value\":0}]','a16ea92ca99b4077a8aa0f1c1cdae555','1');
insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('b15ae4283db2411b91bb57c9690784b0','测试填空题',2,'[]','d2e99fca74484b118821861ce0b0190d','1');
insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('ca97c5695e2e43528a5431d628af8ad6','测试量表',4,'[{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"很满意\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"5\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"4\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"3\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"2\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"1\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"很不满意\",\"value\":0}]','a16ea92ca99b4077a8aa0f1c1cdae555','1');
insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('dbae94f597174aeeb34f948f97b97768','测试单选题',0,'[{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"1\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"2\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"3\",\"value\":0}]','a16ea92ca99b4077a8aa0f1c1cdae555','1');

CREATE TABLE `project_info` (
                                `id` varchar(50) NOT NULL COMMENT '项目表主键',
                                `user_id` varchar(50) DEFAULT NULL COMMENT '用户id（没有用）',
                                `project_name` varchar(100) DEFAULT NULL COMMENT '项目名称',
                                `project_content` text COMMENT '项目说明',
                                `created_by` char(32) DEFAULT NULL COMMENT '创建人',
                                `creation_date` datetime DEFAULT NULL COMMENT '创建时间',
                                `last_updated_by` char(32) DEFAULT NULL COMMENT '最后修改人',
                                `last_update_date` datetime DEFAULT NULL COMMENT '最后修改时间',
                                PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

insert  into `project_info`(`id`,`user_id`,`project_name`,`project_content`,`created_by`,`creation_date`,`last_updated_by`,`last_update_date`) values ('11504e1f958a4069bc557c797d73099e','91a9151efe9a45e5bbb786a55101fcb6','项目','项目','admin','2022-06-24 15:34:55','admin','2022-06-24 15:34:55');
insert  into `project_info`(`id`,`user_id`,`project_name`,`project_content`,`created_by`,`creation_date`,`last_updated_by`,`last_update_date`) values ('bde064b9012341e5b922c7fea3b15fa5','d8e97768737c4d27a4bf64db788dc2bb','项目二','项目二','admin','2022-06-24 15:35:03','admin','2022-06-24 15:35:03');

CREATE TABLE `questionnaire_info` (
                                      `id` varchar(64) NOT NULL,
                                      `question_name` varchar(255) NOT NULL,
                                      `question_content` varchar(255) NOT NULL,
                                      `creation_date` datetime DEFAULT NULL,
                                      `created_By` varchar(50) DEFAULT NULL,
                                      `last_updated_by` varchar(50) DEFAULT NULL,
                                      `last_update_date` datetime DEFAULT NULL,
                                      `data_id` varchar(50) DEFAULT NULL,
                                      `start_time` datetime DEFAULT NULL,
                                      `end_time` datetime DEFAULT NULL,
                                      `status` tinyint(1) DEFAULT NULL,
                                      `question_end_content` varchar(255) DEFAULT NULL,
                                      `release_time` datetime DEFAULT NULL,
                                      `project_id` varchar(60) DEFAULT NULL,
                                      `project_name` varchar(255) DEFAULT NULL,
                                      `email_title` varchar(255) DEFAULT NULL,
                                      `email_content` text,
                                      PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

insert  into `questionnaire_info`(`id`,`question_name`,`question_content`,`creation_date`,`created_By`,`last_updated_by`,`last_update_date`,`data_id`,`start_time`,`end_time`,`status`,`question_end_content`,`release_time`,`project_id`,`project_name`,`email_title`,`email_content`) values ('a16ea92ca99b4077a8aa0f1c1cdae555','测试2','测试2','2022-06-24 15:39:22','admin','admin','2022-06-24 15:39:22','1','2022-06-23 00:00:00','2022-06-30 16:08:00',2,'答完了','2022-06-24 15:39:47','bde064b9012341e5b922c7fea3b15fa5','项目二','邮箱测试','<div style=\"line-height: 24px;\">亲爱的<span style=\"color:#003cff;\">【联系人姓名】</span>，您好！<br>请抽空填写一下我的问卷<b>。<br>您的意见对我非常重要，谢谢！<br>问卷地址：<a href=\'【填写问卷地址】\' target=\'_blank\' class=\"link underline\">【填写问卷地址】</a><br><span style=\"color:#ff6161;\"><b>提示：此问卷地址仅允许填写一次，请勿转发给其他人。</b></span><br/>祝： 开心！<br/></div>');
insert  into `questionnaire_info`(`id`,`question_name`,`question_content`,`creation_date`,`created_By`,`last_updated_by`,`last_update_date`,`data_id`,`start_time`,`end_time`,`status`,`question_end_content`,`release_time`,`project_id`,`project_name`,`email_title`,`email_content`) values ('d2e99fca74484b118821861ce0b0190d','测试','测试','2022-06-24 15:36:38','admin','admin','2022-06-24 15:36:38','1','2022-06-23 00:00:00','2022-07-02 15:35:18',2,'答完了','2022-06-24 15:37:45','11504e1f958a4069bc557c797d73099e','项目','邮箱测试','<div style=\"line-height: 24px;\">亲爱的<span style=\"color:#003cff;\">【联系人姓名】</span>，您好！<br>请抽空填写一下我的问卷<b>。<br>您的意见对我非常重要，谢谢！<br>问卷地址：<a href=\'【填写问卷地址】\' target=\'_blank\' class=\"link underline\">【填写问卷地址】</a><br><span style=\"color:#ff6161;\"><b>提示：此问卷地址仅允许填写一次，请勿转发给其他人。</b></span><br/>祝： 开心！<br/></div>');

CREATE TABLE `send_record` (
                               `id` varchar(60) NOT NULL,
                               `data_id` tinyint(1) DEFAULT NULL,
                               `release_time` datetime DEFAULT NULL,
                               `send_type` tinyint(1) DEFAULT NULL,
                               `person_id` varchar(60) DEFAULT NULL,
                               `questionnaire_id` varchar(60) DEFAULT NULL,
                               PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

insert  into `send_record`(`id`,`data_id`,`release_time`,`send_type`,`person_id`,`questionnaire_id`) values ('2a9a7dd0a07641a2af0e78b0f630eeea',1,'2022-06-24 15:37:45',1,'2','d2e99fca74484b118821861ce0b0190d');
insert  into `send_record`(`id`,`data_id`,`release_time`,`send_type`,`person_id`,`questionnaire_id`) values ('e43dc6de816847e09870082085804d0d',1,'2022-06-24 15:39:47',1,'2','a16ea92ca99b4077a8aa0f1c1cdae555');

CREATE TABLE `student` (
                           `id` varchar(60) NOT NULL,
                           `name` varchar(60) DEFAULT NULL,
                           `college` varchar(60) DEFAULT NULL,
                           `major` varchar(60) DEFAULT NULL,
                           `clazz` varchar(60) DEFAULT NULL,
                           `gender` char(2) DEFAULT NULL,
                           `wx_id` varchar(60) DEFAULT NULL,
                           `qq` varchar(10) DEFAULT NULL,
                           `phone` varchar(11) DEFAULT NULL,
                           `email` varchar(50) DEFAULT NULL,
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

insert  into `student`(`id`,`name`,`college`,`major`,`clazz`,`gender`,`wx_id`,`qq`,`phone`,`email`) values ('2','李四','北大','软件工程','1班','男','123123','123456','12345678912','qianyangblog@qq.com');

CREATE TABLE `teacher` (
                           `id` varchar(60) NOT NULL,
                           `name` varchar(60) DEFAULT NULL,
                           `college` varchar(60) DEFAULT NULL,
                           `gender` char(2) DEFAULT NULL,
                           `wx_id` varchar(60) DEFAULT NULL,
                           `qq` varchar(10) DEFAULT NULL,
                           `phone` varchar(11) DEFAULT NULL,
                           `email` varchar(50) DEFAULT NULL,
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `user_info` (
                             `id` varchar(50) NOT NULL COMMENT '用户表主键',
                             `username` varchar(10) DEFAULT NULL COMMENT '用户名',
                             `password` varchar(10) DEFAULT NULL COMMENT '密码',
                             `start_time` datetime DEFAULT NULL COMMENT '开始时间',
                             `stop_time` datetime DEFAULT NULL COMMENT '截止时间（时间戳）',
                             `status` varchar(2) DEFAULT NULL COMMENT '是否启用（1启用，0不启用）',
                             `created_by` char(32) DEFAULT NULL COMMENT '创建人',
                             `creation_date` datetime DEFAULT NULL COMMENT '创建时间',
                             `last_updated_by` char(32) DEFAULT NULL COMMENT '最后修改人',
                             `last_update_date` datetime DEFAULT NULL COMMENT '最后修改时间',
                             PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

insert  into `user_info`(`id`,`username`,`password`,`start_time`,`stop_time`,`status`,`created_by`,`creation_date`,`last_updated_by`,`last_update_date`) values ('8ceeee2995f3459ba1955f85245dc7a5','admin','1','2018-12-04 21:40:05','2021-09-27 21:40:00','1','admin','2018-10-22 09:12:40','admin','2018-12-04 21:40:13');








-- /*
-- SQLyog Ultimate v12.09 (64 bit)
-- MySQL - 5.5.27 : Database - questionnaire
-- *********************************************************************
-- */
--
--
-- /*!40101 SET NAMES utf8 */;
--
-- /*!40101 SET SQL_MODE=''*/;
--
-- /*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
-- /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
-- CREATE DATABASE /*!32312 IF NOT EXISTS*/`questionnaire` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
--
-- /*Table structure for table `answer_record` */
--
-- CREATE TABLE `answer_record` (
--   `id` varchar(60) NOT NULL,
--   `question_id` varchar(60) DEFAULT NULL,
--   `person_id` varchar(60) DEFAULT NULL,
--   `start_time` datetime DEFAULT NULL,
--   `end_time` datetime DEFAULT NULL,
--   `ip_address` varchar(30) DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--
-- /*Data for the table `answer_record` */
--
-- insert  into `answer_record`(`id`,`question_id`,`person_id`,`start_time`,`end_time`,`ip_address`) values ('8e536d5a67794204b511f56b4b9a6753','a16ea92ca99b4077a8aa0f1c1cdae555','2','2022-06-24 15:40:56','2022-06-24 15:41:41','111.29.104.130');
--
-- /*Table structure for table `answer_result` */
--
-- CREATE TABLE `answer_result` (
--   `id` varchar(60) NOT NULL,
--   `problem_id` varchar(60) DEFAULT NULL,
--   `person_id` varchar(60) DEFAULT NULL,
--   `value` text,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--
-- /*Data for the table `answer_result` */
--
-- insert  into `answer_result`(`id`,`problem_id`,`person_id`,`value`) values ('008dc95cf6434bb5b7f8ccbbec87fe50','dbae94f597174aeeb34f948f97b97768','2','3');
-- insert  into `answer_result`(`id`,`problem_id`,`person_id`,`value`) values ('1a7b8ade21f94edf8fdfb571a45ff2a2','aaee61f1f6164d1db4f566659351a058','2','1');
-- insert  into `answer_result`(`id`,`problem_id`,`person_id`,`value`) values ('6e53d9912b734d3bbbf0ec20cbccfd50','18ba244b650e450184c901298c806252','2','锄禾日当午，汗滴禾下土');
-- insert  into `answer_result`(`id`,`problem_id`,`person_id`,`value`) values ('cbb82016aae94c38b2fde95461222166','785e67fb879646729eff4d9f295b6262','2','1@@2@@3');
-- insert  into `answer_result`(`id`,`problem_id`,`person_id`,`value`) values ('d88179aa6ee041b6bbbb7b38cc77c8bc','ca97c5695e2e43528a5431d628af8ad6','2','5');
--
-- /*Table structure for table `problem` */
--
-- CREATE TABLE `problem` (
--   `id` varchar(64) NOT NULL,
--   `question_title` varchar(255) NOT NULL,
--   `question_type` tinyint(1) NOT NULL,
--   `question_option` text,
--   `questionnaire_id` varchar(64) NOT NULL,
--   `required` varchar(10) DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--
-- /*Data for the table `problem` */
--
-- insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('18ba244b650e450184c901298c806252','测试填空题',2,'[]','a16ea92ca99b4077a8aa0f1c1cdae555','1');
-- insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('25ffb69239bb41f0ab504ccf07fc76fb','测试量表',4,'[{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"很满意\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"5\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"4\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"3\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"2\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"1\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"很不满意\",\"value\":0}]','d2e99fca74484b118821861ce0b0190d','1');
-- insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('4e09200c718e42c58dc88d645118e724','测试多选题',1,'[{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"1\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"2\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"3\",\"value\":0}]','d2e99fca74484b118821861ce0b0190d','1');
-- insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('785e67fb879646729eff4d9f295b6262','测试多选题',1,'[{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"1\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"2\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"3\",\"value\":0}]','a16ea92ca99b4077a8aa0f1c1cdae555','1');
-- insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('97b72e8b6af3422bae844b002b6a2feb','测试单选题',0,'[{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"1\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"2\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"3\",\"value\":0}]','d2e99fca74484b118821861ce0b0190d','1');
-- insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('a662b15a5dde4623b415ccaeaeb0c6b4','测试矩阵',3,'[{\"lineTitle\":\"测试矩阵\",\"optionGrade\":\"\",\"optionWord\":\"1\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"2\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"3\",\"value\":0}]','d2e99fca74484b118821861ce0b0190d','1');
-- insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('aaee61f1f6164d1db4f566659351a058','测试矩阵',3,'[{\"lineTitle\":\"测试矩阵\",\"optionGrade\":\"\",\"optionWord\":\"1\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"2\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"3\",\"value\":0}]','a16ea92ca99b4077a8aa0f1c1cdae555','1');
-- insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('b15ae4283db2411b91bb57c9690784b0','测试填空题',2,'[]','d2e99fca74484b118821861ce0b0190d','1');
-- insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('ca97c5695e2e43528a5431d628af8ad6','测试量表',4,'[{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"很满意\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"5\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"4\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"3\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"2\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"1\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"很不满意\",\"value\":0}]','a16ea92ca99b4077a8aa0f1c1cdae555','1');
-- insert  into `problem`(`id`,`question_title`,`question_type`,`question_option`,`questionnaire_id`,`required`) values ('dbae94f597174aeeb34f948f97b97768','测试单选题',0,'[{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"1\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"2\",\"value\":0},{\"lineTitle\":\"\",\"optionGrade\":\"\",\"optionWord\":\"3\",\"value\":0}]','a16ea92ca99b4077a8aa0f1c1cdae555','1');
--
-- /*Table structure for table `project_info` */
--
-- CREATE TABLE `project_info` (
--   `id` varchar(50) NOT NULL COMMENT '项目表主键',
--   `user_id` varchar(50) DEFAULT NULL COMMENT '用户id（没有用）',
--   `project_name` varchar(100) DEFAULT NULL COMMENT '项目名称',
--   `project_content` text COMMENT '项目说明',
--   `created_by` char(32) DEFAULT NULL COMMENT '创建人',
--   `creation_date` datetime DEFAULT NULL COMMENT '创建时间',
--   `last_updated_by` char(32) DEFAULT NULL COMMENT '最后修改人',
--   `last_update_date` datetime DEFAULT NULL COMMENT '最后修改时间',
--   PRIMARY KEY (`id`) USING BTREE
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
--
-- /*Data for the table `project_info` */
--
-- insert  into `project_info`(`id`,`user_id`,`project_name`,`project_content`,`created_by`,`creation_date`,`last_updated_by`,`last_update_date`) values ('11504e1f958a4069bc557c797d73099e','91a9151efe9a45e5bbb786a55101fcb6','项目','项目','admin','2022-06-24 15:34:55','admin','2022-06-24 15:34:55');
-- insert  into `project_info`(`id`,`user_id`,`project_name`,`project_content`,`created_by`,`creation_date`,`last_updated_by`,`last_update_date`) values ('bde064b9012341e5b922c7fea3b15fa5','d8e97768737c4d27a4bf64db788dc2bb','项目二','项目二','admin','2022-06-24 15:35:03','admin','2022-06-24 15:35:03');
--
-- /*Table structure for table `questionnaire_info` */
--
-- CREATE TABLE `questionnaire_info` (
--   `id` varchar(64) NOT NULL,
--   `question_name` varchar(255) NOT NULL,
--   `question_content` varchar(255) NOT NULL,
--   `creation_date` datetime DEFAULT NULL,
--   `created_By` varchar(50) DEFAULT NULL,
--   `last_updated_by` varchar(50) DEFAULT NULL,
--   `last_update_date` datetime DEFAULT NULL,
--   `data_id` varchar(50) DEFAULT NULL,
--   `start_time` datetime DEFAULT NULL,
--   `end_time` datetime DEFAULT NULL,
--   `status` tinyint(1) DEFAULT NULL,
--   `question_end_content` varchar(255) DEFAULT NULL,
--   `release_time` datetime DEFAULT NULL,
--   `project_id` varchar(60) DEFAULT NULL,
--   `project_name` varchar(255) DEFAULT NULL,
--   `email_title` varchar(255) DEFAULT NULL,
--   `email_content` text,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--
-- /*Data for the table `questionnaire_info` */
--
-- insert  into `questionnaire_info`(`id`,`question_name`,`question_content`,`creation_date`,`created_By`,`last_updated_by`,`last_update_date`,`data_id`,`start_time`,`end_time`,`status`,`question_end_content`,`release_time`,`project_id`,`project_name`,`email_title`,`email_content`) values ('a16ea92ca99b4077a8aa0f1c1cdae555','测试2','测试2','2022-06-24 15:39:22','admin','admin','2022-06-24 15:39:22','1','2022-06-23 00:00:00','2022-06-30 16:08:00',2,'答完了','2022-06-24 15:39:47','bde064b9012341e5b922c7fea3b15fa5','项目二','邮箱测试','<div style=\"line-height: 24px;\">亲爱的<span style=\"color:#003cff;\">【联系人姓名】</span>，您好！<br>请抽空填写一下我的问卷<b>。<br>您的意见对我非常重要，谢谢！<br>问卷地址：<a href=\'【填写问卷地址】\' target=\'_blank\' class=\"link underline\">【填写问卷地址】</a><br><span style=\"color:#ff6161;\"><b>提示：此问卷地址仅允许填写一次，请勿转发给其他人。</b></span><br/>祝： 开心！<br/></div>');
-- insert  into `questionnaire_info`(`id`,`question_name`,`question_content`,`creation_date`,`created_By`,`last_updated_by`,`last_update_date`,`data_id`,`start_time`,`end_time`,`status`,`question_end_content`,`release_time`,`project_id`,`project_name`,`email_title`,`email_content`) values ('d2e99fca74484b118821861ce0b0190d','测试','测试','2022-06-24 15:36:38','admin','admin','2022-06-24 15:36:38','1','2022-06-23 00:00:00','2022-07-02 15:35:18',2,'答完了','2022-06-24 15:37:45','11504e1f958a4069bc557c797d73099e','项目','邮箱测试','<div style=\"line-height: 24px;\">亲爱的<span style=\"color:#003cff;\">【联系人姓名】</span>，您好！<br>请抽空填写一下我的问卷<b>。<br>您的意见对我非常重要，谢谢！<br>问卷地址：<a href=\'【填写问卷地址】\' target=\'_blank\' class=\"link underline\">【填写问卷地址】</a><br><span style=\"color:#ff6161;\"><b>提示：此问卷地址仅允许填写一次，请勿转发给其他人。</b></span><br/>祝： 开心！<br/></div>');
--
-- /*Table structure for table `send_record` */
--
-- CREATE TABLE `send_record` (
--   `id` varchar(60) NOT NULL,
--   `data_id` tinyint(1) DEFAULT NULL,
--   `release_time` datetime DEFAULT NULL,
--   `send_type` tinyint(1) DEFAULT NULL,
--   `person_id` varchar(60) DEFAULT NULL,
--   `questionnaire_id` varchar(60) DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--
-- /*Data for the table `send_record` */
--
-- insert  into `send_record`(`id`,`data_id`,`release_time`,`send_type`,`person_id`,`questionnaire_id`) values ('2a9a7dd0a07641a2af0e78b0f630eeea',1,'2022-06-24 15:37:45',1,'2','d2e99fca74484b118821861ce0b0190d');
-- insert  into `send_record`(`id`,`data_id`,`release_time`,`send_type`,`person_id`,`questionnaire_id`) values ('e43dc6de816847e09870082085804d0d',1,'2022-06-24 15:39:47',1,'2','a16ea92ca99b4077a8aa0f1c1cdae555');
--
-- /*Table structure for table `student` */
--
-- CREATE TABLE `student` (
--   `id` varchar(60) NOT NULL,
--   `name` varchar(60) DEFAULT NULL,
--   `college` varchar(60) DEFAULT NULL,
--   `major` varchar(60) DEFAULT NULL,
--   `clazz` varchar(60) DEFAULT NULL,
--   `gender` char(2) DEFAULT NULL,
--   `wx_id` varchar(60) DEFAULT NULL,
--   `qq` varchar(10) DEFAULT NULL,
--   `phone` varchar(11) DEFAULT NULL,
--   `email` varchar(50) DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--
-- /*Data for the table `student` */
--
-- insert  into `student`(`id`,`name`,`college`,`major`,`clazz`,`gender`,`wx_id`,`qq`,`phone`,`email`) values ('2','李四','北大','软件工程','1班','男','123123','123456','12345678912','qianyangblog@qq.com');
--
-- /*Table structure for table `teacher` */
--
-- CREATE TABLE `teacher` (
--   `id` varchar(60) NOT NULL,
--   `name` varchar(60) DEFAULT NULL,
--   `college` varchar(60) DEFAULT NULL,
--   `gender` char(2) DEFAULT NULL,
--   `wx_id` varchar(60) DEFAULT NULL,
--   `qq` varchar(10) DEFAULT NULL,
--   `phone` varchar(11) DEFAULT NULL,
--   `email` varchar(50) DEFAULT NULL,
--   PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--
-- /*Data for the table `teacher` */
--
-- /*Table structure for table `user_info` */
--
-- CREATE TABLE `user_info` (
--   `id` varchar(50) NOT NULL COMMENT '用户表主键',
--   `username` varchar(10) DEFAULT NULL COMMENT '用户名',
--   `password` varchar(10) DEFAULT NULL COMMENT '密码',
--   `start_time` datetime DEFAULT NULL COMMENT '开始时间',
--   `stop_time` datetime DEFAULT NULL COMMENT '截止时间（时间戳）',
--   `status` varchar(2) DEFAULT NULL COMMENT '是否启用（1启用，0不启用）',
--   `created_by` char(32) DEFAULT NULL COMMENT '创建人',
--   `creation_date` datetime DEFAULT NULL COMMENT '创建时间',
--   `last_updated_by` char(32) DEFAULT NULL COMMENT '最后修改人',
--   `last_update_date` datetime DEFAULT NULL COMMENT '最后修改时间',
--   PRIMARY KEY (`id`) USING BTREE
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
--
-- /*Data for the table `user_info` */
--
-- insert  into `user_info`(`id`,`username`,`password`,`start_time`,`stop_time`,`status`,`created_by`,`creation_date`,`last_updated_by`,`last_update_date`) values ('8ceeee2995f3459ba1955f85245dc7a5','admin','1','2018-12-04 21:40:05','2021-09-27 21:40:00','1','admin','2018-10-22 09:12:40','admin','2018-12-04 21:40:13');
--
-- /* Procedure structure for procedure `demo_in_parameter` */
--
-- DELIMITER $$
--
-- /*!50003 CREATE DEFINER=`edu`@`%` PROCEDURE `demo_in_parameter`(IN p_in int)
-- BEGIN
-- SELECT p_in;
-- SET p_in = 2;
-- SELECT p_in;
-- END */$$
-- DELIMITER ;
--
-- /* Procedure structure for procedure `sp_name` */
--
-- DELIMITER $$
--
-- /*!50003 CREATE DEFINER=`edu`@`%` PROCEDURE `sp_name`(in id int)
-- begin
-- SELECT id;
-- set id = 2;
-- SELECT id;
-- end */$$
-- DELIMITER ;
--
-- /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
-- /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
-- /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
