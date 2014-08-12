set :branch, ENV["REVISION"] || ENV["BRANCH_NAME"] || "stable"
set :stage, :production

set :application, 'mapping.wonyoung.so'
set :domain, 'mapping.wonyoung.so'
server "mapping.wonyoung.so", user: "deployer", roles: %w{web app db}

set :deploy_to, "/home/#{fetch(:user)}/#{fetch(:application)}" 
