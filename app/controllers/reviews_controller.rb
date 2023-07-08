class ReviewsController < ApplicationController
    
    def index
        render json: Review.all
    end

    def show
        review = Review.find(params[:id])
        render json: review
    end

    def create
        review = Review.create!(params.permit(:rating, :comment))
        render json: review, status: :created
    end

end
