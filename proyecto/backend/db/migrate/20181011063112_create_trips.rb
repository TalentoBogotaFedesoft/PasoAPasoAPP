class CreateTrips < ActiveRecord::Migration[5.2]
  def change
    create_table :trips do |t|
      t.string :name
      t.decimal :start_lat, precision: 10, scale: 6
      t.decimal :end_lat, precision: 10, scale: 6
      t.decimal :start_long, precision: 10, scale: 6
      t.decimal :end_long, precision: 10, scale: 6

      t.timestamps
    end
  end
end
