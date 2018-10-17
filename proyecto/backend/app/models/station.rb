class Station < ApplicationRecord
    has_many :routeStops
    has_many :routes, through: :routeStops

    validates :code,  uniqueness: true, presence: true
    validates :latitude, :longitude, :address, presence: true
end
