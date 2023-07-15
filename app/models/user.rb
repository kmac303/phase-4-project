class User < ApplicationRecord
    has_secure_password
    validates :password, presence: true
    validates :username, presence: true
    validates :username, uniqueness: true

    has_many :reviews
    has_many :restaurants, through: :reviews

end
