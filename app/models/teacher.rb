class Teacher < ApplicationRecord
    validates :email, presence: true
    validates :password, presence: true, on: :create
    validates :email, uniqueness: true

    has_secure_password
    has_many :meditations, dependent: :destroy
    has_many :follows
    has_many :chats
    has_many :donations

    def last_med 
        if object.meditations.length > 0
           object.meditations.limit(1).order(created_at: :desc)
        else 
          return ""
        end
      end
end
