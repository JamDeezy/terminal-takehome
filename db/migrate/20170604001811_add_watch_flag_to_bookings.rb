class AddWatchFlagToBookings < ActiveRecord::Migration
  def change
    add_column :bookings, :watch, :boolean, default: false
  end
end
