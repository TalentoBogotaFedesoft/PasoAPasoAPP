class Route < ApplicationRecord
    has_many :buses
    has_many :evaluations
end
