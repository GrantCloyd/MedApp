class FavoriteSerializer < ActiveModel::Serializer
  attributes :id, :meditation_id, :student_id, :meditation, :teacher_name


  def teacher_name 
  med = Meditation.find(object.meditation_id)
  med.teacher.name
  end

end
