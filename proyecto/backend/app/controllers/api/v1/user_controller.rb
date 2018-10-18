class Api::V1::UserController < ApiController
    before_action :authenticate_user
    skip_before_action :authenticate_user, only: [:create]
    before_action :set_user, only: [:update, :show]

    def create
        user_params = params.require(:user).permit(
            :name, :email, :password, :password_confirmation)
        user = User.new(user_params)

        unless user.valid?
            render status: :unprocessable_entity, json: {
                error: user.errors.details,
                message: user.errors.full_messages}
            return
        end

        if user.save
            render status: :created
        else
            render status: :bad_request
        end
    end

    def update
        user_params = params.require(:user). permit(:name, :address)
        if @user.update(user_params)
            render status: :ok
        else
            render status: :bad_request
        end
    end

    def show
    end

    private
    def set_user
        @user = current_user
        if @user.nil?
            render status: :not_found, json:{}
        end
    end
end
