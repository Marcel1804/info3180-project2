/* Add your Application JavaScript */
Vue.component('app-header', {
    template: `
        <header>
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
              <a class="navbar-brand" href="#">VueJS App</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                     <li class="nav-item active">
                     <router-link to="/" class="nav-link">Home</router-link>
                     </li>
                     <li class="nav-item active">
                     <router-link to="/register" class="nav-link">Registration</router-link>
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
         template: ` `
    });

const Registration=Vue.component('registration',{
     template:` `
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
         { path: '/register', component: Registration },
         { path: '/login' , component: Login}, 
         { path: '/logout', component: Logout},
         { path: '/explore', component: Explore},
         { path: '/users/{user_id}', component: Users},
         { path: '/post/new', component: Post}
         ]
    });


//Root Instance
let app = new Vue({
    el: '#app',
    router
});


