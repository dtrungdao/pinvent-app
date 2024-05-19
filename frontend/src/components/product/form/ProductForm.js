import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./ProductForm.scss"
import Card from '../../card/Card';
//import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";

const ProductForm = ({product, productImage, imagePreview, description, handleInput, 
  handleImage, handleBelongToChange, saveProduct}) => {
  const [guaranteeDate, setGuaranteeDate] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:5000/api/users/getusers');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className='add-product'>
      <Card cardClass={'card'}>
        <form onSubmit={saveProduct}>
          <Card cardClass={'group'}>
            <label>Product Image (optional)</label>
            <code className='--color-dark'>
              Supported formats are Jpg, Jpeg & Png
            </code>
            <input type='file' name='image' 
            onChange={(e) => handleImage(e)} />
            {imagePreview != null ? (
              <div className='image-preview'>
                <img src={imagePreview} alt = 'product' />
              </div>
            ) : (<p>No image is uploaded</p>)}
          </Card>

          <label>Device Name:</label>
          <input type='text' placeholder='Device name (required)' name='name' value={product?.name} onChange={handleInput} />

          <label>Device Category:</label>
          <select name="category" value={product?.category} onChange={handleInput}>
            <option value="">Choose a category (required)</option>
            <option value="Notebook">Notebook</option>
            <option value="PC">PC</option>
            <option value="Mobile Phone">Mobile phone</option>
            <option value="Accessories">Accessories</option>
          </select>

          <label>Inventory Number:</label>
          <input type='text' placeholder='Inventory Number (required)' name='inventorynumber' value={product?.inventorynumber} onChange={handleInput} />

          <label>Serial Number:</label>
          <input type='text' placeholder='Serial Number (required)' name='serialnumber' value={product?.serialnumber} onChange={handleInput} />

          <label>Manufacturer and model:</label>
          <input type='text' placeholder='Device Model (required)' name='model' value={product?.model} onChange={handleInput} />
          
          {/* Source: https://www.npmjs.com/package/react-datepicker */}
          {/* <label>Date of Guarantee</label>
          <DatePicker selected={guaranteeDate} onChange={(date) => setGuaranteeDate(date)}
          dateFormat="YYYY-MM-DD" value={product?.guaranteeDate}/> */}

          <label>Date of Guarantee</label>
          <input type='date' placeholder='Guarantee' name='guarantee' 
          value={product?.guarantee} onChange={handleInput}>
          </input>

          <label>Device Price:</label>
          <input type='text' placeholder='Price (required)' name='price' value={product?.price} onChange={handleInput} />

          <label>Description</label>
          <input type='text' placeholder='Description (optional)' name='description' value={product?.description} onChange={handleInput} />

          <label>Status:</label>
          <select name="statusDevice" value={product?.statusDevice} onChange={handleInput}>
          
            <option value="">Status of device (required)</option>
            <option value="Ready">Ready</option>
            <option value="Handed out">Handed out</option>
            <option value="Archived">Archived</option>
            <option value="Defect">Defect</option>
            <option value="Sold">Sold</option>
          </select>

          <label>User:</label>
          <select name="belongTo" value={product?.belongTo} onChange={handleBelongToChange}>
            <option value="">Choose a user</option>
            {users.map((user) =>(
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>


          <label>Comment:</label>
          <input type='text' placeholder='Comment (optional)' name='comment' value={product?.comment} onChange={handleInput} />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Device
            </button>
          </div>

        </form>
      </Card>
    </div>
  )
}

export default ProductForm