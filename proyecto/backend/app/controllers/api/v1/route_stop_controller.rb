class Api::V1::RouteStopController < ApiController
    before_action :authenticate_admin, only: [:create, :destroy, :update]
    before_action :set_route
    before_action :check_role, only: [:create, :destroy, :update]
    before_action :set_routeStop, only:[:destroy, :update, :show]

    def create
        routeStop_params = params.require(:routeStop).permit(:station_id, :stop_id)

        routeStop = @route.routeStops.new(routeStop_params)

        unless routeStop.valid?
            render status: :unprocessable_entity, json: {
                error: routeStop.errors.details,
                message: routeStop.errors.full_messages}
            return
        end

        if routeStop.save
            render status: :created
        else
            render status: :bad_request
        end
    end

    def update
        routeStop_params = params.require(:routeStop).permit(:station_id, :stop_id)

        if @route.routeStops.new(routeStop_params)
            render status: :ok
        else
            render status: :bad_request
        end
    end

    def show
    end

    def index
        @routeStops = @route.routeStops.all
    end

    def destroy
        if @routeStop.delete
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
            @route = Route.find(params[:route_id])
        rescue
            render status: :not_found, json: {}
        end
    end

    def set_routeStop
        begin
            @routeStop = @route.routeStops.find(params[:id])
        rescue
            render status: :not_found, json: {}
        end
    end
end
