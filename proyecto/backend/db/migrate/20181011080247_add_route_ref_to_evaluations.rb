class AddRouteRefToEvaluations < ActiveRecord::Migration[5.2]
  def change
    add_reference :evaluations, :route, foreign_key:{on_delete: :cascade}
  end
end
