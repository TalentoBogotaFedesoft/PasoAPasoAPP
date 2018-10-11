class AddRouteRefToBuses < ActiveRecord::Migration[5.2]
  def change
    add_reference :buses, :route, foreign_key: true
  end
end
