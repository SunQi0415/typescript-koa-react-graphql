import React, { useState } from 'react';
import { Button } from 'antd';
// import 'styled-components';
import "./index.scss";
import DingLogin from '../../components/login/ding.login';
import NormalLogin from '../../components/login/normal.login';

export default function Login() {
  const [way, setLoginWay] = useState('normal');

  const changeLoginWay = (way: string) => {
    setLoginWay(way)
  }

  const renderLoginWay = () => {
    if (way === 'normal') {
      return <NormalLogin onChangeLogin={changeLoginWay} />
    }
    if (way === 'ding') {
      return <DingLogin onChangeLogin={changeLoginWay}></DingLogin>
    }
  }

  return (
    <div className="login-wrap">
      <section className="login-content">
        <header>
          <Button type="link" size="large" style={way === 'normal' ? {color: '#1890ff'} : {color: '#000'}} onClick={() => {
            changeLoginWay('normal')
          }}>密码登录</Button>
          <Button type="link" size="large" style={way === 'ding' ? {color: '#1890ff'} : {color: '#000'}} onClick={() => {
            changeLoginWay('ding')
          }}>钉钉登录</Button>
        </header>
        <main>
          {
            renderLoginWay()
          }
        </main>
      </section>
    </div>
  )
}
