class FollowsController < ApplicationController

    def create
       follow = Follow.create!(follow_params)
       render json: follow
    rescue ActiveRecord::RecordInvalid => e
        render json: {error: e.message}, status: 422
    end

    def destroy
    follow = Follow.find(params[:id])
    follow.destroy
    render json: {id: follow.id}
    rescue ActiveRecord::RecordNotFound => e 
        render json: { error: e.message}, status: 404
    end

    private 

    def follow_params
     params.permit(:student_id, :teacher_id)
    end

end
