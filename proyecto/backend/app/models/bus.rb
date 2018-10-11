class Bus < ApplicationRecord
    belongs_to :route, optional: true
end
