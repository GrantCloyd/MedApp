class MeditationsController < ApplicationController
   

    def index
      render json: Meditation.all
    end

    def show
        meditation = Meditation.find(params[:id])
        render json: meditation
    rescue ActiveRecord::RecordNotFound => e
        render json: {error: e.message}, status: 404
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
