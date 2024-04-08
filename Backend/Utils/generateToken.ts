import 'dotenv/config'
import jwt from 'jsonwebtoken'

//console.log(process.env.JWT_SECRET,"env")
const generateToken:any =(user_id:string)=>{

// Generate token with a 2-day expiration time   
const token =jwt.sign({user_id},process.env.JWT_SECRET as string,{     
expiresIn: '3m'
})
// Generate Refresh token with a 5-day expiration time
const refreshToken = jwt.sign({ user_id }, process.env.JWT_REFRESH_SECRET as string, {
expiresIn: '5d'
});
return {token,refreshToken}
}
export default generateToken;