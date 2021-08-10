class MeditationsController < ApplicationController
   

    def index
      render json: Meditation.all
    end


   def create
  
    meditation = Meditation.create!(med_params)
    
    render json: meditation, only: :id 
   rescue ActiveRecord::RecordInvalid => e
    render json: {error: e.message}, status: 422

   end


    private

    def med_params 
      params.permit(:title, :med_type, :description, :est_length, :audio_file, :teacher_id)
    end

 end
