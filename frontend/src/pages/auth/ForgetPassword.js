import React from 'react';
import styles from './auth.module.scss'
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';


const ForgetPassword = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Forget password</h2>

          <form>
            <input type='email' placeholder='Email' required name='email' />
            <button type='submit' className='--btn --btn-primary --btn-block'>Get the Email</button>
          </form>
          <span className={styles.links}>
            <p><Link to="/">Home</Link></p>
            <p><Link to="/login">Log In</Link></p>
          </span>
        </div>
      </Card>
    </div>
  )
}

export default ForgetPassword