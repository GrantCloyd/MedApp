class PopSerializer < ActiveModel::Serializer
    attributes :id, :title, :teacher_name, :est_length, :teacher_id

    def teacher_name 
       object.teacher.name
    end

    def teacher_id
       object.teacher.id
    end

end