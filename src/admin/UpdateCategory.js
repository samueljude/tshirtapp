import React,{useState} from 'react';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';


const UpdateCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
  
    const { user, token } = isAutheticated();

    const handleChange = event => {
        setError("");
        setName(event.target.value);
      };
    
      const onSubmit = event => {
        event.preventDefault();
        setError("");
        setSuccess(false);
      }
    const successMessage = () => {
        if (success) {
          return <h4 className="text-success">Category created successfully</h4>;
        }
      };
    
      const warningMessage = () => {
        if (error) {
          return <h4 className="text-warning">Failed to create category</h4>;
        }
      };
    
  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a category here"
      description="Add a new category for new tshirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {warningMessage()}
          {myCategoryForm()}
          
        </div>
      </div>
    </Base>
  );
};


export default UpdateCategory;
