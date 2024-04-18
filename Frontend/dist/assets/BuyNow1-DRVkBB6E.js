import{u as h,b as x,r as l,a as n,_ as r,j as t,L as o}from"./index-B2CSteUc.js";function u(){const c=h(),{id:a}=x(),[e,i]=l.useState(null);l.useEffect(()=>{n.get(`/coursedetail/${a}`).then(s=>{s.data.courseDetails&&(console.log("i am course details",e),i(s.data.courseDetails))}).catch(s=>{console.error("Error fetching data:",s),r("Error fetching data. Please try again later.")})},[]);const d=()=>{n.post(`/addWishlistItem/${a}`).then(s=>{s.status===201?(r.success(s.data.message),c("/wishlist")):console.error("Failed to add item to wishlist")}).catch(s=>{r.error(s.response.data.error)})};return t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"w-full text-white flex items-center",style:{background:"linear-gradient(90deg, #C9D6FF, #E2E2E2)",height:"60px"},children:t.jsxs("p",{className:"text-center",style:{color:"black",margin:"auto"},children:[t.jsx("b",{children:"Personal Plan"})," | Accelerate your career with access to 8,000 of our top courses."," ",t.jsx("span",{style:{textDecoration:"underline"},children:"Learn more"})]})}),t.jsxs("div",{className:"flex h-96 items-center justify-center bg-gray-800",children:[" ",t.jsxs("div",{className:"flex-1 p-6 text-center",children:[t.jsx("h1",{className:"text-5xl font-bold mb-4 text-white",children:e==null?void 0:e.courseName}),t.jsx("h4",{className:"text-gray-100 text-2xl",children:e==null?void 0:e.courseDescription}),t.jsxs("h4",{className:"mt-2 text-gray-100 text-2xl",children:["Duration: ",e==null?void 0:e.courseDuration," hours"]}),t.jsx("p",{className:"mb-2 text-white",children:"Created By Smart Learning platform"})," ",t.jsx("p",{className:"text-white",children:"Last updated 3/2024, 🌐 English, English [CC], French [Auto]"})," "]}),t.jsxs("div",{className:"max-w-md mr-20 cursor-pointer rounded-lg bg-white p-4 shadow duration-150 hover:scale-105 hover:shadow-md h-full bg-white",children:[" ",t.jsx("img",{className:"w-full h-70 rounded-lg object-cover object-center",src:e==null?void 0:e.photo,alt:"course"})," ",t.jsx("h4",{className:"my-4 pl-4 font-bold text-gray-700",children:"Subscribe to Smart Learning's top courses"}),t.jsxs("h5",{className:"mb-4 ml-4 text-xl font-semibold text-gray-800",children:["₹ ",e==null?void 0:e.courseFee]}),t.jsxs("div",{style:{display:"flex",gap:"10px"},children:[(e==null?void 0:e.isEnrolled)===!1?t.jsx(o,{to:`/checkout/${e==null?void 0:e._id}`,children:t.jsx("button",{className:"text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-md",children:"Start Subscription"})}):t.jsx(o,{to:"/enrolledcourses",children:t.jsx("button",{className:"text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-md",children:"Enrolled"})}),(e==null?void 0:e.isEnrolled)===!1?t.jsx("button",{onClick:d,className:"text-white bg-orange-500 hover:bg-orange-700 py-2 px-4 rounded-md",children:"Add to WishList"}):null]}),t.jsx("br",{})]})]})]})}export{u as default};
