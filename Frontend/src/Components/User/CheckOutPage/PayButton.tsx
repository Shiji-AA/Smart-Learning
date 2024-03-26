import { axiosInstance } from "../../../api/axiosinstance"

function PayButton({courseDetails:any}) {
const handleCheckOut =()=>{
axiosInstance.post('/stripepayment',{courseDetails:any})
.then((response)=>{
if(response.data.url){
window.location.href = response.data.url;
}
})
.catch((error)=>{
    console.log(error.message)
})
}
    return (
        <>
        <div>
         <button onClick={()=>handleCheckOut()} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
    
    </div>
            
        </>
    )
}

export default PayButton
