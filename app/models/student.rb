class Student < ApplicationRecord
    validates :email, presence: true
    validates :email, uniqueness: true
    validates :password, presence: true
    validates :name, presence: true
    has_secure_password
    has_many :plays
end
