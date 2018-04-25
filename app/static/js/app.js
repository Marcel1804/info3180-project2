/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
              <img src="/static/uploads/pic.png" alt="home page picture" style="width:20px;height:20px;"/>
              <a class="navbar-brand" href="#">Photogram</a>
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
                </ul>
              </div>
            </nav>
        </header>    
    `,
    data: function() {}
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
         <div>
             <img src="/static/uploads/background/pic.jpg" alt="home page picture" style="width:200px;height:200px;"/>
             <h1>Photogram</h1>         
             <p> Share photos of your favourite moments with friends, family and the world.</p> 
             <a href="/register" class="btn btn-primary but">Register</a>
             <a href="/" class="btn btn-primary but">login</a>
         </div>
         `
    });

const Registration=Vue.component('registration',{
     template:`<div>
     <form @submit.prevent="Register" id="RegisterForm"  method="post" enctype="multipart/form-data">
     Username<br>
     <input type='text' name='username'><br>
     Password<br>
     <input type='password' name='password'><br>
     Confirm Password<br>
     <input type='password' name='Confirmpassword'><br>
     Firstname<br>
     <input type='text' name='Firstname'><br>
     Lastname<br>
     <input type='text' name='Lastname'><br>
     Gender<br>
     <select name="Gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
     </select>
     Email<br>
     <input type='text' name='Email'><br>
     Location<br>
     <input type='text' name='Location'><br>
      Biography<br>
      <textarea name="Biography" style="width:400px; height:100px;"> </textarea>
      Photo<br>
     <input type='file' name='photo'><br>
     <button type="submit" name="Register">Register</button>
     </form>
     </div> `,
     methods:{
        Register: function(){}
         }
    });

const Login=Vue.component('login',{
     template:` `
    });
    
const Logout=Vue.component('logout',{
     template:` `
    });
    
const Explore=Vue.component('explore',{
     template:` `
    });
    
const Users=Vue.component('users',{
     template:` `
    });
    
const Post=Vue.component('post',{
     template:` `
    });
   
const router = new VueRouter({
         routes: [
         { path: '/', component: Home },
         { path: '/register', component: Registration},
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


