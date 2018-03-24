class MessagesController < ApplicationController
  def index
  	@messages = current_user
  end
end
