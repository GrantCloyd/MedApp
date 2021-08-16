class Teacher < ApplicationRecord
    validates :email, presence: true
    validates :password, presence: true, on: :create
    validates :email, uniqueness: true

    has_secure_password
    has_many :meditations, dependent: :destroy
    has_many :follows
    has_many :chats
end
