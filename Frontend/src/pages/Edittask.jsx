import React ,{useState,useEffect} from 'react'
import axios from 'axios';
import { Navigate,useNavigate,useParams,Link } from 'react-router-dom';
import DatePicker from 'react-datepicker'; 
import "react-datepicker/dist/react-datepicker.css"; 



const Edittask=()=>{
    const [error, setError]=useState('');
    const [message,setMessage]=useState('');

    const [formdata, setFormdata] = useState({
        name: '',
        email: '',
        domain: '',
        description: '',
        deadline: new Date(),
        status:'Pending'
        
    })
    const {id}=useParams();
    const navigate=useNavigate();


    useEffect(() => {
        gettask();
    }, [id]);

    const gettask=async()=>{
       
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/${id}`);
            if (response.data.success) {
                const taskdata = response.data.task;
                setFormdata({
                    name: taskdata.assignedTo?.name || "",
                    email: taskdata.assignedTo?.email || "",
                    domain: taskdata?.domain || "",
                    deadline: taskdata?.deadline ? new Date(taskdata.deadline) : new Date(), 
                    description: taskdata?.description || "",
                    status:"Pending"
                    

                })
                setMessage(response.data?.message);
                setError("");
            } 
        }
        catch (error) {
               console.log(error);
               setMessage("");
               setError(error.response?.data?.message || "Error occurred"); /
            }
        

    }

    const changeHandler=(e)=>{
        setFormdata({
            ...formdata,
            [e.target.name]:e.target.value
        });
    };

    const submitHandler=async(e)=>{
        e.preventDefault();
        try {
            const response=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/edit-task/${id}`,{ 
                domain:formdata.domain,
                deadline:formdata.deadline,
                description:formdata.description
            })
            if(response.data.success) {
                alert('Task Updated');
                navigate(-1);
            }
        } catch (error) {
            console.log(error)
        }
    }


        return (
        <div className='flex justify-center items-center  '>
            <form className='flex justify-center bg-radial-[at_50%_75%] from-sky-400 via-blue-400 to-indigo-500 to-90% min-h-screen min-w-screen 'onSubmit={submitHandler}>
            <div className='flex flex-col  bg-gray-300  text-black mt-30 h-130 w-250 rounded-3xl p-5'>
                <div><h1 className='text-black text-4xl font-bold text-center'>Edit Task </h1> </div>
                {error ? (<div className='text-red-700 mt-3 font-bold text-center'>{error}</div>): null}
                {message ? (<div className='text-green-700 font-bold text-center'>{message}</div>):null}
                  <div className='flex justify-center  h-[70%] mx-10'>
                    <div className='flex flex-col w-[50%] justify-start'>
                        <label className="py-1 mt-5 font-medium" >Employee Name</label>
                        <input className='py-2 font-medium outline-none w-80 rounded-md p-2 border-1'type='text' placeholder='Enter name' name='name' value={formdata.name} readOnly ></input>

                        <label className="py-1 mt-5 font-medium" >Employee User name</label>
                        <input className='py-2 font-medium outline-none w-80 rounded-md p-2 border-1' type='email' placeholder='Enter User name' name='email' value={formdata.email} readOnly></input>

                        <label className="py-1 mt-5 font-medium">Domain</label>
                           <select id="domain" name="domain" value={formdata.domain}
                                onChange={(e) => setFormdata({ ...formdata, domain: e.target.value })}  className='py-2 font-medium outline-none w-80 rounded-md p-2 border-1'>
                                <option value=""> Select Domain </option> 
                                <option value="Development">Development</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Finance">Finance</option>
                                <option value="Design">Design</option>
                                <option value="Sales">Sales</option>
                                <option value="Human-resources">Human Resources</option>
                                <option value="Education">Education</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Legal">Legal</option>
                            </select>
                    </div>
                    <div className='flex flex-col justify-start w-[50%] '>
                        <label className="py-1  mt-5 font-medium " >Description</label>
                        <textarea className='py-2 font-medium outline-none text-start rounded-md p-2 border-1 w-100 h-35'type='text' placeholder='Enter Description' name='description' value={formdata.description} onChange={changeHandler}></textarea>

                        <label className="py-1 mt-5 font-medium" >Deadline</label>
                        <DatePicker 
                            selected={formdata.deadline}
                            onChange={(date) => setFormdata({...formdata, deadline: date})} 
                            className='py-2 font-medium outline-none w-80 rounded-md p-2 border-1 text-black'
                            placeholderText="Select deadline"
                            dateFormat="MMMM d, yyyy"
                        />

                    </div>
                </div>
                <div className="flex justify-center items-center"><button className='bg-green-600 h-10 w-30 rounded text-1xl cursor-pointer text-white border-[1px] border-green-800 '>Update Task</button></div>
                <Link to= {`/admin/${id}`} className="flex justify-center items-center mt-4" ><button type='button' className='bg-red-700 h-10 w-30 rounded text-1xl cursor-pointer text-white border-[1px] border-red-800   '>Go to Home</button></Link>

                </div>
            </form> 
        </div>
    )



}


export default Edittask;
