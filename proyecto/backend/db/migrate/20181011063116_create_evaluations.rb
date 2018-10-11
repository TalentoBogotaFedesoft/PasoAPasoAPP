class CreateEvaluations < ActiveRecord::Migration[5.2]
  def change
    create_table :evaluations do |t|
      t.string :comment
      t.decimal :value, precision: 5, scale: 5

      t.timestamps
    end
  end
end
