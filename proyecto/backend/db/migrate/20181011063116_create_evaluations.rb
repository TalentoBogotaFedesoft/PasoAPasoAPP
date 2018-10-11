class CreateEvaluations < ActiveRecord::Migration[5.2]
  def change
    create_table :evaluations do |t|
      t.string :comment
      t.decimal :value, precision: 5, scale: 5, null: false

      t.timestamps
    end
  end
end
