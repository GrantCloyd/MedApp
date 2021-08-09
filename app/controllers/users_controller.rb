class UsersController < ApplicationController
    def create
      if (params[:type] == "student")
       user = Student.create!(user_params)
      else
       user = Teacher.create!(user_params)
      end
     render json: user, status: 200
    rescue ActiveRecord::RecordInvalid => e
        render json: {error: e.message}, status: 422
    end

    private 

    def user_params
      params.permit(:password, :email, :name)
    end
end
