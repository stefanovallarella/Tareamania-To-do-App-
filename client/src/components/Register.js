import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../actions'


function Register(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const dispatch = useDispatch();
        
    const handleForm = async e => {
        e.preventDefault();
        
        const cred = {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          repeatedPassword: repeatPassword
        }
        
        await fetch('/users/register',{
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cred)
        })   
        .then(response => {
          console.log("Success: ", response);
          const data = response.json();
          return data;
          })
        .then(data => {
            console.log(data.validEmail);
            if(data.validEmail){
              dispatch(login());
            }
        })
        .catch((error) => {
        console.error('Error:', error);
        });

      }




        return(

            <div className="container col-lg-4">
                <form onSubmit={handleForm}>

                    <div className="form-group">
                          <label htmlFor="exampleInputFirstName1">Nombre</label>
                          <input type="text" name="first_name" className="form-control" id="exampleInputFirstName1" aria-describedby="firstNameHelp" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </div>

                    <div className="form-group">
                          <label htmlFor="exampleInputLastName1">Apellido</label>
                          <input type="text" name="last_name" className="form-control" id="exampleInputLastName1" aria-describedby="lastNameHelp" value={lastName} onChange={e => setLastName(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email</label>
                      <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Contraseña</label>
                      <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleInputRepeatedPassword1">Repetir contraseña</label>
                      <input type="password" name="repeatedPassword" className="form-control" id="exampleInputRepeatedPassword1" value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
                    </div>

                    <div className="row justify-content-center">
                        <button type="submit" className="btn btn-primary">Registrarme</button>
                    </div>
                </form>
             </div>
        )
}

export default Register;