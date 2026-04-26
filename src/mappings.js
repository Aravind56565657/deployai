'use strict';

const INFERENCES = {
  'I-001': 'upload_zip_file',
  'I-002': 'paste_github_url',
  'I-003': 'connect_github_account',
  'I-004': 'paste_gitlab_url',
  'I-005': 'paste_bitbucket_url',
  'I-006': 'provide_private_repo',
  'I-007': 'provide_public_repo',
  'I-008': 're_upload_project',
  'I-009': 'provide_subfolder',
  'I-010': 'provide_branch',
  'I-011': 'request_project_analysis',
  'I-012': 'ask_what_was_detected',
  'I-013': 'ask_about_dependencies',
  'I-014': 'ask_about_database',
  'I-015': 'ask_about_env_vars',
  'I-016': 'ask_about_entry_point',
  'I-017': 'ask_about_app_type',
  'I-018': 'ask_about_issues_detected',
  'I-019': 'ask_about_security_issues',
  'I-020': 'ask_for_full_summary',
  'I-021': 'intent_to_deploy',
  'I-022': 'intent_free_tier_deploy',
  'I-023': 'intent_production_deploy',
  'I-024': 'choose_vercel',
  'I-025': 'choose_netlify',
  'I-026': 'choose_render',
  'I-027': 'choose_aws',
  'I-028': 'choose_gcp',
  'I-029': 'choose_railway',
  'I-030': 'choose_fly_io',
  'I-031': 'choose_heroku',
  'I-032': 'intent_to_redeploy',
  'I-033': 'intent_to_rollback',
  'I-034': 'intent_to_deploy_frontend_only',
  'I-035': 'intent_to_deploy_backend_only',
  'I-036': 'intent_to_deploy_fullstack',
  'I-037': 'intent_to_deploy_monorepo',
  'I-038': 'ask_deployment_options',
  'I-039': 'connect_vercel_account',
  'I-040': 'connect_netlify_account',
  'I-041': 'connect_aws_account',
  'I-042': 'connect_gcp_account',
  'I-043': 'connect_render_account',
  'I-044': 'connect_github_oauth',
  'I-045': 'disconnect_platform',
  'I-046': 'switch_platform',
  'I-047': 'check_connection_status',
  'I-048': 'reconnect_platform',
  'I-049': 'provide_env_vars',
  'I-050': 'ask_what_env_vars_needed',
  'I-051': 'ask_where_env_vars_go',
  'I-052': 'update_env_var',
  'I-053': 'delete_env_var',
  'I-054': 'ask_if_secrets_are_safe',
  'I-055': 'report_missing_env_var',
  'I-056': 'ask_to_generate_env_template',
  'I-057': 'ask_for_generated_url',
  'I-058': 'provide_custom_domain',
  'I-059': 'ask_how_to_connect_domain',
  'I-060': 'ask_about_ssl',
  'I-061': 'ask_to_change_subdomain',
  'I-062': 'ask_about_dns_settings',
  'I-063': 'ask_total_cost',
  'I-064': 'ask_monthly_cost',
  'I-065': 'ask_free_tier_limits',
  'I-066': 'ask_token_balance',
  'I-067': 'ask_token_cost_for_action',
  'I-068': 'request_cost_estimate',
  'I-069': 'ask_to_upgrade_plan',
  'I-070': 'ask_about_aws_cost',
  'I-071': 'dispute_cost',
  'I-072': 'ask_to_reduce_cost',
  'I-073': 'request_scale_up',
  'I-074': 'request_scale_down',
  'I-075': 'request_auto_scaling',
  'I-076': 'ask_about_current_resources',
  'I-077': 'request_region_change',
  'I-078': 'request_multiple_regions',
  'I-079': 'ask_about_server_type',
  'I-080': 'ask_app_status',
  'I-081': 'ask_about_uptime',
  'I-082': 'ask_about_latency',
  'I-083': 'ask_about_traffic',
  'I-084': 'ask_about_error_rate',
  'I-085': 'ask_to_view_logs',
  'I-086': 'ask_about_crash',
  'I-087': 'ask_about_memory_usage',
  'I-088': 'ask_to_set_alert',
  'I-089': 'ask_about_deployment_history',
  'I-090': 'request_auto_deploy_on_push',
  'I-091': 'disable_auto_deploy',
  'I-092': 'trigger_manual_deploy',
  'I-093': 'ask_about_cicd_status',
  'I-094': 'ask_to_setup_cicd',
  'I-095': 'ask_about_build_logs',
  'I-096': 'ask_to_fix_build_failure',
  'I-097': 'request_db_setup',
  'I-098': 'choose_mongodb',
  'I-099': 'choose_postgresql',
  'I-100': 'choose_mysql',
  'I-101': 'choose_supabase',
  'I-102': 'choose_firebase',
  'I-103': 'ask_db_connection_status',
  'I-104': 'ask_for_db_url',
  'I-105': 'request_db_backup',
  'I-106': 'request_db_restore',
  'I-107': 'ask_to_migrate_db',
  'I-108': 'report_deployment_failure',
  'I-109': 'report_app_not_loading',
  'I-110': 'report_db_connection_error',
  'I-111': 'report_env_var_missing',
  'I-112': 'report_build_error',
  'I-113': 'report_port_conflict',
  'I-114': 'report_out_of_memory',
  'I-115': 'report_timeout_error',
  'I-116': 'ask_to_retry_deployment',
  'I-117': 'ask_for_error_explanation',
  'I-118': 'ask_to_fix_automatically',
  'I-119': 'ask_to_view_all_projects',
  'I-120': 'ask_to_delete_deployment',
  'I-121': 'ask_to_pause_deployment',
  'I-122': 'ask_to_resume_deployment',
  'I-123': 'ask_to_rename_project',
  'I-124': 'ask_to_duplicate_project',
  'I-125': 'ask_to_transfer_project',
  'I-126': 'ask_about_account_settings',
  'I-127': 'ask_to_delete_account',
  'I-128': 'ask_what_is_deployai',
  'I-129': 'ask_how_to_start',
  'I-130': 'ask_for_help',
  'I-131': 'ask_for_step_by_step',
  'I-132': 'give_unclear_input',
  'I-133': 'give_out_of_scope_input',
  'I-134': 'greet',
  'I-135': 'express_frustration',
  'I-136': 'give_positive_feedback',
  'I-137': 'ask_to_start_over',
};

// Maps inference IDs to action IDs
const INFERENCE_TO_ACTION = {};

function mapRange(start, end, actionId) {
  for (let i = start; i <= end; i++) {
    const key = `I-${String(i).padStart(3, '0')}`;
    INFERENCE_TO_ACTION[key] = actionId;
  }
}

function mapList(ids, actionId) {
  for (const id of ids) {
    INFERENCE_TO_ACTION[id] = actionId;
  }
}

mapRange(1, 11, 'A-001');
mapRange(12, 20, 'A-002');
mapList(['I-021', 'I-034', 'I-035', 'I-036', 'I-037', 'I-038'], 'A-003');
mapList(['I-022', 'I-024', 'I-025', 'I-026', 'I-029', 'I-030', 'I-031'], 'A-004');
mapList(['I-023', 'I-027', 'I-028'], 'A-005');
mapList(['I-039', 'I-040', 'I-041', 'I-042', 'I-043', 'I-044', 'I-048'], 'A-006');
mapList(['I-045', 'I-046', 'I-047'], 'A-007');
mapRange(49, 56, 'A-008');
mapRange(57, 62, 'A-009');
mapList(['I-063', 'I-064', 'I-065', 'I-067', 'I-068', 'I-070', 'I-071', 'I-072'], 'A-010');
mapList(['I-066', 'I-069'], 'A-011');
mapList(['I-032', 'I-092'], 'A-012');
mapList(['I-033'], 'A-013');
mapRange(73, 79, 'A-014');
mapList(['I-080', 'I-081', 'I-082', 'I-083', 'I-084', 'I-085', 'I-086', 'I-087', 'I-089'], 'A-015');
mapList(['I-088'], 'A-016');
mapList(['I-090', 'I-091', 'I-093', 'I-094', 'I-095'], 'A-017');
mapList(['I-096', 'I-112'], 'A-018');
mapList(['I-097', 'I-098', 'I-099', 'I-100', 'I-101', 'I-102', 'I-107'], 'A-019');
mapList(['I-103', 'I-104'], 'A-020');
mapList(['I-105', 'I-106'], 'A-021');
mapRange(108, 118, 'A-022');
mapRange(119, 125, 'A-023');
mapList(['I-126', 'I-127'], 'A-024');
mapRange(128, 131, 'A-025');
mapList(['I-132', 'I-135'], 'A-026');
mapList(['I-133'], 'A-027');
mapList(['I-134', 'I-136', 'I-137'], 'A-028');

const ACTIONS = {
  'A-001': 'repository_analysis',
  'A-002': 'return_analysis_report',
  'A-003': 'present_deployment_options',
  'A-004': 'select_free_tier_platform',
  'A-005': 'select_production_platform',
  'A-006': 'trigger_platform_oauth',
  'A-007': 'manage_platform_connection',
  'A-008': 'manage_env_vars',
  'A-009': 'manage_domain',
  'A-010': 'calculate_and_show_cost',
  'A-011': 'manage_token_balance',
  'A-012': 'execute_deployment',
  'A-013': 'execute_rollback',
  'A-014': 'manage_scaling',
  'A-015': 'return_monitoring_data',
  'A-016': 'set_monitoring_alert',
  'A-017': 'manage_cicd',
  'A-018': 'handle_build_failure',
  'A-019': 'setup_database',
  'A-020': 'return_db_info',
  'A-021': 'manage_db_backup',
  'A-022': 'handle_error',
  'A-023': 'manage_project',
  'A-024': 'manage_account',
  'A-025': 'return_onboarding_guidance',
  'A-026': 'request_clarification',
  'A-027': 'handle_out_of_scope',
  'A-028': 'send_conversational_response',
};

const REPLY_MAP = {
  'A-001': 'Got it — analysing your repository now.',
  'A-002': 'Here is what I found in your project.',
  'A-003': 'You have two deployment options — which do you prefer?',
  'A-004': 'Great choice. Connecting to your selected platform now.',
  'A-005': 'Setting up production infrastructure.',
  'A-006': 'Click the button to connect your account via OAuth.',
  'A-007': 'Checking your platform connection status.',
  'A-008': 'Got your environment variables — storing them securely.',
  'A-009': 'Handling your domain configuration now.',
  'A-010': 'Let me calculate the cost breakdown for you.',
  'A-011': 'Checking your token balance.',
  'A-012': 'Starting deployment — watch the log panel for live updates.',
  'A-013': 'Rolling back to your last stable version.',
  'A-014': 'Adjusting your server resources now.',
  'A-015': 'Fetching your live metrics.',
  'A-016': "Alert registered — I'll notify you if anything changes.",
  'A-017': 'Setting up your CI/CD pipeline.',
  'A-018': 'Analysing the build error — here is what happened.',
  'A-019': 'Setting up your database now.',
  'A-020': 'Checking your database connection status.',
  'A-021': 'Managing your database backup.',
  'A-022': 'Something went wrong — let me explain what happened and how to fix it.',
  'A-023': 'Managing your project settings.',
  'A-024': 'Opening your account settings.',
  'A-025': 'Here is how to get started with DeployAI.',
  'A-026': 'I want to make sure I understand — could you clarify what you need?',
  'A-027': 'That is outside what I can help with — I specialise in deployment.',
  'A-028': 'Hey! Ready to deploy something? Share your GitHub link to get started.',
};

module.exports = { INFERENCES, INFERENCE_TO_ACTION, ACTIONS, REPLY_MAP };
