class AddUserRefToEvaluations < ActiveRecord::Migration[5.2]
  def change
    add_reference :evaluations, :user, foreign_key:{on_delete: :cascade}
  end
end
