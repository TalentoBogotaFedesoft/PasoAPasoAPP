class AddRouteRefToBuses < ActiveRecord::Migration[5.2]
  def change
    add_reference :buses, :route, foreign_key: {on_delete: :nullify}
  end
end
