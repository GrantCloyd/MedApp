class FollowSerializer < ActiveModel::Serializer
  attributes :id, :student_id, :teacher_id, :teacher

  def teacher 
    FollowTeacherSerializer.new(object.teacher)
  end 
end
