import React, { useState } from 'react'
import './style.css'
import { Await, Link, useNavigate } from 'react-router-dom'
import api from '../../config/axios';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from '../../redux/features/counterSlice';
import { toast } from 'react-toastify';



function SignupPage() {

  const [loading, setLoading] = useState(false)

  // luu redux dung dispatch
  const dispatch = useDispatch()
  // lay data tu redux dung useSelector
  const abc = useSelector(selectUser)
  // chuyen trang dung useNavigate cua react-router-dom
  const navigate = useNavigate()


  const onFinish = async (values) => {
    console.log(values.email)
    console.log(values.password)
    console.log(values.phone)
    console.log(values.fullName)

    setLoading(true)

    try{

      const res = await api.post("/register", {

      email: values.email,
      password: values.password,
      fullName: values.fullName,
      phone: values.phone

    })



    toast.success('Sign up successfully!')
    navigate("/login")

    }catch(e){
      toast.error(e.response.data)
    }
    finally{
      setLoading(false)
    }


  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  


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

            <Form
              name="basic"
              labelCol={{
                span: 5,
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
                    message: 'Please input your email!',
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
                label="RE Password"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: 'Please input your confirm password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password/>
              </Form.Item>

              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 4,
                  span: 16,
                }}
              >

                <Button loading={loading} className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem', paddingBottom: '2.5rem' }} type="primary" htmlType="submit">
                  Sign up
                </Button>
              </Form.Item>
            </Form>

            <div className="text-center text-lg-start mt-4" style={{ marginLeft: '80px' }}>
              <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account <Link to={'/login'} className="link-danger" style={{ textDecoration: 'none' }}>Log in</Link></p>
            </div>



          </div>
        </div>
      </div>
    </section>


  )
}

export default SignupPage