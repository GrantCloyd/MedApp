class CreateMeditations < ActiveRecord::Migration[6.1]
  def change
    create_table :meditations do |t|
      t.string :med_type
      t.string :title 
      t.text :description 
      t.integer :est_length
      t.integer :teacher_id

      t.timestamps
    end
  end
end
