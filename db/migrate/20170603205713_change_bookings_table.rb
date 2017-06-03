class ChangeBookingsTable < ActiveRecord::Migration
  def change
    add_column :bookings, :steamship_line, :string, default: "PIL"
    add_column :bookings, :origin, :string
    add_column :bookings, :destination, :string
    add_column :bookings, :vessel, :string
    add_column :bookings, :voyage, :string
    add_column :bookings, :vessel_eta, :date
    add_column :bookings, :containers, :text
  end
end
