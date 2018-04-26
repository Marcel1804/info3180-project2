/* Add your Application JavaScript */

Vue.component('app-header', {
    template: `
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
              <span><img src="/static/uploads/pic.png" alt="home page picture" style="width:20px;height:20px;"/>
              <a class="navbar-brand" href="#">Photogram</a></span>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse " id="navbarNav">
                <ul class="navbar-nav mr-auto">
                
                </ul>
                <ul class="navbar-nav">
                     <li class="nav-item active">
                        <router-link to="/" class="nav-link">Home</router-link>
                     </li>
                     <li class="nav-item active">
                         <router-link to="/explore" class="nav-link">Explore</router-link>
                     </li>
                     <li class="nav-item active">
                           <router-link to="/users/{users_id}" class="nav-link">My Profile</router-link>
                     </li>
                     <li v-if="msg=='yes'" class="nav-item active">
                           <router-link to="/logout" class="nav-link">Logout</router-link>
                     </li>
                     <li v-else class="nav-item active">
                        <router-link to="/login" class="nav-link">Login</router-link> 
                     </li>
                </ul>
              </div>
            </nav>
        </header>    
    `
});

Vue.component('app-footer', {
    template: `
        <footer>
            <div class="container">
                <p>Copyright &copy {{ year }} Flask Inc.</p>
            </div>
        </footer>
    `,
    data: function() {
        return {
            year: (new Date).getFullYear()
        }
    }
});

const Home = Vue.component('home', {
        template: `
         <div class="Frame">
          <div class="homePic">
          <img src="/static/uploads/background/pic.jpg" alt="home page picture" style="width:400px;height:400px;"/>
          </div>
           <div class="Welcome">
           <div class="padtext">
             <h1><img src="/static/uploads/pic.png" alt="home page picture" style="width:20px;height:20px;"/> Photogram</h1>
            </div>
            <div class="pad">
             <p> Share photos of your favourite moments with friends, family and the world.</p> 
            </div>
            <div>
             <router-link to="/register" class="btn btn-primary greenbut">Register</router-link>&nbsp
             <router-link to="/login" class="btn btn-primary butsize">login</router-link>
            </div>
           </div>
        </div>
         `
    });

const Register=Vue.component('register',{
     template:`
     <div>
     <h1 class="b">&nbsp Registration </h1>
     <form class="form" id="register" @submit.prevent="RegisterForm" method="POST" enctype="multipart/form-data">
                 <div>
                  <label for="username">Username</label><br>
                   <input type='text' name='username'/>
                 </div>
                 <div>
                  <label for="password">Password</label><br>
                  <input type='password' name='password'/>
                 </div>
                 <div>
                  <label for="ConfirmPassword">ConfirmPassword</label><br>
                  <input type='password' name='ConfirmPassword'/>
                 </div>
                 <div>
                  <label for="firsname">Firstname</label><br>
                   <input type='text' name='Firstname'/>
                 </div>
                 
                 <div>
                  <label for="lastname">Lastname</label><br>
                   <input type='text' name='Lastname'/>
                 </div>
                 <div>
                    <label for="Gender">Gender</label>
                    <select id="Gender" name="Gender">
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                 </div>
                 <div>
                  <label for="email">Email</label><br>
                   <input type='text' name='Email'/>
                 </div>
                 
                 <div>
                  <label for="Location">Location</label><br>
                  <input type='text' name='Location'/>
                 </div>
                 
                 <div>
                  <label for="Biography">Biography</label><br>
                  <textarea id="biography" name="Biography"></textarea>
                 </div>
                 
                  <div>
                  <label for="msg">Photo</label><br>
                  <input type="file" name="photo" />
                  </div>
                 <br>
                 <button type="submit" class="btn btn-primary greenbut butsize1">Register</button>
     
     </form>
     </div> `,
     methods:{
        RegisterForm: function(){
            let registerForm= document.getElementById('register');
            let form_data = new FormData(registerForm);
    
            fetch("/api/users/register",{
                method:'POST',
                body: form_data,
                headers:{
                    'X-CSRFToken':token
                },
                credentials: 'same-origin'
            })
              .then(function(response){
                  return response.json();
              })
              .then(function(jsonResponse){
                  //display a success message
                  console.log(jsonResponse);
              })
              .catch(function(error){
                  console.log(error);
              });
        }
    }
});

const Login=Vue.component('login',{
     template:`
     <div class="Frame">
     <h1 class="b">Login</h1>
     <form class="form" id="login" @submit.prevent="LoginForm" method="POST" >
         <div>
         <label for="username">Username</label><br>
         <input type='text' name='username'/>
         </div>
         <div>
         <label for="password">Password</label><br>
         <input type='password' name='password'/>
         </div>
         <br>
         <input type="checkbox" name="remember me" value="true" class="c"/>Remember me <br>
         <button type="submit" class="btn btn-primary greenbut butsize1">Login</button>
     </form>
     </div>
     `,
     methods:{
        LoginForm: function(){
            let loginForm= document.getElementById('login');
            let form_data = new FormData(loginForm);
    
            fetch("/api/auth/login",{
                method:'POST',
                body: form_data,
                headers:{
                    'X-CSRFToken':token
                },
                credentials: 'same-origin'
            })
              .then(function(response){
                  return response.json();
              })
              .then(function(jsonResponse){
                  //display a success message
                  console.log(jsonResponse);
              })
              .catch(function(error){
                  console.log(error);
              });
        }
    }
    
});
    
const Logout=Vue.component('logout',{
     template:` `
    });
    
const Explore=Vue.component('explore',{
     template:`
     <div>
        <ul>
            <li v-for="ms in msg">
            </li>
        </ul>
     <div>
     
     </div>
     <button type="submit" class="btn btn-primary butsize postbut">Post</button>
     </div>
     `,
    methods:{
        function(){
            let self =this;
            
            fetch("/api/posts",{
                method:'GET',
                headers:{
                    'X-CSRFToken':token
                },
                credentials: 'same-origin'
            })
              .then(function(response){
                  return response.json();
              })
              .then(function(jsonResponse){
                  //display a success message
                  console.log(jsonResponse);
                  self.msg=jsonResponse;
              })
              .catch(function(error){
                  console.log(error);
              });
        }
    },
    data: function(){
            return{
                msg:[]
            }
        }
    });
    
const Users=Vue.component('users',{
     template:`
     <div>
     
     </div>
     `,
     methods:{
        
         
         
     }
    });
    
const Post=Vue.component('post',{
     template:` 
      <div>
      <form class="form" id="post" @submit.prevent="PostForm method="POST" enctype="multipart/form-data" >
         <div>
              <div>
              <label for="msg">Photo</label><br>
              <input type="file" name="photo" />
              </div>
              
              <label for="Caption">Caption</label><br>
              <textarea id="Caption" name="Caption" placeholder="Write Caption"></textarea>
             </div>
             <br>
             <button type="submit" class="btn btn-primary greenbut butsize1">Submit</button>
      </form>
      </div>
     `,
     methods:{
        PostForm: function(){
            let postForm= document.getElementById('post');
            let form_data = new FormData(postForm);
    
            fetch("/api/users/{user_id}/posts",{
                method:'POST',
                body: form_data,
                headers:{
                    'X-CSRFToken':token
                },
                credentials: 'same-origin'
            })
              .then(function(response){
                  return response.json();
              })
              .then(function(jsonResponse){
                  //display a success message
                  console.log(jsonResponse);
              })
              .catch(function(error){
                  console.log(error);
              });
        }
    }
    });
   
const router = new VueRouter({
         routes: [
         { path: '/', component: Home },
         { path: '/register', component: Register},
         { path: '/explore', component: Explore},
         { path: '/login' , component: Login}, 
         { path: '/logout', component: Logout},
         { path: '/users/{user_id}', component: Users},
         { path: '/post/new', component: Post}
         ]
    });


//Root Instance
let app = new Vue({
    el: '#app',
    router
});


