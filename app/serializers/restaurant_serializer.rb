class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :description, :image_url
end
