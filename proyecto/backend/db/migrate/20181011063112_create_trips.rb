class CreateTrips < ActiveRecord::Migration[5.2]
  def change
    create_table :trips do |t|
      t.string :name, null: false
      t.decimal :start_lat, precision: 10, scale: 6, null: false
      t.decimal :end_lat, precision: 10, scale: 6, null: false
      t.decimal :start_long, precision: 10, scale: 6, null: false
      t.decimal :end_long, precision: 10, scale: 6, null: false

      t.timestamps
    end
  end
end
