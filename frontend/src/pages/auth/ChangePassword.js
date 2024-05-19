import React from 'react';
import styles from './auth.module.scss'
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';


const ResetPassword = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Reset password</h2>

          <form>
            <input type='password' placeholder='New Password' required name='password' />
            <input type='password' placeholder='Confirm new Password' required name='password' />
            <button type='submit' className='--btn --btn-primary --btn-block'>Reset Password</button>
          </form>

        </div>
      </Card>
    </div>
  )
}

export default ResetPassword