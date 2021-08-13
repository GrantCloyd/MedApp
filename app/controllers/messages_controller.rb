class MessagesController < ApplicationController

    def create
      if params[:chat_id] == nil
        chat = Chat.create!(chat_params)
        message = Message.create!(message_params)
        render json: {message:message, chat:chat}
      else 
        message = Message.create!(message_params)
        render json: message
      end
    rescue ActiveRecord::RecordInvalid => e  
       render json: {error: e.message}, status: 422
    end

    private

    def message_params
        if params[:chat_id] == nil
            params.permit(:student_id, :teacher_id, :content, :username).merge({chat_id: Chat.last.id})
        else
      params.permit(:student_id, :teacher_id, :content, :chat_id, :username)
        end
    end

    def chat_params
      params.permit(:student_id, :teacher_id, :title)
    end

end
