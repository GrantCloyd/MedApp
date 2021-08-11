class StudentsController < ApplicationController
   
    def update 
        student = Student.find(params[:id])
        student.update!(update_params)
        render json: student
      rescue ActiveRecord::RecordInvalid => e 
        render json: {error: e.message}, status: 422
      rescue ActiveRecord::RecordNotFound => e 
        render json: {error: e.message}, status: 404
      end

      private 

      def update_params
         params.permit(:name, :email)
      end


end
