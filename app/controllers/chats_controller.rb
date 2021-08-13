class ChatsController < ApplicationController

    def find_by_teacher
     chats = Chat.all.find_by(teacher_id: params[:id])
     render json: chats
    end
   
    def find_by_student
     chats = Chat.all.find_by(student_id: params[:id])
     render json: chats
    end

end
