class CreatePlays < ActiveRecord::Migration[6.1]
  def change
    create_table :plays do |t|
      t.integer :student_id
      t.integer :meditation_id

      t.timestamps
    end
  end
end
