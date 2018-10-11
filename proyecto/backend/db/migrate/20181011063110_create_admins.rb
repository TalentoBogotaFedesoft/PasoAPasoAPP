class CreateAdmins < ActiveRecord::Migration[5.2]
  def change
    create_table :admins do |t|
      t.string :personal_id
      t.string :entity
      t.integer :role

      t.timestamps
    end
  end
end
