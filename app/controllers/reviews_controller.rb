class ReviewsController < ApplicationController
    
    def index
        render json: Review.all
    end

    def show
        review = Review.find(params[:id])
        render json: review
    end

    def create
        review = Review.create(user_params)
        if user.valid?
          render json: user, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        review = Review.find(params[:id])
        review.destroy
        head :no_content
    end

end
