class AddTripRefToAlerts < ActiveRecord::Migration[5.2]
  def change
    add_reference :alerts, :trip, foreign_key:{on_delete: :cascade}
  end
end
