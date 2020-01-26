import React, { useCallback } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { useHistory } from 'react-router-dom';
import http from '../../utils/request';
import { LOGIN_API } from '../../const/api';
import { 
  NormalLoginRequest,
  NormalLoginResponse
} from '../../interfaces/user';

// // const IconFont = Icon.createFromIconfontCN({
// //   scriptUrl: '//at.alicdn.com/t/font_1616413_j53nhsmunbf.js',
// // });


interface NormalLoginProps extends FormComponentProps {
  onChangeLogin(way: string): void
}

function NormalLoginForm (props: NormalLoginProps) {
  const { getFieldDecorator } = props.form;
  const history = useHistory();

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.form.validateFields((err: Error, values: NormalLoginRequest) => {
      if (!err) {
        http.post(LOGIN_API, values).then(res => {
          window.localStorage.setItem('uid', res.data.token)
          message.success('登录成功', 1.5).then(() => {
            history.push('/');
          }, ()=> {});
        })
      }
    });
  }, []);

  return (
    <Form onSubmit={handleSubmit} className="normal-form">
      {/* <h2 onClick={
        () => {
          props.onChangeLogin('ding')
        }}>Login</h2> */}
      <Form.Item>
        {getFieldDecorator('email', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="email"
          />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />,
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
    
const NormalLogin = Form.create<NormalLoginProps>({ name: 'normal_login' })(NormalLoginForm);
export default NormalLogin;