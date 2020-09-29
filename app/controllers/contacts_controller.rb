class ContactsController < ApplicationController
  # GET request to /contact-us  
  # Create a new contact object for the page
  def new
    @contact = Contact.new
  end
  
  # POST request to /contacts
  def create
    # Mass assignment of form fields to contact object
    @contact = Contact.new(contact_params)
    
    # Save contact object to database
    if @contact.save
      # Store form fields via parameters to variables if valid save
      name = params[:contact][:name]
      email = params[:contact][:email]
      body = params[:contact][:comments]
      # Plug variabls into Contact Mailer 
      # Send email to me (emilbingemansson@gmail.com)
      ContactMailer.contact_email(name, email, body).deliver
      
      # Flash a message saying message sent and redirect back to blank form
      # (new action)
      flash[:success] = "Message sent."
      redirect_to new_contact_path
    else 
      # The contact object did not successfully save to database
      # Store errors and flash the message and redirect back to new action
      flash[:danger] = @contact.errors.full_messages.join(", ")
      redirect_to new_contact_path
    end
  end
  
  private
    # Collect data from form, need to use strong parameters
    # and whitelist the form fields.
    def contact_params
      params.require(:contact).permit(:name, :email, :comments)
    end
end