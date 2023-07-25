class ApplicationController < ActionController::API
  include ActionController::Cookies

  before_action :authorize, unless: :public_action?

  private

  def authorize
    return render json: { error: "Not authorized" }, status: :unauthorized unless session.include?(:user_id)
  end

  def public_action?
    controller_name == 'restaurants' && action_name == 'index' ||
      controller_name == 'reviews' && action_name == 'index' ||
      controller_name == 'reviews' && action_name == 'show' ||
      controller_name == 'users' && action_name == 'create' ||
      controller_name == 'sessions' && action_name == 'destroy'
  end

  def current_user
      @current_user ||= User.find_by(id: session[:user_id])
  end
  
end
