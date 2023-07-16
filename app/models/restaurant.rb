class Restaurant < ApplicationRecord
    validates :name, presence: :true
    validates :address, presence: :true
    validates :description, presence: :true
    validates :image_url, presence: :true

    has_many :reviews
    has_many :users, through: :reviews
end
