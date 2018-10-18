class Api::V1::BusController < ApiController
    before_action :authenticate_admin, only: [:create, :destroy, :update, :index]
    before_action :check_role, only: [:create, :destroy, :update]
    before_action :set_bus, only:[:destroy, :update, :show]

    def create
        bus_params = params.require(:bus).permit(
            :code, :latitude, :longitude, :route_id)
        route_id = bus_params[:route_id]

        unless route_id.nil? or Route.find_by id: route_id
            render status: :unprocessable_entity, json: {
                error: "undefined route"}
            return
        end

        bus = Bus.new(bus_params)

        unless bus.valid?
            render status: :unprocessable_entity, json: {
                error: bus.errors.details,
                message: bus.errors.full_messages}
            return
        end

        if bus.save
            render status: :created
        else
            render status: :bad_request
        end
    end

    def update
        bus_params = params.require(:bus).permit(
            :latitude, :longitude, :route_id)
        route_id = bus_params[:route_id]

        unless route_id.nil? or Route.find_by id: route_id
            render status: :unprocessable_entity, json: {
                error: "undefined route"}
            return
        end

        if @bus.update(bus_params)
            render status: :ok
        else
            render status: :bad_request
        end
    end

    def show
    end

    def index
        @buses = Bus.all
    end

    def destroy
        if @bus.delete
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

    def set_bus
        begin
            @bus = Bus.find(params[:id])
        rescue
            render status: :not_found, json: {}
        end
    end
end
