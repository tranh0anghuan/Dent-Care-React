import React, { useState } from 'react'
import './style.css'
import { Await, Link, useNavigate } from 'react-router-dom'
import { auth, googleProvider } from '../../config/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import api from '../../config/axios';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../../redux/features/counterSlice';
import { toast } from 'react-toastify';




function LoginPage() {

 


  // luu redux dung dispatch
  const dispatch = useDispatch()
  // lay data tu redux dung useSelector
  const loggedIn = useSelector(selectUser)
  // chuyen trang dung useNavigate cua react-router-dom
  const navigate = useNavigate()

  const onFinish = async (values) => {
    console.log(values.email)
    console.log(values.password)

    const res = await api.post("/login", {

      email: values.email,
      password: values.password

    })
    const user = res.data
    toast.success('Login successfully!')
    localStorage.setItem("token", user.token)
    dispatch(login(user))
    navigate("/")


  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // ========== Login with Google =========

  const loginGoogle = async () => {

    const result = await signInWithPopup(auth, googleProvider)
    const token = result.user.accessToken;

    console.log(token)
      const res = await api.post("/login-google", {
        token: token
      })
      const user = res.data
      localStorage.setItem("token", user.token)
      dispatch(login(user))
      navigate("/")
    

    
  }


  return (
    <section className="vh-100 d-flex align-items-center">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100 wow fadeInUp" data-wow-delay="0.1s">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <Link to={'/'}>
              <h1 className="my-5 display-3 fw-bold ls-tight text-primary">
                DentCare
              </h1>
            </Link>
            <p style={{ color: 'hsl(217, 10%, 50.8%)' }}>We believe in delivering the highest standard of dental care. Our state-of-the-art facility is equipped with the latest technology and adheres to the strictest hygiene protocols to ensure your safety and comfort.
            </p>
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 wow zoomIn" data-wow-delay="0.6s">
            <button onClick={loginGoogle} type="button" data-mdb-button-init data-mdb-ripple-init className="d-flex flex-row align-items-center justify-content-center btn btn-primary btn-floating btn-lg mx-2" style={{ fontSize: '1.5rem', width: '80%' }}>
              <i className="fa-brands fa-google mx-3" />
              <p className="lead fw-normal mb-0 me-3">Sign in with Google</p>
            </button>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>

            <Form
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: 600,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Email!',
                  },
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 4,
                  span: 16,
                }}
              >
                <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: '20px' }}>
                  <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3" />
                    <label className="form-check-label" htmlFor="form2Example3">
                      Remember me
                    </label>
                  </div>
                  <Link to={'/forgot'} className="text-body" style={{ textDecoration: 'none' }}>Forgot password?</Link>
                </div>

                <Button className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingBottom: '2.5rem' }} type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center text-lg-start mt-4" style={{ marginLeft: '80px' }}>
              <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to={'/signup'} className="link-danger" style={{ textDecoration: 'none' }}>Sign up</Link></p>
            </div>



          </div>
        </div>
      </div>
    </section>


  )
}

export default LoginPage