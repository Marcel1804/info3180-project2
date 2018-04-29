/* Add your Application JavaScript */

Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#">Photogram</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link class="nav-link" v-bind:to="'/users/'+ userid">My Profile <span class="sr-only">(current)</span></router-link>
          </li>
          <li class="nav-item active">
            <router-link class="nav-link" to="/explore">Explore <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
        
        <ul class="navbar-nav" v-if="user">
            <li class="nav-item active">
              <router-link class="nav-link" to="/logout">Logout <span class="sr-only">(current)</span></router-link>
            </li>  
        </ul>
        <ul class="navbar-nav" v-else>
            <li class="nav-item active">
            <router-link class="nav-link" to="/">Home <span class="sr-only">(current)</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    `,
    watch: {
        '$route' (to, fom){
            this.reload()
        }
      },
    created: function() {
        let self = this;
        self.user=localStorage.getItem('token');
        self.userid=localStorage.getItem('userid')
    },
    data: function() {
        return {
            user: [],
        }
    },
    methods:{
        reload(){
            let self = this;
            self.user=localStorage.getItem('token');
            self.userid=localStorage.getItem('userid')
        }
    }
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
     >
            <form id="register"  @submit.prevent="RegisterForm" method="POST" enctype="multipart/form-data">
            <div class="form-space">
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold" for="msg"> First Name </label>
                        </div>
                        <div class="form-group">
                            <input type="text" id="form_firstName" class="form-control" name="firstName"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold" for="msg"> Last Name </label>
                        </div>
                        <div class="form-group">
                            <input type="text" id="form_lastName" class="form-control" name="lastName"/>
                        </div>
                    </div>
                </div>
                  <div class="row">
                      <div class="col-md-11">
                          <div class="form-group">
                              <label class="label_bold" for="msg"> Username </label>
                              <input type="text" id="form_userName" class="form-control" name="userName"/>
                          </div>
                      </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold" for="msg"> Password </label>
                            <input type="password" id="form_password" class="form-control" name="password"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold" for="msg"> Email </label>
                            <input type="text" id="form_email" class="form-control" placeholder="eg. exampl@example.com" name="email"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold" for="msg"> Location </label>
                            <input type="text" id="form_location" class="form-control" placeholder="eg. Kingston, Jamaica" name="location"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-11">
                        <div class="form-group">
                            <label class="label_bold" for="msg"> Biography </label>
                            <textarea id="msg" name="biography" class="form-control"/></textarea>
                        </div>
                    </div>
                </div>
                <p class="label_bold">Profile Picture</p>
                    <div class="row photo">
                        <div class="upload-btn-wrapper">
                            <button id="btn">Browse</button>
                            <input type="file" name="proPhoto"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <button class="btn btn-login" type="submit">Register</button>
                    </div>
                </div>
            </form>
     </div> `,
    data: function() {
       return {
           response: [],
           error: []
       };
    },
     methods:{
        RegisterForm: function(){
            let self = this;
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
                if(jsonResponse.result){
                    alert("User Added")
                    self.$router.push('/');
                }else if(jsonResponse.errors){
                    self.error = jsonResponse.errors;
                }
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
         <input type='text' name='userName'/>
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
            let self = this;
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
                  if(jsonResponse.errors){
                    self.error = jsonResponse.errors;
                }
                else if(jsonResponse.errorm)
                {
                    let emessage = jsonResponse.errorm;
                    self.merror = emessage;
                    self.messageFlag = true;
                }
                else
                {
                    let jwt_token = jsonResponse.data.token;
                    let userid = jsonResponse.data.userid;
                    localStorage.setItem('token', jwt_token);
                    localStorage.setItem('userid', userid);
                    self.$router.push('/explore');
                }
              })
              .catch(function(error){
                  console.log(error);
              });
        }
    }
    
});
    
const Logout= Vue.component('logout-form', {
    template: `<div></div>`,
    created: function() {
        let self = this;
        fetch("/api/auth/logout", { 
            method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(function (response) {
            return response.json();
            })
            .then(function (jsonResponse) {
            // display a success message
            console.log(jsonResponse);
            let message = jsonResponse.message;
            if(jsonResponse.message){
                localStorage.removeItem('token');
                localStorage.removeItem('userid');
                self.$router.push('/');
                
            }
            })
            .catch(function (error) {
            console.log(error);
        });
    },
    methods: {
    }
});
    
const Explore=Vue.component('explore',{
     template: `
    <div>
        <div v-if="messageFlag" class="sidenav">
            <router-link class="btn btn-primary" to="/post/new">New Post</router-link>
        </div>
        <div v-else>
            <router-link class="btn btn-primary post_div" to="/post/new">New Post</router-link>
            <P class="alert alert-danger"><center> PLEASE LOGIN TO SEE EXPLORE VIEW!!!!!.</br> P.S: FROM YOUR CREATOR K.NELSON and O.CHRISTIE</center></P>
        </div>
        <div class=" container-fluid fix-explore" v-if="output">
            <li v-for="resp in output"class="list">
                <div id="wrapper">
					<section class="main items">
    					<div class="post-box">
                            <p><img v-bind:src= "'/static/uploads/'+resp.pro_photo"style="width: 2rem; height: 2rem; padding: 3px; border-radius:100px;"/><router-link v-bind:to="'/users/' +resp.userid">{{resp.username}}</router-link></p>
    						<article class="item">
    							<header>
    								<img v-bind:src= "'/static/uploads/'+resp.photo" style="width: 50rem; height: 40rem;"/>
    							</header>
    							<p class="caption"><strong style="color:black;">{{resp.username}}</strong> {{resp.caption}}</p>
    						</article>
    						<section class="like like_8oo9w">
    						<div v-if="resp.likeflag">
                                <a class="like_eszkz like_l9yih nohover" @click="likepost(resp.postid)"><span class="span_8scx2 coreSpriteHeartOpen2">{{resp.likes.length}}Likes</span></a>
                                <a class="like_eszkz like_et4ho nohover" href="#"><span class="span_8scx2">{{resp.created_on}}</span></a>
                            </div>
                            <div v-else>
                                <a class="like_eszkz like_l9yih nohover" @click="likepost(resp.postid)"><span class="span_8scx2 coreSpriteHeartOpen">{{resp.likes.length}}Likes</span></a>
                                <a class="like_eszkz like_et4ho nohover" href="#"><span class="span_8scx2">{{resp.created_on}}</span></a>
                            </div>
                            </section>
    					</div>
					</section>
			     </div>
            </li>
        </div>
        <div v-else>
            <li v-for="resp in output"class="list">
                <h5>No Posts</h5>
            </li>
        </div>
    </div>
    `,
     watch: {
         
        'trigger' (newvalue, oldvalue){
            this.reload();
        }
      },
    created: function() {
        let self = this;
        fetch("/api/posts/", { 
            method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
        })
            .then(function (response) {
            return response.json();
            })
            .then(function (jsonResponse) {
            // display a success message
            console.log(jsonResponse);
            if(jsonResponse.data){
                self.output = jsonResponse.data;
                self.messageFlag = true;
                self.trigger = false;
            }
            })
            .catch(function (error) {
            console.log(error);
        });
    },
    data: function() {
       return {
           output: [],
           error: [],
           messageFlag: false,
           trigger: null,
       };
    },
    methods: {
        reload(){
            let self = this;
        fetch("/api/posts/", { 
            method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
        })
            .then(function (response) {
            return response.json();
            })
            .then(function (jsonResponse) {
            // display a success message
            console.log(jsonResponse);
            if(jsonResponse.data){
                self.output = jsonResponse.data;
                self.messageFlag = true;
                self.trigger = false;
            }
            })
            .catch(function (error) {
            console.log(error);
        });
        },
        likepost(post_id) {
            let self = this;
            fetch("/api/users/"+post_id+"/like", { 
            method: 'POST',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
        })
            .then(function (response) {
            return response.json();
            })
            .then(function (jsonResponse) {
            // display a success message
            console.log(jsonResponse);
            if(jsonResponse.message){
                let message = jsonResponse.message;
                self.trigger = true;
            }else if(jsonResponse.DB){
                let DB = jsonResponse.DB;
                alert(DB);
            }else{
                alert("Failed to like post");
            }
            })
            .catch(function (error) {
            console.log(error);
            });
        }
    }
});
    
const Users=Vue.component('users',{
     template:`
    <div>
        <div v-if="info" class="container-fluid">
            <li v-for="user in info" class="list">
                <div class="row border-style center profile profiles-container">
                    <a href="#"><img v-bind:src= "'/static/uploads/'+user.photo" class="post_pic"></a>
                        <div class="col">
                            <h2><strong>{{user.firstname}} {{user.lastname}}</strong></h2>
                            <h5 id="pro_info"><span>{{ user.location}}</span></h5>
                            <h5 id="pro_date"><span> Member since: {{ user.joined_on}}</span></h5>
                            <h5 id="pro_info"><span>{{ user.biography}}</span></h5>
                        </div>
                    <div class="view-profile center col-3 bio">
                        </br>
                        <section class="like like_8oo9w">
                            <p class="follow_count"><span class="post_len">{{output.length}}</span><span class="follow_len">{{numberoffollower.length}}</span></p>
                        </section>
                        <section class="like like_8oo9w">
                            <p class="follow_count"><span class="follow_title">Posts</span><span class="follow_title">Followers</span></p>
                        </section>
                        <div v-if="isuser">
                        </div>
                        <div v-else class="pro-btn">
                            <div v-if="following">
                                <a class="view-btn btn-login pro-style" >Following</a>
                            </div>
                            <div v-else>
                                <a class="view-btn btn-primary pro-style" @click="follow">Follow</a>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </div>
        <div v-else>
            <li v-for="resp in info"class="list">
                <h5>No Posts</h5>
            </li>
        </div>
        <div style="flex-direction: column; padding-bottom: 200px; padding-top: 0px;">
            <div class="imageView">
                <li v-for="pic in output" class="list li_grid">
                    <img  v-bind:src= "'/static/uploads/'+pic.photo" class="profile_post">
                </li>
            </div>
        </div>
    </div>
    `,
    watch: {
        '$route' (to, fom){
            this.reload()
        },
        'following' (newvalue, oldvalue){
            this.reload()
        }
      },
    created: function() {
        let self = this;
        let userid = this.$route.params.userid;
        fetch("/api/users/"+userid+"/posts", { 
            method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
        })
            .then(function (response) {
            return response.json();
            })
            .then(function (jsonResponse) {
            // display a success message
            console.log(jsonResponse);
            if(jsonResponse.data){
                self.output = jsonResponse.data;
            }
            })
            .catch(function (error) {
            console.log(error);
        });
        fetch("/api/users/"+userid+"/", { 
            method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
        })
            .then(function (response) {
            return response.json();
            })
            .then(function (jsonResponse) {
            // display a success message
            console.log(jsonResponse);
            if(jsonResponse.profile){
                self.info = jsonResponse.profile;
            }
            if(jsonResponse.isuser){
                self.isuser = jsonResponse.isuser;
            }else{
                self.isuser = false;
            }
            })
            .catch(function (error) {
            console.log(error);
        });
        fetch("/api/users/"+userid+"/followersnumber", { 
            method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
        })
            .then(function (response) {
            return response.json();
            })
            .then(function (jsonResponse) {
            // display a success message
            console.log(jsonResponse);
            if(jsonResponse.follower){
                self.numberoffollower = jsonResponse.follower;
            }
            })
            .catch(function (error) {
            console.log(error);
        });
        fetch("/api/users/"+userid+"/following", { 
            method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
        })
            .then(function (response) {
            return response.json();
            })
            .then(function (jsonResponse) {
            // display a success message
            console.log(jsonResponse);
            let follow = jsonResponse.following
            if(follow==false){
                console.log(follow);
                self.following = false;
            }else{
                self.following = true;
            }
            })
            .catch(function (error) {
            console.log(error);
            });
    },
    data: function() {
       return {
           output:[],
           info:[],
           error: [],
           numberoffollower:[],
           following: null,
       };
    },
     methods:{
        reload(){
            let self = this;
            let userid = this.$route.params.userid;
            fetch("/api/users/"+userid+"/posts", { 
                method: 'GET',
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
            })
                .then(function (response) {
                return response.json();
                })
                .then(function (jsonResponse) {
                // display a success message
                console.log(jsonResponse);
                if(jsonResponse.data){
                    self.output = jsonResponse.data;
                }
                })
                .catch(function (error) {
                console.log(error);
            });
            fetch("/api/users/"+userid+"/", { 
                method: 'GET',
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
            })
                .then(function (response) {
                return response.json();
                })
                .then(function (jsonResponse) {
                // display a success message
                console.log(jsonResponse);
                if(jsonResponse.profile){
                    self.info = jsonResponse.profile;
                }
                if(jsonResponse.isuser){
                    self.isuser = jsonResponse.isuser;
                }else{
                    self.isuser = false;
                }
                })
                .catch(function (error) {
                console.log(error);
            });
            fetch("/api/users/"+userid+"/followersnumber", { 
            method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
        })
            .then(function (response) {
            return response.json();
            })
            .then(function (jsonResponse) {
            // display a success message
            console.log(jsonResponse);
            if(jsonResponse.follower){
                self.numberoffollower = jsonResponse.follower;
            }
            })
            .catch(function (error) {
            console.log(error);
        });
        fetch("/api/users/"+userid+"/following", { 
            method: 'GET',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
        })
            .then(function (response) {
            return response.json();
            })
            .then(function (jsonResponse) {
            // display a success message
            console.log(jsonResponse);
            let follow = jsonResponse.following
            if(follow==false){
                console.log(follow);
                self.following = false;
            }else{
                self.following = true;
            }
            })
            .catch(function (error) {
            console.log(error);
            });
        },
        follow(){
            let self = this;
            let userid = this.$route.params.userid;
            fetch("/api/users/"+userid+"/follow", { 
            method: 'POST',
            'headers': {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'X-CSRFToken': token
            },
            credentials: 'same-origin'
            })
            .then(function (response) {
            return response.json();
            })
            .then(function (jsonResponse) {
            // display a success message
            console.log(jsonResponse);
            if(jsonResponse.message){
                let message = jsonResponse.message;
                alert(message);
                self.following = true;
            }else{
                alert("Failed to follow user");
            }
            })
            .catch(function (error) {
            console.log(error);
            });
        }
    }
});
    
const Post=Vue.component('post',{
     template:`
    <div class="fix-register ">
    <div class="layout border-style">
        <ul id = "message">
            <li v-for="resp in response" class="list alert alert-success">
                      {{ resp.message }}
            </li>
            <li v-for="resp in error"class="list alert alert-danger">
                {{resp.errors[0]}} <br>
                {{resp.errors[1]}} <br>
            </li>
        </ul>
          <form id="postforms" @submit.prevent="make_post" method="POST" >
              <p class="label_bold">Photo</p>
                    <div class="row photo">
                        <div class="upload-btn-wrapper">
                            <button id="btn">Browse</button>
                            <input type="file" name="photo"/>
                        </div>
                    </div>
              <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                              <label class="label_bold" for="msg">Caption </label>
                              <textarea type='text' id='usrname' name='caption' placeholder="Write a caption..."class="form-control"/></textarea>
                        </div>
                    </div>
              </div>
              <div class="row">
                  <div class="col-md-11">
                      <button id="submit" class="btn btn-login">Submit</button>
                  </div>
              </div>
          </form>
      </div>
      </div>`,
    data: function() {
       return {
           response: [],
           error: []
       };
    },
    methods: {
        make_post: function () {
            let self = this;
            let loginforms = document.getElementById('postforms');
            let form_data = new FormData(postforms);
            let userid = localStorage.getItem('userid');
            fetch("/api/users/"+userid+"/posts", { 
                method: 'POST', 
                body: form_data,
                'headers': {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
            })
                .then(function (response) {
                return response.json();
                })
                .then(function (jsonResponse) {
                // display a success message
                console.log(jsonResponse);
                if(jsonResponse.message){
                    let message = jsonResponse.message;
                    self.$router.push('/explore');
                } else{
                    self.error = jsonResponse.errors;
                }
                })
                .catch(function (error) {
                console.log(error);
            });
        }
    }
});


Vue.use(VueRouter);

const router = new VueRouter({
         routes: [
         { path: '/', component: Home },
         { path: '/register', component: Register},
         { path: '/explore', component: Explore},
         { path: '/login' , component: Login}, 
         { path: '/logout', component: Logout},
         { path: '/users/:userid', component: Users},
         { path: '/post/new', component: Post}
         ]
    });


//Root Instance
let app = new Vue({
    el: '#app',
    router
});


