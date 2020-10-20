class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
         
  belongs_to :plan
  
  attr_accessor :stripe_card_token
  # If Pro user passes the validation. Send card information to Stripe
  # to create a pro plan subscription and use the 
  # use the incoming card token from Stripe to save to the database. 
  # So we do not save any card information. Stripe handles all of that. 
  def save_with_subscription
    if valid?
      customer = Stripe::Customer.create(description: email, card: stripe_card_token)
      self.stripe_customer_token = customer.id
      save! 
    end
  end
end
