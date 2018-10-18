class Api::V1::AdminController < ApiController
    before_action :authenticate_admin
    before_action :set_admin
    before_action :check_role, only:[:create, :destroy]

    def create
        admin_params = params.require(:admin).permit(
            :name, :email, :password, :password_confirmation,
            :personal_id, :role, :entity)
        admin = Admin.new(admin_params)

        unless admin.valid?
            render status: :unprocessable_entity, json: {
                error: admin.errors.details,
                message: admin.errors.full_messages}
            return
        end

        if admin.save
            render status: :created
        else
            render status: :bad_request
        end
    end

    def destroy
        admin = Admin.find_by personal_id: params[:personal_id]

        if admin.delete
            render status: :ok
        else
            render status: :bad_request
        end
    end

    def show
    end

    private
    def set_admin
        @admin = current_admin
        if @admin.nil?
            render status: :not_found, json:{}
        end
    end

    def check_role
        unless @admin.sys_admin?
            render status: :unauthorized
        end
    end
end
