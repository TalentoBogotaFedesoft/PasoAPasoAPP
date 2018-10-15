class CreateRoutes < ActiveRecord::Migration[5.2]
  def change
    create_table :routes do |t|
      t.string :name
      t.string :description
      t.string :destination
      t.string :code, null: false

      t.timestamps
    end
  end
end
