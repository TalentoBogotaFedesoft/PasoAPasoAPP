class Bus < ApplicationRecord
    belongs_to :route, optional: true

    validates :code,  uniqueness: true, presence: true
end
