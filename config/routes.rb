Rails.application.routes.draw do
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  resources :restaurants, only: [:index, :show, :create, :destroy] do
    resources :reviews, only: [:index, :show]
  end

  resources :users, only: [:index, :show, :create] do
    resources :reviews, only: [:index, :show]
  end


  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  post "/restaurants/:id/review", to: "reviews#create"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
