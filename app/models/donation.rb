class Donation < ApplicationRecord
    validates :amount, numericality: {greater_than_or_equal_to: 1}
    belongs_to :teacher
    belongs_to :student
end
