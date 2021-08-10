class TeachersController < ApplicationController

    def index
     render json: Teacher.all
    end

    def show 
      teacher = Teacher.find(params[:id])
      render json: teacher
    rescue ActiveRecord::RecordNotFound => error
        render json: {error: error.message}, status: 404

    end

end
