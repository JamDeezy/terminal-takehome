class API::BookingsController < ActionController::Base

  def show
    render json: Terminals::Pilship.new(params[:id]).response_json
  end

  def watch
    render json: true
  end

end