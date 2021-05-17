import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const Admin = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageURL, setIMageURL] = useState(null);


    const handleImageUpload = event => {
        console.log(event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', 'bbb594f564f8063ab9fb112e4308e253');
        imageData.append('image', event.target.files[0]);
        console.log(imageData);
        
        axios.post('https://ibb.co/album/3kQ5gn', 
        imageData)
        .then(function (response) {
          setIMageURL(response.data.data.display_url);
        })
        .catch(function (error) {
          console.log(error);
        });
    
      }

    const onSubmit = data => {
        const {productName, weight, price, img} = data;
        const imageData=new FormData();
        const imageBB_Key='bbb594f564f8063ab9fb112e4308e253';
        imageData.set('key', 'bbb594f564f8063ab9fb112e4308e253');
        imageData.append('image', img[0]);

        axios.post('https://api.imgbb.com/1/upload', 
        imageData)
        .then(function (response) {
          console.log(response.data.data.display_url);
          if(response.data.data.display_url){
              const data={
                  productName:productName,
                  weight:weight,
                  price:price,
                  imageURL:response.data.data.display_url,
              }
              fetch('http://localhost:5000/addProduct',{
                  method:'POST',
                  headers:{
                    'Content-Type':'application/json'
                  },
                  body: JSON.stringify(data)
              })
              .then(res => res.json())
              .then(data => console.log(data));
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                <input {...register("productName", { required: true })} />
                {errors.exampleRequired && <span>This field is required</span>}

                <input {...register("weight", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}
                {/* include validation with required or other standard HTML validation rules */}
                 <input {...register("price", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}
                {/* include validation with required or other standard HTML validation rules */}
                <input type="file"   {...register("img", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}
            <input type="submit" />
            </form>
        </div>
    );
};

export default Admin;