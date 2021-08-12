class TeacherSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :image_url, :background, :income, :total_listens


  has_many :meditations
  has_many :follows

  def total_listens 
    object.meditations.map {|m| m.plays.length}.reduce(:+)
  end

end
