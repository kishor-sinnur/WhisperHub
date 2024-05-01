const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const chat=require("./modles/chats.js");

const methodOverride=require("method-override");
app.use(methodOverride("_method"));

app.set("views",path.join(__dirname,"views"));
app.set("views engine","ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));

main().then(()=>{
    console.log("connection is successful");
}).
catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// displaying all chats
app.get("/chats", async (req, res) => {
    try {
        const chats = await chat.find();
        if (chats.length > 0) {
            res.render("index.ejs", {chats});
        } else {
            res.send("No chats found.");
        }
    } catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).send("Something went wrong.");
    }
});

// creating new chat
app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
});

app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newchat=new chat({
        from:from,
         to:to,
         msg:msg,
         created_at:new Date()
    });
    newchat.save().then((res)=>{
     console.log("data was saved");
    }).catch((err)=>{
        console.log(err);
    });

    res.redirect("/chats");
});

 // edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let newchat=await chat.findById(id);
    if(newchat){
        res.render("edit.ejs",{newchat});
    }
});

//update route
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg:newMsg}=req.body;
    let updateChat = await chat.findByIdAndUpdate(id, { msg: newMsg }, { runValidators: true, new: true });
    res.redirect("/chats");
});

//delete route

    app.delete("/chats/:id",async(req,res)=>{
        let {id}=req.params;
        let deletechat=await chat.findByIdAndDelete(id);
        console.log(deletechat);
        res.redirect("/chats");
    });
app.get("/",(req,res)=>{
    res.send("hello world");
});

app.listen(8080,()=>{
    console.log("server is listing");
});