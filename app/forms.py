from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, TextAreaField, PasswordField, BooleanField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileRequired, FileAllowed
    
class RegisterForm(FlaskForm):
    username=StringField('username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirmpassword = PasswordField('ConfirmPassword', validators=[DataRequired()])
    firstname=StringField('Firstname', validators=[DataRequired()])
    lastname=StringField('Lastname', validators=[DataRequired()])
    gender=SelectField('Gender', choices=[('Male','Male'), ('Female', 'Female')])
    email=StringField('Email', validators=[DataRequired()])
    location=StringField('Location', validators=[DataRequired()])
    bio=TextAreaField('Biography', validators=[DataRequired()])
    photo = FileField('Photo',validators=[FileRequired(),FileAllowed(['png', 'jpg', 'jpeg', 'gif','Images only!'])])

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember_me = BooleanField('Remember me')

class PostForm(FlaskForm):
    photo = FileField('Photo',validators=[FileRequired(),FileAllowed(['png', 'jpg', 'jpeg', 'gif','Images only!'])])
    caption=TextAreaField('Caption', validators=[DataRequired()])
    