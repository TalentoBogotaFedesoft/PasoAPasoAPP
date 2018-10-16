Rails.application.routes.draw do
  root 'welcome#index'

  namespace :api do
    post 'auth_user' => 'user_token#create'
    namespace :v1 do
      resources :user, only: [:create, :update, :show]
  #post 'admin_token' => 'admin_token#create'
    end
  end
end
