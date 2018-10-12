class Route < ApplicationRecord
    has_many :buses
    has_many :evaluations
    has_many :routeStops
    has_many :stations, through: :routeStops
end
