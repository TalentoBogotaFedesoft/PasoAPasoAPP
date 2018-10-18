class Api::V1::StationController < ApiController
    before_action :authenticate_admin, only: [:create, :destroy, :update, :index]
    before_action :check_role, only: [:create, :destroy, :update]
    before_action :set_station, only:[:destroy, :update, :show]

    def create
        station_params = params.require(:station).permit(
            :code, :latitude, :longitude, :address)
        station = Station.new(station_params)

        unless station.valid?
            render status: :unprocessable_entity, json: {
                error: station.errors.details,
                message: station.errors.full_messages}
            return
        end

        if station.save
            render status: :created
        else
            render status: :bad_request
        end
    end

    def update
        station_params = params.require(:station).permit(
            :latitude, :longitude, :address)
        if @station.update(station_params)
            render status: :ok
        else
            render status: :bad_request
        end
    end

    def show
    end

    def index
        @stations = Station.all
    end

    def destroy
        if @station.delete
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

    def set_station
        begin
            @station = Station.find(params[:id])
        rescue
            render status: :not_found, json: {}
        end
    end
end
