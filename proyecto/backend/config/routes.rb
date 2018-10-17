Rails.application.routes.draw do
  root 'welcome#index'

  namespace :api do
    post 'auth_user' => 'user_token#create'
    post 'auth_admin' => 'admin_token#create'
    namespace :v1 do
      resources :user, only: [:create, :update, :show]
      resources :admin, only: [:create, :destroy, :show]
      resources :route
      resources :station
      resources :bus
    end
  end
end
