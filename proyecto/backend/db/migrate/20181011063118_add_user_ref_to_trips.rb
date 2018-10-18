class AddUserRefToTrips < ActiveRecord::Migration[5.2]
  def change
    add_reference :trips, :user, foreign_key:{on_delete: :cascade}
  end
end
