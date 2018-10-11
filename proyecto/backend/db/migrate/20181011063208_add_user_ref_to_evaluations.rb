class AddUserRefToEvaluations < ActiveRecord::Migration[5.2]
  def change
    add_reference :evaluations, :user, foreign_key: true
  end
end
