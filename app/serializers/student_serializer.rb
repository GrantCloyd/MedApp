class StudentSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :total_listens, :total_time, :recent_plays
  
  has_many :follows
  has_many :chats
  has_many :favorites

  def total_listens 
     object.plays.length
  end

  def total_time
     object.plays.sum(:length)
  end

   def recent_plays
     plays = object.plays.order(created_at: :desc).limit(6)
    
     recent_plays = plays.collect {|p| PlaySerializer.new(p)} 
 
   end

end
