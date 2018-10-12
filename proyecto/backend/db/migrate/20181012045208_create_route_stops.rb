class CreateRouteStops < ActiveRecord::Migration[5.2]
  def change
    create_table :route_stops do |t|
      t.integer :stop_id, null: false

      t.timestamps
    end
  end
end
