class Chat < ApplicationRecord
    has_many :messages
    belongs_to :student
    belongs_to :teacher
end
