set :rbenv_type, :user # or :system, depends on your rbenv setup
set :rbenv_ruby, '2.1.0'
set :rbenv_prefix, "RBENV_ROOT=#{fetch(:rbenv_path)} RBENV_VERSION=#{fetch(:rbenv_ruby)} #{fetch(:rbenv_path)}/bin/rbenv exec"

set :rbenv_map_bins, %w{rake gem bundle ruby rails}
set :rbenv_roles, :web # default value

# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }
# 
set :linked_files, %w{config/database.yml}

set :user, "deployer"
set :deploy_user, "deployer"

set :scm, :git
set :repo_url, "git@github.com:bizarre07/mapping_practice.git"
set :keep_releases, 2

set :use_sudo, false
set :copy_exclude, [".git", ".DS_Store", ".gitignore", ".gitsubmodule"]

set :netssh_options, {
  forward_agent: true,
  port: 3456
}

set :linked_dirs, %w{tmp/pids log }


namespace :deploy do

  after :finishing, "unicorn:restart"

end