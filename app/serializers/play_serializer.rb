class PlaySerializer < ActiveModel::Serializer
  attributes :id, :length, :meditation, :created_at, :teacher_name, :teacher_image


  
 
  def teacher_name 
   object.meditation.teacher.name unless object.meditation == nil
  end 

  def teacher_image 
    object.meditation.teacher.image_url unless object.meditation == nil
   end 
    

end
