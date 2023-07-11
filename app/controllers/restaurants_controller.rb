class RestaurantsController < ApplicationController
    
    def index
        render json: Restaurant.all
    end

    def show
        restaurant = Restaurant.find(params[:id])
        render json: restaurant
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
end
