class AddUserRefToAlerts < ActiveRecord::Migration[5.2]
  def change
    add_reference :alerts, :user, foreign_key:{on_delete: :cascade}
  end
end
