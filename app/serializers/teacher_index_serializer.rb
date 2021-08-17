class TeacherIndexSerializer < ActiveModel::Serializer
  attributes :id, :med_number, :total_listens, :image_url, :name

  def med_number
   object.meditations.length
  end

  def total_listens 
    object.meditations.map {|m| m.plays.length}.reduce(:+)
  end

end
