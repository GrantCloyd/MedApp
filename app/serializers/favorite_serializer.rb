class FavoriteSerializer < ActiveModel::Serializer
  attributes :id, :meditation_id, :student_id, :meditation, :teacher_name, :teacher_image


  def teacher_name 
  med = Meditation.find(object.meditation_id)
  med.teacher.name
  end

  def teacher_image
    med = Meditation.find(object.meditation_id)
    med.teacher.image_url
  end
end
