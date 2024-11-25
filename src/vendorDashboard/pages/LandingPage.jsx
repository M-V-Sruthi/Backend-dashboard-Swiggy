import React,{useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
import Login from '../components/Forms/Login'
import Register from '../components/Forms/Register'
import AddFirm from '../components/Forms/AddFirm'
import AddProduct from '../components/Forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProducts from '../components/AllProducts'
const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [showFirm, setShowFirm] = useState(false)
  const [showProduct, setShowProduct] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false)
  const [showFirmTitle, setShowFirmTitle] = useState(true)
  useEffect(()=>{
    const loginToken = localStorage.getItem('loginToken');
    if(loginToken){
        setShowLogOut(true)
       // setShowWelcome(true)
    }
  },[])


  useEffect(()=>{
    const firmName = localStorage.getItem('firmName');
    //const firmId = localStorage.getItem('firmId')
    if(firmName ){
        setShowFirmTitle(false)
        // setShowWelcome(true)
    }
},[])
  const logOutHandler =()=>{
      confirm("Are you sure to logout?")
      localStorage.removeItem("loginToken");
      localStorage.removeItem("firmId");
      localStorage.removeItem('firmName');
     setShowLogOut(false)
      setShowFirmTitle(true)
      setShowWelcome(false)
  }
 
    
      
  const showLoginHandler =()=>{
    setShowLogin(true)
    setShowRegister(false)
    setShowFirm(false)
    setShowProduct(false)
    setShowWelcome(false)
setShowAllProducts(false)
}

const showRegisterHandler = ()=>{
  setShowRegister(true)
  setShowLogin(false)
  setShowFirm(false)
  setShowProduct(false)
  setShowWelcome(false)
setShowAllProducts(false)
}
const showFirmHandler = ()=>{
  if(showLogOut){
  setShowProduct(false)
    setShowRegister(false)
    setShowLogin(false)
    setShowFirm(true)
    setShowWelcome(false)
setShowAllProducts(false)
}else{
  alert("please  login")
  setShowLogin(true)
}}
const showProductHandler = ()=>{
  if(showLogOut){
    setShowRegister(false)
    setShowProduct(true)
    setShowLogin(false)
  setShowFirm(false)
  setShowWelcome(false)
setShowAllProducts(false)

}
else{
  alert("please  login")
  setShowLogin(true)
}
}
const showAllProductsHandler = ()=>{
   if(showLogOut){
  setShowRegister(false)
  setShowLogin(false)
  setShowFirm(false)
  setShowProduct(false)
  setShowWelcome(false)
  setShowAllProducts(true)
}
else{
  alert("please  login")
  setShowLogin(true)
}}
const showWelcomeHandler = ()=>{
  setShowRegister(false)
  setShowLogin(false)
  setShowFirm(false)
  setShowProduct(false)
  setShowWelcome(true)
  setShowAllProducts(false)

}
  return (
   <>
   <section className='landingSection'>
   <Navbar showLoginHandler = {showLoginHandler} showRegisterHandler = {showRegisterHandler} showLogOut={showLogOut} logOutHandler={logOutHandler}/>
   <div className='collectionSection'>
   <SideBar showFirmHandler ={showFirmHandler} showProductHandler={showProductHandler} showAllProductsHandler={showAllProductsHandler} showFirmTitle={showFirmTitle}/>
   {showLogin && <Login showWelcomeHandler = {showWelcomeHandler}/>}
   {showRegister && <Register showLoginHandler = {showLoginHandler}/> }
   {showFirm && showLogOut && <AddFirm/> }
   {showProduct && showLogOut && <AddProduct/> }
   {showWelcome && <Welcome/>}
   {showAllProducts  && showLogOut && <AllProducts/>}
   </div>
      
   </section>
   </>
     
    
  )
}
// blue color states and yellow color functions
export default LandingPage