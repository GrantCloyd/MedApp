class DonationsController < ApplicationController
    
    def create
        donation = Donation.create!(donation_params)
        teacher = Teacher.find(params[:teacher_id])
        teacher.income += params[:amount].to_i
        teacher.save
        most_teacher = student_most_donate_teacher(params[:student_id])
        render json: {id: donation.id, donation: donation, most_donated_teacher: most_teacher[0], most_donated_by_amount: most_teacher[1] }
    rescue ActiveRecord::RecordInvalid => error
        render json: {error: error.message}, status:422
    rescue ActiveRecord::RecordNotFound => error
        render json: {error: error.message}, status:404
    end

    private
    
    def donation_params  
     params.permit(:student_id, :teacher_id, :amount, :message, :username)
    end


    def student_most_donate_teacher(id)
        student = Student.find(id)
        obj = StudentSerializer.new(student)
        [obj.most_donated_teacher, obj.most_donated_by_amount]
      end

end
