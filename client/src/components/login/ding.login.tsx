import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';
import QRCode from 'qrcode.react';

import axios from 'axios';
import http from '../../utils/request';
import { 
  DINGDING_LOGIN_API,
  DINGDING_QRCODE_STATUS_API,
  DINGDING_USERINFO_API,
} from '../../const/api';

interface DingLoginProps {
  onChangeLogin(way: string): void
}

export const getDingUserInfo = async (token: string) => {
  await http.post(DINGDING_USERINFO_API, {
    token: token
  }).catch((err: Error) => console.log(err))
}

export default function DingLogin(props: DingLoginProps) {
  const [url, setQrCodeUrl] = useState('');
  const [outdate, setOutdate] = useState(false);
  let history = useHistory();
  let qrCodeStatusTimer: any = null;
  
  useEffect(() => {
    getQrcodeInfo();
    return () => {
      window.clearInterval(qrCodeStatusTimer);
      setOutdate(false);
    }
  }, [])

  const getQrcodeInfo = async () => {
    let qrCodeRes = await http.post(DINGDING_LOGIN_API).catch((err: Error) => console.log(err))
    if (qrCodeRes) {
      let { url, uuid } = qrCodeRes.data;
      setQrCodeUrl(url);
      setOutdate(false);
      qrCodeStatusTimer = window.setInterval(() => {
        queryStatus(uuid)
      }, 3000);
    }
  }

  const queryStatus = async(uuid: string): Promise<any> => {
    let res = await axios.request({
      url: DINGDING_QRCODE_STATUS_API,
      params: { uuid: uuid },
      // withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    let data = res.data;
    if (data.errcode === 0) {
      if(data.stage === 9 || data.stage === -2) {
        // 登录成功
        window.clearInterval(qrCodeStatusTimer);
        window.localStorage.setItem('uid', data.token);
        
        // 获取用户信息并跳转
        getDingUserInfo(data.token).then((res: any )=> {
          if (res.errcode === 0) {
            window.localStorage.setItem('userInfo', JSON.stringify(res));
            message.success('登录成功', 1.5).then(() => {
              history.push('/');
            }, () => {});
          }
        });
      } else if (data.stage === 0) {
        console.log('未扫码');
      } else if (data.stage === 1) {
        console.log('已扫码');
      } else if (data.stage === -1) {
        console.log('二维码已过期');
        setOutdate(true);
        window.clearInterval(qrCodeStatusTimer);
      }
    }
  }

  return (
    <section className="qrcode-wrap">
      {
        url !== "" &&
        <div>
          <QRCode className="qrcode" value={url} />
          {
            outdate && 
            <div className="mask">
              <div style={{cursor: "pointer"}} onClick={getQrcodeInfo}>
                <div>二维码已过期</div>
                <div>点击更新</div>
              </div>
            </div>
          }
        
        </div>
      }
    </section>
  )
}