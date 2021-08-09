class Teacher < ApplicationRecord
    validates :email, presence: true
    validates :password, presence: true
    validates :email, uniqueness: true

    has_secure_password
    has_many :meditations
end
