class PlaySerializer < ActiveModel::Serializer
  attributes :id, :length, :meditation, :created_at, :teacher_name
  
 
  def teacher_name 
   object.meditation.teacher.name

  end 
    

end
