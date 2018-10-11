class CreateBuses < ActiveRecord::Migration[5.2]
  def change
    create_table :buses do |t|
      t.string :code, null: false, unique: true
      t.decimal :latitute, precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6

      t.timestamps
    end
  end
end
