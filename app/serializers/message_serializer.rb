class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :student_id, :teacher_id, :chat_id, :username
end
