class API::BookingsController < ActionController::Base

  def index
    render json: Booking.all
  end

  # Code Smell:
  # We're conciously deciding to perform a persist
  # under a GET action to simplify the code.
  # In production, persist in additional create action
  def show
    ref_num = params[:id].match(/(PABV)?(TXG[0-9]{,9})/)[2]
    @booking = Booking.find_by_reference_id(ref_num)

    # Create a booking if we couldn't find one in our db
    unless @booking
      response = Terminals::Pilship.new(ref_num).response_json
      form = BookingForm.new(response.merge(reference_id: ref_num))
      form.save

      @booking = form.booking || response
    end

    render json: @booking
  end

  def watch
    render json: true
  end

end