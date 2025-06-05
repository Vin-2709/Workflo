import React from 'react'
import { useState } from 'react'
import { useNavigate,useParams,Link } from 'react-router-dom'
import axios from 'axios';
import logo from '../../pages/Images/logo2.png'


import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


const Create = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [domain, setDomain] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [error, setError]= useState(null);
    const[message, setMessage]=useState(null);
    const navigate=useNavigate();

    const {id}=useParams();
    const submitHandler=async(e)=>{
        try {
             e.preventDefault();
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/${id}/assigntask`,{ 
           name,
           email,
           domain,
           description,
           deadline 
        })
        console.log(response);
        setEmail(""),
        setName(""),
        setDomain(""),
        setDeadline(""),
        setDescription("")
        setError("");
        setMessage(response.data?.message );
        } catch (error) {
            setMessage("")
            setError(error.response?.data?.message || "Login failed");
            setEmail(""),
            setName(""),
            setDomain(""),
            setDeadline(""),
            setDescription("")
            

        }
       

    }

    return (
        <div className='flex flex-col justify-center items-center  overflow-hidden'>
          
            <form className='flex justify-center bg-radial-[at_50%_75%] from-sky-400 via-blue-400 to-indigo-500 to-90% min-h-screen min-w-screen 'onSubmit={submitHandler}>
            <div className='flex flex-col  bg-gray-300  text-black mt-30 h-130 w-250 rounded-3xl p-5'>
                <div><h1 className='text-black text-4xl font-bold text-center'>Create Task </h1> </div>
                {error ? (<div className='text-red-700 mt-3 font-bold text-center'>{error}</div>): null}
                {message ? (<div className='text-green-700 font-bold text-center'>{message}</div>):null}
                  <div className='flex justify-center  h-[70%] mx-10'>
                    <div className='flex flex-col w-[50%] justify-start'>
                        <label className="py-1 mt-5 font-medium" >Employee Name</label>
                        <input className='py-2 font-medium outline-none w-80 rounded-md p-2 border-1'type='text' placeholder='Enter name' value={name} onChange={(e) => { setName(e.target.value) }}></input>

                        <label className="py-1 mt-5 font-medium" >Employee User name</label>
                        <input className='py-2 font-medium outline-none w-80 rounded-md p-2 border-1' type='email' placeholder='Enter User name' value={email} onChange={(e) => { setEmail(e.target.value) }}></input>

                        <label className="py-1 mt-5 font-medium">Domain</label>
                            <select id="domain" name="domain" value={domain} onChange={(e) => { setDomain(e.target.value) }} className='py-2 font-medium outline-none w-80 rounded-md p-2 border-1'>
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
                        <textarea className='py-2 font-medium outline-none text-start rounded-md p-2 border-1 w-100 h-35'type='text' placeholder='Enter Description' value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>

                        <label className="py-1 mt-5 font-medium" >Deadline</label>
                        <DatePicker 
                            selected={deadline}
                            onChange={(date) => setDeadline(date)}
                            className='py-2 font-medium outline-none w-80 rounded-md p-2 border-1 text-black'
                            placeholderText="Select deadline"
                            dateFormat="MMMM d, yyyy"
                            minDate={new Date()}
                        />

                    </div>
                </div>
                <div className="flex justify-center items-center"><button className='bg-green-600 h-10 w-30 rounded text-1xl cursor-pointer text-white border-[1px] border-green-800 '>Create Task</button></div>
                <Link to= {`/admin/${id}`} className="flex justify-center items-center mt-4" ><button className='bg-red-700 h-10 w-30 rounded text-1xl cursor-pointer text-white border-[1px] border-red-800   '>Go to Home</button></Link>

                </div>
            </form> 
        </div>
    )



}

export default Create;
