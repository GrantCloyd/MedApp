class TeacherSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :image_url, :background, :income, :total_listens, :opt_in, :follow_message 


  has_many :meditations
  has_many :follows
  has_many :chats, include: :messages

  def total_listens 
    object.meditations.map {|m| m.plays.length}.reduce(:+)
  end

end
