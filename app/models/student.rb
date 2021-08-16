class Student < ApplicationRecord
    validates :email, presence: true
    validates :email, uniqueness: true
    validates :password, presence: true, on: :create
    validates :name, presence: true
    has_secure_password
    has_many :plays
    has_many :follows
    has_many :chats
    has_many :favorites
    has_many :donations

  
end
