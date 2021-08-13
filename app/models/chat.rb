class Chat < ApplicationRecord
    has_many :messages, dependent: :destroy
    belongs_to :student
    belongs_to :teacher
end
