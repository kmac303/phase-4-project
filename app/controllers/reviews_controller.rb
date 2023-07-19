class ReviewsController < ApplicationController
  before_action :review_lookup, only: [:update, :destroy]

    def create
        review = Review.create(review_params)
        if review.valid?
          render json: review, status: :created
        else
          render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        if @review
          @review.update(review_params)
          render json: @review
        else
          render json: { error: "Review not found" }, status: :not_found
        end
      end

    def destroy
        @review.destroy
        head :no_content
    end

    private

    def review_params
        params.permit(:rating, :comment, :user_id, :restaurant_id)
    end

    def review_lookup   
      @review = Review.find_by(id: params[:id])
    end

end
