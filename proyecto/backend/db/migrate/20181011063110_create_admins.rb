class CreateAdmins < ActiveRecord::Migration[5.2]
  def change
    create_table :admins do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :personal_id, null: false
      t.string :entity, null: false
      t.integer :role, null: false

      t.timestamps
    end
  end
end
