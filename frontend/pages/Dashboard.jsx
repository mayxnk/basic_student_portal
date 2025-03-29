import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export const Dashboard = () => {
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [email,setEmail] = useState('')
  const [gender,setGender] = useState('')
  
  const navigate = useNavigate()
  useEffect(() => {
    const getStudent = async() => {
      try {
        const response = await axios.get('http://localhost:3000/dashboard',{
          headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        })
      //   if (!response.data || Object.keys(response.data).length === 0) {
      //  }
        setFirstName(response.data.firstName)
        setLastName(response.data.lastName)
        setEmail(response.data.email)
        setGender(response.data.gender)
      } catch (error) {
        alert('You are not logged in!!,redirecting to sign in....')
        setTimeout(() => {
          navigate("/signin");
      }, 2000);
      }
    }
    getStudent()
  },[])
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Student Dashboard</h2>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Name:</span>
                <span className="text-gray-800">{firstName} {lastName}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="text-gray-800">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600">Gender:</span>
                <span className="text-gray-800">{gender}</span>
              </div>
            </div>
          </div>
        </div>
    )
}