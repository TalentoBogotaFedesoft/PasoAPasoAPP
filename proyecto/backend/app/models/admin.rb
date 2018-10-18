class Admin < ApplicationRecord
    validates :email, uniqueness: true, presence: true
    validates :personal_id, uniqueness: true, presence: true
    validates :name, :password_digest, :entity, presence: true

    enum role: {sys_admin: 2, op_agent: 1, assist: 0}
    validates :role, presence: true
    has_secure_password
end
