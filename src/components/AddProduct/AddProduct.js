import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { menuActiveContext } from '../Admin/Admin';
const InputSection = () => {
    const [selectedIndex, setSelectedIndex] = useContext(menuActiveContext);
    setSelectedIndex(1);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        const {productName, weight, price, category, img} = data;
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
                  category:category,
                  imageURL:response.data.data.display_url
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
                
                <input placeholder="Product Name" {...register("productName", { required: true })} />
                {errors.productName && <span>This field is required</span>} <br />

                <input placeholder="Weight" {...register("weight", { required: true })} />
                {errors.weight && <span>This field is required</span>}<br />
 
                <input placeholder="Price" {...register("price", { required: true })} />
                {errors.price && <span>This field is required</span>}<br />

                <input placeholder="Category" {...register("category", { required: true })} />
                {errors.category && <span>This field is required</span>}<br />

                <input type="file"   {...register("img", { required: true })} />
                {errors.img && <span>This field is required</span>}<br />

                <input type="submit" />
            </form>
        </div>
    );
};

export default InputSection;