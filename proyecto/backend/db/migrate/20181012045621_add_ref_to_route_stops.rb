class AddRefToRouteStops < ActiveRecord::Migration[5.2]
  def change
    add_reference :route_stops, :station, foreign_key: {on_delete: :cascade}
    add_reference :route_stops, :route, foreign_key: {on_delete: :cascade}
  end
end
