class CreateBookings < ActiveRecord::Migration
  def change
    create_table :bookings do |t|
      t.string :reference_id, null: false

      t.timestamp
    end
  end
end
