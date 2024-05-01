const mongoose=require("mongoose");
const chat=require("./modles/chats.js");
main().then(()=>{
    console.log("connection is successful");
}).
catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats=[{
    from:"kiran",
    to:"shankar",
    msg:"hello kiran",
    created_at:new Date()
  },
  {
    from:"NIkhil",
    to:"kishor",
    msg:"hello kishor",
    created_at:new Date()
  },
  {
    from:"kishor",
    to:"sakoo",
    msg:"hello sakoo",
    created_at:new Date()
  },
  {
    from:"sakoo",
    to:"kishor",
    msg:"hello kishor",
    created_at:new Date()
  }
];

const chat2=chat.insertMany(allchats);
