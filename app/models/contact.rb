class Contact < ActiveRecord::Base
  # Form validations for Contact Form
  validates :name, presence: true
  validates :email, presence: true
  validates :comments, presence: true
end