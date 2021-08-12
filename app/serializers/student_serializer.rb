class StudentSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :total_listens, :total_time
  has_many :plays

  def total_listens 
     object.plays.length
  end

  def total_time
     object.plays.sum(:length)
  end

  # def recent_plays
  #   plays = object.plays.limit(5)
    
  #    meditations = plays.map {|p| p.meditation}
  #    teachers_names = meditations.map {|m| m.teacher.name}
     
  #    return plays, teachers_names, meditations
   
  # end

end
