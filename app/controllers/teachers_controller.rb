class TeachersController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :not_found

    def index
      teachers = Teacher.all
     render json: TeacherIndexSerializer.new(teachers)
    end

    def show 
      teacher = Teacher.find(params[:id])
      render json: teacher
  
    end

    def update 
      teacher = Teacher.find(params[:id])
      teacher.update!(update_params)
      render json: teacher
    rescue ActiveRecord::RecordInvalid => e 
      render json: {error: e.message}, status: 422
    end

    private 

    def update_params
      params.permit(:name, :email, :image_url, :background, :income, :follow_message, :opt_in )
    end
 
    def not_found err
      render json: {error: err.message}, status: 404
    end

end
