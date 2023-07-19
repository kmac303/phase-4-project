class RestaurantsController < ApplicationController
    # before_action :authorize
    # skip_before_action :authorize, only: [:index, :show]
    before_action :all_restaurants, only: :index
    before_action :restaurant_lookup, only: [:show, :destroy]
    
    def index
        render json: @restaurants
    end

    def show
        render json: @restaurant, include: ['reviews', 'reviews.user']
    end

    def create
        restaurant = Restaurant.create!(restaurant_params)
        if restaurant.valid?
            render json: restaurant, status: :created
        else
            render json: {error: restaurant.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        Restaurant.find(params[:id]).destroy
        head :no_content
    end

    private

    def all_restaurants
        @restaurants = Restaurant.all
    end

    def restaurant_lookup   
        @restaurant = Restaurant.find(params[:id])
    end

    def restaurant_params
        params.require(:restaurant).permit(:name, :address, :description, :image_url)
    end

    def authorize
        puts(session.include? :user_id)
        return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
    end
end