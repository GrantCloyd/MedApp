class Meditation < ApplicationRecord
    validates :teacher_id, presence: true
    validates :audio_file, presence: true, on: :create 
    validates :title, presence: true
    validates :med_type, presence: true
    validates :est_length, presence: true
    belongs_to :teacher
    has_many :plays, dependent: :destroy
    has_many :favorites
    has_one_attached :audio_file #, service: :s3

end
