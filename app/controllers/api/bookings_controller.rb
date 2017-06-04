class API::BookingsController < ActionController::Base

  before_action :_find_booking, only: [:show, :watch, :unwatch]

  def index
    render json: Booking.all
  end

  # Code Smell:
  # We're conciously deciding to perform a persist
  # under a GET action to simplify the code.
  # In production, persist in additional create action
  def show
    # Create a booking if we couldn't find one in our db
    unless @booking
      response = Terminals::Pilship.new(@ref_num).response_json
      form = BookingForm.new(response.merge(reference_id: @ref_num))
      form.save

      @booking = form.booking || response
    end

    render json: @booking
  end

  def watch
    if @booking.update_attributes(watch: true)
      render json: @booking
    else
      render json: {
        status: "error",
        message: "could not watch #{params[:id]}"
      }
    end
  end

  def unwatch
    if @booking.update_attributes(watch: false)
      render json: @booking
    else
      render json: {
        status: "error",
        message: "could not unwatch #{params[:id]}"
      }
    end
  end

  private
    def _find_booking
      if match = params[:id].match(/(PABV)?(TXG[0-9]{,9})/)
        @ref_num = match[2]
        @booking = Booking.find_by_reference_id(@ref_num)
      else
        render json: {
          status: "error",
          message: "#{params[:id]} is not a valid booking id"
        }
      end
    end

end