const {SHA256}=require('crypto-js');
//
const jwt=require('jsonwebtoken');

const bcrypt=require('bcryptjs');

var password="123abc";

// bcrypt.genSalt(10,(err,salt)=>{
//
//     bcrypt.hash(password,salt,(err,hash)=>{
//
//
//         console.log(hash);
//
//     });
//
// });

var hashedPassword="$2a$10$dxMSEuUU5v74eSBzI5sOTO5Q58ACHZ2dZL52BZMVrU50OjDaf3o5G";
bcrypt.compare('123abc',hashedPassword,(err,res)=>{


   console.log(res);



});

// var data={
//
//   id:10
//
// };
//
// var token =jwt.sign(data,"abc123");
// console.log('token', token);
//
// var decoded= jwt.verify(token,"abc123");
// console.log('decoded',decoded);

// var message="hello suhail";
//
// var hash=SHA256(message).toString();
//
// console.log(`Message is  ${message}`);
// console.log(`Hash is ${hash}`);
//
//
// var data={
//
//    id:10
//
// };
//
//
// var token={
//
//    data:data,
//    hash:SHA256(JSON.stringify(data)+"somesecret").toString()
//
//
// };
//
//  token.data.id=5;
//  token.hash=SHA256(JSON.stringify(token.data)).toString();
//
//
//
//
// var resultHash=SHA256(JSON.stringify(token.data)+"somesecret").toString();
//
//
// if(resultHash===token.hash)
// {
//   console.log("Data wasn't Changed");
// }
// else {
//   console.log("Data was Changed ,Don;t Trust");
//
// }
