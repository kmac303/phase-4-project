class RestaurantsController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: [:index, :show]
    
    def index
        render json: Restaurant.all
    end

    def show
        restaurant = Restaurant.find(params[:id])
        # puts(restaurant.reviews[0].user.username)
        render json: restaurant, include: ['reviews', 'reviews.user']
    end

    def create
        restaurant = Restaurant.create!(params.permit(:name, :address, :description, :image_url))
        render json: restaurant, status: :created
    end

    def destroy
        restaurant = Restaurant.find(params[:id])
        restaurant.destroy
        head :no_content
    end

    private

    def restaurant_params
        params.permit(:name, :address, :description, :image_url)
    end

    def authorize
        puts(session.include? :user_id)
        return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
    end
end