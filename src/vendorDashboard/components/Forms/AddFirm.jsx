import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath';
const AddFirm = () => {
  const [firmName, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null);

  const handleCategoryChange = (event)=>{
    const value = event.target.value;
      if(category.includes(value)){
        setCategory(category.filter((item)=> item !== value));
      }else{
        setCategory([...category, value])
      }
}
const handleRegionChange = (event)=>{
    const value = event.target.value;
      if(region.includes(value)){
        setRegion(region.filter((item)=> item !== value));
      }else{
        setRegion([...region, value])
      }
}
const handleImageUpload =(event)=>{
  const selectedImage = event.target.files[0];
  setFile(selectedImage)
}


  const handleFirmSubmit = async(e)=>{
    e.preventDefault();
    try{
      const loginToken = localStorage.getItem('loginToken');
      if(!loginToken){
          console.error("User not authenticated");
      }
      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', file)

      category.forEach((value)=>{
        formData.append('category', value)
      });// through foreach we are taking collection of values
      region.forEach((value)=>{
        formData.append('region', value)
      })
          

      const response = await fetch(`${API_URL}/firm/add-firm`,{
        method:'POST',
        headers:{
          'token': `${loginToken}`
        },
        body: formData
      });
      const data = await response.json()
      if(response.ok){
        console.log(data);
        setFirmName("");
        setArea("")
        setCategory([]);
        setRegion([]);
        setOffer("");
        setFile(null)
        alert("Firm added Successfully")
      }else if(data.message === "vendor can have only one firm"){
        alert("Firm Exists 🥗. Only 1 firm can be added ")
      }
      else{
        alert("failed to add firm")
      }
      consolelog("this is firmId",data.firmId);
      const mango = data.firmId;
      localStorage.setItem('firmId', mango);
    }catch(error){
     console.error("failed to add firm")
    }
  }
  
  return (
    <div className="firmSection">
            <form className='tableForm' onSubmit={handleFirmSubmit}>
            <h2>Add Firm</h2>
                <label>Firm Name</label>
                <input type="text" name='firmname' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/>
                <label>Area</label>
                <input type="text" name='area' value={area} onChange={(e)=>{setArea(e.target.value)}}/>
               <div className='checkInp'>
               <label>Category</label>
                <div className="inputsContainer">
          <div className="checboxContainer">
                  <label>Veg</label>
                  <input type="checkbox" checked = {category.includes('veg')} onChange={handleCategoryChange}  value="veg" />
                </div>
                <div className="checboxContainer">
                  <label>Non-Veg</label>
                  <input type="checkbox" checked = {category.includes('non-veg')} onChange={handleCategoryChange} value="non-veg" />
                </div>
          </div>
          </div>
               <div className='checkInp'>
               <label>Region</label>
                <div className="inputsContainer">
          <div className="regBoxContainer">
                  <label>South Indian</label>
                  <input type="checkbox" checked = {region.includes('south-indian')} onChange={handleRegionChange} value="south-indian"
                  
                  />
                </div>
                <div className="regBoxContainer">
                  <label>North-Indian</label>
                  <input type="checkbox"checked = {region.includes('north-indian')} onChange={handleRegionChange} value="north-indian"
                  
                  />
                </div>
                <div className="regBoxContainer">
                  <label>Chinese</label>
                  <input type="checkbox" checked ={region.includes('chinese')} onChange={handleRegionChange} value="chinese"
                  />
                </div>
                <div className="regBoxContainer">
                  <label>Bakery</label>
                  <input type="checkbox"checked = {region.includes('bakery')} onChange={handleRegionChange} value="bakery"
                  
                  />
                </div>
          </div>
          </div>
          
                <label>Offer</label>
                <input type="text" name='offer' value={offer} onChange={(e)=>{setOffer(e.target.value)}}/>
                <label>Firm Image</label>
                <input type="file" onChange={handleImageUpload}/>
            
            <div className='btnSubmit'>
          <button type='submit'>Submit</button>
        </div>
            </form>
        </div>
    
  )
}

export default AddFirm