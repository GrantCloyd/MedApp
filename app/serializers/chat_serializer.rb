class ChatSerializer < ActiveModel::Serializer
  attributes :id, :title, :student_id, :teacher_id, :messages
 
end
