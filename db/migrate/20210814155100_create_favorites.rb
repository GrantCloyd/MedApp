class CreateFavorites < ActiveRecord::Migration[6.1]
  def change
    create_table :favorites do |t|
      t.integer :meditation_id
      t.integer :student_id

      t.timestamps
    end
  end
end
