class User < ApplicationRecord
    has_many :alerts
    has_many :trips
    has_many :evaluations

    validates :email, uniqueness: true, presence: true
    validates :name, :password_digest, presence: true
    
    has_secure_password

    def to_token_payload
        { sub: id, class: self.class.to_s }
      end
    
      def self.from_token_payload(payload)
        find payload['sub'] if payload['class'] && payload['class'] == to_s
      end
end
