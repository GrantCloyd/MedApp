class AddOptInAndFollowMessageToTeacher < ActiveRecord::Migration[6.1]
  def change
    add_column :teachers, :opt_in, :boolean, default: false
    add_column :teachers, :follow_message, :text
  end
end
