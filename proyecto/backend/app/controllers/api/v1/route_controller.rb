class Api::V1::RouteController < ApiController
    before_action :authenticate_admin, only: [:create, :destroy, :update]
    before_action :check_role, only: [:create, :destroy, :update]
    before_action :set_route, only:[:destroy, :update, :show]

    def create
        route_params = params.require(:route).permit(
            :name, :description, :destination, :code)
        route = Route.new(route_params)

        unless route.valid?
            render status: :unprocessable_entity, json: {
                error: route.errors.details,
                message: route.errors.full_messages}
            return
        end

        if route.save
            render status: :created
        else
            render status: :bad_request
        end
    end

    def update
        route_params = params.require(:route).permit(
            :name, :description, :destination)
        if @route.update(route_params)
            render status: :ok
        else
            render status: :bad_request
        end
    end

    def show
    end

    def index
        @routes = Route.all
    end

    def destroy
        if @route.delete
            render status: :ok
        else
            render status: :bad_request
        end
    end

    private
    def check_role
        @admin = current_admin
        if @admin.nil? or @admin.role <'op_agent'
            render status: :unauthorized
        end
    end

    def set_route
        begin
            @route = Route.find(params[:id])
        rescue
            render status: :not_found, json: {}
        end
    end
end
