class CreateAdmins < ActiveRecord::Migration[5.2]
  def change
    create_table :admins do |t|
      t.string :personal_id, null: false, unique: true
      t.string :entity, null: false
      t.integer :role, null: false

      t.timestamps
    end
  end
end
