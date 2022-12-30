const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");


const homeStartingContent = "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi, numquam molestiae? Pariatur architecto nesciunt aliquid quas similique at culpa nam facere amet accusantium, nostrum molestiae. Tempora facilis corrupti optio. Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, eum doloremque officiis exercitationem architecto id suscipit qui iusto est vel laudantium nisi vitae consequuntur modi numquam ullam autem! Quis, nihil harum nesciunt, natus dolores aliquid iure error sapiente aperiam rem repellat maiores enim laudantium deleniti? Laudantium in enim quaerat minus!";
const aboutContent = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum pariatur exercitationem sed in quasi nemo, dolorum nesciunt sunt illo quisquam laborum nostrum quis ex necessitatibus inventore aut unde ut autem.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, eum doloremque officiis exercitationem architecto id suscipit qui iusto est vel laudantium nisi vitae consequuntur modi numquam ullam autem! Quis, nihil harum nesciunt, natus dolores aliquid iure error sapiente aperiam rem repellat maiores enim laudantium deleniti? Laudantium in enim quaerat minus!";
const contactContent = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est maxime facilis magnam explicabo unde, delectus repellat provident libero aperiam quibusdam voluptates sequi nemo tenetur minus, distinctio accusantium. At, iure id!  Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, eum doloremque officiis exercitationem architecto id suscipit qui iusto est vel laudantium nisi vitae consequuntur modi numquam ullam autem! Quis, nihil harum nesciunt, natus dolores aliquid iure error sapiente aperiam rem repellat maiores enim laudantium deleniti? Laudantium in enim quaerat minus!";

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const posts = [];


app.get("/",function(req,res){
    res.render("home",{
        homeContent:homeStartingContent,
        posts:posts
    });
});
app.get("/about", function(req,res){
    res.render("about",{aboutContent:aboutContent});
});
app.get("/contact", function(req,res){
    res.render("contact",{contactContent:contactContent});
});
app.get("/compose", function(req,res){
    res.render("compose",{contactContent:contactContent});
});
app.post("/compose",function(req,res){
    const post= {
        title:req.body.postTitle,
        content:req.body.postContent
    }
    posts.push(post);
    res.redirect("/");
});

app.get("/posts/:postName", function(req,res){
    const requestedTitle = _.lowerCase(req.params.postName);
    
    posts.forEach(function(post){
        const storedTitle=_.lowerCase(post.title);
        if(storedTitle===requestedTitle){
            res.render("post",{
                title:post.title,
                content:post.content
            });
        }
    })
    
}); 

app.listen(process.env.PORT||3000,function(){
    console.log("Server is running on port 3000");
});