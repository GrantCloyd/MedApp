class PopSerializer < ActiveModel::Serializer
    attributes :id, :title, :teacher_name, :est_length, :teacher_id, :teacher_image

    def teacher_name 
       object.teacher.name
    end

    def teacher_id
       object.teacher.id
    end

    def teacher_image
       object.teacher.image_url 
    end


end