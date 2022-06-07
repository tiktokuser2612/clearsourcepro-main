-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 07, 2022 at 06:54 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clearsourcepro_main`
--

-- --------------------------------------------------------

--
-- Table structure for table `action_permissions`
--

CREATE TABLE `action_permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `permission` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `action_permissions`
--

INSERT INTO `action_permissions` (`id`, `permission`, `parent_id`, `created_at`, `updated_at`) VALUES
(1, 'Menu Items', NULL, NULL, NULL),
(2, 'Dashboard', 1, NULL, NULL),
(3, 'Users Controller', 1, NULL, NULL),
(4, 'History', 1, NULL, NULL),
(5, 'Requisitions', 1, NULL, NULL),
(6, 'Recruiters', 1, NULL, NULL),
(7, 'Clients', 1, NULL, NULL),
(8, 'Client Records', 1, NULL, NULL),
(9, 'Candidates', 1, NULL, NULL),
(10, 'Reports', 1, NULL, NULL),
(11, 'Settings', 1, NULL, NULL),
(12, 'Dashboard', NULL, NULL, NULL),
(13, 'Analytics Summary', 12, NULL, NULL),
(14, 'Metrics', 12, NULL, NULL),
(15, 'Req Calendar & Candidates', 12, NULL, NULL),
(16, 'My Open Reqs', 12, NULL, NULL),
(17, 'All Open Reqs', 12, NULL, NULL),
(18, 'Billboard', 12, NULL, NULL),
(19, 'My Tasks', 12, NULL, NULL),
(20, 'Users Controller', NULL, NULL, NULL),
(21, 'Actions', 20, NULL, NULL),
(22, 'History', NULL, NULL, NULL),
(23, 'Actions', 22, NULL, NULL),
(24, 'Req Accordions', NULL, NULL, NULL),
(25, 'Details', 24, NULL, NULL),
(26, 'Analytics Summary', 24, NULL, NULL),
(27, 'Candidates by Workflow', 24, NULL, NULL),
(28, 'Description', 24, NULL, NULL),
(29, 'General Details', 24, NULL, NULL),
(30, 'Posting Option', 24, NULL, NULL),
(31, 'Notes', 24, NULL, NULL),
(32, 'Recruiter Accordions', NULL, NULL, NULL),
(33, 'Details', 32, NULL, NULL),
(34, 'Analytics Summary', 32, NULL, NULL),
(35, 'Resume', 32, NULL, NULL),
(36, 'Permissions', 32, NULL, NULL),
(37, 'Notes', 32, NULL, NULL),
(38, 'Client Accordions', NULL, NULL, NULL),
(39, 'Details', 38, NULL, NULL),
(40, 'Reqs', 38, NULL, NULL),
(41, 'Hiring Managers', 38, NULL, NULL),
(42, 'Accounting/Billing Contact Info', 38, NULL, NULL),
(43, 'Description of Business', 38, NULL, NULL),
(44, 'Contacts', 38, NULL, NULL),
(45, 'Candidate Tabs', NULL, NULL, NULL),
(46, 'Summary', 45, NULL, NULL),
(47, 'Application', 45, NULL, NULL),
(48, 'Feed', 45, NULL, NULL),
(49, 'Workflow', 45, NULL, NULL),
(50, 'Evaluations', 45, NULL, NULL),
(51, 'Notes', 45, NULL, NULL),
(52, 'Messages', 45, NULL, NULL),
(53, 'Tasks', 45, NULL, NULL),
(54, 'Activity', 45, NULL, NULL),
(55, 'Status', 45, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_record_id` int(11) NOT NULL,
  `action` int(11) NOT NULL,
  `activityable_id` int(11) NOT NULL,
  `activityable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `user_role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `client_record_id`, `action`, `activityable_id`, `activityable_type`, `created_at`, `updated_at`, `user_role`, `user_id`, `message`) VALUES
(1, 1, 1, 1, 'App\\Models\\ClientRecord', '2022-05-12 05:22:11', '2022-05-12 05:22:11', 'admin', '1', 'create new record by admin');

-- --------------------------------------------------------

--
-- Table structure for table `candidates_comments`
--

CREATE TABLE `candidates_comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `candidates_comments`
--

INSERT INTO `candidates_comments` (`id`, `user_id`, `comment`, `created_at`, `updated_at`) VALUES
(1, '1', 'aklhfkdas kashfkahkdfh khdfkh', '2022-05-08 22:58:47', '2022-05-08 22:58:47');

-- --------------------------------------------------------

--
-- Table structure for table `candidate_applied_jobs`
--

CREATE TABLE `candidate_applied_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `requisition_id` int(11) DEFAULT NULL,
  `candidate_id` int(11) DEFAULT NULL,
  `file_table_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `candidate_country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `step_2_how_did_you_hear_about_us` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contractor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `key_achievments` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year_of_experience` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Are_you_willing_to` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `When_the_earliest_` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Why_did_you_apply_` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Why_would_you_like` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `step_4_contractor` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_time_part_time` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `how_did_you_hear_about_us` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dob` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ethnic_background` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sex` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disclosure_1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disclosure_2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disclosure_3` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disclosure_4` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `candidate_applied_jobs`
--

INSERT INTO `candidate_applied_jobs` (`id`, `requisition_id`, `candidate_id`, `file_table_id`, `city`, `state`, `candidate_country`, `email`, `step_2_how_did_you_hear_about_us`, `phone`, `zip`, `contractor`, `company_name`, `company_country`, `job_title`, `key_achievments`, `year_of_experience`, `Are_you_willing_to`, `When_the_earliest_`, `Why_did_you_apply_`, `Why_would_you_like`, `step_4_contractor`, `full_time_part_time`, `how_did_you_hear_about_us`, `dob`, `ethnic_background`, `sex`, `disclosure_1`, `disclosure_2`, `disclosure_3`, `disclosure_4`, `created_at`, `updated_at`) VALUES
(1, 0, 1, NULL, NULL, NULL, NULL, 'admin@soheard.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-05-10 01:51:24', '2022-05-10 01:51:24'),
(2, NULL, 1, NULL, NULL, NULL, NULL, 'admin@soheard.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-05-10 01:51:52', '2022-05-10 01:51:52');

-- --------------------------------------------------------

--
-- Table structure for table `candidate_requisitions`
--

CREATE TABLE `candidate_requisitions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `requisition_id` int(11) NOT NULL,
  `candidate_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `client_companies`
--

CREATE TABLE `client_companies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` int(11) DEFAULT NULL,
  `recruiter_id` int(11) DEFAULT NULL,
  `account_executive_id` int(11) DEFAULT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hours_of_operations` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year_in_business` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `primary_contact_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `primary_contact_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `client_companies`
--

INSERT INTO `client_companies` (`id`, `client_id`, `recruiter_id`, `account_executive_id`, `company_name`, `company_type`, `company_website`, `hours_of_operations`, `year_in_business`, `primary_contact_name`, `primary_contact_title`, `phone`, `email`, `address_type`, `description`, `location`, `created_at`, `updated_at`) VALUES
(1, 3, 5, 4, 'gdsfgdsg', 'Finance', 'dfsg', '2', '10', 'client', 'sdfgdsg', '(789) 456-1230', 'dfg@gmail.com', 'Permanent', 'ewrwqrwqrq', 'sadsaf', '2022-05-12 05:21:12', '2022-05-12 05:21:12');

-- --------------------------------------------------------

--
-- Table structure for table `client_hiring_managers`
--

CREATE TABLE `client_hiring_managers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `hiring_manager_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hiring_manager_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hiring_manager_phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hiring_manager_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_info_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_info_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_info_phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_info_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_info_city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_info_state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_info_zip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `client_hiring_managers`
--

INSERT INTO `client_hiring_managers` (`id`, `company_id`, `hiring_manager_name`, `hiring_manager_title`, `hiring_manager_phone`, `hiring_manager_email`, `contact_info_name`, `contact_info_email`, `contact_info_phone`, `contact_info_address`, `contact_info_city`, `contact_info_state`, `contact_info_zip`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'fddasf', 'afdsaf', '(436) 466-1656', 'dd@gmial.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-05-12 05:21:12', '2022-05-12 05:21:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `client_records`
--

CREATE TABLE `client_records` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `current_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `posting_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salary` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `base_pay` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hour` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bonus_plan` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_summary_of_candidate` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `client_records`
--

INSERT INTO `client_records` (`id`, `current_status`, `posting_type`, `location`, `role_title`, `salary`, `base_pay`, `hour`, `bonus_plan`, `file_path`, `role_summary_of_candidate`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Open', 'Open', 'fhfh', 'Client', '$60K-$70K', '42', '131', '31313', NULL, NULL, '2022-05-12 05:22:11', '2022-05-12 05:22:11', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `client_requisitions`
--

CREATE TABLE `client_requisitions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `company_id` int(11) DEFAULT NULL,
  `requisition_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `general_primary_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hiring_manager` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_type_of_insurance_licensed_needed` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_non_residents` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_need_AHIP` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_products_carriers` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_appointment_info` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_hours_schedule` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_base_pay` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_bonus_plan` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_minimum_experience` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_technology` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_training` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_inbound_outbound` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_schedule_phone_interview` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_openings` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_apply_form` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `general_time_off_requested` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client_company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client_phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `collections`
--

CREATE TABLE `collections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_collections` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `collections`
--

INSERT INTO `collections` (`id`, `user_id`, `user_collections`, `created_at`, `updated_at`) VALUES
(1, NULL, NULL, '2022-05-12 07:30:07', '2022-05-12 07:30:07'),
(2, NULL, NULL, '2022-05-12 07:30:33', '2022-05-12 07:30:33');

-- --------------------------------------------------------

--
-- Table structure for table `company_recruiters`
--

CREATE TABLE `company_recruiters` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `company_id` int(11) NOT NULL,
  `recruiter_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `condidates_workflows`
--

CREATE TABLE `condidates_workflows` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `action` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `condidates_workflows`
--

INSERT INTO `condidates_workflows` (`id`, `user_id`, `title`, `description`, `action`, `created_at`, `updated_at`) VALUES
(1, '1', NULL, NULL, NULL, '2022-05-05 08:11:50', '2022-05-05 08:11:50'),
(2, '1', NULL, NULL, NULL, '2022-05-05 11:22:27', '2022-05-05 11:22:27');

-- --------------------------------------------------------

--
-- Table structure for table `email_controllers`
--

CREATE TABLE `email_controllers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `subject` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `body` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `allow_time` tinyint(1) NOT NULL DEFAULT 0,
  `time` int(11) NOT NULL DEFAULT 0,
  `time_unit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `condition` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_enable` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `filename` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fileable_id` int(11) DEFAULT NULL,
  `fileable_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`id`, `filename`, `fileable_id`, `fileable_type`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'resum.pdf', 1, 'App\\Models\\ClientCompany', '2022-05-12 05:21:12', '2022-05-12 05:21:12', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `interview_schedulers`
--

CREATE TABLE `interview_schedulers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `interview_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timezone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `interviewer` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `duration` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `order` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `interview_schedulers`
--

INSERT INTO `interview_schedulers` (`id`, `interview_date`, `timezone`, `interviewer`, `duration`, `order`, `created_at`, `updated_at`) VALUES
(1, '12/05/2022', '11:05', 'sdfsdf', '60:00', 'fgdsg', '2022-05-12 01:50:22', '2022-05-12 01:50:22'),
(2, '12/05/2022', '11:00', 'sdfsdf', '60:00', 'fgdsg', '2022-05-12 01:51:06', '2022-05-12 01:51:06'),
(3, '13/05/2022', '11:07', 'sdfhj', '60:00', 'fgdsg', '2022-05-12 01:54:49', '2022-05-12 01:54:49'),
(4, '13/05/2022', '20:00', 'sdfhj', '60:00', 'fgdsg', '2022-05-12 02:26:20', '2022-05-12 02:26:20'),
(5, '13/05/2022', '8:00', 'sdfhj', '60:00', 'fgdsg', '2022-05-12 02:26:54', '2022-05-12 02:26:54'),
(6, '14/05/2022', '8:00', 'sdfhj', '60:00', 'fgdsg', '2022-05-12 02:30:42', '2022-05-12 02:30:42'),
(7, '14/05/2022', '8:05', 'ljlj', '60:00', 'fgdsg', '2022-05-12 02:40:24', '2022-05-12 02:40:24'),
(8, '14/01/2022', '8:05', 'ljlj', '60:00', 'fgdsg', '2022-05-12 02:41:45', '2022-05-12 02:41:45'),
(9, '17/01/2022', '8:05', 'ljlj', '60:00', 'fgdsg', '2022-05-12 02:42:09', '2022-05-12 02:42:09'),
(10, '17/01/2022', '80:05', 'ljlj', '60:00', 'fgdsg', '2022-05-12 02:42:18', '2022-05-12 02:42:18'),
(11, '17/01/2023', '80:05', 'ljlj', '60:00', 'fgdsg', '2022-05-12 02:42:38', '2022-05-12 02:42:38'),
(12, '17/07/2023', '80:05', 'ljlj', '60:00', 'fgdsg', '2022-05-12 02:44:29', '2022-05-12 02:44:29'),
(13, '17/07/2022', '80:05', 'ljlj', '60:00', 'fgdsg', '2022-05-12 02:44:39', '2022-05-12 02:44:39'),
(14, '87/07/2022', '80:05', 'ljlj', '60:00', 'fgdsg', '2022-05-12 02:44:49', '2022-05-12 02:44:49'),
(15, '13/05/2022', '80:05', 'ljlj', '60:00', 'fgdsg', '2022-05-12 03:06:53', '2022-05-12 03:06:53');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `like_unlike` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `user_id`, `like_unlike`, `created_at`, `updated_at`) VALUES
(9, '4', '0', '2022-05-06 07:19:40', '2022-05-06 07:19:40'),
(11, '1', '1', '2022-05-06 07:21:10', '2022-05-06 07:21:10');

-- --------------------------------------------------------

--
-- Table structure for table `logs`
--

CREATE TABLE `logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `login_activity` tinyint(1) NOT NULL,
  `login_time` timestamp NULL DEFAULT NULL,
  `logout_time` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `action` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logactivtyable_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logactivtyable_id` bigint(20) UNSIGNED DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `logs`
--

INSERT INTO `logs` (`id`, `user_role`, `user_id`, `login_activity`, `login_time`, `logout_time`, `created_at`, `updated_at`, `action`, `logactivtyable_type`, `logactivtyable_id`, `message`) VALUES
(1, 'admin', 1, 1, '2022-05-04 02:55:11', NULL, '2022-05-04 02:55:11', '2022-05-04 02:55:11', 'sign_in', 'App\\Models\\User', 1, NULL),
(2, 'admin', 1, 1, '2022-05-04 03:02:02', NULL, '2022-05-04 03:02:02', '2022-05-04 03:02:02', 'sign_in', 'App\\Models\\User', 1, NULL),
(3, 'admin', 1, 1, '2022-05-06 05:45:44', NULL, '2022-05-06 05:45:44', '2022-05-06 05:45:44', 'sign_in', 'App\\Models\\User', 1, NULL),
(4, 'admin', 1, 1, '2022-05-06 05:47:14', NULL, '2022-05-06 05:47:14', '2022-05-06 05:47:14', 'sign_in', 'App\\Models\\User', 1, NULL),
(5, 'admin', 1, 1, '2022-05-09 08:04:25', NULL, '2022-05-09 08:04:25', '2022-05-09 08:04:25', 'sign_in', 'App\\Models\\User', 1, NULL),
(6, 'admin', 1, 1, '2022-05-09 08:06:30', NULL, '2022-05-09 08:06:30', '2022-05-09 08:06:30', 'sign_in', 'App\\Models\\User', 1, NULL),
(7, 'admin', 1, 1, '2022-05-09 23:24:48', NULL, '2022-05-09 23:24:48', '2022-05-09 23:24:48', 'sign_in', 'App\\Models\\User', 1, NULL),
(8, 'admin', 1, 1, '2022-05-11 01:23:29', NULL, '2022-05-11 01:23:29', '2022-05-11 01:23:29', 'sign_in', 'App\\Models\\User', 1, NULL),
(9, 'admin', 1, 1, NULL, NULL, '2022-05-11 02:42:45', '2022-05-11 02:42:45', 'View Requisition', 'App\\Models\\Requisition', 2, NULL),
(10, 'admin', 1, 1, NULL, NULL, '2022-05-11 05:42:23', '2022-05-11 05:42:23', 'View Requisition', 'App\\Models\\Requisition', 2, NULL),
(11, 'admin', 1, 1, '2022-05-11 07:22:21', NULL, '2022-05-11 07:22:21', '2022-05-11 07:22:21', 'sign_in', 'App\\Models\\User', 1, NULL),
(12, 'admin', 1, 1, NULL, NULL, '2022-05-11 23:18:42', '2022-05-11 23:18:42', 'View Requisition', 'App\\Models\\Requisition', 2, NULL),
(13, 'admin', 1, 1, NULL, NULL, '2022-05-12 07:53:53', '2022-05-12 07:53:53', 'View Requisition', 'App\\Models\\Requisition', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(4, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(5, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(6, '2016_06_01_000004_create_oauth_clients_table', 1),
(7, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(8, '2019_08_19_000000_create_failed_jobs_table', 1),
(9, '2021_11_15_065751_add_userrole_into_users_table', 1),
(10, '2021_11_23_074025_create_client_columns', 1),
(11, '2021_11_23_122233_add_clients_cols_in_user_table', 1),
(12, '2021_11_24_071305_rename_col_cleint_in_user', 1),
(13, '2021_11_25_103511_create_address_type_col', 1),
(14, '2021_11_26_101507_create_city__state_zip_salary_in_user_table', 1),
(15, '2021_11_26_105126_add_username_col_user_table', 1),
(16, '2021_11_26_122130_add_zip_col_in_user_tbl', 1),
(17, '2021_11_29_105044_add_deleted_at_col_in_user', 1),
(18, '2021_12_01_065954_create_requisitions_table', 1),
(19, '2021_12_01_142214_add_deleted_at_col_in_requisition', 1),
(20, '2021_12_10_065945_add_photo_url_field_to_users_table', 1),
(22, '2021_12_13_123146_change_datatype_description_col', 1),
(23, '2021_12_16_060047_create_client_records_table', 1),
(24, '2021_12_16_144504_delete_col_in_client_record', 1),
(25, '2021_12_17_063517_chnage_datatype_current_status_col_in_client_record', 1),
(26, '2021_12_17_143648_add_file_path_in_client_record_table', 1),
(28, '2021_12_21_074232_add_delete_at_col_in_notes_table', 1),
(29, '2021_12_22_055654_create_files_table', 1),
(30, '2021_12_24_075255_create_activities_table', 1),
(31, '2021_12_24_080413_add_more_cols_in_activity_table', 1),
(32, '2021_12_24_083217_add_cols_in_activity_table', 1),
(33, '2021_12_24_101238_drop_extra_col_in_from_activities', 1),
(34, '2021_12_24_123009_add_avtivity_able_in_activities', 1),
(35, '2021_12_27_133608_create_resumes_table', 1),
(36, '2021_12_28_075125_change_col_datatype_in_resume_table', 1),
(37, '2021_12_29_065648_add_deleted_at_col_in_resume', 1),
(38, '2021_12_29_065842_add_deleted_at_col_in_files_table', 1),
(39, '2021_12_30_105946_create_client_requisitions_table', 1),
(40, '2021_12_31_043236_add_new_fields_to_client_requisitions', 1),
(41, '2021_12_31_045531_add_client_fields_to_client_requisitions', 1),
(42, '2021_12_31_121925_add_delete_col__i_n_client_requisition', 1),
(43, '2022_01_03_080748_create_candidate_requisitions_table', 1),
(44, '2022_01_11_073457_create_candidate_applied_jobs_table', 1),
(45, '2022_01_18_120252_add_image_col_in_user', 1),
(46, '2022_01_19_114748_create_zipcodes_table', 1),
(47, '2022_01_20_055525_rename_column_recruiter_name_in_requisitions', 1),
(48, '2022_01_21_065620_add_description_col_in_requisitions_table', 1),
(49, '2022_01_24_055308_create_permissions_table', 1),
(50, '2022_01_24_055325_create_role_permissions_table', 1),
(51, '2022_01_24_163903_create_client_hiring_managers_table', 1),
(52, '2022_01_25_141830_add_response_requisi_id_in_requisition_id', 1),
(53, '2022_01_26_061258_change_name_in_requisition', 1),
(54, '2022_01_26_071443_make_brief_des_in_requisitions', 1),
(55, '2022_01_26_084012_add_jv_activation_status_in_users_table', 1),
(56, '2022_01_27_072120_add_first_name_last_name_in_users_table', 1),
(57, '2022_01_27_113425_change_jv_employee_col_change_datatype_in_users_table', 1),
(58, '2022_01_31_073208_update_fields_in_permissions', 1),
(59, '2022_01_31_105328_add_primaryname_col_in_user_table', 1),
(60, '2022_02_02_130124_add_deleted_at_col_in_client_hiring_table', 1),
(61, '2022_02_03_062718_add_email_status_nd_access_token_in_users_tbl', 1),
(62, '2022_02_03_132934_create_clients_table', 1),
(63, '2022_02_03_141731_change_table_clients_table', 1),
(64, '2022_02_03_142523_rename_col_in_client_company_tbl', 1),
(65, '2022_02_04_080518_rename_col_in_hiring_manager_tbl', 1),
(66, '2022_02_04_083153_add_fields_in_requisitions', 1),
(67, '2022_02_04_083837_add_client_company_id_in_users', 1),
(68, '2022_02_04_121802_rename_col_locatio_n_comapnies', 1),
(69, '2022_02_04_145326_add_description_client_companies_tbl', 1),
(70, '2022_02_08_064318_add_status_field_in_requisitions_table', 1),
(71, '2022_02_08_115513_add_recruiter_col_in_company_tbl', 1),
(72, '2022_02_08_125033_change_role_summary_of_candidate_in_client_records_table', 1),
(73, '2022_02_09_073942_change_column_brief_description_type_in_requisitions_table', 1),
(74, '2022_02_09_103040_rename_col_in_client_reuisition', 1),
(75, '2022_02_11_065113_create_logs_table', 1),
(76, '2022_02_11_080312_add_new_fields_in_logs_table', 1),
(77, '2022_02_11_143244_change_field_in_client_requisitions_table', 1),
(78, '2022_02_12_070419_rename_action_to_activity_in_logs_table', 1),
(79, '2022_02_12_101124_add_col_executive_id_in_client_company', 1),
(80, '2022_02_14_092539_change_colname_in_requisitions_table', 1),
(81, '2022_02_14_094332_add_c_in_requi_table', 1),
(82, '2022_02_15_132923_drop_col_add_col_in_reqi_table', 1),
(83, '2022_02_16_073307_rename_col_in_requisition_tbl', 1),
(84, '2022_02_17_061036_add_status_column_in_users_table', 1),
(85, '2022_02_18_072900_make_nuulable_to_col_in_users_table', 1),
(86, '2022_02_18_123013_create_company_recruiters_table', 1),
(87, '2022_02_21_121617_add_deleted_at_col_in_comapny_recruiter_table', 1),
(88, '2022_02_22_102632_add_company_id_col_in_requistion_table', 1),
(89, '2022_02_25_081403_add_delete_at_col_in_company_comapny_mangers', 1),
(90, '2022_02_25_113450_create_notifications_table', 1),
(91, '2022_02_28_114556_create_access_permissions_table', 1),
(92, '2022_02_28_125515_create_action_permissions_table', 1),
(93, '2022_03_01_064819_add__new_columns_to_users_table', 1),
(94, '2022_03_02_052926_change_datatype_of__d_ob_', 1),
(95, '2022_03_03_132216_add_middlename_into_users', 1),
(96, '2022_03_03_140105_add_schedule_into_users', 1),
(97, '2022_03_04_071656_change_col_namein_user_table', 1),
(98, '2022_03_09_112452_change_locations_col_rename_client_comapmy_', 1),
(99, '2022_03_10_064801_add_field_message_to_logs_table', 1),
(100, '2022_03_15_070435_add_location_field_to_users_table', 1),
(101, '2022_03_28_062522_add_blacklist_to_users_table', 1),
(102, '2022_04_06_104815_create_user_facebook_accounts_table', 1),
(103, '2022_04_06_111332_create_user_linkedin_accounts_table', 1),
(104, '2022_04_06_132650_create_user_indeed_accounts_table', 1),
(105, '2022_04_07_043137_create_twillio_accounts_table', 1),
(106, '2022_04_12_082339_create_email_controllers_table', 1),
(107, '2022_04_13_043354_create_notification_settings_table', 1),
(108, '2022_04_18_070234_add_field_in_requisitions_table', 1),
(109, '2022_04_27_043303_add_candidate_field_to_candidate_applied_jobs_table', 1),
(111, '2022_05_03_055529_create_user_education_histories_table', 1),
(112, '2022_05_03_083431_create_user_apllication_details_table', 1),
(115, '2022_05_03_054053_create_user_work_history_details_table', 3),
(116, '2022_05_04_105445_add_usercollocation_name_to_users', 4),
(117, '2022_05_04_145318_add_applies_for_users_table', 5),
(118, '2022_05_05_124923_create_condidates_workflows_table', 5),
(124, '2022_05_05_133417_create_user_collections_table', 7),
(126, '2022_05_06_110309_create_likes_table', 8),
(127, '2021_12_13_062405_create_notes_table', 9),
(128, '2021_12_20_064632_add_noteable_id_and_type_col_in_notes_table', 9),
(129, '2022_05_09_025421_create_candidates_comments_table', 10),
(130, '2022_05_09_101339_create_requisition_channels_table', 11),
(133, '2022_05_11_043836_create_requisitions_categories_table', 12),
(134, '2022_05_04_105445_add_usercollection_name_to_users', 13),
(135, '2022_05_11_121227_create_user_collections_table', 13),
(137, '2022_05_12_051550_create_interview_schedulers_table', 14),
(138, '2022_05_12_123811_create_collections_table', 15),
(139, '2022_05_12_134702_add_table_to_requisitions_table', 16);

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `noteable_id` int(11) DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `noteable_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`id`, `title`, `description`, `noteable_id`, `type`, `noteable_type`, `email`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'ewrq', NULL, NULL, 'post', '', NULL, '2022-05-08 23:30:50', '2022-05-08 23:31:29', '2022-05-09 05:01:29'),
(2, 'fgsdgfsg', NULL, NULL, 'message', '', 'a@gmail.com', '2022-05-06 08:15:37', '2022-05-06 08:15:37', NULL),
(3, 'fgsdgfsg', NULL, NULL, 'message', 'App\\Models\\Requisition', 'a@gmail.com', '2022-05-06 08:19:17', '2022-05-06 08:19:17', NULL),
(4, 'fgsdgfsg', NULL, 1, 'message', 'App\\Models\\Requisition', 'a@gmail.com', '2022-05-06 08:21:24', '2022-05-06 08:21:24', NULL),
(5, 'tajmahal', NULL, 2, 'post', 'App\\Models\\User', 'a@gmail.com', '2022-05-08 23:19:09', '2022-05-08 23:19:09', NULL),
(6, NULL, NULL, 2, NULL, 'App\\Models\\User', NULL, '2022-05-11 23:23:42', '2022-05-11 23:23:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `seen_status` int(11) DEFAULT NULL,
  `message` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification_settings`
--

CREATE TABLE `notification_settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_enable` tinyint(1) NOT NULL DEFAULT 1,
  `is_recruiters` tinyint(1) DEFAULT NULL,
  `is_hiring_managers` tinyint(1) DEFAULT NULL,
  `employees_notified` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('0039b331e9814386ab98cebc2ab68d8413800f194379992df40d6095b81a82cd964357cf6e7d0fc1', 1, 2, 'ApiAccess', '[]', 0, '2022-05-11 07:22:21', '2022-05-11 07:22:21', '2023-05-11 12:52:21'),
('049a3f4e321f950cf5372ca33a1f7c539fb8f990b3eed39576d24b734536fa079b2216bef7d86071', 1, 2, 'ApiAccess', '[]', 0, '2022-05-09 08:06:30', '2022-05-09 08:06:30', '2023-05-09 13:36:30'),
('497057a3412c62738664bbdb81460e0802a0866b8b9cc53dd0ea159b0559169c04ae311eb349e383', 1, 2, 'ApiAccess', '[]', 0, '2022-05-09 08:04:24', '2022-05-09 08:04:24', '2023-05-09 13:34:24'),
('9562cfd1b2889387d29faf9e4b6abe9dc6b6eead21139c3b48a691e4693a3b39784ab9a89481f6de', 1, 2, 'ApiAccess', '[]', 0, '2022-05-06 05:47:14', '2022-05-06 05:47:14', '2023-05-06 11:17:14'),
('cc501009f922880594ba8eb689dbc6b6ede98386a320bd3ea6ab52764b08d0a7410bc8bd9817f576', 1, 1, 'ApiAccess', '[]', 0, '2022-05-04 03:02:01', '2022-05-04 03:02:01', '2023-05-04 08:32:01'),
('d6353ba8ab5343ad98929a3dbc1a4d367d7c53f1d5515454615dd7b5af26f3d1525a33abf3f70413', 1, 2, 'ApiAccess', '[]', 0, '2022-05-11 01:23:29', '2022-05-11 01:23:29', '2023-05-11 06:53:29'),
('d7e4f990e5eecdb8d31ed2111135522a1de6e2621e6b09a9ab7dc7c923e8ced217eb97c6d2241982', 1, 1, 'ApiAccess', '[]', 0, '2022-05-04 02:55:11', '2022-05-04 02:55:11', '2023-05-04 08:25:11'),
('eb27d78bbf5e36d824e32e496ec799456fab3a067abdcaf4f47e9c27cefe95b5719078e3fd350235', 1, 2, 'ApiAccess', '[]', 0, '2022-05-09 23:24:47', '2022-05-09 23:24:47', '2023-05-10 04:54:47'),
('f4ca4186870a31018f312a9ed9fa33577a2459b6b21fdad6cc4a28b49e0b8d83bd24f8ea4ecf2245', 1, 2, 'ApiAccess', '[]', 0, '2022-05-06 05:45:44', '2022-05-06 05:45:44', '2023-05-06 11:15:44');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `provider`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'users', '9LAd9uW5GdXbK3YWuopFZb2Aj25udQwyiVM0Zc37', NULL, 'http://localhost', 1, 0, 0, '2022-05-04 02:54:45', '2022-05-04 02:54:45'),
(2, NULL, 'ClearSourcePro Personal Access Client', 'rTaU4WdZnEad2nKMXawcu3Z073O4Wf1KlhVi4PEx', NULL, 'http://localhost', 1, 0, 0, '2022-05-05 01:20:46', '2022-05-05 01:20:46'),
(3, NULL, 'ClearSourcePro Password Grant Client', 'UgeMGxerIfO7MURdnk7bQJ5PT4HMGDKRBggmgznt', 'users', 'http://localhost', 0, 1, 0, '2022-05-05 01:20:47', '2022-05-05 01:20:47');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2022-05-04 02:54:45', '2022-05-04 02:54:45'),
(2, 2, '2022-05-05 01:20:47', '2022-05-05 01:20:47');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requisitions`
--

CREATE TABLE `requisitions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `compensation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `evaluation_form` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pre_interview_form` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `recruiter_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hiring_manager_id` int(11) DEFAULT NULL,
  `other_recruiter` int(11) DEFAULT NULL,
  `salary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hiring_dates` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `brief_description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `file_table_id` int(11) DEFAULT NULL,
  `jv_response_requisition_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jv_activation_status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `source` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `application_date` datetime DEFAULT NULL,
  `closed_date` datetime DEFAULT NULL,
  `filled_date` datetime DEFAULT NULL,
  `open_date` datetime DEFAULT NULL,
  `disposition` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `qualification` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `region` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hire_locations` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_locations` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `preferred_location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `job_company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `candidate_company` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_activity` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hiring_needed` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hiring_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `requisitions`
--

INSERT INTO `requisitions` (`id`, `title`, `status`, `job_type`, `compensation`, `category`, `department`, `location`, `evaluation_form`, `pre_interview_form`, `company_id`, `recruiter_id`, `hiring_manager_id`, `other_recruiter`, `salary`, `hiring_dates`, `description`, `brief_description`, `file_table_id`, `jv_response_requisition_id`, `jv_activation_status`, `created_at`, `updated_at`, `deleted_at`, `source`, `application_date`, `closed_date`, `filled_date`, `open_date`, `disposition`, `qualification`, `region`, `hire_locations`, `job_locations`, `preferred_location`, `job_company`, `candidate_company`, `last_activity`, `hiring_needed`, `hiring_description`) VALUES
(1, 'test', '1', 'php', 'test', 'php', 'php', 'mohali', NULL, '24', 1, '1', 1, 1, '12000', '24/10/2022', 'wefer rtrtyery ', 'rtyy ytety', 1, 'gf g s g', 0, NULL, NULL, NULL, NULL, '2022-05-10 07:36:26', '2022-05-10 07:36:26', '2022-05-10 07:36:26', '2022-05-10 07:36:26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'test', 'open', 'php', 'test', 'php', 'php', 'mohali', NULL, '24', 1, '1', 1, 1, '12000', '24/10/2022', 'wefer rtrtyery ', 'rtyy ytety', 1, 'gf g s g', 0, NULL, NULL, NULL, NULL, '2022-05-10 07:36:26', '2022-05-10 07:36:26', '2022-05-10 07:36:26', '2022-05-10 07:36:26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `requisitions_categories`
--

CREATE TABLE `requisitions_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `requisitions_categories`
--

INSERT INTO `requisitions_categories` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'djljkg', 'djljkg-2', NULL, NULL, NULL),
(2, 'amar', 'amar-2', NULL, NULL, NULL),
(3, 'amargg', '', NULL, '2022-05-11 01:51:14', '2022-05-11 01:51:14'),
(4, 'amargghf xcfvgxg', '', NULL, '2022-05-11 01:51:58', '2022-05-11 01:51:58'),
(5, 'amargghf xcfvgxg dfgdfgdfg', 'amargghf-xcfvgxg-dfgdfgdfg', NULL, '2022-05-11 01:56:22', '2022-05-11 01:56:22'),
(6, 'amargghf xcfvgxg dfgdfgdfg dfgdfgvdf', 'amargghf_xcfvgxg_dfgdfgdfg_dfgdfgvdf', NULL, '2022-05-11 01:56:57', '2022-05-11 01:56:57'),
(7, 'pwan', 'pwan', NULL, '2022-05-11 06:07:50', '2022-05-11 06:07:50'),
(8, 'Test Category', 'test_category', NULL, '2022-05-11 06:09:36', '2022-05-11 06:09:36'),
(9, 'Test Category new', 'test_category_new', 'Test des', '2022-05-11 06:11:04', '2022-05-11 06:11:04');

-- --------------------------------------------------------

--
-- Table structure for table `requisition_channels`
--

CREATE TABLE `requisition_channels` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `resumes`
--

CREATE TABLE `resumes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jobvite_resume_id` int(11) DEFAULT NULL,
  `resume_filepath` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resumeable_id` int(11) NOT NULL,
  `resumeable_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `local_file_table_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role_permissions`
--

CREATE TABLE `role_permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permission` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `twillio_accounts`
--

CREATE TABLE `twillio_accounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `access_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refresh_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_at` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middlename` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `photo_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `file_table_image_id` int(11) DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jv_invitation_status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jv_employee_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `send_mail` tinyint(1) DEFAULT 0,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_website` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hours_of_operations` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `year_in_business` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `primary_contact_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `primary_contact_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hiring_dates` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `client_company_id` int(11) DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `middle_initial` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dob` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `manager` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `evaluation_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `evaluation_form` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `termination_date` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `home_phone_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mailing_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `secondary_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `time_zone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desired_compensation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emergency_contact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact_number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `relationship` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `contract_sent` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `years_in_business` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contacted` enum('Called LM','Sent email','Texted','LinkedIn') COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `client_status` enum('New','Prospect','Contacted','Follow up','Meeting','Contract Sent','Active','Inactive') COLLATE utf8mb4_unicode_ci DEFAULT 'New',
  `schedule` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `longitude` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_blacklisted` tinyint(1) NOT NULL DEFAULT 0,
  `is_hired` tinyint(1) NOT NULL DEFAULT 0,
  `applies_for` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_collections` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `middlename`, `lastname`, `username`, `photo_url`, `file_table_image_id`, `email`, `user_role`, `jv_invitation_status`, `jv_employee_id`, `send_mail`, `company_name`, `company_type`, `company_website`, `hours_of_operations`, `year_in_business`, `location`, `primary_contact_title`, `primary_contact_name`, `phone`, `city`, `state`, `zip`, `salary`, `hiring_dates`, `address`, `address_type`, `email_verified_at`, `client_company_id`, `password`, `remember_token`, `created_at`, `updated_at`, `deleted_at`, `status`, `middle_initial`, `dob`, `title`, `manager`, `start_date`, `evaluation_date`, `evaluation_form`, `termination_date`, `home_phone_number`, `mobile_number`, `mailing_address`, `secondary_address`, `country`, `time_zone`, `language`, `desired_compensation`, `emergency_contact`, `name`, `contact_number`, `relationship`, `active`, `contract_sent`, `years_in_business`, `contacted`, `client_status`, `schedule`, `latitude`, `longitude`, `is_blacklisted`, `is_hired`, `applies_for`, `user_collections`) VALUES
(1, 'Admin', NULL, 'sadadas', 'Adminghgf', 'ghgf', NULL, 'admin@soheard.com', 'admin', NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(444) 444-4444', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$x4tuw3Bg4nIk.t6nj9Qi4OfTPcCa5r9Xh4AS1uXdQ5AUgNaE.B7W6', NULL, '2022-05-04 02:49:46', '2022-05-12 05:52:31', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 'New', NULL, NULL, NULL, 0, 0, NULL, 'test 2,test 2,test 3,Test5'),
(2, 'test', NULL, 'sdsf', NULL, '', NULL, 'fdd@gmail.com', 'candidate', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '6464646464646', 'fdasf', 'asfdsafa', '56564', NULL, '', 'gdhdhgh', NULL, NULL, NULL, '$2y$10$VzCUfWnDVpr/Q18A9lRAuuVf0EvPBTFg7qBc5zgUWJ0rt2f7ZkKLO', NULL, '2022-05-11 23:23:42', '2022-05-11 23:23:42', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 'New', NULL, NULL, NULL, 0, 0, '', NULL),
(3, 'client', NULL, 'client', NULL, NULL, NULL, 'client@gmail.com', 'client', NULL, 'sI223jwD', 0, NULL, NULL, NULL, NULL, NULL, NULL, 'admin@soheard.com', NULL, '(789) 456-1230', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$fQXSJ6UqkRsbvClAZHsiHu5Q55vBIAjfLKuqhjqpgI2hSKJB83lgS', NULL, '2022-05-12 05:03:19', '2022-05-12 05:04:08', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL),
(4, 'Account Executive', 'Account Executive', 'account Executive', NULL, NULL, NULL, 'accountexecutive@gmail.com', 'account_executive', NULL, 's5nyKjwy', 0, NULL, NULL, NULL, NULL, NULL, NULL, 'admin@soheard.com', NULL, '(789) 456-1230', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$4rMQTgFnsNWrJW0YvXArweZrTeE6ut989PqbkxT5GHJjs2rHEVVg2', NULL, '2022-05-12 05:06:27', '2022-05-12 05:06:27', NULL, 1, 'Account Executive', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL),
(5, 'Recruiter', 'Recruiter', 'Recruiter', NULL, NULL, NULL, 'recruiter@gmail.com', 'recruiter', NULL, 's6nyKjwz', 0, NULL, NULL, NULL, NULL, NULL, NULL, 'admin@soheard.com', NULL, '(789) 456-1230', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$79r9SzTCtBPC2Ge/5XwCZucQa04oHGwKfqj28qbCc9DvW8erQrFiW', NULL, '2022-05-12 05:07:40', '2022-05-12 05:07:40', NULL, 1, 'Recruiter', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL),
(6, 'Candidate', NULL, 'Candidate', NULL, NULL, NULL, 'candidatefafda@gmail.com', 'client', NULL, 's7nyKjwA', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '(789) 456-1230', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$a2GKDAHO7h/uYXiPopG82uMu322P6KdJ0jO09Tc2RUkCgAWVfVNhW', NULL, '2022-05-12 05:10:09', '2022-05-12 05:10:09', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL),
(7, 'Hiring Manager', 'Hiring Manager', 'Hiring Manager', NULL, NULL, NULL, 'hiringManager@gmail.com', 'hiring_manager', NULL, 's8nyKjwB', 0, NULL, NULL, NULL, NULL, NULL, NULL, 'admin@soheard.com', NULL, '(789) 456-1230', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '$2y$10$.NRdv6bGq7dIzxHLAjngf.OHsstE2AXa8qx.3gw1CapwgQbA5yun.', NULL, '2022-05-12 05:11:23', '2022-05-12 05:11:23', NULL, 1, 'Hiring Manager', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_apllication_details`
--

CREATE TABLE `user_apllication_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `npn` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `perferred_schedule` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `non_resident_states` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `current_ip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bilingual` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `salary` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_apllication_details`
--

INSERT INTO `user_apllication_details` (`id`, `user_id`, `npn`, `perferred_schedule`, `non_resident_states`, `current_ip`, `bilingual`, `salary`, `created_at`, `updated_at`) VALUES
(1, NULL, 'fadff', NULL, NULL, NULL, '4353535', '7676', '2022-05-04 03:06:27', '2022-05-04 03:06:27');

-- --------------------------------------------------------

--
-- Table structure for table `user_collections`
--

CREATE TABLE `user_collections` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `collection` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_collections`
--

INSERT INTO `user_collections` (`id`, `user_id`, `collection`, `created_at`, `updated_at`) VALUES
(2, NULL, 'beste', '2022-05-11 07:42:41', '2022-05-11 07:42:41');

-- --------------------------------------------------------

--
-- Table structure for table `user_education_histories`
--

CREATE TABLE `user_education_histories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `college_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `major` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `degree_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `degree_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_attended` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_facebook_accounts`
--

CREATE TABLE `user_facebook_accounts` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `access_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refresh_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_at` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_indeed_accounts`
--

CREATE TABLE `user_indeed_accounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `access_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refresh_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_at` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_linkedin_accounts`
--

CREATE TABLE `user_linkedin_accounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `access_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refresh_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_at` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_permissions`
--

CREATE TABLE `user_permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `permission` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_permissions`
--

INSERT INTO `user_permissions` (`id`, `user_id`, `permission_id`, `permission`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 'Display', 1, '2022-05-09 23:25:41', '2022-05-09 23:25:41'),
(2, 1, 3, 'Display', 1, '2022-05-09 23:25:41', '2022-05-09 23:25:41'),
(3, 1, 4, 'Display', 1, '2022-05-09 23:25:41', '2022-05-09 23:25:41'),
(4, 1, 5, 'Display', 1, '2022-05-09 23:25:41', '2022-05-09 23:25:41'),
(5, 1, 6, 'Display', 1, '2022-05-09 23:25:41', '2022-05-09 23:25:41'),
(6, 1, 7, 'Display', 1, '2022-05-09 23:25:41', '2022-05-09 23:25:41'),
(7, 1, 8, 'Display', 1, '2022-05-09 23:25:41', '2022-05-09 23:25:41'),
(8, 1, 9, 'Display', 1, '2022-05-09 23:25:41', '2022-05-09 23:25:41'),
(9, 1, 10, 'Display', 1, '2022-05-09 23:25:41', '2022-05-09 23:25:41'),
(10, 1, 11, 'Display', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(11, 1, 21, 'C', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(12, 1, 21, 'R', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(13, 1, 21, 'U', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(14, 1, 21, 'D', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(15, 1, 13, 'Display', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(16, 1, 14, 'Display', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(17, 1, 15, 'Display', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(18, 1, 16, 'Display', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(19, 1, 17, 'Display', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(20, 1, 18, 'Display', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(21, 1, 19, 'Display', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(22, 1, 25, 'C', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(23, 1, 25, 'R', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(24, 1, 25, 'U', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(25, 1, 25, 'D', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(26, 1, 26, 'Display', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(27, 1, 27, 'C', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(28, 1, 27, 'R', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(29, 1, 27, 'U', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(30, 1, 27, 'D', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(31, 1, 28, 'C', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(32, 1, 28, 'R', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(33, 1, 28, 'U', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(34, 1, 28, 'D', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(35, 1, 29, 'C', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(36, 1, 29, 'R', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(37, 1, 29, 'U', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(38, 1, 29, 'D', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(39, 1, 30, 'C', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(40, 1, 30, 'R', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(41, 1, 30, 'U', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(42, 1, 30, 'D', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(43, 1, 31, 'C', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(44, 1, 31, 'R', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(45, 1, 31, 'U', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(46, 1, 31, 'D', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(47, 1, 33, 'C', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(48, 1, 33, 'R', 1, '2022-05-09 23:28:37', '2022-05-09 23:28:37'),
(49, 1, 33, 'U', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(50, 1, 33, 'D', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(51, 1, 34, 'Display', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(52, 1, 35, 'C', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(53, 1, 35, 'R', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(54, 1, 35, 'U', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(55, 1, 35, 'D', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(56, 1, 36, 'C', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(57, 1, 36, 'R', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(58, 1, 36, 'U', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(59, 1, 36, 'D', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(60, 1, 37, 'C', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(61, 1, 37, 'R', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(62, 1, 37, 'U', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(63, 1, 37, 'D', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(64, 1, 39, 'C', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(65, 1, 39, 'R', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(66, 1, 39, 'U', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(67, 1, 39, 'D', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(68, 1, 40, 'C', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(69, 1, 40, 'R', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(70, 1, 40, 'U', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(71, 1, 40, 'D', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(72, 1, 41, 'C', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(73, 1, 41, 'R', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(74, 1, 41, 'U', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(75, 1, 41, 'D', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(76, 1, 42, 'C', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(77, 1, 42, 'R', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(78, 1, 42, 'U', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(79, 1, 42, 'D', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(80, 1, 43, 'C', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(81, 1, 43, 'R', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(82, 1, 43, 'U', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(83, 1, 43, 'D', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(84, 1, 44, 'C', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(85, 1, 44, 'R', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(86, 1, 44, 'U', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(87, 1, 44, 'D', 1, '2022-05-09 23:28:38', '2022-05-09 23:28:38'),
(88, 1, 55, 'R', 1, '2022-05-09 23:29:47', '2022-05-09 23:29:47'),
(89, 1, 55, 'U', 1, '2022-05-09 23:29:47', '2022-05-09 23:29:47'),
(90, 1, 46, 'Display', 1, '2022-05-09 23:29:47', '2022-05-09 23:29:47'),
(91, 1, 47, 'Display', 1, '2022-05-09 23:29:47', '2022-05-09 23:29:47'),
(92, 1, 48, 'Display', 1, '2022-05-09 23:29:47', '2022-05-09 23:29:47'),
(93, 1, 49, 'Display', 1, '2022-05-09 23:29:47', '2022-05-09 23:29:47'),
(94, 1, 50, 'Display', 1, '2022-05-09 23:29:47', '2022-05-09 23:29:47'),
(95, 1, 51, 'Display', 1, '2022-05-09 23:29:47', '2022-05-09 23:29:47'),
(96, 1, 52, 'Display', 1, '2022-05-09 23:29:47', '2022-05-09 23:29:47'),
(97, 1, 53, 'Display', 1, '2022-05-09 23:29:47', '2022-05-09 23:29:47'),
(98, 1, 54, 'Display', 1, '2022-05-09 23:29:47', '2022-05-09 23:29:47'),
(99, 3, 2, 'Display', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(100, 3, 3, 'Display', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(101, 3, 5, 'Display', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(102, 3, 6, 'Display', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(103, 3, 7, 'Display', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(104, 3, 8, 'Display', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(105, 3, 9, 'Display', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(106, 3, 10, 'Display', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(107, 3, 11, 'Display', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(108, 3, 21, 'C', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(109, 3, 21, 'R', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(110, 3, 21, 'U', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(111, 3, 21, 'D', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(112, 3, 13, 'Display', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(113, 3, 14, 'Display', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(114, 3, 15, 'Display', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(115, 3, 16, 'Display', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(116, 3, 17, 'Display', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(117, 3, 18, 'Display', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(118, 3, 19, 'Display', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(119, 3, 25, 'C', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(120, 3, 25, 'R', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(121, 3, 25, 'U', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(122, 3, 25, 'D', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(123, 3, 26, 'Display', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(124, 3, 27, 'C', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(125, 3, 27, 'R', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(126, 3, 27, 'U', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(127, 3, 27, 'D', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(128, 3, 28, 'C', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(129, 3, 28, 'R', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(130, 3, 28, 'U', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(131, 3, 28, 'D', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(132, 3, 29, 'C', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(133, 3, 29, 'R', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(134, 3, 29, 'U', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(135, 3, 29, 'D', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(136, 3, 30, 'C', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(137, 3, 30, 'R', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(138, 3, 30, 'U', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(139, 3, 30, 'D', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(140, 3, 31, 'C', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(141, 3, 31, 'R', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(142, 3, 31, 'U', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(143, 3, 31, 'D', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(144, 3, 33, 'C', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(145, 3, 33, 'R', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(146, 3, 33, 'U', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(147, 3, 33, 'D', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(148, 3, 34, 'Display', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(149, 3, 35, 'C', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(150, 3, 35, 'R', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(151, 3, 35, 'U', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(152, 3, 35, 'D', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(153, 3, 36, 'C', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(154, 3, 36, 'R', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(155, 3, 36, 'U', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(156, 3, 36, 'D', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(157, 3, 37, 'C', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(158, 3, 37, 'R', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(159, 3, 37, 'U', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(160, 3, 37, 'D', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(161, 3, 39, 'C', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(162, 3, 39, 'R', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(163, 3, 39, 'U', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(164, 3, 39, 'D', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(165, 3, 40, 'C', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(166, 3, 40, 'R', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(167, 3, 40, 'U', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(168, 3, 40, 'D', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(169, 3, 41, 'C', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(170, 3, 41, 'R', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(171, 3, 41, 'U', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(172, 3, 41, 'D', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(173, 3, 42, 'C', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(174, 3, 42, 'R', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(175, 3, 42, 'U', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(176, 3, 42, 'D', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(177, 3, 43, 'C', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(178, 3, 43, 'R', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(179, 3, 43, 'U', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(180, 3, 43, 'D', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(181, 3, 44, 'C', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(182, 3, 44, 'R', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(183, 3, 44, 'U', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(184, 3, 44, 'D', 0, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(185, 3, 55, 'R', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(186, 3, 55, 'U', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(187, 3, 46, 'Display', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(188, 3, 47, 'Display', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(189, 3, 48, 'Display', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(190, 3, 49, 'Display', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(191, 3, 50, 'Display', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(192, 3, 51, 'Display', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(193, 3, 52, 'Display', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(194, 3, 53, 'Display', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(195, 3, 54, 'Display', 1, '2022-05-12 05:03:19', '2022-05-12 05:03:19'),
(196, 4, 2, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(197, 4, 3, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(198, 4, 5, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(199, 4, 6, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(200, 4, 7, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(201, 4, 8, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(202, 4, 9, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(203, 4, 10, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(204, 4, 11, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(205, 4, 21, 'C', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(206, 4, 21, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(207, 4, 21, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(208, 4, 21, 'D', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(209, 4, 13, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(210, 4, 14, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(211, 4, 15, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(212, 4, 16, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(213, 4, 17, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(214, 4, 18, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(215, 4, 19, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(216, 4, 25, 'C', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(217, 4, 25, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(218, 4, 25, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(219, 4, 25, 'D', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(220, 4, 26, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(221, 4, 27, 'C', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(222, 4, 27, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(223, 4, 27, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(224, 4, 27, 'D', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(225, 4, 28, 'C', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(226, 4, 28, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(227, 4, 28, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(228, 4, 28, 'D', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(229, 4, 29, 'C', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(230, 4, 29, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(231, 4, 29, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(232, 4, 29, 'D', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(233, 4, 30, 'C', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(234, 4, 30, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(235, 4, 30, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(236, 4, 30, 'D', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(237, 4, 31, 'C', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(238, 4, 31, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(239, 4, 31, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(240, 4, 31, 'D', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(241, 4, 33, 'C', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(242, 4, 33, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(243, 4, 33, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(244, 4, 33, 'D', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(245, 4, 34, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(246, 4, 35, 'C', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(247, 4, 35, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(248, 4, 35, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(249, 4, 35, 'D', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(250, 4, 36, 'C', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(251, 4, 36, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(252, 4, 36, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(253, 4, 36, 'D', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(254, 4, 37, 'C', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(255, 4, 37, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(256, 4, 37, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(257, 4, 37, 'D', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(258, 4, 39, 'C', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(259, 4, 39, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(260, 4, 39, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(261, 4, 39, 'D', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(262, 4, 40, 'C', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(263, 4, 40, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(264, 4, 40, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(265, 4, 40, 'D', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(266, 4, 41, 'C', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(267, 4, 41, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(268, 4, 41, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(269, 4, 41, 'D', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(270, 4, 42, 'C', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(271, 4, 42, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(272, 4, 42, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(273, 4, 42, 'D', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(274, 4, 43, 'C', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(275, 4, 43, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(276, 4, 43, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(277, 4, 43, 'D', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(278, 4, 44, 'C', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(279, 4, 44, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(280, 4, 44, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(281, 4, 44, 'D', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(282, 4, 55, 'R', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(283, 4, 55, 'U', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(284, 4, 46, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(285, 4, 47, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(286, 4, 48, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(287, 4, 49, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(288, 4, 50, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(289, 4, 51, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(290, 4, 52, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(291, 4, 53, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(292, 4, 54, 'Display', 1, '2022-05-12 05:06:27', '2022-05-12 05:06:27'),
(293, 5, 2, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(294, 5, 3, 'Display', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(295, 5, 5, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(296, 5, 6, 'Display', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(297, 5, 7, 'Display', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(298, 5, 8, 'Display', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(299, 5, 9, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(300, 5, 10, 'Display', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(301, 5, 11, 'Display', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(302, 5, 21, 'C', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(303, 5, 21, 'R', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(304, 5, 21, 'U', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(305, 5, 21, 'D', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(306, 5, 13, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(307, 5, 14, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(308, 5, 15, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(309, 5, 16, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(310, 5, 17, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(311, 5, 18, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(312, 5, 19, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(313, 5, 25, 'C', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(314, 5, 25, 'R', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(315, 5, 25, 'U', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(316, 5, 25, 'D', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(317, 5, 26, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(318, 5, 27, 'C', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(319, 5, 27, 'R', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(320, 5, 27, 'U', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(321, 5, 27, 'D', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(322, 5, 28, 'C', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(323, 5, 28, 'R', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(324, 5, 28, 'U', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(325, 5, 28, 'D', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(326, 5, 29, 'C', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(327, 5, 29, 'R', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(328, 5, 29, 'U', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(329, 5, 29, 'D', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(330, 5, 30, 'C', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(331, 5, 30, 'R', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(332, 5, 30, 'U', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(333, 5, 30, 'D', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(334, 5, 31, 'C', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(335, 5, 31, 'R', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(336, 5, 31, 'U', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(337, 5, 31, 'D', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(338, 5, 33, 'C', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(339, 5, 33, 'R', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(340, 5, 33, 'U', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(341, 5, 33, 'D', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(342, 5, 34, 'Display', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(343, 5, 35, 'C', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(344, 5, 35, 'R', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(345, 5, 35, 'U', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(346, 5, 35, 'D', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(347, 5, 36, 'C', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(348, 5, 36, 'R', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(349, 5, 36, 'U', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(350, 5, 36, 'D', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(351, 5, 37, 'C', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(352, 5, 37, 'R', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(353, 5, 37, 'U', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(354, 5, 37, 'D', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(355, 5, 39, 'C', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(356, 5, 39, 'R', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(357, 5, 39, 'U', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(358, 5, 39, 'D', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(359, 5, 40, 'C', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(360, 5, 40, 'R', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(361, 5, 40, 'U', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(362, 5, 40, 'D', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(363, 5, 41, 'C', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(364, 5, 41, 'R', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(365, 5, 41, 'U', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(366, 5, 41, 'D', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(367, 5, 42, 'C', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(368, 5, 42, 'R', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(369, 5, 42, 'U', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(370, 5, 42, 'D', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(371, 5, 43, 'C', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(372, 5, 43, 'R', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(373, 5, 43, 'U', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(374, 5, 43, 'D', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(375, 5, 44, 'C', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(376, 5, 44, 'R', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(377, 5, 44, 'U', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(378, 5, 44, 'D', 0, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(379, 5, 55, 'R', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(380, 5, 55, 'U', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(381, 5, 46, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(382, 5, 47, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(383, 5, 48, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(384, 5, 49, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(385, 5, 50, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(386, 5, 51, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(387, 5, 52, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(388, 5, 53, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(389, 5, 54, 'Display', 1, '2022-05-12 05:07:40', '2022-05-12 05:07:40'),
(390, 6, 2, 'Display', 1, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(391, 6, 3, 'Display', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(392, 6, 5, 'Display', 1, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(393, 6, 6, 'Display', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(394, 6, 7, 'Display', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(395, 6, 8, 'Display', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(396, 6, 9, 'Display', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(397, 6, 10, 'Display', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(398, 6, 11, 'Display', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(399, 6, 21, 'C', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(400, 6, 21, 'R', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(401, 6, 21, 'U', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(402, 6, 21, 'D', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(403, 6, 13, 'Display', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(404, 6, 14, 'Display', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(405, 6, 15, 'Display', 1, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(406, 6, 16, 'Display', 1, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(407, 6, 17, 'Display', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(408, 6, 18, 'Display', 1, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(409, 6, 19, 'Display', 1, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(410, 6, 25, 'C', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(411, 6, 25, 'R', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(412, 6, 25, 'U', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(413, 6, 25, 'D', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(414, 6, 26, 'Display', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(415, 6, 27, 'C', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(416, 6, 27, 'R', 1, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(417, 6, 27, 'U', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(418, 6, 27, 'D', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(419, 6, 28, 'C', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(420, 6, 28, 'R', 1, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(421, 6, 28, 'U', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(422, 6, 28, 'D', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(423, 6, 29, 'C', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(424, 6, 29, 'R', 1, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(425, 6, 29, 'U', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(426, 6, 29, 'D', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(427, 6, 30, 'C', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(428, 6, 30, 'R', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(429, 6, 30, 'U', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(430, 6, 30, 'D', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(431, 6, 31, 'C', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(432, 6, 31, 'R', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(433, 6, 31, 'U', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(434, 6, 31, 'D', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(435, 6, 33, 'C', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(436, 6, 33, 'R', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(437, 6, 33, 'U', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(438, 6, 33, 'D', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(439, 6, 34, 'Display', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(440, 6, 35, 'C', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(441, 6, 35, 'R', 0, '2022-05-12 05:10:09', '2022-05-12 05:10:09'),
(442, 6, 35, 'U', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(443, 6, 35, 'D', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(444, 6, 36, 'C', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(445, 6, 36, 'R', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(446, 6, 36, 'U', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(447, 6, 36, 'D', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(448, 6, 37, 'C', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(449, 6, 37, 'R', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(450, 6, 37, 'U', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(451, 6, 37, 'D', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(452, 6, 39, 'C', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(453, 6, 39, 'R', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(454, 6, 39, 'U', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(455, 6, 39, 'D', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(456, 6, 40, 'C', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(457, 6, 40, 'R', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(458, 6, 40, 'U', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(459, 6, 40, 'D', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(460, 6, 41, 'C', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(461, 6, 41, 'R', 1, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(462, 6, 41, 'U', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(463, 6, 41, 'D', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(464, 6, 42, 'C', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(465, 6, 42, 'R', 1, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(466, 6, 42, 'U', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(467, 6, 42, 'D', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(468, 6, 43, 'C', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(469, 6, 43, 'R', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(470, 6, 43, 'U', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(471, 6, 43, 'D', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(472, 6, 44, 'C', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(473, 6, 44, 'R', 1, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(474, 6, 44, 'U', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(475, 6, 44, 'D', 0, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(476, 6, 55, 'R', 1, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(477, 6, 55, 'U', 1, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(478, 6, 46, 'Display', 1, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(479, 6, 47, 'Display', 1, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(480, 6, 48, 'Display', 1, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(481, 6, 49, 'Display', 1, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(482, 6, 50, 'Display', 1, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(483, 6, 51, 'Display', 1, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(484, 6, 52, 'Display', 1, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(485, 6, 53, 'Display', 1, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(486, 6, 54, 'Display', 1, '2022-05-12 05:10:10', '2022-05-12 05:10:10'),
(487, 7, 2, 'Display', 1, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(488, 7, 3, 'Display', 0, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(489, 7, 5, 'Display', 1, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(490, 7, 6, 'Display', 0, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(491, 7, 7, 'Display', 0, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(492, 7, 8, 'Display', 0, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(493, 7, 9, 'Display', 0, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(494, 7, 10, 'Display', 0, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(495, 7, 11, 'Display', 0, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(496, 7, 21, 'C', 0, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(497, 7, 21, 'R', 0, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(498, 7, 21, 'U', 0, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(499, 7, 21, 'D', 0, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(500, 7, 13, 'Display', 0, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(501, 7, 14, 'Display', 0, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(502, 7, 15, 'Display', 1, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(503, 7, 16, 'Display', 1, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(504, 7, 17, 'Display', 0, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(505, 7, 18, 'Display', 1, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(506, 7, 19, 'Display', 1, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(507, 7, 25, 'C', 0, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(508, 7, 25, 'R', 0, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(509, 7, 25, 'U', 0, '2022-05-12 05:11:23', '2022-05-12 05:11:23'),
(510, 7, 25, 'D', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(511, 7, 26, 'Display', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(512, 7, 27, 'C', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(513, 7, 27, 'R', 1, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(514, 7, 27, 'U', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(515, 7, 27, 'D', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(516, 7, 28, 'C', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(517, 7, 28, 'R', 1, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(518, 7, 28, 'U', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(519, 7, 28, 'D', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(520, 7, 29, 'C', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(521, 7, 29, 'R', 1, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(522, 7, 29, 'U', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(523, 7, 29, 'D', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(524, 7, 30, 'C', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(525, 7, 30, 'R', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(526, 7, 30, 'U', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(527, 7, 30, 'D', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(528, 7, 31, 'C', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(529, 7, 31, 'R', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(530, 7, 31, 'U', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(531, 7, 31, 'D', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(532, 7, 33, 'C', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(533, 7, 33, 'R', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(534, 7, 33, 'U', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(535, 7, 33, 'D', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(536, 7, 34, 'Display', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(537, 7, 35, 'C', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(538, 7, 35, 'R', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(539, 7, 35, 'U', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(540, 7, 35, 'D', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(541, 7, 36, 'C', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(542, 7, 36, 'R', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(543, 7, 36, 'U', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(544, 7, 36, 'D', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(545, 7, 37, 'C', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(546, 7, 37, 'R', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(547, 7, 37, 'U', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(548, 7, 37, 'D', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(549, 7, 39, 'C', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(550, 7, 39, 'R', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(551, 7, 39, 'U', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(552, 7, 39, 'D', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(553, 7, 40, 'C', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(554, 7, 40, 'R', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(555, 7, 40, 'U', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(556, 7, 40, 'D', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(557, 7, 41, 'C', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(558, 7, 41, 'R', 1, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(559, 7, 41, 'U', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(560, 7, 41, 'D', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(561, 7, 42, 'C', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(562, 7, 42, 'R', 1, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(563, 7, 42, 'U', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(564, 7, 42, 'D', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(565, 7, 43, 'C', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(566, 7, 43, 'R', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(567, 7, 43, 'U', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(568, 7, 43, 'D', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(569, 7, 44, 'C', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(570, 7, 44, 'R', 1, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(571, 7, 44, 'U', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(572, 7, 44, 'D', 0, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(573, 7, 55, 'R', 1, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(574, 7, 55, 'U', 1, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(575, 7, 46, 'Display', 1, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(576, 7, 47, 'Display', 1, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(577, 7, 48, 'Display', 1, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(578, 7, 49, 'Display', 1, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(579, 7, 50, 'Display', 1, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(580, 7, 51, 'Display', 1, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(581, 7, 52, 'Display', 1, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(582, 7, 53, 'Display', 1, '2022-05-12 05:11:24', '2022-05-12 05:11:24'),
(583, 7, 54, 'Display', 1, '2022-05-12 05:11:24', '2022-05-12 05:11:24');

-- --------------------------------------------------------

--
-- Table structure for table `user_work_history_details`
--

CREATE TABLE `user_work_history_details` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `industry` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_month` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `end_month` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_year` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `end_year` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_work_history_details`
--

INSERT INTO `user_work_history_details` (`id`, `user_id`, `company_name`, `title`, `industry`, `start_month`, `end_month`, `start_year`, `end_year`, `created_at`, `updated_at`) VALUES
(1, '1', NULL, 'job', 'tally', NULL, NULL, NULL, NULL, '2022-05-05 02:08:26', '2022-05-05 02:08:26');

-- --------------------------------------------------------

--
-- Table structure for table `zipcodes`
--

CREATE TABLE `zipcodes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `zip` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `action_permissions`
--
ALTER TABLE `action_permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `candidates_comments`
--
ALTER TABLE `candidates_comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `candidate_applied_jobs`
--
ALTER TABLE `candidate_applied_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `candidate_requisitions`
--
ALTER TABLE `candidate_requisitions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client_companies`
--
ALTER TABLE `client_companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client_hiring_managers`
--
ALTER TABLE `client_hiring_managers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client_records`
--
ALTER TABLE `client_records`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client_requisitions`
--
ALTER TABLE `client_requisitions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company_recruiters`
--
ALTER TABLE `company_recruiters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `condidates_workflows`
--
ALTER TABLE `condidates_workflows`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `email_controllers`
--
ALTER TABLE `email_controllers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_controllers_title_unique` (`title`),
  ADD UNIQUE KEY `email_controllers_value_unique` (`value`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `interview_schedulers`
--
ALTER TABLE `interview_schedulers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `logs_action_type_action_id_index` (`logactivtyable_type`,`logactivtyable_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notification_settings`
--
ALTER TABLE `notification_settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `notification_settings_title_unique` (`title`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requisitions`
--
ALTER TABLE `requisitions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requisitions_categories`
--
ALTER TABLE `requisitions_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `requisition_channels`
--
ALTER TABLE `requisition_channels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `resumes`
--
ALTER TABLE `resumes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role_permissions`
--
ALTER TABLE `role_permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `twillio_accounts`
--
ALTER TABLE `twillio_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_apllication_details`
--
ALTER TABLE `user_apllication_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_collections`
--
ALTER TABLE `user_collections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_education_histories`
--
ALTER TABLE `user_education_histories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_facebook_accounts`
--
ALTER TABLE `user_facebook_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_indeed_accounts`
--
ALTER TABLE `user_indeed_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_linkedin_accounts`
--
ALTER TABLE `user_linkedin_accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_permissions`
--
ALTER TABLE `user_permissions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_work_history_details`
--
ALTER TABLE `user_work_history_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zipcodes`
--
ALTER TABLE `zipcodes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `action_permissions`
--
ALTER TABLE `action_permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `candidates_comments`
--
ALTER TABLE `candidates_comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `candidate_applied_jobs`
--
ALTER TABLE `candidate_applied_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `candidate_requisitions`
--
ALTER TABLE `candidate_requisitions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `client_companies`
--
ALTER TABLE `client_companies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client_hiring_managers`
--
ALTER TABLE `client_hiring_managers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client_records`
--
ALTER TABLE `client_records`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client_requisitions`
--
ALTER TABLE `client_requisitions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `collections`
--
ALTER TABLE `collections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `company_recruiters`
--
ALTER TABLE `company_recruiters`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `condidates_workflows`
--
ALTER TABLE `condidates_workflows`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `email_controllers`
--
ALTER TABLE `email_controllers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `interview_schedulers`
--
ALTER TABLE `interview_schedulers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `logs`
--
ALTER TABLE `logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification_settings`
--
ALTER TABLE `notification_settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requisitions`
--
ALTER TABLE `requisitions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `requisitions_categories`
--
ALTER TABLE `requisitions_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `requisition_channels`
--
ALTER TABLE `requisition_channels`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `resumes`
--
ALTER TABLE `resumes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role_permissions`
--
ALTER TABLE `role_permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `twillio_accounts`
--
ALTER TABLE `twillio_accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user_apllication_details`
--
ALTER TABLE `user_apllication_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_collections`
--
ALTER TABLE `user_collections`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user_education_histories`
--
ALTER TABLE `user_education_histories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_facebook_accounts`
--
ALTER TABLE `user_facebook_accounts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_indeed_accounts`
--
ALTER TABLE `user_indeed_accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_linkedin_accounts`
--
ALTER TABLE `user_linkedin_accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_permissions`
--
ALTER TABLE `user_permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=584;

--
-- AUTO_INCREMENT for table `user_work_history_details`
--
ALTER TABLE `user_work_history_details`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `zipcodes`
--
ALTER TABLE `zipcodes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
