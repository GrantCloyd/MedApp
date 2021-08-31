class StudentSerializer < ActiveModel::Serializer
  attributes :plays_id, :most_pop_med, :id, :name, :email, :total_listens, :total_time, :recent_plays, :total_donations, :most_donated_teacher, :most_donated_by_amount
  
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
      if object.donations.length == 0
         return ""
      else
     teacher = Teacher.find(object.donations.group_by {|d| d.teacher_id}.transform_values {|v| v.count}.max_by {|k,v| v}[0])  
     tea_donation_total = object.donations.select {|d| d.teacher_id == teacher.id}.length
     return {teacher_name: teacher.name, amount: tea_donation_total, teacher_id: teacher.id, image_url: teacher.image_url}
      end
   end

   def most_donated_by_amount
      if object.donations.length == 0
         return ""
      else
      most_dona = object.donations.group_by {|d| d.teacher_id}.map {|dg, v| {id:dg, amt: v.map {|d| d.amount}}}.max_by {|d| d[:amt].reduce(:+)}
      teacher = Teacher.find(most_dona[:id])
      return {teacher_name: teacher.name, amount: most_dona[:amt].reduce(:+), teacher_id: teacher.id, image_url: teacher.image_url}     
      end
   end

  def most_pop_med 
    med = Meditation.all.max_by {|m| m.plays.length}
   PopSerializer.new(med) unless med == nil 
   end 

   def plays_id 
    plays = object.plays
    if plays.length == 0 
      return []
    else 
    plays.collect {|p| IdSerializer.new(p)} 
    end
   end


end
