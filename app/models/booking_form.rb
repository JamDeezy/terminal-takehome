class BookingForm
  include Virtus.model

  extend ActiveModel::Naming
  include ActiveModel::Conversion
  include ActiveModel::Validations

  attribute :reference_id, String
  attribute :steamship_line, String
  attribute :origin, String
  attribute :destination, String
  attribute :vessel, String
  attribute :voyage, String
  attribute :vessel_eta, Date
  attribute :containers, Array

  validates_presence_of :reference_id, :steamship_line
  validates_presence_of :origin, :destination
  validates_presence_of :vessel, :voyage, :vessel_eta, :containers

  attr_reader :booking

  def persisted?
    false
  end

  def save
    if valid?
      _persist!
      true
    else
      false
    end
  end

  private
    def _persist!
      @booking = Booking.create!(
        reference_id: reference_id,
        steamship_line: steamship_line,
        origin: origin,
        destination: destination,
        vessel: vessel,
        voyage: voyage,
        vessel_eta: vessel_eta,
        containers: containers
      )
    end

end