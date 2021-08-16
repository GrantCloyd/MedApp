class StudentSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :total_listens, :total_time, :recent_plays, :total_donations, :most_donated_teacher
  
  has_many :follows
  has_many :chats
  has_many :favorites
  has_many :donations

  def total_listens 
     object.plays.length
  end

  def total_time
     object.plays.sum(:length)
  end

   def recent_plays
     plays = object.plays.order(created_at: :desc).limit(5)
    
     recent_plays = plays.collect {|p| PlaySerializer.new(p)} 
 
   end

   def total_donations
      object.donations.sum(:amount)
   end

   def most_donated_teacher
     teacher = Teacher.find(object.donations.group_by {|d| d.teacher_id}.transform_values {|v| v.count}.max_by {|k,v| v}[0])  
     tea_donation_total = object.donations.select {|d| d.teacher_id == teacher.id}.map {|d| d.amount}.reduce(:+)
     return {teacher_name: teacher.name, amount: tea_donation_total, teacher_id: teacher.id, image_url: teacher.image_url}
   end

end
