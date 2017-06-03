class Booking < ActiveRecord::Base
  # Code smell:
  # This because harder to refactor as containers may
  # become heavier in logic.
  # In production, this should be another model
  serialize :containers, Array
end