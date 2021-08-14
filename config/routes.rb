Rails.application.routes.draw do
  
  resources :favorites
  get '/chats/teachers/:id', to: 'chats#find_by_teacher'
  get '/chats/students/:id', to: 'chats#find_by_student'
  resources :chats
  resources :messages
  resources :follows
  resources :plays
  resources :meditations
  resources :teachers
  resources :students
  resources :users, only: :create
  resources :log_in, only: [:create, :destroy]
  delete "/log_in", to: "log_in#destroy"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
