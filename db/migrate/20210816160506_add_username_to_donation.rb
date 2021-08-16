class AddUsernameToDonation < ActiveRecord::Migration[6.1]
  def change
    add_column :donations, :username, :string
  end
end
