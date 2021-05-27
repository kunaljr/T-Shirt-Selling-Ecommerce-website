import React,{useState,useEffect} from 'react';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import { updateCategory,getCategory } from './helper/adminapicall';


const UpdateCategory=({match}) => {
    const {user,token}=isAutheticated();
    const [values, setValues] = useState({
        name:"",
        error:"",
        loading:"",
        getaRedirect:false,
        createdCategory:"",
        formData:""
    })

    const { name,error,loading,getaRedirect,createdCategory,formData } = values;

    const preload = categoryId =>{
        getCategory(categoryId).then(data => {
            // console.log(data)
            if(data.error){
                setValues({...values,error: data.error});
            }else{
                setValues({...values,
                name:data.name,
                formData:new FormData(),
                
                })
                
                
            }
        })
    }

    const handleChange = name =>event => {
        const value= name ==="photo" ? event.target.files[0] : event.target.value;
        formData.set(name,value);
        setValues({...values,[name]:value})
    }

    useEffect(() => {
        preload(match.params.categoryId);
    }, [])

    const successMessage = ()=>(
        <div className="alert alert-success mt-3"
        style={{ display: createdCategory ? "" : "none"}}>
            <h4>{createdCategory} Updated successfully</h4>

        </div>
    )

    const errorMessage = ()=>(
        <div className="alert alert-success mt-3"
        style={{ display: error ? "" : "none"}}>
            <h4>Faield to Update {createdCategory}</h4>

        </div>
    )

    const onSubmit =(event) =>{
        event.preventDefault();
        setValues({...values,error:"",loading:true})

        updateCategory(match.params.categoryId, user._id,token,formData).then(data => {
            if(data.error){
                setValues({...values,error:data.error})
            }else{
                setValues({
                    ...values,
                    name:"",
                    loading:false,
                    createdCategory:data.name
                })
            }
        })
    }

    const createCategoryForm = () => (
        <form>
            <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Update Category
          </button>
            </form>

    )


    return (
        <Base title="Update Category" description="Welcome to Category Updation section">
            {successMessage()}
            {errorMessage()}
            {createCategoryForm()}
        </Base>
    )
}

export default  UpdateCategory;