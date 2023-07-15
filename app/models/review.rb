class Review < ApplicationRecord
    validates :rating, presence: true
    validates :comment, presence: true

    belongs_to :restaurant
    belongs_to :user

end
