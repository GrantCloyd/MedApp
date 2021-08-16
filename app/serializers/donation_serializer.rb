class DonationSerializer < ActiveModel::Serializer
  attributes :id, :student_id, :teacher_id, :amount, :message, :username



end
