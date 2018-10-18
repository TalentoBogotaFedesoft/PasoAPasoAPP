class RouteStop < ApplicationRecord
    belongs_to :route
    belongs_to :station

    validates :route, :station, :stop_id, presence: true
end
