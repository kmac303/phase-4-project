class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :user_id, :restaurant_id
  
  belongs_to :user
end
