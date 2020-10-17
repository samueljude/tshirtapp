import React ,{useState,useEffect}from 'react'
import "../styles.css";
import {API} from "../backend"
import Base from "./Base";
import Card from './Card';
import { getProducts } from './helper/coreapicalls';

export default function Home() {
   
const [products, setproducts] = useState([]);
const [error, seterror] = useState(false);
const loadAllProducts =() =>{
  getProducts().then(data =>{
    if(data.error){
      seterror(data.error)
    }else{
      setproducts(data);
    }
  })
}
useEffect(() => {
  loadAllProducts();
}, []);




    return (
        <Base title="Home Page" description= "Welcome to the TShirt Store">
          <div className="row text-center">
           
        <h1 className="text-white">All of Tshirts</h1>
          <div className="row">
            {products.map((product,index)=>{
              return(
                <div key={index} className="col-4 mb-4">
                    <Card product={product}/>


                    


                </div>
              )
            })}
          </div>


          </div>
            </Base>
    )
}
