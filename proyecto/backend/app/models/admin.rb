class Admin < ApplicationRecord
    validates :email, uniqueness: true
    validates :personal_id, uniqueness: true
end
