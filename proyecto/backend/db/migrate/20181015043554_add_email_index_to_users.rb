class AddEmailIndexToUsers < ActiveRecord::Migration[5.2]
  def change
    add_index :users, :email, unique: true
    add_index :admins, :email, unique: true
    add_index :admins, :personal_id, unique: true
    add_index :routes, :code, unique: true
  end
end
