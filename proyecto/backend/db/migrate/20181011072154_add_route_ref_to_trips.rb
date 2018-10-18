class AddRouteRefToTrips < ActiveRecord::Migration[5.2]
  def change
    add_reference :trips, :route, foreign_key:{on_delete: :cascade}
  end
end
