class MeditationSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
 
  attributes :id, :title, :med_type, :audio_file, :description, :est_length, :plays, :listens, :teacher, :created_at
  
  has_many :favorites
  
  def listens
    object.plays.size
  end


 
  def audio_file
    rails_blob_path(object.audio_file, only_path: true) if object.audio_file.attached?
  end

  def teacher 
   TeacherIndexSerializer.new(object.teacher)
  end


end
