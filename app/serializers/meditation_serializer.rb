class MeditationSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
 
  attributes :id, :title, :med_type, :audio_file, :description, :est_length, :plays, :listens
  belongs_to :teacher
  
  def listens
    object.plays.size
  end


 
  def audio_file
    rails_blob_path(object.audio_file, only_path: true) if object.audio_file.attached?
  end


end
