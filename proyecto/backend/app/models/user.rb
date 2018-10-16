class User < ApplicationRecord
    has_many :alerts
    has_many :trips
    has_many :evaluations
    validates :email, uniqueness: true
    validates :name, :email, :password_digest, presence: true
    has_secure_password
end
