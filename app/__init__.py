from flask import Flask
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect

UPLOAD_FOLDER = './app/static/uploads'
TOKEN_SECRET = 'Thisissecret'

app = Flask(__name__)
csrf =CSRFProtect(app)
app.config['SECRET_KEY'] = "372ijma/.D/V,A,KK,ASK,1mejlADK\S][SP;SLKK2I231JHRMWGU2009SL<AFUJMASJS"  # you should make this more random and unique
#app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://group18:akeam1804@localhost/project2"
app.config['SQLALCHEMY_DATABASE_URI'] ="postgresql://feuowhhypgdbxv:199f7305d3d8c5a7548dc3052f86e459c3766813cac235db2c62f710543403cc@ec2-23-23-180-121.compute-1.amazonaws.com:5432/dfp9t8rfb53oso"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True  # added just to suppress a warning
app.config['UPLOAD_FOLDER']= "./app/static/uploads/" # using a config value

db = SQLAlchemy(app)

# Flask-Login login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  # necessary to tell Flask-Login what the default route is for the login page
login_manager.login_message_category = "info"  # customize the flash message category


app.config.from_object(__name__)
filefolder = app.config['UPLOAD_FOLDER']
token_key = app.config['TOKEN_SECRET']
from app import views
