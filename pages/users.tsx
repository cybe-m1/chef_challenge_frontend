import { NextPage } from "next";
import { useState, useEffect } from "react";
import Cookie from "js-cookie"
import { parseCookie } from '../components/function/parseCookie'

export function getServerSideProps({req, res}: any) {
    
    const getCookie: any = parseCookie(req)
    const cookie = JSON.stringify(getCookie)
    

    return {
      props: {
        cookie: cookie || ''
      },
    };
  }

const UserPage: NextPage = (cookie) => {
    const [user, setUser] = useState([cookie])
    console.log(user)
    return (
        <div className="flex flex-wrap">
            {user.map((use: any) => (
                <div key={use.name}>
                    <h3>{use.name}</h3>
                </div>
            ))}
        </div>
    )
}

export default UserPage