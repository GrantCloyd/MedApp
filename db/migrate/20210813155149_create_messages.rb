class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.text :content
      t.integer :student_id
      t.integer :teacher_id
      t.integer :chat_id

      t.timestamps
    end
  end
end
