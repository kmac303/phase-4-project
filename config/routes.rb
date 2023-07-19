Rails.application.routes.draw do
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  resources :reviews, only: [:update, :destroy] 

  resources :restaurants, only: [:index, :show, :create, :destroy] do
    resources :reviews, only: [:create, :update, :destroy]
  end

  resources :users, only: :create
  

  post "/signup", to: "users#create"
  get "/me", to: "users#show"

end