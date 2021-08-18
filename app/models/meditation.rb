class Meditation < ApplicationRecord
    validates :teacher_id, presence: true
    belongs_to :teacher
    has_many :plays, dependent: :destroy
    has_many :favorites
    has_one_attached :audio_file


    

end
