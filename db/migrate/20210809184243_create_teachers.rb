class CreateTeachers < ActiveRecord::Migration[6.1]
  def change
    create_table :teachers do |t|
      t.string :name
      t.string :email 
      t.string :password_digest
      t.text :background
      t.text :image_url, default: 'https://clipground.com/images/avatar-clipart-free-6.png'
      t.decimal :income, default: 0.00



      t.timestamps
    end
  end
end
