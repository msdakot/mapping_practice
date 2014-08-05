class WelcomeController < ApplicationController 
  def index
    redirect_to map_root_path
  end
end