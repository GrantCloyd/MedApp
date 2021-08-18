class PlaySerializer < ActiveModel::Serializer
  attributes :id, :length, :meditation, :created_at, :teacher_name


  
 
  def teacher_name 
   object.meditation.teacher.name unless object.meditation == nil
  end 
    

end
