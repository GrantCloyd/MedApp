class CreateChats < ActiveRecord::Migration[6.1]
  def change
    create_table :chats do |t|
      t.string :title
      t.integer :student_id
      t.integer :teacher_id

      t.timestamps
    end
  end
end
