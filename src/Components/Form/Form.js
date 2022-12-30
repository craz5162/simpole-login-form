import React, { useState } from 'react';
import './Form.css'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../../Firebase/Firebase.int';


const auth = getAuth(app);

const Form = () => {

      const [erroePassword, setErrorPassword] = useState('');
      const [success, setSuccess] = useState(false)

      const hendelform = even =>{
            even.preventDefault();
            setSuccess(false);
            const form = even.target;
            const email = form.email.value;
            const password = form.password.value;
            // console.log(email, password);
            if(! /(?=.*[A-Z])/.test(password)){
                  setErrorPassword('You must enter an upper case letter !!')
                  return
            }
            if(! /(?=.*[0-9])/.test(password)){
                  setErrorPassword('You have to give at least one number !!')
                  return
            }
            setErrorPassword('')

            createUserWithEmailAndPassword(auth, email, password)
            .then(result =>{
                  const user = result.user;
                  console.log(user);
                  setSuccess(true);
                  form.reset();
            })
            .catch(error =>{
                  console.log('error : ', error)
                  setErrorPassword('It has been used before, give a new one')
            })
      }

      return (
            <div>
                  <form className='form' onSubmit={hendelform}>
                        <input className='input-1' type="email" name='email' placeholder='enter email' required />
                        <input className='input-2' type="password" name='password' placeholder='enter password' required/><br />
                        <p className='para'>{erroePassword}</p>
                        {success && <p className='success'>yes you success !!</p>}
                        <button type='submit'>sing in</button>
                  </form>
            </div>
      );
};

export default Form;