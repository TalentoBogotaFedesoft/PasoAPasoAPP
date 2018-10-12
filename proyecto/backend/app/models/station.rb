class Station < ApplicationRecord
    has_many :routeStops
    has_many :routes, through: :routeStops
end
