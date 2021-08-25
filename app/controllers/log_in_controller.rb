class LogInController < ApplicationController


    def create 
    if params[:type] == 'student' 
     user = Student.find_by(email: params[:email])
     session[:student_id] = user.id
    else 
        user = Teacher.find_by(email: params[:email])
        session[:teacher_id] = user.id
    end
      if user && user.authenticate(params[:password])
       render json: user
      else
      render json: {error: "Email and/or Password not found"}, status: 404
    end
    end
   
    def destroy
      session.delete(:student_id)
      session.delete(:teacher_id)
    end

    def me 
     student = Student.find_by(id: session[:student_id])
     teacher = Teacher.find_by(id: session[:teacher_id])
     if !student.nil? 
       render json: student
     elsif !teacher.nil?
       render json: teacher
     else render head: :no_content
     end
    end

    
end
