class CreateStations < ActiveRecord::Migration[5.2]
  def change
    create_table :stations do |t|
      t.string :code
      t.decimal :latitute, precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6
      t.string :address

      t.timestamps
    end
  end
end
