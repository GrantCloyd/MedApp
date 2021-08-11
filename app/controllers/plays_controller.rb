class PlaysController < ApplicationController

    def create 
     play = Play.create!(play_params)
     render json: play
    rescue ActiveRecord::RecordInvalid => e
        render json: {error: e.message}, status: 422
    end

    private 

    def play_params 
      params.permit(:student_id, :meditation_id, :length)
    end

end
