class PagesController < ApplicationController
  #GET Request for /
  def home
  end
  
   #GET Request for /about
  def about
  end
  
   #GET Request for /faqs
  def faqs
  end
  
   #GET Request for /memberships
  def memberships
    @basic_plan = Plan.find(1)
    @pro_plan = Plan.find(2)
  end
end