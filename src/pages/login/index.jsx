import React from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../config/firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import api from '../../config/axios';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUser } from '../../redux/features/counterSlice';
import { toast } from 'react-toastify';

function LoginPage() {
  const dispatch = useDispatch();
  const loggedIn = useSelector(selectUser);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const res = await api.post('/login', {
        email: values.email,
        password: values.password,
      });
      const user = res.data;
      toast.success('Login successfully!');
      localStorage.setItem('token', user.token);
      dispatch(login(user));
      if(user.role == "ADMIN"){
        navigate('/dashboard')
      }
      // else if(user.status != 'ACTIVE'){
      //   navigate('/login');
      // }
      else if(user.role == "MANAGER"){

        navigate('/manager');
      }
      else{ 
        navigate('/');
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const loginGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const token = result.user.accessToken;

    const res = await api.post('/login-google', {
      token: token,
    });
    const user = res.data;
    localStorage.setItem('token', user.token);
    dispatch(login(user));
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 style={{ color: '#06A3DA' }}>LOGIN HERE</h2>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your Email!' },
            ]}
          >
            <Input prefix={<i className="fa fa-envelope" />} placeholder="EMAIL" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<i className="fa fa-lock" />} placeholder="PASSWORD" />
          </Form.Item>

          <Form.Item>
            <Checkbox>Remember me</Checkbox>
            <Link to="/forgot" className="login-form-forgot">Forgot password?</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              LOGIN
            </Button>
          </Form.Item>

          <Form.Item>
            <Button onClick={loginGoogle} type="default" className="login-form-button google-button">
              <i className="fa fa-google" /> Sign in with Google
            </Button>
          </Form.Item>

          <Form.Item>
            <Link to="/signup" className="signup-link">
              Register New Account
            </Link>

          </Form.Item>

          <Form.Item>
            <Link to="/" className="signup-link">
              Home
            </Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
