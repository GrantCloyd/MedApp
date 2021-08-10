class Meditation < ApplicationRecord
    validates :teacher_id, presence: true
     
    belongs_to :teacher
    has_one_attached :audio_file

end
