Rails.application.routes.draw do
  
  resources :donations, only: :create
  resources :favorites, only: [:create, :destroy]
  get '/chats/teachers/:id', to: 'chats#find_by_teacher'
  get '/chats/students/:id', to: 'chats#find_by_student'
  get '/me', to: 'log_in#me'
  resources :chats, only: :destroy
  resources :messages, only: :create
  resources :follows, only: [:create, :destroy]
  resources :plays, only: :create
  resources :meditations, only: [:index, :show, :create, :update, :destroy]
  resources :teachers, only: [:index, :show, :update]
  resources :students, only: :update
  resources :users, only: :create
  resources :log_in, only: [:create, :destroy]
  delete "/log_in", to: "log_in#destroy"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  get '/', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
