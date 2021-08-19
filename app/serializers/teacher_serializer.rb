class TeacherSerializer < ActiveModel::Serializer
  attributes :id, :last_med, :name, :email, :image_url, :background, :income, :total_listens, :opt_in, :follow_message, :total_favorites, :total_income, :most_donated_student, :most_donated_by_amount


  has_many :meditations
  has_many :follows
  has_many :chats, include: :messages
  has_many :donations

  def total_listens 
    object.meditations.map {|m| m.plays.length}.reduce(:+)
  end

  def total_favorites 
    object.meditations.map {|m| m.favorites.length}.reduce(:+)
  end

  def total_income
    object.donations.sum(:amount)
 end

def most_donated_student 
  if object.donations.length == 0
    return ""
  else
  student = Student.find_by(id: object.donations.group_by {|d| d.student_id}.transform_values {|v| v.count}.max_by {|k,v| v}[0])  
  student_donation_total = object.donations.select {|d| d.student_id == student.id}.length
  return {student_name: student.name, amount: student_donation_total, student_id: student.id} 
  end
end

def most_donated_by_amount
  if object.donations.length == 0
    return ""
  else
  most_dona = object.donations.group_by {|d| d.student_id}.map {|dg, v| {id:dg, amt: v.map {|d| d.amount}}}.max_by {|d| d[:amt].reduce(:+)}
  student = Student.find(most_dona[:id])
  return {student_name: student.name, amount: most_dona[:amt].reduce(:+), student_id: student.id} 
  end   
end

def last_med 
  if object.meditations.length > 0
     object.meditations.limit(1).order(created_at: :desc)
  else 
    return ""
  end
end

end
