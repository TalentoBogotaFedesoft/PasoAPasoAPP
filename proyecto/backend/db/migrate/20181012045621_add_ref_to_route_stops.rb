class AddRefToRouteStops < ActiveRecord::Migration[5.2]
  def change
    add_reference :route_stops, :station, foreign_key: true
    add_reference :route_stops, :route, foreign_key: true
  end
end
