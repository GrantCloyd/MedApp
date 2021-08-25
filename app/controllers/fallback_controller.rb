# Controller logic: fallback requests for React Router.
# Leave this here to help deploy your app later!
class FallbackController < ActionController
  include ActionController::MimeResponds
  def index
    # React app index page
    # render file: 'public/index.html'
    respond_to do |format|
      format.html { render body: Rails.root.join('public/index.html').read }
  end
end
end
