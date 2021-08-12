class TeacherSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :image_url, :background, :income


  has_many :meditations
  has_many :follows
end
