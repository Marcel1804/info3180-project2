/* Add your Application JavaScript */


Vue.component('app-header', {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <a class="navbar-brand" href="#"><img src="/static/uploads/pic.jpg" alt="home page picture" style="width:20px;height:20px;"/> Photogram</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
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
                     <router-link to="/users/{user_id}" class="nav-link">My Profile</router-link>
             </li>
             <li v-if="con=='yes'" class="nav-item active">
              <router-link class="nav-link" to="/logout">Logout</router-link>
             </li v-esle> 
             <li class="nav-item active">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li> 
        </ul>
      </div>
    </nav>
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
             <h1><img src="/static/uploads/pic.jpg" alt="home page picture" style="width:20px;height:20px;"/> Photogram</h1>
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
            <form class="form" id="register"  @submit.prevent="RegisterForm" method="POST" enctype="multipart/form-data">
            <div class="form-space">
                <div class="row">
                      <div class="col-md-11">
                          <div class="form-group">
                              <label class="label_bold"> Username </label>
                              <input type="text" class="form-control" name="username"/>
                          </div>
                      </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold"> Password </label>
                            <input type="password" class="form-control" name="password"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold"> ConfirmPassword </label>
                            <input type="password" class="form-control" name="confirmpassword"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold"> Firstname </label>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" name="firstname"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold"> Lastname </label>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" name="lastname"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold">Gender</label>
                        </div>
                        <div class="form-group">
                            <select name="gender">
                            <option value="">Select Gender Please</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold"> Email </label>
                            <input type="text" class="form-control" placeholder="eg. exampl@example.com" name="email"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-11">
                        <div class="form-group">
                            <label class="label_bold"> Location </label>
                            <input type="text" class="form-control" placeholder="eg. Kingston, Jamaica" name="location"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-11">
                        <div class="form-group">
                            <label class="label_bold"> Biography </label>
                            <textarea name="bio" class="form-control"/></textarea>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-11">
                    <div class="form-group">
                      <lable class="label_bold">Photo</lable>
                      <input type="file" name="photo"/>
                    </div>
                    </div>
                </div>  
                <div class="row">
                    <div class="col-md-11">
                        <button class="btn btn-primary greenbut butsize1" type="submit">Register</button>
                    </div>
                </div>
            </div>
            </form>
     </div> `,
     methods:{
        RegisterForm: function(){
            let self = this;
            let registerForm= document.getElementById('register');
            let form_data = new FormData(registerForm);
    
            fetch("/api/users/register",{
                method:'POST',
                body: form_data,
                headers:{
                    'X-CSRFToken': token
                },
                credentials: 'same-origin'
              })
              .then(function(response){
                  return response.json();
              })
              .then(function(jsonResponse){
                  //display a success message
                  //console.log(jsonResponse);
              })
              .catch(function(error){
                  console.log(error);
              });
        }
    },
    data: function() {
       return {
           response: [],
           error: []
       };
    }
});

const Login=Vue.component('login',{
     template:`
     <div class="Frame">
     <h1 class="b">Login</h1>
     <form class="form" id="login" @submit.prevent="LoginForm" method="POST" >
         <div>
         <label for="username" name="Username">Username</label><br>
         <input type='text' name='userame'/>
         </div>
         <div>
         <label for="password" name="Password">Password</label><br>
         <input type='password' name='password'/>
         </div>
         <br>
         <input type="checkbox" name="remember_me" value="true" class="c"/>Remember me <br>
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
                  con='yes';
                  console.log(jsonResponse);
                //   if(jsonResponse.errors){
                //     self.error = jsonResponse.errors;
                // }
                // else if(jsonResponse.errorm)
                // {
                //     let emessage = jsonResponse.errorm;
                //     self.merror = emessage;
                //     self.messageFlag = true;
                // }
                // else
                // {
                //     let jwt_token = jsonResponse.data.token;
                //     let userid = jsonResponse.data.userid;
                //     localStorage.setItem('token', jwt_token);
                //     localStorage.setItem('userid', userid);
                //     self.$router.push('/explore');
                // }
              })
              .catch(function(error){
                  console.log(error);
              });
        }
    }
    
});
    
const Logout= Vue.component('logout-form', {
//     template: `<div></div>`,
//     created: function() {
//         let self = this;
//         fetch("/api/auth/logout", { 
//             method: 'GET',
//             'headers': {
//                 'Authorization': 'Bearer ' + localStorage.getItem('token')
//             }
//         })
//             .then(function (response) {
//             return response.json();
//             })
//             .then(function (jsonResponse) {
//             // display a success message
//             console.log(jsonResponse);
//             let message = jsonResponse.message;
//             if(jsonResponse.message){
//                 localStorage.removeItem('token');
//                 localStorage.removeItem('userid');
//                 self.$router.push('/');
                
//             }
//             })
//             .catch(function (error) {
//             console.log(error);
//         });
//     },
//     methods: {
//     }
});
    
const Explore=Vue.component('explore',{
//      template: `
//     <div>
//         <div v-if="messageFlag" class="sidenav">
//             <router-link class="btn btn-primary" to="/post/new">New Post</router-link>
//         </div>
//         <div v-else>
//             <router-link class="btn btn-primary post_div" to="/post/new">New Post</router-link>
//             <P class="alert alert-danger"><center> PLEASE LOGIN TO SEE EXPLORE VIEW!!!!!.</br> P.S: FROM YOUR CREATOR K.NELSON and O.CHRISTIE</center></P>
//         </div>
//         <div class=" container-fluid fix-explore" v-if="output">
//             <li v-for="resp in output"class="list">
//                 <div id="wrapper">
// 					<section class="main items">
//     					<div class="post-box">
//                             <p><img v-bind:src= "'/static/uploads/'+resp.pro_photo"style="width: 2rem; height: 2rem; padding: 3px; border-radius:100px;"/><router-link v-bind:to="'/users/' +resp.userid">{{resp.username}}</router-link></p>
//     						<article class="item">
//     							<header>
//     								<img v-bind:src= "'/static/uploads/'+resp.photo" style="width: 50rem; height: 40rem;"/>
//     							</header>
//     							<p class="caption"><strong style="color:black;">{{resp.username}}</strong> {{resp.caption}}</p>
//     						</article>
//     						<section class="like like_8oo9w">
//     						<div v-if="resp.likeflag">
//                                 <a class="like_eszkz like_l9yih nohover" @click="likepost(resp.postid)"><span class="span_8scx2 coreSpriteHeartOpen2">{{resp.likes.length}}Likes</span></a>
//                                 <a class="like_eszkz like_et4ho nohover" href="#"><span class="span_8scx2">{{resp.created_on}}</span></a>
//                             </div>
//                             <div v-else>
//                                 <a class="like_eszkz like_l9yih nohover" @click="likepost(resp.postid)"><span class="span_8scx2 coreSpriteHeartOpen">{{resp.likes.length}}Likes</span></a>
//                                 <a class="like_eszkz like_et4ho nohover" href="#"><span class="span_8scx2">{{resp.created_on}}</span></a>
//                             </div>
//                             </section>
//     					</div>
// 					</section>
// 			     </div>
//             </li>
//         </div>
//         <div v-else>
//             <li v-for="resp in output"class="list">
//                 <h5>No Posts</h5>
//             </li>
//         </div>
//     </div>
//     `,
//      watch: {
         
//         'trigger' (newvalue, oldvalue){
//             this.reload();
//         }
//       },
//     created: function() {
//         let self = this;
//         fetch("/api/posts/", { 
//             method: 'GET',
//             'headers': {
//                 'Authorization': 'Bearer ' + localStorage.getItem('token'),
//                 'X-CSRFToken': token
//             },
//             credentials: 'same-origin'
//         })
//             .then(function (response) {
//             return response.json();
//             })
//             .then(function (jsonResponse) {
//             // display a success message
//             console.log(jsonResponse);
//             if(jsonResponse.data){
//                 self.output = jsonResponse.data;
//                 self.messageFlag = true;
//                 self.trigger = false;
//             }
//             })
//             .catch(function (error) {
//             console.log(error);
//         });
//     },
//     data: function() {
//       return {
//           output: [],
//           error: [],
//           messageFlag: false,
//           trigger: null,
//       };
//     },
//     methods: {
//         reload(){
//             let self = this;
//         fetch("/api/posts/", { 
//             method: 'GET',
//             'headers': {
//                 'Authorization': 'Bearer ' + localStorage.getItem('token'),
//                 'X-CSRFToken': token
//             },
//             credentials: 'same-origin'
//         })
//             .then(function (response) {
//             return response.json();
//             })
//             .then(function (jsonResponse) {
//             // display a success message
//             console.log(jsonResponse);
//             if(jsonResponse.data){
//                 self.output = jsonResponse.data;
//                 self.messageFlag = true;
//                 self.trigger = false;
//             }
//             })
//             .catch(function (error) {
//             console.log(error);
//         });
//         },
//         likepost(post_id) {
//             let self = this;
//             fetch("/api/users/"+post_id+"/like", { 
//             method: 'POST',
//             'headers': {
//                 'Authorization': 'Bearer ' + localStorage.getItem('token'),
//                 'X-CSRFToken': token
//             },
//             credentials: 'same-origin'
//         })
//             .then(function (response) {
//             return response.json();
//             })
//             .then(function (jsonResponse) {
//             // display a success message
//             console.log(jsonResponse);
//             if(jsonResponse.message){
//                 let message = jsonResponse.message;
//                 self.trigger = true;
//             }else if(jsonResponse.DB){
//                 let DB = jsonResponse.DB;
//                 alert(DB);
//             }else{
//                 alert("Failed to like post");
//             }
//             })
//             .catch(function (error) {
//             console.log(error);
//             });
//         }
//     }
});
    
const Users=Vue.component('users',{
//      template:`
//     <div>
//         <div v-if="info" class="container-fluid">
//             <li v-for="user in info" class="list">
//                 <div class="row border-style center profile profiles-container">
//                     <a href="#"><img v-bind:src= "'/static/uploads/'+user.photo" class="post_pic"></a>
//                         <div class="col">
//                             <h2><strong>{{user.firstname}} {{user.lastname}}</strong></h2>
//                             <h5 id="pro_info"><span>{{ user.location}}</span></h5>
//                             <h5 id="pro_date"><span> Member since: {{ user.joined_on}}</span></h5>
//                             <h5 id="pro_info"><span>{{ user.biography}}</span></h5>
//                         </div>
//                     <div class="view-profile center col-3 bio">
//                         </br>
//                         <section class="like like_8oo9w">
//                             <p class="follow_count"><span class="post_len">{{output.length}}</span><span class="follow_len">{{numberoffollower.length}}</span></p>
//                         </section>
//                         <section class="like like_8oo9w">
//                             <p class="follow_count"><span class="follow_title">Posts</span><span class="follow_title">Followers</span></p>
//                         </section>
//                         <div v-if="isuser">
//                         </div>
//                         <div v-else class="pro-btn">
//                             <div v-if="following">
//                                 <a class="view-btn btn-login pro-style" >Following</a>
//                             </div>
//                             <div v-else>
//                                 <a class="view-btn btn-primary pro-style" @click="follow">Follow</a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </li>
//         </div>
//         <div v-else>
//             <li v-for="resp in info"class="list">
//                 <h5>No Posts</h5>
//             </li>
//         </div>
//         <div style="flex-direction: column; padding-bottom: 200px; padding-top: 0px;">
//             <div class="imageView">
//                 <li v-for="pic in output" class="list li_grid">
//                     <img  v-bind:src= "'/static/uploads/'+pic.photo" class="profile_post">
//                 </li>
//             </div>
//         </div>
//     </div>
//     `,
//     watch: {
//         '$route' (to, fom){
//             this.reload()
//         },
//         'following' (newvalue, oldvalue){
//             this.reload()
//         }
//       },
//     created: function() {
//         let self = this;
//         let userid = this.$route.params.userid;
//         fetch("/api/users/"+userid+"/posts", { 
//             method: 'GET',
//             'headers': {
//                 'Authorization': 'Bearer ' + localStorage.getItem('token'),
//                 'X-CSRFToken': token
//             },
//             credentials: 'same-origin'
//         })
//             .then(function (response) {
//             return response.json();
//             })
//             .then(function (jsonResponse) {
//             // display a success message
//             console.log(jsonResponse);
//             if(jsonResponse.data){
//                 self.output = jsonResponse.data;
//             }
//             })
//             .catch(function (error) {
//             console.log(error);
//         });
//         fetch("/api/users/"+userid+"/", { 
//             method: 'GET',
//             'headers': {
//                 'Authorization': 'Bearer ' + localStorage.getItem('token'),
//                 'X-CSRFToken': token
//             },
//             credentials: 'same-origin'
//         })
//             .then(function (response) {
//             return response.json();
//             })
//             .then(function (jsonResponse) {
//             // display a success message
//             console.log(jsonResponse);
//             if(jsonResponse.profile){
//                 self.info = jsonResponse.profile;
//             }
//             if(jsonResponse.isuser){
//                 self.isuser = jsonResponse.isuser;
//             }else{
//                 self.isuser = false;
//             }
//             })
//             .catch(function (error) {
//             console.log(error);
//         });
//         fetch("/api/users/"+userid+"/followersnumber", { 
//             method: 'GET',
//             'headers': {
//                 'Authorization': 'Bearer ' + localStorage.getItem('token'),
//                 'X-CSRFToken': token
//             },
//             credentials: 'same-origin'
//         })
//             .then(function (response) {
//             return response.json();
//             })
//             .then(function (jsonResponse) {
//             // display a success message
//             console.log(jsonResponse);
//             if(jsonResponse.follower){
//                 self.numberoffollower = jsonResponse.follower;
//             }
//             })
//             .catch(function (error) {
//             console.log(error);
//         });
//         fetch("/api/users/"+userid+"/following", { 
//             method: 'GET',
//             'headers': {
//                 'Authorization': 'Bearer ' + localStorage.getItem('token'),
//                 'X-CSRFToken': token
//             },
//             credentials: 'same-origin'
//         })
//             .then(function (response) {
//             return response.json();
//             })
//             .then(function (jsonResponse) {
//             // display a success message
//             console.log(jsonResponse);
//             let follow = jsonResponse.following
//             if(follow==false){
//                 console.log(follow);
//                 self.following = false;
//             }else{
//                 self.following = true;
//             }
//             })
//             .catch(function (error) {
//             console.log(error);
//             });
//     },
//     data: function() {
//       return {
//           output:[],
//           info:[],
//           error: [],
//           numberoffollower:[],
//           following: null,
//       };
//     },
//      methods:{
//         reload(){
//             let self = this;
//             let userid = this.$route.params.userid;
//             fetch("/api/users/"+userid+"/posts", { 
//                 method: 'GET',
//                 'headers': {
//                     'Authorization': 'Bearer ' + localStorage.getItem('token'),
//                     'X-CSRFToken': token
//                 },
//                 credentials: 'same-origin'
//             })
//                 .then(function (response) {
//                 return response.json();
//                 })
//                 .then(function (jsonResponse) {
//                 // display a success message
//                 console.log(jsonResponse);
//                 if(jsonResponse.data){
//                     self.output = jsonResponse.data;
//                 }
//                 })
//                 .catch(function (error) {
//                 console.log(error);
//             });
//             fetch("/api/users/"+userid+"/", { 
//                 method: 'GET',
//                 'headers': {
//                     'Authorization': 'Bearer ' + localStorage.getItem('token'),
//                     'X-CSRFToken': token
//                 },
//                 credentials: 'same-origin'
//             })
//                 .then(function (response) {
//                 return response.json();
//                 })
//                 .then(function (jsonResponse) {
//                 // display a success message
//                 console.log(jsonResponse);
//                 if(jsonResponse.profile){
//                     self.info = jsonResponse.profile;
//                 }
//                 if(jsonResponse.isuser){
//                     self.isuser = jsonResponse.isuser;
//                 }else{
//                     self.isuser = false;
//                 }
//                 })
//                 .catch(function (error) {
//                 console.log(error);
//             });
//             fetch("/api/users/"+userid+"/followersnumber", { 
//             method: 'GET',
//             'headers': {
//                 'Authorization': 'Bearer ' + localStorage.getItem('token'),
//                 'X-CSRFToken': token
//             },
//             credentials: 'same-origin'
//         })
//             .then(function (response) {
//             return response.json();
//             })
//             .then(function (jsonResponse) {
//             // display a success message
//             console.log(jsonResponse);
//             if(jsonResponse.follower){
//                 self.numberoffollower = jsonResponse.follower;
//             }
//             })
//             .catch(function (error) {
//             console.log(error);
//         });
//         fetch("/api/users/"+userid+"/following", { 
//             method: 'GET',
//             'headers': {
//                 'Authorization': 'Bearer ' + localStorage.getItem('token'),
//                 'X-CSRFToken': token
//             },
//             credentials: 'same-origin'
//         })
//             .then(function (response) {
//             return response.json();
//             })
//             .then(function (jsonResponse) {
//             // display a success message
//             console.log(jsonResponse);
//             let follow = jsonResponse.following
//             if(follow==false){
//                 console.log(follow);
//                 self.following = false;
//             }else{
//                 self.following = true;
//             }
//             })
//             .catch(function (error) {
//             console.log(error);
//             });
//         },
//         follow(){
//             let self = this;
//             let userid = this.$route.params.userid;
//             fetch("/api/users/"+userid+"/follow", { 
//             method: 'POST',
//             'headers': {
//                 'Authorization': 'Bearer ' + localStorage.getItem('token'),
//                 'X-CSRFToken': token
//             },
//             credentials: 'same-origin'
//             })
//             .then(function (response) {
//             return response.json();
//             })
//             .then(function (jsonResponse) {
//             // display a success message
//             console.log(jsonResponse);
//             if(jsonResponse.message){
//                 let message = jsonResponse.message;
//                 alert(message);
//                 self.following = true;
//             }else{
//                 alert("Failed to follow user");
//             }
//             })
//             .catch(function (error) {
//             console.log(error);
//             });
//         }
//     }
});
    
const Post=Vue.component('post',{
//      template:`
//     <div class="fix-register ">
//     <div class="layout border-style">
//         <ul id = "message">
//             <li v-for="resp in response" class="list alert alert-success">
//                       {{ resp.message }}
//             </li>
//             <li v-for="resp in error"class="list alert alert-danger">
//                 {{resp.errors[0]}} <br>
//                 {{resp.errors[1]}} <br>
//             </li>
//         </ul>
//           <form id="postforms" @submit.prevent="make_post" method="POST" >
//               <p class="label_bold">Photo</p>
//                     <div class="row photo">
//                         <div class="upload-btn-wrapper">
//                             <button id="btn">Browse</button>
//                             <input type="file" name="photo"/>
//                         </div>
//                     </div>
//               <div class="row">
//                     <div class="col-md-11">
//                         <div class="form-group">
//                               <label class="label_bold" for="msg">Caption </label>
//                               <textarea type='text' id='usrname' name='caption' placeholder="Write a caption..."class="form-control"/></textarea>
//                         </div>
//                     </div>
//               </div>
//               <div class="row">
//                   <div class="col-md-11">
//                       <button id="submit" class="btn btn-login">Submit</button>
//                   </div>
//               </div>
//           </form>
//       </div>
//       </div>`,
//     data: function() {
//       return {
//           response: [],
//           error: []
//       };
//     },
//     methods: {
//         make_post: function () {
//             let self = this;
//             let loginforms = document.getElementById('postforms');
//             let form_data = new FormData(postforms);
//             let userid = localStorage.getItem('userid');
//             fetch("/api/users/"+userid+"/posts", { 
//                 method: 'POST', 
//                 body: form_data,
//                 'headers': {
//                     'Authorization': 'Bearer ' + localStorage.getItem('token'),
//                     'X-CSRFToken': token
//                 },
//                 credentials: 'same-origin'
//             })
//                 .then(function (response) {
//                 return response.json();
//                 })
//                 .then(function (jsonResponse) {
//                 // display a success message
//                 console.log(jsonResponse);
//                 if(jsonResponse.message){
//                     let message = jsonResponse.message;
//                     self.$router.push('/explore');
//                 } else{
//                     self.error = jsonResponse.errors;
//                 }
//                 })
//                 .catch(function (error) {
//                 console.log(error);
//             });
//         }
//     }
});


Vue.use(VueRouter);

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


