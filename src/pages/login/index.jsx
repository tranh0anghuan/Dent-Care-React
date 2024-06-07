import React from 'react'
import './style.css'
import { Await, Link, useNavigate } from 'react-router-dom'
import { auth, googleProvider } from '../../config/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import api from '../../config/axios';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../../redux/features/counterSlice';



function LoginPage() {

  // luu redux dung dispatch
  const dispatch = useDispatch()
  // lay data tu redux dung useSelector
  const abc = useSelector(selectUser)
  // chuyen trang dung useNavigate cua react-router-dom
  const navigate = useNavigate()

  const onFinish = async (values) => {
    console.log(values.username)
    console.log(values.password)
    const res = await api.post("/login",{
      
      email: values.username,
      password: values.password
      
    })
    const user = res.data
    localStorage.setItem("token", user.token)
    dispatch(login(user))
    navigate("/contact")
    
  
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

const loginGoogle = async () => {

 const result = await signInWithPopup(auth, googleProvider)
    const token = result.user.accessToken;
  

    const res = await api.post("/login-google",{
      token: token
    })

    const user = res.data
    localStorage.setItem("token",user.token)
    dispatch(login(user))
    navigate("/contact")
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
        <p style={{color: 'hsl(217, 10%, 50.8%)'}}>We believe in delivering the highest standard of dental care. Our state-of-the-art facility is equipped with the latest technology and adheres to the strictest hygiene protocols to ensure your safety and comfort.
        </p>
      </div>
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 wow zoomIn" data-wow-delay="0.6s">
        {/* <form>
          <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p className="lead fw-normal mb-0 me-3">Sign in with</p>
            <button onClick={loginGoogle} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-2" style={{fontSize: '1.5rem', borderRadius: '50%'}}>
              <i className="fa-brands fa-google" />
          
            </button>
            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-2" style={{fontSize: '1.5rem', borderRadius: '50%'}}>
              <i className="fa-brands fa-facebook" />
            </button>
            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-2" style={{fontSize: '1.5rem', borderRadius: '50%'}}>
              <i className="fa-brands fa-linkedin" />
            </button>
          </div>
          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">Or</p>
          </div>
          <div data-mdb-input-init className="form-outline mb-4">
            <input type="email" id="form3Example3" className="form-control form-control-lg" placeholder="Email address" />
          </div>
          <div data-mdb-input-init className="form-outline mb-3">
            <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder="Password" />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3" />
              <label className="form-check-label" htmlFor="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body" style={{textDecoration: 'none'}}>Forgot password?</a>
          </div>
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg" style={{paddingLeft: '2.5rem', paddingRight: '2.5rem'}}>Login</button>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to={'/signup'} className="link-danger" style={{textDecoration: 'none'}}>Sign up</Link></p>
          </div>
        </form> */}
<Form
    name="basic"
    labelCol={{
      span: 8,
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
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
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
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  <button onClick={loginGoogle} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-2" style={{fontSize: '1.5rem', borderRadius: '50%'}}>
              <i className="fa-brands fa-google" />
          
            </button>
      </div>
    </div>
  </div>
</section>


  )
}

export default LoginPage