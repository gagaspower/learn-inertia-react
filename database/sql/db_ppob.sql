/*
 Navicat Premium Data Transfer

 Source Server         : PHP 8 3
 Source Server Type    : MySQL
 Source Server Version : 80030
 Source Host           : localhost:3307
 Source Schema         : react_inertia

 Target Server Type    : MySQL
 Target Server Version : 80030
 File Encoding         : 65001

 Date: 11/09/2024 14:18:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_payments
-- ----------------------------
DROP TABLE IF EXISTS `admin_payments`;
CREATE TABLE `admin_payments`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `bank_payment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount_payment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `notes_payment` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_payments
-- ----------------------------
INSERT INTO `admin_payments` VALUES (1, 'MANDIRI', '200000', 'DR6YWML10', '2024-09-10 13:04:30', '2024-09-10 13:04:30');

-- ----------------------------
-- Table structure for brands
-- ----------------------------
DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `brand_logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `brands_brand_name_unique`(`brand_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of brands
-- ----------------------------
INSERT INTO `brands` VALUES (3, 'AXIS', 'Prabayar', '1725676254.png', '2024-09-07 02:30:21', '2024-09-07 02:30:54');

-- ----------------------------
-- Table structure for cache
-- ----------------------------
DROP TABLE IF EXISTS `cache`;
CREATE TABLE `cache`  (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cache
-- ----------------------------

-- ----------------------------
-- Table structure for cache_locks
-- ----------------------------
DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE `cache_locks`  (
  `key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cache_locks
-- ----------------------------

-- ----------------------------
-- Table structure for failed_jobs
-- ----------------------------
DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `failed_jobs_uuid_unique`(`uuid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of failed_jobs
-- ----------------------------

-- ----------------------------
-- Table structure for job_batches
-- ----------------------------
DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE `job_batches`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `cancelled_at` int NULL DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of job_batches
-- ----------------------------

-- ----------------------------
-- Table structure for jobs
-- ----------------------------
DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED NULL DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `jobs_queue_index`(`queue`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of jobs
-- ----------------------------

-- ----------------------------
-- Table structure for migrations
-- ----------------------------
DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 32 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of migrations
-- ----------------------------
INSERT INTO `migrations` VALUES (1, '0001_01_01_000000_create_users_table', 1);
INSERT INTO `migrations` VALUES (2, '0001_01_01_000001_create_cache_table', 1);
INSERT INTO `migrations` VALUES (3, '0001_01_01_000002_create_jobs_table', 1);
INSERT INTO `migrations` VALUES (4, '2024_08_23_144436_create_merk_kendaraans_table', 2);
INSERT INTO `migrations` VALUES (5, '2024_08_26_064540_create_permission_tables', 3);
INSERT INTO `migrations` VALUES (6, '2024_08_26_064732_create_permission_parents_table', 4);
INSERT INTO `migrations` VALUES (7, '2024_08_26_064845_create_permission_has_parents_table', 4);
INSERT INTO `migrations` VALUES (8, '2024_08_27_073514_create_customers_table', 5);
INSERT INTO `migrations` VALUES (9, '2024_08_27_073835_create_kendaraan_customers_table', 6);
INSERT INTO `migrations` VALUES (10, '2024_08_29_072935_create_layanans_table', 7);
INSERT INTO `migrations` VALUES (11, '2024_08_29_133233_remove_kendaraan_id_kendaraan_customers_table', 8);
INSERT INTO `migrations` VALUES (12, '2024_08_29_133546_add_nama_kendaraan_kendaraan_customers_table', 9);
INSERT INTO `migrations` VALUES (13, '2024_07_31_030640_create_brands_table', 10);
INSERT INTO `migrations` VALUES (14, '2024_07_31_033108_modify_brand_logo_to_nullable', 10);
INSERT INTO `migrations` VALUES (15, '2024_08_01_072423_create_product_pascas_table', 10);
INSERT INTO `migrations` VALUES (16, '2024_08_06_094556_create_transaction_code_table', 10);
INSERT INTO `migrations` VALUES (17, '2024_08_07_134215_create_transaction_prepaids_table', 10);
INSERT INTO `migrations` VALUES (18, '2024_08_08_111546_create_transaction_pascas_table', 10);
INSERT INTO `migrations` VALUES (19, '2024_08_10_091616_create_saldo_users_table', 10);
INSERT INTO `migrations` VALUES (20, '2024_08_10_212354_create_payments_table', 10);
INSERT INTO `migrations` VALUES (21, '2024_08_10_215926_modified_column_payments_table', 10);
INSERT INTO `migrations` VALUES (22, '2024_08_10_231357_add_user_last_saldo_payments', 10);
INSERT INTO `migrations` VALUES (23, '2024_08_01_065711_create_product_prepaids_table', 11);
INSERT INTO `migrations` VALUES (24, '2024_08_01_071849_add_unique_constraint_to_product_sku_product_prepaids', 11);
INSERT INTO `migrations` VALUES (25, '2024_09_06_082945_rename_product_prepaids_to_product_prabayars', 12);
INSERT INTO `migrations` VALUES (26, '2024_08_01_024925_create_number_codes_table', 13);
INSERT INTO `migrations` VALUES (27, '2024_09_06_155430_add_brand_product_alias_to_brands_table', 14);
INSERT INTO `migrations` VALUES (28, '2024_09_07_021314_remove_brand_product_alias_from_brands', 15);
INSERT INTO `migrations` VALUES (29, '2024_09_09_024212_rename_transaction_prepaids_to_transaction_prabayars', 16);
INSERT INTO `migrations` VALUES (30, '2024_09_10_042509_add_transaction_source_transaction_prabayars_table', 17);
INSERT INTO `migrations` VALUES (31, '2024_09_10_042658_add_transaction_source_transaction_pascas_table', 18);
INSERT INTO `migrations` VALUES (32, '2024_09_10_091158_create_admin_payments_table', 19);
INSERT INTO `migrations` VALUES (33, '2024_09_11_064435_create_personal_access_tokens_table', 20);

-- ----------------------------
-- Table structure for model_has_permissions
-- ----------------------------
DROP TABLE IF EXISTS `model_has_permissions`;
CREATE TABLE `model_has_permissions`  (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`permission_id`, `model_id`, `model_type`) USING BTREE,
  INDEX `model_has_permissions_model_id_model_type_index`(`model_id`, `model_type`) USING BTREE,
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of model_has_permissions
-- ----------------------------

-- ----------------------------
-- Table structure for model_has_roles
-- ----------------------------
DROP TABLE IF EXISTS `model_has_roles`;
CREATE TABLE `model_has_roles`  (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`role_id`, `model_id`, `model_type`) USING BTREE,
  INDEX `model_has_roles_model_id_model_type_index`(`model_id`, `model_type`) USING BTREE,
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of model_has_roles
-- ----------------------------
INSERT INTO `model_has_roles` VALUES (1, 'App\\Models\\User', 4);
INSERT INTO `model_has_roles` VALUES (2, 'App\\Models\\User', 5);
INSERT INTO `model_has_roles` VALUES (2, 'App\\Models\\User', 6);

-- ----------------------------
-- Table structure for number_codes
-- ----------------------------
DROP TABLE IF EXISTS `number_codes`;
CREATE TABLE `number_codes`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `operator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 44 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of number_codes
-- ----------------------------
INSERT INTO `number_codes` VALUES (1, '0857', 'INDOSAT', NULL, NULL);
INSERT INTO `number_codes` VALUES (3, '0811', 'TELKOMSEL', '2024-08-07 11:12:41', '2024-08-07 11:12:41');
INSERT INTO `number_codes` VALUES (4, '0812', 'TELKOMSEL', '2024-08-07 11:12:53', '2024-08-07 11:12:53');
INSERT INTO `number_codes` VALUES (5, '0813', 'TELKOMSEL', '2024-08-07 11:13:03', '2024-08-07 11:13:03');
INSERT INTO `number_codes` VALUES (6, '0821', 'TELKOMSEL', '2024-08-07 11:13:13', '2024-08-07 11:13:13');
INSERT INTO `number_codes` VALUES (7, '0822', 'TELKOMSEL', '2024-08-07 11:13:26', '2024-08-07 11:13:26');
INSERT INTO `number_codes` VALUES (8, '0823', 'TELKOMSEL', '2024-08-07 11:13:39', '2024-08-07 11:13:39');
INSERT INTO `number_codes` VALUES (9, '0851', 'TELKOMSEL', '2024-08-07 11:13:49', '2024-08-07 11:13:49');
INSERT INTO `number_codes` VALUES (10, '0852', 'TELKOMSEL', '2024-08-07 11:14:01', '2024-08-07 11:14:01');
INSERT INTO `number_codes` VALUES (11, '0853', 'TELKOMSEL', '2024-08-07 11:14:11', '2024-08-07 11:14:11');
INSERT INTO `number_codes` VALUES (12, '0814', 'INDOSAT', '2024-08-07 11:14:25', '2024-08-07 11:14:25');
INSERT INTO `number_codes` VALUES (13, '0815', 'INDOSAT', '2024-08-07 11:14:35', '2024-08-07 11:14:35');
INSERT INTO `number_codes` VALUES (14, '0816', 'INDOSAT', '2024-08-07 11:14:43', '2024-08-07 11:14:43');
INSERT INTO `number_codes` VALUES (15, '0855', 'INDOSAT', '2024-08-07 11:14:53', '2024-08-07 11:14:53');
INSERT INTO `number_codes` VALUES (16, '0856', 'INDOSAT', '2024-08-07 11:15:02', '2024-08-07 11:15:02');
INSERT INTO `number_codes` VALUES (17, '0858', 'INDOSAT', '2024-08-07 11:15:12', '2024-08-07 11:15:12');
INSERT INTO `number_codes` VALUES (18, '0817', 'XL', '2024-08-07 11:15:24', '2024-08-07 11:15:24');
INSERT INTO `number_codes` VALUES (19, '0818', 'XL', '2024-08-07 11:15:34', '2024-08-07 11:15:34');
INSERT INTO `number_codes` VALUES (20, '0819', 'XL', '2024-08-07 11:15:43', '2024-08-07 11:15:43');
INSERT INTO `number_codes` VALUES (21, '0859', 'XL', '2024-08-07 11:15:52', '2024-08-07 11:15:52');
INSERT INTO `number_codes` VALUES (22, '0877', 'XL', '2024-08-07 11:16:01', '2024-08-07 11:16:01');
INSERT INTO `number_codes` VALUES (23, '0878', 'XL', '2024-08-07 11:16:08', '2024-08-07 11:16:08');
INSERT INTO `number_codes` VALUES (24, '0895', 'TRI', '2024-08-07 11:17:26', '2024-08-07 11:17:26');
INSERT INTO `number_codes` VALUES (25, '0896', 'TRI', '2024-08-07 11:17:35', '2024-08-07 11:17:35');
INSERT INTO `number_codes` VALUES (26, '0897', 'TRI', '2024-08-07 11:17:45', '2024-08-07 11:17:45');
INSERT INTO `number_codes` VALUES (27, '0898', 'TRI', '2024-08-07 11:17:54', '2024-08-07 11:17:54');
INSERT INTO `number_codes` VALUES (28, '0899', 'TRI', '2024-08-07 11:18:02', '2024-08-07 11:18:02');
INSERT INTO `number_codes` VALUES (29, '0881', 'SMARTFREN', '2024-08-07 11:19:38', '2024-08-07 11:19:38');
INSERT INTO `number_codes` VALUES (30, '0882', 'SMARTFREN', '2024-08-07 11:19:46', '2024-08-07 11:19:46');
INSERT INTO `number_codes` VALUES (31, '0883', 'SMARTFREN', '2024-08-07 11:19:53', '2024-08-07 11:19:53');
INSERT INTO `number_codes` VALUES (32, '0884', 'SMARTFREN', '2024-08-07 11:20:01', '2024-08-07 11:20:01');
INSERT INTO `number_codes` VALUES (33, '0885', 'SMARTFREN', '2024-08-07 11:20:08', '2024-08-07 11:20:08');
INSERT INTO `number_codes` VALUES (34, '0886', 'SMARTFREN', '2024-08-07 11:20:15', '2024-08-07 11:20:15');
INSERT INTO `number_codes` VALUES (35, '0887', 'SMARTFREN', '2024-08-07 11:20:23', '2024-08-07 11:20:23');
INSERT INTO `number_codes` VALUES (36, '0888', 'SMARTFREN', '2024-08-07 11:20:31', '2024-08-07 11:20:31');
INSERT INTO `number_codes` VALUES (37, '0889', 'SMARTFREN', '2024-08-07 11:20:39', '2024-08-07 11:20:39');
INSERT INTO `number_codes` VALUES (38, '0828', 'CERIA', '2024-08-07 11:20:51', '2024-08-07 11:20:51');
INSERT INTO `number_codes` VALUES (39, '0831', 'AXIS', '2024-09-07 03:59:11', '2024-09-07 03:59:11');
INSERT INTO `number_codes` VALUES (40, '0832', 'AXIS', '2024-09-07 03:59:43', '2024-09-07 03:59:43');
INSERT INTO `number_codes` VALUES (41, '0833', 'AXIS', '2024-09-07 03:59:52', '2024-09-07 03:59:52');
INSERT INTO `number_codes` VALUES (42, '0838', 'AXIS', '2024-09-07 04:00:00', '2024-09-07 04:00:00');

-- ----------------------------
-- Table structure for password_reset_tokens
-- ----------------------------
DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens`  (
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of password_reset_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for payments
-- ----------------------------
DROP TABLE IF EXISTS `payments`;
CREATE TABLE `payments`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payment_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `bank` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `gross_amount` int NOT NULL,
  `status_message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expiry_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `va_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `bill_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `biller_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `user_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_last_saldo` int NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of payments
-- ----------------------------
INSERT INTO `payments` VALUES (1, 'INV-WP-24-09-000000025', 'bank_transfer', 'bni', 54500, 'Success, Bank Transfer transaction is created', 'pending', '2024-09-10 17:36:46', '2024-09-11 17:09:45', '9881011932009367', '', '', 5, '2024-09-10 10:36:47', '2024-09-10 10:36:47', 0);
INSERT INTO `payments` VALUES (2, 'INV-WP-24-09-000000026', 'bank_transfer', 'bni', 54500, 'Success, Bank Transfer transaction is created', 'pending', '2024-09-10 18:27:03', '2024-09-11 18:09:03', '9881011985765116', '', '', 5, '2024-09-10 11:27:05', '2024-09-10 11:27:05', 0);
INSERT INTO `payments` VALUES (3, 'INV-WP-24-09-000000027', 'bank_transfer', 'bni', 54500, 'Success, Bank Transfer transaction is created', 'pending', '2024-09-10 18:30:41', '2024-09-11 18:09:41', '9881011954285951', '', '', 5, '2024-09-10 11:30:42', '2024-09-10 11:30:42', 0);
INSERT INTO `payments` VALUES (4, 'INV-WP-24-09-000000028', 'echannel', 'mandiri_bill', 54500, 'OK, Mandiri Bill transaction is successful', 'pending', '2024-09-10 18:34:10', '2024-09-11 18:09:10', '', '757710594441', '70012', 5, '2024-09-10 11:34:11', '2024-09-10 11:34:11', 0);
INSERT INTO `payments` VALUES (5, 'INV-WP-24-09-000000029', 'echannel', 'mandiri_bill', 54500, 'OK, Mandiri Bill transaction is successful', 'pending', '2024-09-10 18:35:41', '2024-09-11 18:09:41', '', '318259165822', '70012', 5, '2024-09-10 11:35:41', '2024-09-10 11:35:41', 0);

-- ----------------------------
-- Table structure for permission_has_parents
-- ----------------------------
DROP TABLE IF EXISTS `permission_has_parents`;
CREATE TABLE `permission_has_parents`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `permission_parent_id` bigint UNSIGNED NOT NULL,
  `permission_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `permission_has_parents_permission_parent_id_permission_id_unique`(`permission_parent_id`, `permission_id`) USING BTREE,
  INDEX `permission_has_parents_permission_parent_id_index`(`permission_parent_id`) USING BTREE,
  INDEX `permission_has_parents_permission_id_index`(`permission_id`) USING BTREE,
  CONSTRAINT `permission_has_parents_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `permission_has_parents_permission_parent_id_foreign` FOREIGN KEY (`permission_parent_id`) REFERENCES `permission_parents` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permission_has_parents
-- ----------------------------
INSERT INTO `permission_has_parents` VALUES (1, 27, 24, NULL, NULL);
INSERT INTO `permission_has_parents` VALUES (2, 28, 25, NULL, NULL);
INSERT INTO `permission_has_parents` VALUES (3, 28, 26, NULL, NULL);
INSERT INTO `permission_has_parents` VALUES (4, 28, 27, NULL, NULL);
INSERT INTO `permission_has_parents` VALUES (5, 28, 28, NULL, NULL);
INSERT INTO `permission_has_parents` VALUES (6, 29, 29, NULL, NULL);
INSERT INTO `permission_has_parents` VALUES (7, 29, 30, NULL, NULL);
INSERT INTO `permission_has_parents` VALUES (8, 29, 31, NULL, NULL);
INSERT INTO `permission_has_parents` VALUES (9, 29, 32, NULL, NULL);
INSERT INTO `permission_has_parents` VALUES (10, 30, 33, NULL, NULL);
INSERT INTO `permission_has_parents` VALUES (11, 30, 34, NULL, NULL);
INSERT INTO `permission_has_parents` VALUES (12, 30, 35, NULL, NULL);
INSERT INTO `permission_has_parents` VALUES (13, 30, 36, NULL, NULL);
INSERT INTO `permission_has_parents` VALUES (14, 31, 37, NULL, NULL);
INSERT INTO `permission_has_parents` VALUES (15, 32, 38, NULL, NULL);
INSERT INTO `permission_has_parents` VALUES (16, 33, 39, NULL, NULL);
INSERT INTO `permission_has_parents` VALUES (17, 34, 40, NULL, NULL);

-- ----------------------------
-- Table structure for permission_parents
-- ----------------------------
DROP TABLE IF EXISTS `permission_parents`;
CREATE TABLE `permission_parents`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permission_parents
-- ----------------------------
INSERT INTO `permission_parents` VALUES (27, 'Hak Akses', NULL, NULL);
INSERT INTO `permission_parents` VALUES (28, 'User Manajemen', NULL, NULL);
INSERT INTO `permission_parents` VALUES (29, 'Brand Produk', NULL, NULL);
INSERT INTO `permission_parents` VALUES (30, 'Kode Nomor', NULL, NULL);
INSERT INTO `permission_parents` VALUES (31, 'Produk Prabayar', NULL, NULL);
INSERT INTO `permission_parents` VALUES (32, 'Produk Pascabayar', NULL, NULL);
INSERT INTO `permission_parents` VALUES (33, 'Laporan', NULL, NULL);
INSERT INTO `permission_parents` VALUES (34, 'Deposit', NULL, NULL);

-- ----------------------------
-- Table structure for permissions
-- ----------------------------
DROP TABLE IF EXISTS `permissions`;
CREATE TABLE `permissions`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `permissions_name_guard_name_unique`(`name`, `guard_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permissions
-- ----------------------------
INSERT INTO `permissions` VALUES (24, 'Hak Akses User', 'web', '2024-09-11 06:12:40', '2024-09-11 06:12:40');
INSERT INTO `permissions` VALUES (25, 'User Manajemen', 'web', '2024-09-11 06:12:40', '2024-09-11 06:12:40');
INSERT INTO `permissions` VALUES (26, 'Tambah User', 'web', '2024-09-11 06:12:40', '2024-09-11 06:12:40');
INSERT INTO `permissions` VALUES (27, 'Edit User', 'web', '2024-09-11 06:12:40', '2024-09-11 06:12:40');
INSERT INTO `permissions` VALUES (28, 'Hapus User', 'web', '2024-09-11 06:12:40', '2024-09-11 06:12:40');
INSERT INTO `permissions` VALUES (29, 'Brand Produk', 'web', '2024-09-11 06:12:40', '2024-09-11 06:12:40');
INSERT INTO `permissions` VALUES (30, 'Tambah Brand', 'web', '2024-09-11 06:12:40', '2024-09-11 06:12:40');
INSERT INTO `permissions` VALUES (31, 'Edit Brand', 'web', '2024-09-11 06:12:40', '2024-09-11 06:12:40');
INSERT INTO `permissions` VALUES (32, 'Hapus Brand', 'web', '2024-09-11 06:12:40', '2024-09-11 06:12:40');
INSERT INTO `permissions` VALUES (33, 'Kode Nomor', 'web', '2024-09-11 06:12:40', '2024-09-11 06:12:40');
INSERT INTO `permissions` VALUES (34, 'Tambah Kode Nomor', 'web', '2024-09-11 06:12:40', '2024-09-11 06:12:40');
INSERT INTO `permissions` VALUES (35, 'Edit Kode Nomor', 'web', '2024-09-11 06:12:40', '2024-09-11 06:12:40');
INSERT INTO `permissions` VALUES (36, 'Hapus Kode Nomor', 'web', '2024-09-11 06:12:40', '2024-09-11 06:12:40');
INSERT INTO `permissions` VALUES (37, 'Daftar Produk Prabayar', 'web', '2024-09-11 06:12:40', '2024-09-11 06:12:40');
INSERT INTO `permissions` VALUES (38, 'Daftar Produk Pascabayar', 'web', '2024-09-11 06:12:40', '2024-09-11 06:12:40');
INSERT INTO `permissions` VALUES (39, 'Laporan', 'web', '2024-09-11 06:12:40', '2024-09-11 06:12:40');
INSERT INTO `permissions` VALUES (40, 'Deposit', 'web', '2024-09-11 06:12:40', '2024-09-11 06:12:40');

-- ----------------------------
-- Table structure for personal_access_tokens
-- ----------------------------
DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `personal_access_tokens_token_unique`(`token`) USING BTREE,
  INDEX `personal_access_tokens_tokenable_type_tokenable_id_index`(`tokenable_type`, `tokenable_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of personal_access_tokens
-- ----------------------------

-- ----------------------------
-- Table structure for product_pascas
-- ----------------------------
DROP TABLE IF EXISTS `product_pascas`;
CREATE TABLE `product_pascas`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_seller_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `product_admin_fee` int NOT NULL,
  `product_commision` int NOT NULL,
  `product_sku` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_status` tinyint(1) NOT NULL DEFAULT 1,
  `product_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `product_pascas_product_sku_unique`(`product_sku`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 755 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_pascas
-- ----------------------------
INSERT INTO `product_pascas` VALUES (1, 'Bpjs Kesehatan', 'Pascabayar', 'BPJS KESEHATAN', 'Lucky 7 Cell', 2500, 1125, 'bpjs', 1, '-', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (2, 'CBN', 'Pascabayar', 'INTERNET PASCABAYAR', 'Lucky 7 Cell', 0, 3475, 'internet_cbn', 1, '-', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (3, 'SPEEDY & INDIHOME', 'Pascabayar', 'INTERNET PASCABAYAR', 'Lucky 7 Cell', 2500, 1175, 'internet_indihome', 1, '-', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (4, 'MyRepublic', 'Pascabayar', 'INTERNET PASCABAYAR', 'Lucky 7 Cell', 0, 1475, 'internet_myrepublic', 1, 'Pembayaran tagihan internet MyRepublic', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (5, 'TELKOMPSTN', 'Pascabayar', 'INTERNET PASCABAYAR', 'Lucky 7 Cell', 2500, 1175, 'internet_telkom_pstn', 1, '-', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (6, 'PDAM Pancuran Telago Muarabungo', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'padam_pancuran_telaga', 1, 'Jambi', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (7, 'PDAM Kabupaten Serang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 575, 'padam_serang_kab', 1, 'Banten', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (8, 'PDAM Aetra', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 675, 'pdam_aetra', 1, 'Jakarta', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (9, 'PDAM Aetra Tangerang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_aetra_tangerang', 1, 'Banten', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (10, 'PDAM Kabupaten Agam', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 475, 'pdam_agam', 1, 'Sumatera Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (11, 'PDAM Aneuklot Kota Sabang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_aneuklot_sabang', 1, 'Aceh', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (12, 'PDAM Kabupaten Badung', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 475, 'pdam_badung_kab', 1, 'Bali', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (13, 'PDAM Kabupaten Balangan', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 775, 'pdam_balangan', 1, 'Kalimantan Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (14, 'PDAM Kota Balikpapan', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 325, 'pdam_balikpapan', 1, 'Kalimantan Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (15, 'PDAM Kota Bandar Lampung', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2800, 575, 'pdam_bandarlampung', 1, 'Lampung', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (16, 'PDAM Kabupaten Bandung', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2750, 675, 'pdam_bandung', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (17, 'PDAM Kota Bandung', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2800, 525, 'pdam_bandung_kota', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (18, 'PDAM Kabupaten Bangka Barat', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_bangbar', 1, 'Kepulauan Bangka Belitung	', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (19, 'PDAM Kabupaten Banggai', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 725, 'pdam_banggai', 1, 'Sulawesi Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (20, 'PDAM Kabupaten Bangkalan', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 475, 'pdam_bangkalan', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (21, 'PDAM Kabupaten Bantul', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_bantul', 1, 'Yogyakarta', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (22, 'PDAM Kabupaten Banyuwangi', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 925, 'pdam_banyuwangi', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (23, 'PDAM kabupaten Barabai', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_barabai', 1, 'Kalimantan Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (24, 'PDAM Batam', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 975, 'pdam_batam', 1, 'Riau', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (25, 'PDAM Batang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 775, 'pdam_batang', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (26, 'PDAM Kabupaten Batang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 975, 'pdam_batang_kab', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (27, 'PDAM Kabupaten Batanghari', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_batanghari', 1, 'Jambi', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (28, 'PDAM Kabupaten Bandung Barat', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 900, 'pdam_bdg_barat', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (29, 'PDAM Belopa Kabupaten Luwu', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_belopa_luwu_kab', 1, 'Sulawesi Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (30, 'PDAM Kabupaten Bengkayang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_bengkayang', 1, 'Kalimantan Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (31, 'PDAM Kabupaten Berau', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 775, 'pdam_berau', 1, 'Kalimantan Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (32, 'PDAM Bima', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_bima', 1, 'Nusa Tenggara Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (33, 'PDAM Kota Blitar', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 275, 'pdam_blitar_kota', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (34, 'PDAM Kabupaten Blora', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 825, 'pdam_blora_kab', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (35, 'PDAM Kabupaten Banyumas', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 775, 'pdam_bms', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (36, 'PDAM Kabupaten Bogor', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_bogor_kab', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (37, 'PDAM Kabupaten Bojonegoro', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 675, 'pdam_bojonegoro_kab', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (38, 'PDAM Kabupaten Bondowoso', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2300, 575, 'pdam_bondowoso', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (39, 'PDAM Kabupaten Bone', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 725, 'pdam_bone', 1, 'Sulawesi Utara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (40, 'PDAM Bone Watampone', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_bone_watampone', 1, 'Sulawesi Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (41, 'PDAM Kabupaten Bone Bolango', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 475, 'pdam_bonebolango', 1, 'Gorontalo', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (42, 'PDAM Kota Bontang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 275, 'pdam_bontang_kota', 1, 'Kalimatan Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (43, 'PDAM Kabupaten Boyolali', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 575, 'pdam_boyolali', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (44, 'PDAM Kabupaten Brebes', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_brebes', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (45, 'PDAM Kabupaten Buleleng', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 275, 'pdam_buleleng', 1, 'Bali', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (46, 'PDAM Kabupaten Bulungan Tanjungselor', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 475, 'pdam_bulungan_tanjselor', 1, 'Kalimantan Utara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (47, 'PDAM Kabupaten Buton', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2700, 525, 'pdam_buton', 1, 'Sulawesi Tenggara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (48, 'PDAM Kabupaten Ciamis', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 925, 'pdam_ciamis', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (49, 'PDAM Kabupaten Cianjur', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 625, 'pdam_cianjur', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (50, 'PDAM Kabupaten Cilacap', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 1075, 'pdam_cilacap', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (51, 'PDAM Cilegon Mandiri Kota Cilegon', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 575, 'pdam_cilegon_mandiri', 1, 'Banten', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (52, 'PDAM Kabupaten Cirebon', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 725, 'pdam_cirebon', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (53, 'PDAM Kabupaten Demak', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_demak', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (54, 'PDAM Kabupaten Enrekang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 575, 'pdam_enrekang', 1, 'Sulawesi Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (55, 'PDAM Kabupaten Gianyar', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_gianyar', 1, 'Bali', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (56, 'PDAM Kabupaten Gianyar Non Air', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 625, 'pdam_gianyar_nonair', 1, 'Bali', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (57, 'PDAM Kabupaten Gunung Kidul', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2200, 275, 'pdam_gkidul', 1, 'Yogyakarta', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (58, 'PDAM Kabupaten Gorontalo', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 725, 'pdam_gorontalo', 1, 'Gorontalo', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (59, 'PDAM Kota Gorontalo', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 575, 'pdam_gorontalo_kota', 1, 'Gorontalo', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (60, 'PDAM Kabupaten Gorontalo Limboto', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_gorontalo_limboto', 1, 'Gorontalo', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (61, 'PDAM Kabupaten Gowa', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3500, 575, 'pdam_gowa', 1, 'Sulawesi Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (62, 'PDAM Kabupaten Gresik', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 475, 'pdam_gresik', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (63, 'PDAM Kabupaten Halmahera Utara', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3500, 675, 'pdam_halmaherautara', 1, 'Maluku Utara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (64, 'PDAM Kabupaten Hulu Sungai Utara Amuntai', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 300, 'pdam_hulusungai', 1, 'Kalimantan Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (65, 'PDAM Kabupaten Indramayu', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 325, 'pdam_indramayu', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (66, 'PDAM Intan Banjar', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_intan', 1, 'Kalimantan Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (67, 'PDAM Kabupaten Jember', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 275, 'pdam_jember', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (68, 'PDAM Kabupaten Jembrana', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_jembrana', 1, 'Bali', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (69, 'PDAM Kota Yogyakarta', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 275, 'pdam_jogja_kota', 1, 'Yogyakarta', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (70, 'PDAM Kabupaten Jombang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2700, 1065, 'pdam_jombang', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (71, 'PDAM Kabupaten Padang Pariaman', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 725, 'pdam_kab_padangpariaman', 1, 'Sumatera Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (72, 'PDAM Kandangan (Hulu Sungai Selatan)', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 675, 'pdam_kandangan', 1, 'Kalimantan Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (73, 'PDAM Kabupaten Kapuas Hulu', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_kapuas', 1, 'Kalimantan Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (74, 'PDAM Kabupaten Karawang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 425, 'pdam_karawang', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (75, 'PDAM Kabupaten Kebumen', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 575, 'pdam_kebumen', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (76, 'PDAM Kabupaten Kediri', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 275, 'pdam_kediri', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (77, 'PDAM Kota Kendari', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 4000, 675, 'pdam_kendari_kota', 1, 'Sulawesi Tenggara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (78, 'PDAM Kabupaten Kerinci', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 475, 'pdam_kerinci', 1, 'Jambi', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (79, 'PDAM Kabupaten Ketapang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_ketapang', 1, 'Kalimantan Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (80, 'PDAM Kabupaten Kisaran', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 1275, 'pdam_kisaran', 1, 'Sumatera Utara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (81, 'PDAM Kabupaten Klungkung', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 525, 'pdam_klungkung', 1, 'Bali', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (82, 'PDAM Kabupaten Kolaka', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 575, 'pdam_kolaka', 1, 'Sulawesi Tenggara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (83, 'PDAM Kabupaten Kolaka Utara', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 575, 'pdam_kolaka_utara', 1, 'Sulawesi Tenggara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (84, 'PDAM Kota Banjar', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 475, 'pdam_kota_banjar', 1, 'Kalimantan Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (85, 'PDAM Kota Banjarmasin', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 775, 'pdam_kota_banjarmasin', 1, 'Kalimantan Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (86, 'PDAM Kota Bekasi', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 775, 'pdam_kota_bekasi', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (87, 'PDAM Kota Bogor', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 675, 'pdam_kota_bogor', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (88, 'PDAM Kota Cirebon', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 525, 'pdam_kota_cirebon', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (89, 'PDAM Kota Denpasar', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 475, 'pdam_kota_denpasar', 1, 'Bali', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (90, 'PDAM Kota Depok', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 975, 'pdam_kota_depok', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (91, 'PDAM Kota jayapura', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 975, 'pdam_kota_jayapura', 1, 'Papua', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (92, 'PDAM Kota Kediri', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_kota_kediri', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (93, 'PDAM Kota Madiun', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_kota_madiun', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (94, 'PDAM Kota Makassar', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_kota_makasar', 1, 'Sulawesi Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (95, 'PDAM Kota Malang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_kota_malang', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (96, 'PDAM Kota Manado', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 325, 'pdam_kota_manado', 1, 'Sulawesi Utara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (97, 'PDAM Kota Mataram', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_kota_mataram', 1, 'Nusa Tenggara Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (98, 'PDAM Kota Medan', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 875, 'pdam_kota_medan', 1, 'Sumatera Utara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (99, 'PDAM Kota Palembang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 675, 'pdam_kota_palembang', 1, 'Sumatera Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (100, 'PDAM Kota Pasuruan', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 675, 'pdam_kota_pasuruan', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (101, 'PDAM Kota Probolinggo', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 975, 'pdam_kota_probolinggo', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (102, 'PDAM Kota Salatiga', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 775, 'pdam_kota_salatiga', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (103, 'PDAM Kota Samarinda', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 975, 'pdam_kota_samarinda', 1, 'Kalimantan Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (104, 'PDAM Kota Semarang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 4300, 175, 'pdam_kota_semarang', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (105, 'PDAM Kota Surabaya', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 675, 'pdam_kota_surabaya', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (106, 'PDAM Kota Surakarta', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2300, 375, 'pdam_kota_surakarta', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (107, 'PDAM Kota Tangerang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 775, 'pdam_kota_tangerang', 1, 'Banten', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (108, 'PDAM Kabupaten Kotabaru Pulau Laut', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_kotabaru_pulaulaut', 1, 'Kalimantan Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (109, 'PDAM Kabupaten Karanganyar', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 525, 'pdam_kranyar', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (110, 'PDAM Kabupaten Kudus', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 275, 'pdam_kudus', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (111, 'PDAM Kabupaten Kulonprogo', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 975, 'pdam_kulonprogo', 1, 'Yogyakarta', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (112, 'PDAM Kabupaten Kuningan', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 325, 'pdam_kuningan', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (113, 'PDAM Kabupaten Kupang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_kupang', 1, 'Nusa Tenggara Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (114, 'PDAM Kabupaten Kutai Kertanegara', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_kutai_kertanegara', 1, 'Kalimantan Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (115, 'PDAM Kabupaten Lamongan', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_lamongan', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (116, 'PDAM Kabupaten Lamandau', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_lemandau', 1, 'Kalimantan Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (117, 'PDAM Lematang Enim Muara Enim', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_lematang', 1, 'Sumatera Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (118, 'PDAM Kabupaten Limapuluh Kota', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_limapuluhkota', 1, 'Sumatera Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (119, 'PDAM Kabupaten Lombok Timur', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_lomboktimur', 1, 'Nusa Tenggara Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (120, 'PDAM Kota Lubuk Linggau', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_lubuklinggau_kota', 1, 'Sumatera Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (121, 'PDAM Kabupaten Lumajang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 975, 'pdam_lumajang', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (122, 'PDAM Kabupaten Luwu Timur', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 470, 'pdam_luwutimur', 1, 'Sulawesi Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (123, 'PDAM Kota Magelang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 475, 'pdam_magelang_kota', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (124, 'PDAM Kabupaten Magelang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2200, 275, 'pdam_magelangkab', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (125, 'PDAM Kabupaten Magetan', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 275, 'pdam_magetan_kab', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (126, 'PDAM Kabupaten Majalengka', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_majalengka_kab', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (127, 'PDAM Kabupaten Malang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_malang', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (128, 'PDAM Kabupaten Malinau', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_malinau', 1, 'Kalimantan Utara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (129, 'PDAM Kabupaten Maluku Tenggara', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3500, 675, 'pdam_maluku_gara', 1, 'Maluku', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (130, 'PDAM Kabupaten Maros', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3500, 1075, 'pdam_maros', 1, 'Sulawesi Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (131, 'PDAM Giri Menang Mataram', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_mataram', 1, 'Nusa Tenggara Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (132, 'PDAM Kabupaten Mempawah', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 675, 'pdam_mempawah', 1, 'Kalimantan Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (133, 'PDAM Kabupaten Mojokerto', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_mojokerto', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (134, 'PDAM Kota Mojokerto', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2300, 375, 'pdam_mojokerto_kota', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (135, 'PDAM Mual Natio Tarutung', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 475, 'pdam_mual_natio', 1, 'Sumatera Utara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (136, 'PDAM Kabupaten Muaro Jambi', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 825, 'pdam_muaro_jambi', 1, 'Jambi', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (137, 'PDAM Kabupaten Ngawi', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 275, 'pdam_ngawi', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (138, 'PDAM Kabupaten Nias', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 775, 'pdam_nias', 1, 'Sumatera Utara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (139, 'PDAM Kabupaten Ogan Ilir', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_ogan_ilir', 1, 'Sumatera Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (140, 'PDAM Kabupaten Oku Selatan', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 625, 'pdam_oku_selatan', 1, 'Sumatera Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (141, 'PDAM Oku Baturaja', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_okubaturaja', 1, 'Sumatera Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (142, 'PDAM Kabupaten Pacitan', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 475, 'pdam_pactitan', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (143, 'PDAM Ats Palembang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 525, 'pdam_palembang', 1, 'Sumatera Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (144, 'PDAM Kota Palu', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 725, 'pdam_palu_kota', 1, 'Sulawesi Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (145, 'PDAM Palyja Jakarta', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 675, 'pdam_palyja_jakarta', 1, 'Jakarta', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (146, 'PDAM Kabupaten Pamekasan', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_pamekasan_kab', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (147, 'PDAM Pangkalan Bun', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_pangkalan_bun', 1, 'Kalimantan Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (148, 'PDAM Kota Pare-Pare', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2700, 575, 'pdam_pare_kota', 1, 'Sulawesi Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (149, 'PDAM Pariaman', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 725, 'pdam_pariaman22', 1, 'Sumatera Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (150, 'PDAM Kabupaten Pasaman', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_pasaman', 1, 'Sumatera Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (151, 'PDAM Kabupaten Pati', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 500, 475, 'pdam_pati', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (152, 'PDAM Kabupaten Pekalongan', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_pekalongan', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (153, 'PDAM Kabupaten Pemalang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3500, 475, 'pdam_pemalang_kab', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (154, 'PDAM Kabupaten Polewali Mandar', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 975, 'pdam_polemandar', 1, 'Sulawesi Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (155, 'PDAM Kabupaten Polman', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 575, 'pdam_polman_kab', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (156, 'PDAM Kabupaten Ponorogo', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 925, 'pdam_ponorogo', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (157, 'PDAM Pontianak', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_pontianak', 1, 'Kalimantan Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (158, 'PDAM Kabupaten Probolinggo', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 475, 'pdam_probolinggo', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (159, 'PDAM Kabupaten Purbalingga', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3250, 575, 'pdam_purbalingga', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (160, 'PDAM Kabupaten Purworejo', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 575, 'pdam_purworejo', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (161, 'PDAM Kabupaten Rembang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_remang', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (162, 'PDAM Kabupaten Sampang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 1175, 'pdam_sampang', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (163, 'PDAM Kabupaten Sanggau', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_sanggau_kab', 1, 'Kalimantan Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (164, 'PDAM Kabupaten Semarang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2700, 575, 'pdam_semarang', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (165, 'PDAM Kabupaten Seruyan', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_seruyan_kab', 1, 'Kalimatan Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (166, 'PDAM Kabupaten Sidoarjo', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 1800, 325, 'pdam_sidoarjo', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (167, 'PDAM Kabupaten Sidrap', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 575, 'pdam_sidrapkab', 1, 'Sulawesi Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (168, 'PDAM Kabupaten Sikka', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_sikkakab', 1, 'Nusa Tenggara Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (169, 'PDAM Singkawang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_singkawang', 1, 'Kalimantan Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (170, 'PDAM Kabupaten Sinjai', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_sinjaikab', 1, 'Sulawesi Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (171, 'PDAM Kabupaten Situbondo', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_situbondo', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (172, 'PDAM Kabupaten Sleman', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 575, 'pdam_sleman', 1, 'Yogyakarta', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (173, 'PDAM Kabupaten Solok', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_solokkab', 1, 'Sumatera Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (174, 'PDAM Kabupaten Subang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 625, 'pdam_subang', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (175, 'PDAM Kabupaten Sukabumi', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 875, 'pdam_sukabumi', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (176, 'PDAM Kabupaten Sukoharjo', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 525, 'pdam_sukoharjo', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (177, 'PDAM Sumbawa', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 725, 'pdam_sumbawa', 1, 'Nusa Tenggara Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (178, 'PDAM Kabupaten Sumedang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 675, 'pdam_sumedang', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (179, 'PDAM Kabupaten Sumenep', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 275, 'pdam_sumenep_kab', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (180, 'PDAM Tabalong', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tabalong', 1, 'Kalimantan Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (181, 'PDAM Kabupaten Takalar', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 775, 'pdam_takalar', 1, 'Sulawesi Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (182, 'PDAM Kabupaten Tanah Bumbu', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tanahbumbu', 1, 'Kalimantan Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (183, 'PDAM Kabupaten Tangerang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 325, 'pdam_tangerangkab', 1, 'Banten', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (184, 'PDAM Kabupaten Tanjung Jabung Barat', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2200, 375, 'pdam_tanjungjabung', 1, 'Jambi', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (185, 'PDAM Kabupaten Tapin', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 575, 'pdam_tapin', 1, 'Kalimantan Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (186, 'PDAM Kabupaten Tasikmalaya', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 625, 'pdam_tasikmalaya', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (187, 'PDAM Kabupaten Tegal', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 850, 'pdam_tegal_kab', 1, '-', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (188, 'PDAM Kota Tegal', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 775, 'pdam_tegal_kota', 1, '-', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (189, 'PDAM Kabupaten Temanggung', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 525, 'pdam_temanggung', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (190, 'PDAM Tembilahan', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tembilahan', 1, 'Riau', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (191, 'PDAM Kota Ternate', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 675, 'pdam_ternate_kota', 1, 'Maluku Utara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (192, 'PDAM Timor Tengah Utara', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_timor_tengah_utara', 1, 'Nusa Tenggara Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (193, 'PDAM Tirta Berkah Kabupaten Pandeglang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 575, 'pdam_tirta_berkah', 1, 'Banten', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (194, 'PDAM Tirta Betuah Banyuasin', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tirta_betuah', 1, 'Sumatera Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (195, 'PDAM Tirta Tuah Benua Kutai Timur', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tirta_buahbenua', 1, 'Kalimantan Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (196, 'PDAM Tirta Buana Merangin', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tirta_buana_merangin', 1, 'Jambi', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (197, 'PDAM Tirta Bulian Tebingtinggi', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tirta_bulian_tt', 1, 'Sumatera Utara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (198, 'PDAM Tirta Darma Kabupaten Purwakarta', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 475, 'pdam_tirta_darma_pkarta', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (199, 'PDAM Tirta Daroy', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 625, 'pdam_tirta_daroy', 1, 'Aceh', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (200, 'PDAM Tirta Deli Serdang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 475, 'pdam_tirta_delser', 1, 'Sumatera Utara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (201, 'PDAM Tirta Dharma Kabupaten Belitung Timur', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tirta_dharma', 1, 'Kepulauan Bangka Belitung', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (202, 'PDAM Tirta Intan Kabupaten Garut', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 775, 'pdam_tirta_intan', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (203, 'PDAM Tirta Jam Gadang Kota Bukit Tinggi', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tirta_jamgadang', 1, 'Sumatera Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (204, 'PDAM Tirta Kepri Tanjungpinang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tirta_kepri', 1, 'Riau', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (205, 'PDAM Tirta Keumeuneng Langsa', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 825, 'pdam_tirta_keumeuneng', 1, 'Aceh', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (206, 'PDAM Tirta Khayangan', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 1275, 'pdam_tirta_khayangan', 1, 'Jambi', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (207, 'PDAM Tirta Komodo Kabupaten Manggarai', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tirta_komodo', 1, 'Nusa Tenggara Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (208, 'PDAM Tirta Kualo Kota Tanjung Balai', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 825, 'pdam_tirta_kualo', 1, 'Sumatera Utara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (209, 'PDAM Tirta Monpase Lhokseumawe', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 275, 'pdam_tirta_monpase', 1, 'Aceh', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (210, 'PDAM Tirta Muaro Kabupaten Tebo', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tirta_muaro', 1, 'Jambi', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (211, 'PDAM Tirta Pinang Pangkalpinang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tirta_pinang', 1, 'Kepulauan Bangka Belitung', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (212, 'PDAM Tirta Prabujaya Prabumulih', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tirta_prabujaya', 1, 'Sumatera Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (213, 'PDAM Tirta Randik Sekayu', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 575, 'pdam_tirta_randik', 1, 'Sumatera Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (214, 'PDAM Tirta Sako Batuah Kabupaten Sarolangun', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tirta_sako', 1, 'Jambi', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (215, 'PDAM Tirta Sendawar Kabupaten Kutai Barat', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tirta_sendawar', 1, 'Kalimantan Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (216, 'PDAM Tirta Sukapura Kota Tasikmalaya', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2450, 375, 'pdam_tirta_sukapura', 1, 'Jawa Barat', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (217, 'PDAM Tirta Tamiang Kab Aceh Tamiang', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2000, 275, 'pdam_tirta_tamiang', 1, 'Aceh', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (218, 'PDAM Tirta Uli Pematang Siantar', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tirta_ulipematang', 1, 'Sumatera Utara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (219, 'PDAM Tirtabina Rantauprapat', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 0, 475, 'pdam_tirtabina', 1, 'Sumatera Utara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (220, 'PDAM Tirta Jasa Kalianda Kabupaten Lampung Selatan', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tirtajasa', 1, 'Lampung', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (221, 'PDAM Tirtanadi Medan', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 775, 'pdam_tirtanadi_medan', 1, 'Sumatera Utara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (222, 'PDAM Kota Tomohon', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2250, 425, 'pdam_tomohon_kota', 1, 'Sulawesi Utara', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (223, 'PDAM Kabupaten Trenggalek', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_trenggalekkab', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (224, 'PDAM Kabupaten Tuban', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tubankab', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (225, 'PDAM Kabupaten Tulungagung', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 375, 'pdam_tulungagungkab', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (226, 'PDAM Kabupaten Wajo', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 725, 'pdam_wajo_kab', 1, 'Sulawesi Selatan', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (227, 'PDAM Kota Wisata Batu', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2250, 375, 'pdam_wisatabatu_kota', 1, 'Jawa Timur', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (228, 'PDAM Kabupaten Wonogiri', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 3000, 575, 'pdam_wonogiri', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (229, 'PDAM Kabupaten Wonosobo', 'Pascabayar', 'PDAM', 'Lucky 7 Cell', 2500, 575, 'pdam_wonosobo', 1, 'Jawa Tengah', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (230, 'Pln Pascabayar', 'Pascabayar', 'PLN PASCABAYAR', 'Lucky 7 Cell', 2750, 2275, 'pln', 1, '-', '2024-08-01 07:35:06', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (232, 'PBB Kabupaten Bandung', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 5000, 1475, 'pbb_kab_bandung', 1, '-', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (233, 'PBB Kabupaten Banyuasin', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 5000, 1311, 'pbb_kab_banyuasin', 1, 'Provinsi Sumatera Selatan', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (234, 'PBB Kabupaten Blitar', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 3500, 875, 'pbb_kab_blitar', 1, '-', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (235, 'PBB Kabupaten Bungo', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 3500, 875, 'pbb_kab_bungo', 1, '-', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (236, 'PBB Kabupaten Ciamis', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 6500, 1475, 'pbb_kab_ciamis', 1, '-', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (237, 'PBB Kabupaten Cianjur', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 6500, 1175, 'pbb_kab_cianjur', 1, '-', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (238, 'PBB Kabupaten Cirebon', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 6500, 2475, 'pbb_kab_cirebon', 1, '-', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (239, 'PBB Kabupaten Garut', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 5000, 1175, 'pbb_kab_garut', 1, '-', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (240, 'PBB Kabupaten Karawang', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 6500, 1475, 'pbb_kab_karawang', 1, '-', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (241, 'PBB Kabupaten Majalengka', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 5000, 1175, 'pbb_kab_majalengka', 1, '-', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (242, 'PBB Kabupaten Pangandaran', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 5000, 1175, 'pbb_kab_pangandaran', 1, '-', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (243, 'PBB Kabupaten Pasuruan', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 3300, 975, 'pbb_kab_pasuruan', 1, '-', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (244, 'PBB Kabupaten Purwakarta', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 5000, 1175, 'pbb_kab_purwakarta', 1, '-', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (245, 'PBB Kabupaten Sarolangun', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 3500, 975, 'pbb_kab_sarolangun', 1, 'Jambi', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (246, 'PBB Kabupaten Sidoarjo', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 3500, 875, 'pbb_kab_sidoarjo', 1, '-', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (247, 'PBB Kabupaten Serang', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 5000, 975, 'pbb_kab_srang', 1, 'Banten', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (248, 'PBB Kabupaten Subang', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 5000, 1175, 'pbb_kab_subang', 1, '-', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (249, 'PBB Kabupaten Sukabumi', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 5000, 1175, 'pbb_kab_sukabumi', 1, '-', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (250, 'PBB Kabupaten Sumedang', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 5000, 1175, 'pbb_kab_sumedang', 1, '-', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (251, 'PBB Kota Bandung', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 6500, 1475, 'pbb_kota_bandung', 1, '-', '2024-08-08 14:04:01', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (482, 'PBB Kota Banjar', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 5000, 1175, 'pbb_kota_banjar', 1, '-', '2024-08-08 14:08:37', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (483, 'PBB kota blitar', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 3500, 875, 'pbb_kota_blitar', 1, '-', '2024-08-08 14:08:37', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (484, 'PBB Kota Bogor', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 5000, 1175, 'pbb_kota_bogor', 1, '-', '2024-08-08 14:08:37', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (485, 'PBB Kota Cirebon', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 5000, 1175, 'pbb_kota_cirebon', 1, '-', '2024-08-08 14:08:37', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (486, 'PBB Kota Depok', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 6500, 1475, 'pbb_kota_depok', 1, '-', '2024-08-08 14:08:37', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (487, 'PBB Kota Jambi', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 3500, 875, 'pbb_kota_jambi', 1, '-', '2024-08-08 14:08:37', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (488, 'PBB Kota Makassar', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 2500, 275, 'pbb_kota_makasar', 1, '-', '2024-08-08 14:08:37', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (489, 'PBB Kota Medan', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 5000, 875, 'pbb_kota_medan', 1, '-', '2024-08-08 14:08:37', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (490, 'PBB Kota Tangerang', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 5000, 1175, 'pbb_kota_tangerang', 1, '-', '2024-08-08 14:08:37', '2024-09-10 06:32:20');
INSERT INTO `product_pascas` VALUES (491, 'PBB Provinsi Jawa Tengah', 'Pascabayar', 'PBB', 'Lucky 7 Cell', 5000, 1475, 'pbb_prov_jateng', 1, 'Provinsi Jawa Tengah', '2024-08-08 14:08:37', '2024-09-10 06:32:20');

-- ----------------------------
-- Table structure for product_prabayars
-- ----------------------------
DROP TABLE IF EXISTS `product_prabayars`;
CREATE TABLE `product_prabayars`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `product_seller_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `product_cost` int NOT NULL,
  `product_price` int NOT NULL DEFAULT 0,
  `product_sku` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_status` tinyint(1) NOT NULL DEFAULT 1,
  `product_unlimited_status` tinyint(1) NOT NULL DEFAULT 1,
  `product_stock` int NOT NULL,
  `product_multi_trx` tinyint(1) NOT NULL DEFAULT 1,
  `product_cut_off_start` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `product_cut_off_end` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `product_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `product_prepaids_product_sku_unique`(`product_sku`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1514 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_prabayars
-- ----------------------------
INSERT INTO `product_prabayars` VALUES (1, 'Axis Data BRONET 1 GB 30 Hari', 'Data', 'AXIS', 'Bronet', 'Speed Persada Pay', 6910, 7500, 'axis_bronet_1gb30h', 1, 1, 0, 1, '23:45', '0:15', 'PAKET BRONET 24JAM 1GB 30hr', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (2, 'Axis Data BRONET 2 GB 30 Hari', 'Data', 'AXIS', 'Bronet', 'TWIN Reload', 18010, 20000, 'axis_bronet_2gb30h', 1, 1, 0, 0, '23:45', '0:15', 'AIGO Bronet 24Jam 2GB + Kuota di Kota-mu 30hr', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (3, 'Axis Data BRONET 3 GB 30 Hari', 'Data', 'AXIS', 'Bronet', 'RS Pulsa', 15950, 0, 'axis_bronet_3gb30h', 0, 1, 0, 1, '23:30', '0:35', 'AIGO Bronet 24Jam 3GB + Kuota di Kota-mu 30hr', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (4, 'Axis Data BRONET 6 GB 30 Hari', 'Data', 'AXIS', 'Bronet', 'RS Pulsa', 27270, 0, 'axis_bronet_5gb30h', 1, 1, 0, 1, '23:30', '0:35', 'AIGO Bronet 24Jam 6GB + Kuota di Kota-mu 30hr', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (5, 'Axis Data BRONET 8 GB 30 Hari', 'Data', 'AXIS', 'Bronet', 'EPR', 40975, 0, 'axis_bronet_8gb30h', 1, 1, 0, 0, '23:45', '0:5', 'AIGO Bronet 24Jam 8GB + Kuota di Kota-mu 30hr', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (6, 'Axis Data Mini 1 GB 5 Hari', 'Data', 'AXIS', 'Mini', 'Plusenamdua', 11355, 0, 'axis_mini_1gb5h', 1, 1, 0, 1, '23:45', '0:15', 'AIGO Mini Bronet 24Jam 1GB + Kuota di Kota-mu 5hr', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (7, 'Axis Data Mini 2 GB 3 Hari', 'Data', 'AXIS', 'Mini', 'Aloha Community', 9730, 0, 'axis_mini_2g_3d1_5gh3h', 1, 1, 0, 1, '23:55', '0:5', 'AIGO Mini Bronet 24Jam 2GB + Kuota di Kota-mu 3hr', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (8, 'Axis Data Mini 2.5 GB 5 Hari', 'Data', 'AXIS', 'Mini', 'Nexus H2H', 12580, 0, 'axis_mini_2gh5h', 0, 1, 0, 1, '23:30', '0:30', 'AIGO Mini Bronet 24Jam 2.5GB + Kuota di Kota-mu 5hr', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (9, 'Axis Data Mini 3 GB 5 Hari', 'Data', 'AXIS', 'Mini', 'KHAZANAH', 17360, 0, 'axis_mini_3gb5h', 1, 1, 0, 1, '23:45', '0:15', 'BRONET 24Jam 3GB 5hr', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (10, 'Axis Data Mini 6 GB 3 Hari', 'Data', 'AXIS', 'Mini', 'Kenzie Komunika', 14535, 0, 'axis_mini_4gb3h', 1, 1, 0, 1, '23:45', '0:15', 'AIGO Mini 8GB + Kuota di Kotamu 3hr', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (11, 'Axis 10.000', 'Pulsa', 'AXIS', 'Umum', 'CP RELOAD', 10855, 0, 'axis10000', 1, 1, 0, 1, '23:30', '0:17', 'Pulsa Axis Rp 10.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (12, 'Axis 15.000', 'Pulsa', 'AXIS', 'Umum', 'RUMAH KOMUNIKA', 15099, 0, 'axis15000', 1, 1, 0, 1, '0:0', '0:0', 'Pulsa Axis Rp 15.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (13, 'Axis 25.000', 'Pulsa', 'AXIS', 'Umum', 'RUMAH KOMUNIKA', 25000, 0, 'axis25000', 1, 1, 0, 1, '0:0', '0:0', 'Pulsa Axis Rp 25.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (14, 'Axis 5.000', 'Pulsa', 'AXIS', 'Umum', 'PT INDOTEL CORP', 5690, 0, 'axis5000', 1, 1, 0, 1, '23:29', '0:16', 'Pulsa Axis Rp 5.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (15, 'Axis 50.000', 'Pulsa', 'AXIS', 'Umum', 'RUMAH KOMUNIKA', 49999, 0, 'axis50000', 1, 1, 0, 1, '0:0', '0:0', 'Pulsa Axis Rp 50.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (16, 'DANA 10.000', 'E-Money', 'DANA', 'Umum', 'Lucky 7 Cell', 10150, 0, 'dana10', 1, 1, 0, 1, '0:0', '0:0', '-', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (17, 'DANA 100.000', 'E-Money', 'DANA', 'Umum', 'Lucky 7 Cell', 100150, 0, 'dana100', 1, 1, 0, 1, '0:0', '0:0', '-', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (18, 'DANA 125.000', 'E-Money', 'DANA', 'Umum', 'PT GALERI MULTI PAYMENT', 125110, 0, 'dana125', 1, 1, 0, 1, '23:30', '0:15', '-', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (19, 'DANA 150.000', 'E-Money', 'DANA', 'Umum', 'opal pulsa', 151000, 0, 'dana150', 1, 1, 0, 1, '0:0', '0:0', '-', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (20, 'DANA 15.000', 'E-Money', 'DANA', 'Umum', 'Bijur', 15235, 0, 'dana17', 1, 1, 0, 1, '23:30', '0:45', '-', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (21, 'DANA 20.000', 'E-Money', 'DANA', 'Umum', 'PT SMART BILLER INDONESIA', 20100, 0, 'dana20', 1, 1, 0, 1, '23:30', '0:15', '-', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (22, 'DANA 25.000', 'E-Money', 'DANA', 'Umum', 'Plusenamdua', 25095, 0, 'dana25', 1, 1, 0, 1, '23:45', '0:15', '-', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (23, 'DANA 30.000', 'E-Money', 'DANA', 'Umum', 'JHOVA PULSA', 30100, 0, 'dana30', 1, 1, 0, 0, '23:29', '4:1', '-', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (24, 'DANA 50.000', 'E-Money', 'DANA', 'Umum', 'JHOVA PULSA', 50100, 0, 'dana50', 1, 1, 0, 0, '23:29', '4:1', '-', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (25, 'DANA 75.000', 'E-Money', 'DANA', 'Umum', 'JHOVA PULSA', 75100, 0, 'dana75', 1, 1, 0, 0, '23:29', '4:1', '-', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (26, 'Go Pay 10.000', 'E-Money', 'GO PAY', 'Customer', 'Speed Persada Pay', 10205, 0, 'gopay10', 1, 1, 0, 1, '23:45', '0:15', 'Masukan no HP', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (27, 'Go Pay 100.000', 'E-Money', 'GO PAY', 'Customer', 'HAITRONIK', 100225, 0, 'gopay100', 1, 1, 0, 1, '23:30', '0:30', 'Masukan no HP', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (28, 'Go Pay 15.000', 'E-Money', 'GO PAY', 'Customer', 'Speed Persada Pay', 15210, 0, 'gopay15', 1, 1, 0, 1, '23:45', '0:15', 'Masukan no HP', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (29, 'Go Pay 20.000', 'E-Money', 'GO PAY', 'Customer', 'Speed Persada Pay', 20210, 0, 'gopay20', 1, 1, 0, 1, '23:45', '0:15', 'Masukan no HP', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (30, 'Go Pay 25.000', 'E-Money', 'GO PAY', 'Customer', 'Speed Persada Pay', 25210, 0, 'gopay25', 1, 1, 0, 1, '23:45', '0:15', 'Masukan no HP', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (31, 'Go Pay 30.000', 'E-Money', 'GO PAY', 'Customer', 'Speed Persada Pay', 30225, 0, 'gopay30', 1, 1, 0, 1, '23:45', '0:15', 'Masukan no HP', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (32, 'Go Pay 35.000', 'E-Money', 'GO PAY', 'Customer', 'Speed Persada Pay', 35225, 0, 'gopay35', 1, 1, 0, 1, '23:45', '0:15', 'Masukan no HP', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (33, 'Go Pay 40.000', 'E-Money', 'GO PAY', 'Customer', 'Speed Persada Pay', 40225, 0, 'gopay40', 1, 1, 0, 1, '23:45', '0:15', 'Masukan no HP', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (34, 'Go Pay 45.000', 'E-Money', 'GO PAY', 'Customer', 'Speed Persada Pay', 45225, 0, 'gopay45', 1, 1, 0, 1, '23:45', '0:15', 'Masukan no HP', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (35, 'Go Pay 50.000', 'E-Money', 'GO PAY', 'Customer', 'Speed Persada Pay', 50225, 0, 'gopay50', 1, 1, 0, 1, '23:45', '0:15', 'Masukan no HP', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (36, 'Go Pay 60.000', 'E-Money', 'GO PAY', 'Customer', 'HAITRONIK', 60225, 0, 'gopay60', 1, 1, 0, 1, '23:30', '0:30', 'Masukkan no HP', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (37, 'Go Pay 65.000', 'E-Money', 'GO PAY', 'Customer', 'ASIA TRONIK', 65220, 0, 'gopay65', 1, 1, 0, 1, '23:45', '0:15', 'Masukkan no HP', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (38, 'Go Pay 70.000', 'E-Money', 'GO PAY', 'Customer', 'ASIA TRONIK', 70220, 0, 'gopay70', 1, 1, 0, 1, '23:45', '0:15', 'Masukan no HP', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (39, 'Go Pay 75.000', 'E-Money', 'GO PAY', 'Customer', 'TRIVIO RELOAD', 75160, 0, 'gopay75', 1, 1, 0, 1, '23:30', '0:30', 'Masukan no HP', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (40, 'Grab penumpang 100.000', 'E-Money', 'GRAB', 'Umum', 'NAYLA ELECTRO', 99800, 0, 'grab_cust100', 1, 1, 0, 1, '23:0', '5:0', '-', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (41, 'Grab penumpang 20.000', 'E-Money', 'GRAB', 'Umum', 'NAYLA ELECTRO', 19800, 0, 'grab_cust20', 1, 1, 0, 1, '23:0', '5:0', '-', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (42, 'Grab penumpang 25.000', 'E-Money', 'GRAB', 'Umum', 'NAYLA ELECTRO', 24800, 0, 'grab_cust25', 1, 1, 0, 1, '23:0', '5:0', '-', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (43, 'Grab penumpang 40.000', 'E-Money', 'GRAB', 'Umum', 'NAYLA ELECTRO', 39800, 0, 'grab_cust40', 1, 1, 0, 1, '23:0', '5:0', '-', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (44, 'Grab penumpang 50.000', 'E-Money', 'GRAB', 'Umum', 'NAYLA ELECTRO', 49800, 0, 'grab_cust50', 1, 1, 0, 1, '23:0', '5:0', '-', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (45, 'Grab penumpang 75.000', 'E-Money', 'GRAB', 'Umum', 'NAYLA ELECTRO', 74800, 0, 'grab_cust75', 1, 1, 0, 1, '23:0', '5:0', '-', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (46, 'Indosat 1 GB 30 Hari', 'Data', 'INDOSAT', 'Umum', 'RUMAH KOMUNIKA', 11300, 0, 'isat_data_1gb30hari', 1, 1, 0, 1, '0:0', '0:0', 'KUOTA 1GB 30 hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (47, 'Indosat 2 GB 30 Hari', 'Data', 'INDOSAT', 'Umum', 'PT MAXPRO ADV INDONESIA', 21550, 0, 'isat_data_2gb30hari', 1, 1, 0, 1, '', '', 'KUOTA 2GB 30 hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (48, 'Indosat 3 GB 30 Hari', 'Data', 'INDOSAT', 'Umum', 'RSERVER ID', 19950, 0, 'isat_data_3gb30hari', 1, 1, 0, 1, '0:0', '0:0', 'KUOTA 3GB 30 hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (49, 'Indosat 5 GB 30 Hari', 'Data', 'INDOSAT', 'Umum', 'DN RELOAD', 29300, 0, 'isat_data_5gb30hari', 1, 1, 0, 1, '0:0', '0:0', 'KUOTA 5GB 30 hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (50, 'Indosat Freedom Combo 10 GB 30 Hari', 'Data', 'INDOSAT', 'Freedom Combo', 'Kenzie Komunika', 45545, 0, 'isat_data_fc_10gb30', 1, 1, 0, 1, '23:45', '0:15', 'Freedom Combo 10GB/30hr', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (51, 'Indosat Freedom Combo 20 GB 30 Hari', 'Data', 'INDOSAT', 'Freedom Combo', 'TWIN Reload', 67850, 0, 'isat_data_fc_20gb30', 1, 1, 0, 0, '23:45', '0:15', 'Freedom Combo 20GB/30hr', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (52, 'Indosat Freedom Combo 30 GB 30 Hari', 'Data', 'INDOSAT', 'Freedom Combo', 'KHAZANAH', 92965, 0, 'isat_data_fc_30gb30', 1, 1, 0, 1, '23:45', '0:15', 'Freedom Combo 30GB/30hr', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (53, 'Indosat Freedom Combo 6 GB 30 Hari', 'Data', 'INDOSAT', 'Freedom Combo', 'PT Multi Guna Infotama', 32925, 0, 'isat_data_fc_6gb30', 1, 1, 0, 1, '23:45', '0:20', 'Freedom Combo 6GB/30hr', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (54, 'Indosat Freedom U 10 GB 30 Hari', 'Data', 'INDOSAT', 'Freedom U', 'MEGAFASTER', 43125, 0, 'isat_FU_2gb30', 1, 1, 0, 1, '23:30', '0:30', 'Freedom U 10GB/30hr', '2024-08-12 10:53:01', '2024-08-12 11:02:01');
INSERT INTO `product_prabayars` VALUES (55, 'Indosat Freedom U 20 GB 30 Hari', 'Data', 'INDOSAT', 'Freedom U', 'Pixel Telemedia', 38025, 0, 'isat_FU_3gb30', 1, 1, 0, 1, '23:30', '0:30', 'Freedom U 20GB/30hr', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (56, 'Indosat Freedom U 35 GB 30 Hari', 'Data', 'INDOSAT', 'Freedom U', 'TWIN Reload', 79025, 0, 'isat_FU_7gb30', 1, 1, 0, 0, '23:45', '0:15', 'Freedom U 35GB/30hr', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (57, 'Indosat 10.000', 'Pulsa', 'INDOSAT', 'Umum', 'KIOSPAY', 10545, 12000, 'isat10000', 1, 1, 0, 1, '23:23', '0:30', 'Pulsa Indosat Rp 10.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (58, 'Indosat 100.000', 'Pulsa', 'INDOSAT', 'Umum', 'Lucky 7 Cell', 97825, 0, 'isat100000', 1, 1, 0, 1, '0:0', '0:0', 'Pulsa Indosat Rp 100.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (59, 'Indosat 12.000', 'Pulsa', 'INDOSAT', 'Umum', 'BCA PULSA  CV BALI CAKRA AMERTA', 11970, 0, 'isat12000', 1, 1, 0, 1, '23:30', '0:15', 'Pulsa Indosat Rp 12.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (60, 'Indosat 15.000', 'Pulsa', 'INDOSAT', 'Umum', 'PayTruz', 15075, 0, 'isat15000', 1, 1, 0, 1, '0:0', '0:0', 'Pulsa Indosat Rp 15.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (61, 'Indosat 20.000', 'Pulsa', 'INDOSAT', 'Umum', 'CP RELOAD', 19910, 0, 'isat20000', 1, 1, 0, 1, '23:30', '0:15', 'Pulsa Indosat Rp 20.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (62, 'Indosat 25.000', 'Pulsa', 'INDOSAT', 'Umum', 'Lucky 7 Cell', 24986, 0, 'isat25000', 1, 1, 0, 1, '0:0', '0:0', 'Pulsa Indosat Rp 25.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (63, 'Indosat 5.000', 'Pulsa', 'INDOSAT', 'Umum', 'RUMAH PULSA', 5905, 0, 'isat5000', 0, 1, 0, 1, '23:30', '0:30', 'Pulsa Indosat Rp 5.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (64, 'Indosat 50.000', 'Pulsa', 'INDOSAT', 'Umum', 'Lucky 7 Cell', 49458, 0, 'isat50000', 1, 1, 0, 1, '0:0', '0:0', 'Pulsa Indosat Rp 50.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (65, 'OVO 100.000', 'E-Money', 'OVO', 'Umum', 'Kenzie Komunika', 100440, 0, 'ovo100', 1, 1, 0, 1, '23:45', '0:15', 'OVO 100.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (66, 'OVO 150.000', 'E-Money', 'OVO', 'Umum', 'Kenzie Komunika', 150440, 0, 'ovo150', 1, 1, 0, 1, '23:45', '0:15', 'OVO 150.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (67, 'OVO 20.000', 'E-Money', 'OVO', 'Umum', 'SUPERILOAD', 20000, 0, 'ovo20', 1, 1, 0, 1, '23:0', '6:0', 'OVO 20.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (68, 'OVO 25.000', 'E-Money', 'OVO', 'Umum', 'SUPERILOAD', 25000, 0, 'ovo25', 1, 1, 0, 1, '23:0', '6:0', 'OVO 25.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (69, 'OVO 30.000', 'E-Money', 'OVO', 'Umum', 'SUPERILOAD', 29050, 0, 'ovo30', 1, 1, 0, 1, '23:0', '6:0', 'OVO 30.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (70, 'OVO 35.000', 'E-Money', 'OVO', 'Umum', 'TRAVEL PULSA', 35625, 0, 'ovo35', 0, 1, 0, 1, '23:30', '0:30', 'OVO 35.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (71, 'OVO 40.000', 'E-Money', 'OVO', 'Umum', 'SUPERILOAD', 39050, 0, 'ovo40', 1, 1, 0, 1, '23:0', '6:0', 'OVO 40.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (72, 'OVO 50.000', 'E-Money', 'OVO', 'Umum', 'SUPERILOAD', 50000, 0, 'ovo50', 1, 1, 0, 1, '23:0', '6:0', 'OVO 50.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (73, 'OVO 70.000', 'E-Money', 'OVO', 'Umum', 'SUPERILOAD', 70000, 0, 'ovo70', 1, 1, 0, 1, '23:0', '6:0', 'OVO 70.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (74, 'OVO 90.000', 'E-Money', 'OVO', 'Umum', 'SUPERILOAD', 90000, 0, 'ovo90', 1, 1, 0, 1, '23:0', '6:0', 'OVO 90.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (75, 'PLN 100.000', 'PLN', 'PLN', 'Umum', 'Lucky 7 Cell', 100095, 102500, 'pln_100', 1, 1, 0, 1, '0:0', '0:0', 'masukkan nomor meter/id pelanggan', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (76, 'PLN 20.000', 'PLN', 'PLN', 'Umum', 'Lucky 7 Cell', 20080, 22500, 'pln_20', 0, 1, 0, 1, '0:0', '0:0', 'masukkan nomor meter/id pelanggan', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (77, 'PLN 200.000', 'PLN', 'PLN', 'Umum', 'PT SMART BILLER INDONESIA', 200015, 202500, 'pln_200', 1, 1, 0, 1, '23:30', '0:15', 'masukkan nomor meter/id pelanggan', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (78, 'PLN 50.000', 'PLN', 'PLN', 'Umum', 'Lucky 7 Cell', 50095, 0, 'pln_50', 1, 1, 0, 1, '0:0', '0:0', 'masukkan nomor meter/id pelanggan', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (79, 'PLN 500.000', 'PLN', 'PLN', 'Umum', 'Premium Pulsa', 500025, 0, 'pln_500', 1, 1, 0, 1, '23:45', '0:15', 'masukkan nomor meter/id pelanggan', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (80, 'Smartfren 10 GB / 30 Hari', 'Data', 'SMARTFREN', 'Umum', 'PayTruz', 32000, 0, 'smart_10gb30h', 0, 1, 0, 1, '23:45', '0:15', '5GB Regular + 5GB Malam', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (81, 'Smartfren 2 GB / 7 Hari', 'Data', 'SMARTFREN', 'Umum', 'Speed Persada Pay', 8155, 0, 'smart_2gb7h', 1, 1, 0, 1, '23:45', '0:15', '1GB Kuota Utama + 1GB Kuota Chat', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (82, 'Smartfren 4 GB / 14 Hari', 'Data', 'SMARTFREN', 'Umum', 'Panda', 16460, 0, 'smart_4gb14h', 1, 1, 0, 1, '23:55', '0:5', '2GB Regular + 2GB Malam', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (83, 'Smartfren 8 GB / 14 Hari', 'Data', 'SMARTFREN', 'Umum', 'BCA PULSA  CV BALI CAKRA AMERTA', 24625, 0, 'smart_8gb14h', 1, 1, 0, 1, '23:30', '0:15', '4GB Regular + 4GB Malam', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (84, 'Smartfren Data Unlimited Harian 3 GB Berlaku 28 Hari', 'Data', 'SMARTFREN', 'Unlimited', 'Bijur', 98875, 0, 'smart_unli_100rb', 1, 1, 0, 1, '23:30', '0:45', 'Batas pemakaian wajar 3GB/hari, Unlimited 24 Jam, Gratis Nelpon ke sesama smartfren, Berlaku 28 hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (85, 'Smartfren Data Unlimited Harian 1 GB Berlaku 7 Hari', 'Data', 'SMARTFREN', 'Unlimited', 'ABCellular', 27500, 0, 'smart_unli_20rb', 1, 1, 0, 0, '23:44', '0:1', 'Batas pemakaian wajar 1GB/hari, Unlimited 24 Jam, Gratis Nelpon ke sesama smartfren, Berlaku 7 hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (86, 'Smartfren Data Unlimited Harian 1 GB Berlaku 14 Hari', 'Data', 'SMARTFREN', 'Unlimited', 'GO RELOAD ID', 46730, 0, 'smart_unli_40rb', 1, 1, 0, 1, '23:30', '0:30', 'Batas pemakaian wajar 1GB/hari, Unlimited 24 Jam, Gratis Nelpon ke sesama smartfren, Berlaku 14 hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (87, 'Smartfren Data Unlimited Harian 500 MB Berlaku 28 Hari', 'Data', 'SMARTFREN', 'Unlimited', 'opal pulsa', 68825, 0, 'smart_unli_60rb', 0, 1, 0, 1, '0:0', '0:0', 'Batas pemakaian wajar 500MB/hari, Unlimited 24 Jam, Gratis Nelpon ke sesama smartfren, Berlaku 28 hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (88, 'Smartfren Data Unlimited Harian 2 GB Berlaku 28 Hari', 'Data', 'SMARTFREN', 'Unlimited', 'TriStar', 80840, 0, 'smart_unli_80rb', 1, 1, 0, 1, '23:40', '0:20', 'Batas pemakaian wajar 2GB/hari, Unlimited 24 Jam, Gratis Nelpon ke sesama smartfren, Berlaku 28 hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (89, 'Smartfren 10.000', 'Pulsa', 'SMARTFREN', 'Umum', 'PT WIJAYA KOMUNIKA PAYMENT', 9720, 0, 'smart10', 1, 1, 0, 1, '23:30', '0:15', 'Pulsa Smart Rp 10.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (90, 'Smartfren 100.000', 'Pulsa', 'SMARTFREN', 'Umum', 'PT SMART BILLER INDONESIA', 95975, 0, 'smart100', 1, 1, 0, 1, '23:30', '0:15', 'Pulsa Smart Rp 100.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (91, 'Smartfren 15.000', 'Pulsa', 'SMARTFREN', 'Umum', 'EPS', 14705, 0, 'smart15', 1, 1, 0, 1, '23:45', '0:15', 'Pulsa Smart Rp 15.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (92, 'Smartfren 20.000', 'Pulsa', 'SMARTFREN', 'Umum', 'DUTA CEMERLANG', 19460, 0, 'smart20', 1, 1, 0, 1, '23:30', '0:20', 'Pulsa Smart Rp 20.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (93, 'Smartfren 25.000', 'Pulsa', 'SMARTFREN', 'Umum', 'TRAVEL PULSA', 24360, 0, 'smart25', 1, 1, 0, 1, '23:30', '0:30', 'Pulsa Smart Rp 25.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (94, 'Smartfren 5.000', 'Pulsa', 'SMARTFREN', 'Umum', 'ADIJAYA CELL', 4940, 0, 'smart5', 1, 1, 0, 1, '23:45', '0:15', 'Pulsa Smart Rp 5.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (95, 'Smartfren 50.000', 'Pulsa', 'SMARTFREN', 'Umum', 'PT WIJAYA KOMUNIKA PAYMENT', 48175, 0, 'smart50', 1, 1, 0, 1, '23:30', '0:15', 'Pulsa Smart Rp 50.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (96, 'Smartfren 60.000', 'Pulsa', 'SMARTFREN', 'Umum', 'PT WIJAYA KOMUNIKA PAYMENT', 58425, 0, 'smart60', 1, 1, 0, 1, '23:30', '0:15', 'Pulsa Smart Rp 60.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (97, 'Smartfren 75.000', 'Pulsa', 'SMARTFREN', 'Umum', 'Omega Tronik', 73150, 0, 'smart75', 1, 1, 0, 1, '23:45', '0:15', 'Pulsa Smart Rp 75.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (98, 'Tri Data 10 GB 30 Hari', 'Data', 'TRI', 'Pure 30 Hari', 'BCA PULSA  CV BALI CAKRA AMERTA', 59075, 0, 'tri_10gb30h', 1, 1, 0, 1, '23:30', '0:15', 'Kuota 10GB ( 2G/3G/4G ) 24 JAM masa aktif 30 hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (99, 'Tri Data 15 GB / 30 Hari', 'Data', 'TRI', 'Umum', 'ISTIQOMAH RELOAD', 61875, 0, 'tri_15gb30h', 1, 1, 0, 1, '23:30', '0:30', 'Kuota 15GB ( 2G/3G/4G ) 24 JAM masa aktif 30 hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (100, 'Tri Data 20 GB / 30 Hari', 'Data', 'TRI', 'Umum', 'CENTRA RELOAD', 67525, 0, 'tri_20gb30h', 1, 1, 0, 1, '23:45', '0:20', 'Kuota 20GB ( 2G/3G/4G ) 24 JAM masa aktif 30 hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (101, 'Tri Data 4G 10 GB 30 Hari', 'Data', 'TRI', 'Umum', 'PayTruz', 54999, 0, 'tri_4G_10gb30h', 1, 1, 0, 1, '0:0', '0:0', '2 GB + 8GB 4G + Content, 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (102, 'Tri Data 4G 12 GB / 30 Hari', 'Data', 'TRI', 'Umum', 'Payfast ID', 54275, 0, 'tri_4G_12gb30h', 1, 1, 0, 1, '23:45', '0:15', '2 GB + 8GB 4G + 2 GB (Youtube/Netflix), 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (103, 'Tri Data 4G 15 GB / 30 Hari', 'Data', 'TRI', 'Umum', 'CV Atlanta Maju Jaya', 70000, 0, 'tri_4G_15gb30h', 1, 1, 0, 1, '0:0', '0:0', '3 GB + 9GB 4G + 3 GB (Youtube/Netflix) 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (104, 'Tri Data 4G 35 GB / 30 Hari', 'Data', 'TRI', 'Umum', 'BAMBOE tronik', 77886, 0, 'tri_4G_35gb30h', 1, 1, 0, 1, '23:30', '0:15', '5 GB + 30GB (1 GB/hari 4G) 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (105, 'Tri Data 4G 38 GB / 30 Hari', 'Data', 'TRI', 'Umum', 'MARKAZ', 122730, 0, 'tri_4G_38gb30h', 1, 1, 0, 1, '23:45', '0:15', '8 GB + 30GB 4G, 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (106, 'Tri Data 5 GB 30 Hari', 'Data', 'TRI', 'Pure 30 Hari', 'MKZ', 31025, 0, 'tri_5gb30h', 1, 1, 0, 1, '23:45', '0:15', 'Tri Data 5 GB / 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (107, 'Three 1.000', 'Pulsa', 'TRI', 'Umum', 'PT MAXPRO ADV INDONESIA', 1525, 0, 'tri1000', 1, 1, 0, 1, '23:45', '0:15', 'Pulsa Three Rp 1.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (108, 'Three 10.000', 'Pulsa', 'TRI', 'Umum', 'PT MAXPRO ADV INDONESIA', 10475, 0, 'tri10000', 1, 1, 0, 1, '23:45', '0:15', 'Pulsa Three Rp 10.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (109, 'Three 15.000', 'Pulsa', 'TRI', 'Umum', 'PayTruz', 15000, 0, 'tri15000', 1, 1, 0, 1, '0:0', '0:0', 'Pulsa Three Rp 15.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (110, 'Three 2.000', 'Pulsa', 'TRI', 'Umum', 'RUMAH KOMUNIKA', 2340, 0, 'tri2000', 1, 1, 0, 1, '0:0', '0:0', 'Pulsa Three Rp 2.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (111, 'Three 25.000', 'Pulsa', 'TRI', 'Umum', 'GEMILANG RELOAD', 24885, 0, 'tri25000', 0, 1, 0, 1, '23:30', '0:30', 'Pulsa Three Rp 25.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (112, 'Three 3.000', 'Pulsa', 'TRI', 'Umum', 'PayTruz', 3350, 0, 'tri3000', 1, 1, 0, 1, '0:0', '0:0', 'Pulsa Three Rp 3.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (113, 'Three 5.000', 'Pulsa', 'TRI', 'Umum', 'metro reload', 5511, 0, 'tri5000', 1, 1, 0, 1, '23:50', '0:5', 'Pulsa Three Rp 5.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (114, 'Three 50.000', 'Pulsa', 'TRI', 'Umum', 'GEMILANG RELOAD', 49125, 0, 'tri50000', 1, 1, 0, 1, '23:30', '0:30', 'Pulsa Three Rp 50.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (115, 'Telkomsel 15.000', 'Pulsa', 'TELKOMSEL', 'Umum', 'RUMAH KOMUNIKA', 15099, 0, 'tsel_15000', 1, 1, 0, 1, '0:0', '0:0', 'Pulsa Telkomsel Rp 15.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (116, 'Telkomsel 20.000', 'Pulsa', 'TELKOMSEL', 'Umum', 'ADIJAYA CELL', 19900, 0, 'tsel_22000', 1, 1, 0, 1, '23:45', '0:15', 'Pulsa Telkomsel Rp 20.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (117, 'Telkomsel 25.000', 'Pulsa', 'TELKOMSEL', 'Umum', 'GEMILANG RELOAD', 24860, 0, 'tsel_25000', 1, 1, 0, 1, '23:59', '0:30', 'Pulsa Telkomsel Rp 25.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (118, 'Telkomsel 5.000', 'Pulsa', 'TELKOMSEL', 'Umum', 'SAKA NUSANTARA', 4480, 0, 'tsel_5000', 1, 1, 0, 1, '23:44', '0:16', 'Pulsa Telkomsel Rp 5.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (119, 'Telkomsel 50.000', 'Pulsa', 'TELKOMSEL', 'Umum', 'Speed Persada Pay', 48175, 0, 'tsel_50000', 1, 1, 0, 1, '23:45', '0:15', 'Telkomsel 50.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (120, 'Telkomsel Data 15 GB + 40 GB Videomax / 30 Hari', 'Data', 'TELKOMSEL', 'Umum', 'Premium Pulsa', 150225, 0, 'tsel_data_15gb_40gbVmax30', 1, 1, 0, 1, '0:0', '0:0', 'Berlaku nasional, masa aktif 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (121, 'Telkomsel Data 1 GB + 2 GB Game / 30 Hari', 'Data', 'TELKOMSEL', 'Umum', 'opal pulsa', 24000, 0, 'tsel_data_1gb_2gbGame_30h', 1, 1, 0, 1, '0:0', '0:0', 'Flash 1GB + 2GB Game (30 hari)', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (122, 'Telkomsel Data 1 GB + 500 MB Youtube / 30 Hari', 'Data', 'TELKOMSEL', 'Umum', 'RUMAH KOMUNIKA', 24950, 0, 'tsel_data_1gb_500mbYt_30h', 1, 1, 0, 1, '0:0', '0:0', 'Telkomsel Data 1GB + 500MB Youtube 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (123, 'Telkomsel Data 1 GB + 5 GB Videomax / 30 Hari', 'Data', 'TELKOMSEL', 'Umum', 'opal pulsa', 24500, 0, 'tsel_data_1gb_5gbvmax_30h', 1, 1, 0, 1, '0:0', '0:0', 'Berlaku nasional, masa aktif 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (124, 'Telkomsel Data 2 GB + 1.5 GB Youtube / 30 Hari', 'Data', 'TELKOMSEL', 'Umum', 'RUMAH KOMUNIKA', 49999, 0, 'tsel_data_2gb_1_5gbYt_30h', 1, 1, 0, 1, '', '', 'Berlaku nasional, masa aktif 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (125, 'Telkomsel Data Ketengan Utama 30 GB 7 Hari', 'Data', 'TELKOMSEL', 'Ketengan Utama', 'Premium Pulsa', 71525, 0, 'tsel_data_30gb_7hari', 1, 1, 0, 1, '23:30', '0:15', '-', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (126, 'Telkomsel Data 3 GB + 12 GB Videomax / 30 Hari', 'Data', 'TELKOMSEL', 'Umum', 'Premium Pulsa', 50600, 0, 'tsel_data_3gb_12gbvmax30h', 1, 1, 0, 1, '0:0', '0:0', 'Berlaku nasional, masa aktif 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (127, 'Telkomsel Data 4 GB + 2 GB Youtube / 30 Hari', 'Data', 'TELKOMSEL', 'Umum', 'RUMAH KOMUNIKA', 76999, 0, 'tsel_data_4gb_2gbYt_30h', 1, 1, 0, 1, '0:0', '0:0', 'Berlaku nasional, masa aktif 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (128, 'Telkomsel Data 7 GB + 28 GB Videomax / 30 Hari', 'Data', 'TELKOMSEL', 'Umum', 'Premium Pulsa', 103225, 0, 'tsel_data_7gb_28gbVmax30h', 1, 1, 0, 1, '0:0', '0:0', 'Berlaku nasional, masa aktif 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (129, 'Telkomsel COMBO 10 GB / 30 Hari', 'Data', 'TELKOMSEL', 'Umum', 'opal pulsa', 99750, 0, 'tsel_data_combo10gb_30h', 0, 1, 0, 1, '0:0', '0:0', '10GB + 100 Menit Sesama + 100 sms Sesama (on net), berlaku 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (130, 'Telkomsel Data Combo Sakti 1.5 GB', 'Data', 'TELKOMSEL', 'Combo Sakti', 'Payfast ID', 16110, 0, 'tsel_data_CS_1_5gb', 1, 1, 0, 1, '23:45', '0:15', 'Internet 1.5 GB, Nelpon sesama 150 Menit, SMS sesama 400 SMS, berlaku 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (131, 'Telkomsel Data Combo Sakti 10 GB', 'Data', 'TELKOMSEL', 'Combo Sakti', 'ANTAEUZ', 52000, 0, 'tsel_data_cs_10gb', 1, 1, 0, 1, '0:0', '0:0', 'Telkomsel Data Combo Sakti 10 GB, 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (132, 'Telkomsel Data Combo Sakti 15 GB', 'Data', 'TELKOMSEL', 'Combo Sakti', 'PT AMi', 76225, 0, 'tsel_data_cs_15gb', 1, 1, 0, 1, '23:55', '0:5', 'Telkomsel Data Combo Sakti 15 GB, 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (133, 'Telkomsel Data Combo Sakti 2.5 GB', 'Data', 'TELKOMSEL', 'Combo Sakti', 'Bijur', 32710, 0, 'tsel_data_cs_2_5gb', 1, 1, 0, 1, '23:30', '0:45', 'Telkomsel Data Combo Sakti 2.5 GB, 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (134, 'Telkomsel Data Combo Sakti 20 GB', 'Data', 'TELKOMSEL', 'Combo Sakti', 'SOCIOVO', 60875, 0, 'tsel_data_cs_20gb', 1, 1, 0, 1, '23:30', '0:30', 'Telkomsel Data Combo Sakti 20 GB, 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (135, 'Telkomsel Data Combo Sakti 3 GB', 'Data', 'TELKOMSEL', 'Combo Sakti', 'Payfast ID', 31510, 0, 'tsel_data_cs_3gb', 1, 1, 0, 1, '23:45', '0:15', 'Internet 3 GB, Nelpon sesama 150 Menit, SMS sesama 400 SMS, berlaku 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (136, 'Telkomsel Data Combo Sakti 5 GB', 'Data', 'TELKOMSEL', 'Combo Sakti', 'Payfast ID', 35525, 0, 'tsel_data_cs_5gb', 1, 1, 0, 1, '23:45', '0:15', 'Telkomsel Data Combo Sakti 5 GB, 30 Hari', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (137, 'XL Data 1 GB 30 Hari', 'Data', 'XL', 'Umum', 'GO RELOAD ID', 7205, 0, 'xl_data_1gb30h', 1, 1, 0, 1, '23:30', '0:30', 'DRP DATA 1 GB, 2G3G4G, 30D', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (138, 'XL Data 2 GB 30 Hari', 'Data', 'XL', 'Umum', 'Digital Komunika', 15010, 0, 'xl_data_2gb30h', 1, 1, 0, 1, '23:30', '0:15', 'DRP DATA 2 GB, 2G3G4G, 30D', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (139, 'XL Data 3 GB 30 Hari', 'Data', 'XL', 'Umum', 'Integra Komunika', 22530, 0, 'xl_data_3gb30h', 1, 1, 0, 1, '23:30', '0:15', 'DRP DATA 3 GB, 2G3G4G, 30D', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (140, 'XL Data 4 GB 30 Hari', 'Data', 'XL', 'Umum', 'Integra Komunika', 30030, 0, 'xl_data_4gb30h', 1, 1, 0, 1, '23:30', '0:15', 'DRP DATA 4 GB, 2G3G4G, 30D', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (141, 'XL Data 5 GB 30 Hari', 'Data', 'XL', 'Umum', 'GO RELOAD ID', 35775, 0, 'xl_data_5gb30h', 1, 1, 0, 1, '23:30', '0:30', 'DRP DATA 5 GB, 2G3G4G, 30D', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (142, 'XL Data 6 GB 30 Hari', 'Data', 'XL', 'Umum', 'Premium Pulsa', 41880, 0, 'xl_data_6gb30h', 1, 1, 0, 1, '0:0', '0:0', 'DRP DATA 6 GB, 2G3G4G, 30D', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (143, 'XL Xtra Combo 10 GB + 20 GB 30 Hari', 'Data', 'XL', 'Xtra Combo', 'Kenzie Komunika', 82700, 0, 'xl_xcombo_10_20gb_30h', 1, 1, 0, 1, '23:45', '0:15', 'Xtra Combo 10+20 Double Youtube', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (144, 'XL Xtra Combo 15 GB + 30 GB 30 Hari', 'Data', 'XL', 'Xtra Combo', 'CBRS Reload', 110000, 0, 'xl_xcombo_15_30gb_30h', 1, 1, 0, 1, '23:30', '0:30', 'Xtra Combo 15+30 Double Youtube', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (145, 'XL Xtra Combo 20 GB + 40 GB 30 Hari', 'Data', 'XL', 'Xtra Combo', 'Premium Pulsa', 155075, 0, 'xl_xcombo_20_40gb_30h', 1, 1, 0, 1, '0:0', '0:0', 'Xtra Combo 20+40 Double Youtube', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (146, 'XL Xtra Combo 5 GB + 10 GB 30 Hari', 'Data', 'XL', 'Xtra Combo', 'CBRS Reload', 54200, 0, 'xl_xcombo_5_10gb_30h', 1, 1, 0, 1, '23:25', '0:34', 'Xtra Combo 5+10 Double Youtube', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (147, 'Xl 100.000', 'Pulsa', 'XL', 'Umum', 'RUMAH KOMUNIKA', 99250, 0, 'xl100000', 1, 1, 0, 1, '0:0', '0:0', 'Pulsa Xl Rp 100.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (148, 'Xl 15.000', 'Pulsa', 'XL', 'Umum', 'GEMILANG RELOAD', 15010, 0, 'xl15000', 1, 1, 0, 1, '23:0', '0:30', 'Pulsa Xl Rp 15.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (149, 'Xl 25.000', 'Pulsa', 'XL', 'Umum', 'GEMILANG RELOAD', 24980, 0, 'xl25000', 1, 1, 0, 1, '23:0', '0:30', 'Pulsa Xl Rp 25.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (150, 'Xl 5.000', 'Pulsa', 'XL', 'Umum', 'PayTruz', 5925, 0, 'xl5000', 1, 1, 0, 1, '0:0', '0:0', 'Pulsa Xl Rp 5.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');
INSERT INTO `product_prabayars` VALUES (151, 'Xl 50.000', 'Pulsa', 'XL', 'Umum', 'GEMILANG RELOAD', 49975, 0, 'xl50000', 1, 1, 0, 1, '23:2', '0:30', 'Pulsa Xl Rp 50.000', '2024-08-12 10:53:01', '2024-09-10 04:42:28');

-- ----------------------------
-- Table structure for role_has_permissions
-- ----------------------------
DROP TABLE IF EXISTS `role_has_permissions`;
CREATE TABLE `role_has_permissions`  (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL,
  PRIMARY KEY (`permission_id`, `role_id`) USING BTREE,
  INDEX `role_has_permissions_role_id_foreign`(`role_id`) USING BTREE,
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_has_permissions
-- ----------------------------
INSERT INTO `role_has_permissions` VALUES (24, 1);
INSERT INTO `role_has_permissions` VALUES (25, 1);
INSERT INTO `role_has_permissions` VALUES (26, 1);
INSERT INTO `role_has_permissions` VALUES (27, 1);
INSERT INTO `role_has_permissions` VALUES (28, 1);
INSERT INTO `role_has_permissions` VALUES (29, 1);
INSERT INTO `role_has_permissions` VALUES (30, 1);
INSERT INTO `role_has_permissions` VALUES (31, 1);
INSERT INTO `role_has_permissions` VALUES (32, 1);
INSERT INTO `role_has_permissions` VALUES (33, 1);
INSERT INTO `role_has_permissions` VALUES (34, 1);
INSERT INTO `role_has_permissions` VALUES (35, 1);
INSERT INTO `role_has_permissions` VALUES (36, 1);
INSERT INTO `role_has_permissions` VALUES (37, 1);
INSERT INTO `role_has_permissions` VALUES (38, 1);
INSERT INTO `role_has_permissions` VALUES (39, 1);
INSERT INTO `role_has_permissions` VALUES (40, 1);
INSERT INTO `role_has_permissions` VALUES (37, 2);
INSERT INTO `role_has_permissions` VALUES (38, 2);
INSERT INTO `role_has_permissions` VALUES (39, 2);
INSERT INTO `role_has_permissions` VALUES (40, 2);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `roles_name_guard_name_unique`(`name`, `guard_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES (1, 'Admin', 'web', NULL, NULL);
INSERT INTO `roles` VALUES (2, 'Mitra', 'web', NULL, NULL);

-- ----------------------------
-- Table structure for saldo_users
-- ----------------------------
DROP TABLE IF EXISTS `saldo_users`;
CREATE TABLE `saldo_users`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `saldo` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of saldo_users
-- ----------------------------

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NULL DEFAULT NULL,
  `ip_address` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `user_agent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `sessions_user_id_index`(`user_id`) USING BTREE,
  INDEX `sessions_last_activity_index`(`last_activity`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES ('Am7mVo2PPLVyCeY9O1ooc62IyBlNt8zYaspHFwuJ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNXZGZ3pKbXRNRHNHODlxZ1FUYjhidGR3NzJsSmtHa2VzZHY1SzZNeCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fX0=', 1726039089);

-- ----------------------------
-- Table structure for transaction_codes
-- ----------------------------
DROP TABLE IF EXISTS `transaction_codes`;
CREATE TABLE `transaction_codes`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `transaction_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_date` date NOT NULL,
  `transaction_number` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of transaction_codes
-- ----------------------------
INSERT INTO `transaction_codes` VALUES (1, 'INV-WP-24-09-000000001', '2024-09-10', 0, '2024-09-10 04:10:49', '2024-09-10 04:10:49');
INSERT INTO `transaction_codes` VALUES (2, 'INV-WP-24-09-000000002', '2024-09-10', 0, '2024-09-10 04:11:16', '2024-09-10 04:11:16');
INSERT INTO `transaction_codes` VALUES (3, 'INV-WP-24-09-000000003', '2024-09-10', 0, '2024-09-10 04:12:44', '2024-09-10 04:12:44');
INSERT INTO `transaction_codes` VALUES (4, 'INV-WP-24-09-000000004', '2024-09-10', 0, '2024-09-10 04:12:59', '2024-09-10 04:12:59');
INSERT INTO `transaction_codes` VALUES (5, 'INV-WP-24-09-000000005', '2024-09-10', 0, '2024-09-10 04:14:40', '2024-09-10 04:14:40');
INSERT INTO `transaction_codes` VALUES (6, 'INV-WP-24-09-000000006', '2024-09-10', 0, '2024-09-10 04:15:09', '2024-09-10 04:15:09');
INSERT INTO `transaction_codes` VALUES (7, 'INV-WP-24-09-000000007', '2024-09-10', 0, '2024-09-10 06:31:21', '2024-09-10 06:31:21');
INSERT INTO `transaction_codes` VALUES (8, 'INV-WP-24-09-000000008', '2024-09-10', 0, '2024-09-10 06:32:43', '2024-09-10 06:32:43');
INSERT INTO `transaction_codes` VALUES (9, 'INV-WP-24-09-000000009', '2024-09-10', 0, '2024-09-10 06:33:40', '2024-09-10 06:33:40');
INSERT INTO `transaction_codes` VALUES (10, 'INV-WP-24-09-000000010', '2024-09-10', 0, '2024-09-10 06:35:21', '2024-09-10 06:35:21');
INSERT INTO `transaction_codes` VALUES (11, 'INV-WP-24-09-000000011', '2024-09-10', 0, '2024-09-10 06:36:18', '2024-09-10 06:36:18');
INSERT INTO `transaction_codes` VALUES (12, 'INV-WP-24-09-000000012', '2024-09-10', 0, '2024-09-10 06:43:04', '2024-09-10 06:43:04');
INSERT INTO `transaction_codes` VALUES (13, 'INV-WP-24-09-000000013', '2024-09-10', 0, '2024-09-10 06:45:55', '2024-09-10 06:45:55');
INSERT INTO `transaction_codes` VALUES (14, 'INV-WP-24-09-000000014', '2024-09-10', 0, '2024-09-10 06:50:59', '2024-09-10 06:50:59');
INSERT INTO `transaction_codes` VALUES (15, 'INV-WP-24-09-000000015', '2024-09-10', 0, '2024-09-10 06:56:24', '2024-09-10 06:56:24');
INSERT INTO `transaction_codes` VALUES (16, 'INV-WP-24-09-000000016', '2024-09-10', 0, '2024-09-10 06:58:11', '2024-09-10 06:58:11');
INSERT INTO `transaction_codes` VALUES (17, 'INV-WP-24-09-000000017', '2024-09-10', 0, '2024-09-10 06:58:43', '2024-09-10 06:58:43');
INSERT INTO `transaction_codes` VALUES (18, 'INV-WP-24-09-000000018', '2024-09-10', 0, '2024-09-10 06:59:30', '2024-09-10 06:59:30');
INSERT INTO `transaction_codes` VALUES (19, 'INV-WP-24-09-000000019', '2024-09-10', 0, '2024-09-10 07:00:26', '2024-09-10 07:00:26');
INSERT INTO `transaction_codes` VALUES (20, 'INV-WP-24-09-000000020', '2024-09-10', 0, '2024-09-10 07:01:01', '2024-09-10 07:01:01');
INSERT INTO `transaction_codes` VALUES (21, 'INV-WP-24-09-000000021', '2024-09-10', 0, '2024-09-10 07:05:16', '2024-09-10 07:05:16');
INSERT INTO `transaction_codes` VALUES (22, 'INV-WP-24-09-000000022', '2024-09-10', 0, '2024-09-10 07:08:33', '2024-09-10 07:08:33');
INSERT INTO `transaction_codes` VALUES (23, 'INV-WP-24-09-000000023', '2024-09-10', 0, '2024-09-10 07:25:02', '2024-09-10 07:25:02');
INSERT INTO `transaction_codes` VALUES (24, 'INV-WP-24-09-000000024', '2024-09-10', 0, '2024-09-10 08:05:18', '2024-09-10 08:05:18');
INSERT INTO `transaction_codes` VALUES (25, 'INV-WP-24-09-000000025', '2024-09-10', 0, '2024-09-10 10:36:45', '2024-09-10 10:36:45');
INSERT INTO `transaction_codes` VALUES (26, 'INV-WP-24-09-000000026', '2024-09-10', 0, '2024-09-10 11:27:03', '2024-09-10 11:27:03');
INSERT INTO `transaction_codes` VALUES (27, 'INV-WP-24-09-000000027', '2024-09-10', 0, '2024-09-10 11:30:40', '2024-09-10 11:30:40');
INSERT INTO `transaction_codes` VALUES (28, 'INV-WP-24-09-000000028', '2024-09-10', 0, '2024-09-10 11:34:10', '2024-09-10 11:34:10');
INSERT INTO `transaction_codes` VALUES (29, 'INV-WP-24-09-000000029', '2024-09-10', 0, '2024-09-10 11:35:41', '2024-09-10 11:35:41');

-- ----------------------------
-- Table structure for transaction_pascas
-- ----------------------------
DROP TABLE IF EXISTS `transaction_pascas`;
CREATE TABLE `transaction_pascas`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `transaction_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_customer_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_sku` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `transaction_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `transaction_status_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `transaction_product_category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_product_brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_sn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `transaction_price` int NOT NULL,
  `transaction_user_id` int NOT NULL,
  `transaction_source` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'web',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of transaction_pascas
-- ----------------------------
INSERT INTO `transaction_pascas` VALUES (1, 'INV-WP-24-09-000000030', '522032409694', 'pln', 'transaction success', 'sukses', '00', 'Pascabayar', 'PLN PASCABAYAR', '23124234234234234', 102500, 5, 'web', '2024-09-11 10:57:14', '2024-09-11 10:57:19');

-- ----------------------------
-- Table structure for transaction_prabayars
-- ----------------------------
DROP TABLE IF EXISTS `transaction_prabayars`;
CREATE TABLE `transaction_prabayars`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `transaction_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_customer_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_sku` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `transaction_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `transaction_status_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `transaction_product_category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_product_brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_sn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `transaction_user_id` int NOT NULL,
  `transaction_source` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'web',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of transaction_prabayars
-- ----------------------------
INSERT INTO `transaction_prabayars` VALUES (1, 'INV-WP-24-09-000000029', '085721868539', 'isat5000', 'Sukses', 'sukses', '00', 'Pulsa', 'INDOSAT', '234234234234234234', 5, 'web', '2024-09-10 22:03:02', '2024-09-10 22:03:05');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `users_email_unique`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (4, 'gagas', 'admin@email.com', NULL, '$2y$12$zV3kqojmSv0VUYlViw.58edPRLGRSuhgQ53Oxau6g0sxc3IHHHsVK', NULL, '2024-08-27 06:24:17', '2024-09-11 06:41:32');
INSERT INTO `users` VALUES (5, 'test update', 'test@email.com', NULL, '$2y$12$zECIue0lMZ9BipOsSnEidu86pfnEKz8pZIEaIaBdVcixAEkNrYyQ6', NULL, '2024-08-29 06:37:54', '2024-08-29 06:44:59');
INSERT INTO `users` VALUES (6, 'test daftar', 'daftar@email.com', NULL, '$2y$12$1R7mgrjbjjQU565rx1HNZes8/lMD1Txh/oeSoljDbbZDhRU.1.Pha', NULL, '2024-09-11 07:13:53', '2024-09-11 07:13:53');

SET FOREIGN_KEY_CHECKS = 1;
