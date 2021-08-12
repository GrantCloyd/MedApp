class Teacher < ApplicationRecord
    validates :email, presence: true
    validates :password, presence: true, on: :create
    validates :email, uniqueness: true

    has_secure_password
    has_many :meditations
    has_many :follows
end
