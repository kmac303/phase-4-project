class ReviewsController < ApplicationController
    
    def index
        render json: Review.all
    end

    def show
        review = Review.find(params[:id])
        render json: review
    end

    def create
        review = Review.create(review_params)
        if review.valid?
          render json: review, status: :created
        else
          render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        review = Review.find(params[:id])
        review.destroy
        head :no_contenusernamet
    end

    private

    def review_params
        params.permit(:rating, :comment)
    end

end
