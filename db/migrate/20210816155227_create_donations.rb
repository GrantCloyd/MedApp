class CreateDonations < ActiveRecord::Migration[6.1]
  def change
    create_table :donations do |t|
      t.integer :student_id
      t.integer :teacher_id
      t.decimal :amount
      t.text :message

      t.timestamps
    end
  end
end
