import React from 'react';
import {useState,useEffect} from 'react';

const App: React.FC =() => {
  interface UserInt {
    name:string;
    age:string;
    job:string
  }
  interface AllUsersInt{
    currentUser : UserInt;
    allUsers: Array<UserInt>;
  }
  const [usersState,setUsersState] = useState<AllUsersInt>({
    currentUser:{
      name: "",
      age:"",
      job: ""
    },
    allUsers: []
  })
  
 const onChangeHandeler = (event: React.ChangeEvent<HTMLInputElement>):void =>{
    setUsersState({
      ...usersState,
      currentUser:{ 
      ...usersState.currentUser,
      [event.target.name] : event.target.value
    }})
 }
 const deleteUser = (index:number):void =>{
  const filterUsers = usersState.allUsers.filter((user,i)=>
  {
    return index!==i
  })
  setUsersState({
    ...usersState,
    allUsers: filterUsers
  })
 }
 const submitForm = (e: React.SyntheticEvent)=>{
  e.preventDefault();
  setUsersState({
    currentUser:{
      name: "",
      age: "",
      job: ""
    },
    allUsers:[
      ...usersState.allUsers,
      usersState.currentUser
    ]
  }
  )
 }
 const AllUsers = usersState.allUsers.map((user,i)=>(

    <ul className="list-group my-3" key={i}>
      <li className="list-group-item">Name: {user.name}</li>
      <li className="list-group-item">Age: {user.age}</li>
      <li className="list-group-item">job: {user.job}</li>
      <li className="list-group-item p-0"><button className="btn btn-danger w-100 rounded-0 rounded-bottom" onClick={()=>deleteUser(i)}>Delete</button></li>
    </ul>
  )
)
  return (
    <div>
       <nav className="navbar navbar-dark bg-dark text-white text-center">
        <h1 className="navbar-brand text-center mx-auto">React with TypeScript</h1>
      </nav>
      <div className="container text-center">
      <form onSubmit={submitForm} className="card card-body m-3">
        <input id="username" required className="form-control my-2" placeholder="Name" type="text" name='name'  onChange={onChangeHandeler}/>
        <input id="age" required type="number" name='age' className="form-control my-2" placeholder="Age" onChange={onChangeHandeler}/>
        <input id="job" required type="text" name='job' className="form-control my-2" placeholder="Job" onChange={onChangeHandeler}/>
        <button type="submit" className="btn btn-dark">Add User</button>

      </form>

      {usersState.allUsers.length>0 && <h3>All users</h3>}
        {AllUsers}
    </div>
    </div>
  );
}

export default App;
