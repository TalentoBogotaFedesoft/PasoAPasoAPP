class AddRouteRefToTrips < ActiveRecord::Migration[5.2]
  def change
    add_reference :trips, :route, foreign_key: true
  end
end
