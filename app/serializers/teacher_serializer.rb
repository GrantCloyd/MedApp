class TeacherSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :image_url, :background, :income, :total_listens, :opt_in, :follow_message, :total_favorites 


  has_many :meditations
  has_many :follows
  has_many :chats, include: :messages

  def total_listens 
    object.meditations.map {|m| m.plays.length}.reduce(:+)
  end

  def total_favorites 
    object.meditations.map {|m| m.favorites.length}.reduce(:+)
  end

end
