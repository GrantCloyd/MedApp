class PlaySerializer < ActiveModel::Serializer
  attributes :id, :length, :meditation, :teacher
  
 
  def teacher 
   object.meditation.teacher

  end 
    

end
