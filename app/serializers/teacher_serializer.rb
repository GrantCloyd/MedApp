class TeacherSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :image_url, :background, :income
end
