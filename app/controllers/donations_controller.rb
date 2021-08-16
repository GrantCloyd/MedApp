class DonationsController < ApplicationController
    
    def create
        donation = Donation.create!(donation_params)
        teacher = Teacher.find(params[:teacher_id])
        teacher.income += params[:amount].to_i
        teacher.save
        render json: donation
    rescue ActiveRecord::RecordInvalid => error
        render json: {error: error.message}, status:422
    rescue ActiveRecord::RecordNotFound => error
        render json: {error: error.message}, status:404
    end

    private
    
    def donation_params  
     params.permit(:student_id, :teacher_id, :amount, :message, :username)
    end

end
