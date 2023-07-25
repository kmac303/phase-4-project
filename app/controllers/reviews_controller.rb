class ReviewsController < ApplicationController
  before_action :review_lookup, only: [:update, :destroy]

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

  def update
    if @review
      if @review.user == current_user
        @review.update(review_params)
        render json: @review
      else
        render json: { error: "You are not authorized to update this review" }, status: :unauthorized
      end
    else
      render json: { error: "Review not found" }, status: :not_found
    end
  end

  def destroy
    if @review
      if @review.user == current_user
        @review.destroy
        head :no_content
      else
        render json: { error: "You are not authorized to delete this review" }, status: :unauthorized
      end
    else
      render json: { error: "Review not found" }, status: :not_found
    end
  end

  private

  def review_params
    params.permit(:rating, :comment, :restaurant_id, :user_id)
  end

  def review_lookup
    @review = current_user.reviews.find_by(id: params[:id])
    render json: { error: "Review not found" }, status: :not_found unless @review
  end
end
