class User < ApplicationRecord
    has_many :alerts
    has_many :trips
    has_many :evaluations
end
