class ChatsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :not_found

    def find_by_teacher
     chats = Chat.all.select {|c| c.teacher_id == params[:id].to_i}
     render json: chats
    end
   
    def find_by_student
        
     chats = Chat.all.select {|c| c.student_id == params[:id].to_i}
     render json: chats
    end

    def destroy
    chat = Chat.find(params[:id])
    chat.destroy
    render json: {id: chat.id}
    end

def not_found
    render json: {error: e.message}, status: 404
end 

end
