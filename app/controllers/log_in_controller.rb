class LogInController < ApplicationController


    def create 
    if params[:type] == 'student' 
     user = Student.find_by(email: params[:email])
    else 
        user = Teacher.find_by(email: params[:email])
    end
      if user && user.authenticate(params[:password])
       session[:user_id] = user.id
       render json: user
      else
      render json: {error: "Email and/or Password not found"}, status: 404
    end
    end
   
    def destroy
      session.delete(:user_id)
      
    end

    
end
