class FavoritesController < ApplicationController

   def create  
    fav = Favorite.create!(fav_params)
    render json: fav
   rescue ActiveRecord::RecordInvalid => error
    render json: {error: error.message}, status: 422
   end

   def destroy 
    fav = Favorite.find(params[:id])
    fav.destroy
    render json: {id: fav.id}
   rescue ActiveRecord::RecordNotFound => error
    render json: {error: error.message}, status: 404
   end


    private 

    def fav_params 
     params.permit(:student_id, :meditation_id)
    end

end
