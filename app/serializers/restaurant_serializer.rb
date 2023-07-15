class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :description, :image_url
  
  has_many :reviews, serializer: ReviewSerializer
  # has_many :users, through: :reviews
end
