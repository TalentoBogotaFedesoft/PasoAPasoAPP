class Route < ApplicationRecord
    has_many :buses, dependent: nu
    has_many :evaluations
    has_many :routeStops
    has_many :stations, through: :routeStops
    
    validates :code, :destination, presence: true
end
