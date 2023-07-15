class ReviewsController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: [:index, :show]
    
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
        head :no_content
    end

    private

    def review_params
        params.permit(:rating, :comment, :user_id, :restaurant_id)
    end

    def authorize
        puts(session.include? :user_id)
        return render json: {error: "Not authorized"}, status: :unauthorized unless session.include? :user_id
    end

end
