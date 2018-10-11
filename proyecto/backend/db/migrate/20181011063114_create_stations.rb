class CreateStations < ActiveRecord::Migration[5.2]
  def change
    create_table :stations do |t|
      t.string :code, null: false, unique: true
      t.decimal :latitute, precision: 10, scale: 6, null: false
      t.decimal :longitude, precision: 10, scale: 6, null: false
      t.string :address, null: false

      t.timestamps
    end
  end
end
