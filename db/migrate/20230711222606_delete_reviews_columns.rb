class DeleteReviewsColumns < ActiveRecord::Migration[6.1]
  def change
    remove_column :reviews, :user_id
    remove_column :reviews, :restaurant_id
  end
end
