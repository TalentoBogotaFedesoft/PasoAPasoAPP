class CreateAlerts < ActiveRecord::Migration[5.2]
  def change
    create_table :alerts do |t|
      t.string :code, null: false
      t.time :dep_time

      t.timestamps
    end
  end
end
