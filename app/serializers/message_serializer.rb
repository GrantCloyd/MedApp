class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :student_id, :teacher_id, :title
end
