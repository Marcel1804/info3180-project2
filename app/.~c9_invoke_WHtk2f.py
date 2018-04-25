"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""
import os
import datetime 
#import jwt 
import base64
from app import app, db, login_manager
from flask import render_template, request, redirect, url_for, flash, jsonify, g
from flask import _request_ctx_stack 
from flask_login import login_user, logout_user, current_user, login_required
from forms import RegisterForm, LoginForm, PostForm 
from functools import wraps 
from models import UserProfile
from werkzeug.utils import secure_filename
from werkzeug.security import check_password_hash 


###
# Routing for your application.
###


# Create a JWT @requires_auth decorator
# This decorator can be used to denote that a specific route should check
# for a valid JWT token before displaying the contents of that route.
def requires_auth(f): 
    @wraps(f) 
    def decorated(*args, **kwargs):
        auth = request.headers.get('Authorization', None)
        if not auth:
            return jsonify({'code': 'authorization_header_missing', 'description': 'Authorization header is expected'}), 401

        parts = auth.split()

        if parts[0].lower() != 'bearer':
            return jsonify({'code': 'invalid_header', 'description': 'Authorization header must start with Bearer'}), 401
        elif len(parts) == 1:
            return jsonify({'code': 'invalid_header', 'description': 'Token not found'}), 401
        elif len(parts) > 2:
            return jsonify({'code': 'invalid_header', 'description': 'Authorization header must be Bearer + \s + token'}), 401

        token = parts[1]
        try:
             payload = jwt.decode(token, 'some-secret')

        except jwt.ExpiredSignature:
            return jsonify({'code': 'token_expired', 'description': 'token is expired'}), 401
        except jwt.DecodeError:
            return jsonify({'code': 'token_invalid_signature', 'description': 'Token signature is invalid'}), 401

        g.current_user = user = payload
        return f(*args, **kwargs)

    return decorated 
    
def generate_token(): 
    pass

@app.route('/')
def home():
    form=RegisterForm()
    """Render website's initial page and let VueJS take over."""
    return render_template('home.html', form=form)


@app.route('/about')
def about():
    """Render the website's about page."""
    return render_template('about.html', name="Group 18")
    
@app.route('/api/users/register', methods=['POST'])
def register():
    """accepts user information and save it to the database"""
    form=RegisterForm()
    now = datetime.datetime.now()
    
    if request.method == 'POST' and form.validate_on_submit():
        username= form.username.data
        password = form.password.data
        confirmpassword = form.confirmpassword.data
        fname = form.firstname.data
        lname = form.lastname.data
        gender = form.gender.data
        email = form.email.data
        location = form.location.data
        bio=form.bio.data
        photo=form.photo.data
        filename = secure_filename(photo.filename)
        photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        photo=photo.filename
        date=now.strftime("%B %d, %Y")
        
        user = UserProfile.query.filter_by(username=username).first()
        if user is None :
            user=UserProfile(username, password, fname, lname, gender, location, email, bio, photo, date)
            db.session.add(user)
            db.session.commit()
            flash('Registration was successfully', 'success')
            return jsonify({"message":" User successfully registered"})
        elif user is not None:
            flash("already a member", 'danger')
            return jsonify({"message":"already a member"})
    err=flash_errors(form)
    return jsonify({"errors":err})


@app.route('/api/auth/login',methods=['POST'])
def login():
    """accepts login credentials as username and password""" 
    form = LoginForm() 
    if request.method == "POST": 
        if form.validate_on_submit(): 
            """getting the info from the user form"""
            username= form.username.data 
            password = form.password.data 
            remember_me = form.remember_me.data   
            
            
            """querying the database for username""" 
            user= UserProfile.query.filter_by(username=username).first() 
            
            """load user into a session """
            login_user(user) 
            
            logsuccess={"message": "User successfully logged in"}
            return jsonify (logsuccess)
        return redirect(url_for("index"))    
    

@app.route('/api/auth/logout',methods=['GET']) 
@login_required
def logout():
    """logout users""" 
    logout_user()  
    logout={"message": " User successfully logged out"}
    return jsonify(logout)

@app.route('/api/users/{user_id}/posts',methods=["POST","GET"]) 
@requires_auth
def posts():
    """used for adding posts to the users feed"""
    form=PostForm()
    if request.method == 'POST' and form.validate_on_submit():
        pass
    """return a user's posts"""
    if request.method == 'GET' and form.validate_on_submit():
        pass
    

@app.route('/api/users/{user_id}/follow',methods=['POST'])
@requires_auth
def follow():
    """create a follow relationship between the current user and the target user."""
    pass

@app.route('/api/posts',methods=['GET']) 
@requires_auth
def get_AllPost():
    """return all post for all users."""
    pass 

@app.route('/api/posts/{post_id}/like',methods=['POST'])
@requires_auth
def like():
    """ set a like on the current post by the logged in user"""
    """
    return jsonify({"message":"File Upload Successful","file":photo,"description":description})
    else:
        return jsonify({"errors":form_errors(form)})
    """
    pass

@app.route('/secure-page')
@requires_auth
def secure_page():
    """Render a secure page on our website that only logged in users can access."""
    return render_template('secure_page.html')



# Flash errors from the form if validation fails
def flash_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                    getattr(form, field).label.text,
                    error
                )
            error_messages.append(message)

    return error_messages
  

###
# The functions below should be applicable to all Flask apps.
###

@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")
