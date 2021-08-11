class MeditationsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :not_found 
rescue_from ActiveRecord::RecordInvalid, with: :invalid
   

    def index
      render json: Meditation.all
    end

    def show
        meditation = Meditation.find(params[:id])
        render json: meditation
    end

   def create
      meditation = Meditation.create!(med_params)
      render json: meditation, only: :id 
   end

   def update 
      med = Meditation.find(params[:id])
      med.update!(update_params) 
      render json: med      
   end


   def destroy
     med = Meditation.find(params[:id])
     med.destroy
     render json: med.id
   end


    private

    def med_params 
      params.permit(:title, :med_type, :description, :est_length, :audio_file, :teacher_id)
    end

    def update_params
       params.permit(:title, :med_type, :description, :est_length)
    end

    def not_found err
      render json: {error: err.message}, status: 404
    end

    def invalid err
      render json: {error: err.message}, status: 422
    end
 end
