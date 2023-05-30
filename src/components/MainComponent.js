import React, { useEffect, useState } from "react";
import './MainStyle.css'
import axios from 'axios'

const MainComponent = () => {
    const [ reward_no1 , setReward_no1 ] = useState([])
    const [ reward_no2 , setReward_no2 ] = useState([])
    const [ reward_no3 , setReward_no3 ] = useState([])
    const [ reward_no4 , setReward_no4 ] = useState([])
    const [ reward_no5 , setReward_no5 ] = useState([])
    const [ reward_no6 , setReward_no6 ] = useState([])
    const [ reward_no7 , setReward_no7 ] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/reward_no1`)
        .then((response) => {
            setReward_no1(response.data)
        })

        axios.get(`${process.env.REACT_APP_API}/reward_no2`)
        .then((response) => {
            setReward_no2(response.data)
        })
    
        axios.get(`${process.env.REACT_APP_API}/reward_no3`)
        .then((response) => {
            setReward_no3(response.data)
        })

        axios.get(`${process.env.REACT_APP_API}/reward_no4`)
        .then((response) => {
            setReward_no4(response.data)
        })

        axios.get(`${process.env.REACT_APP_API}/reward_no5`)
        .then((response) => {
            setReward_no5(response.data)
        })

        axios.get(`${process.env.REACT_APP_API}/reward_no6`)
        .then((response) => {
            setReward_no6(response.data)
        })

        axios.get(`${process.env.REACT_APP_API}/reward_no7`)
        .then((response) => {
            setReward_no7(response.data)
        })

    }, [])

    return (
        <>
        <div className="hl"></div>
            <div className="body_all">
                <div className="header_text">
                    <p className="header_text1">ผลการออกสลากกาชาด</p>
                    <p className="header_text2">การกุศลจังหวัดน่าน ประจำปี 2566</p>
                    <p className="header_text3">วันอาทิตย์ที่ 19 กุมภาพันธ์</p>
                </div>
                <div className="all_lottery">
                    <div className="reward_no1">
                        <div className="text_reward">รางวัลที่ 1</div>
                        <p className="text_reward-sub">รถยนต์กระบะ [แค๊ป]</p>
                        <table className="table_five">
                            <thead>
                                <tr>
                                    {reward_no1.map(row => 
                                        <th className="number" key={row.id}>{row.lottery_no}</th>
                                    )}
                                </tr>
                            </thead>
                        </table>
                    <div className="reward_no1">
                        <div className="text_reward">รางวัลที่ 2</div>
                        <p className="text_reward-sub">รถยนต์เก๋ง</p>
                        <table className="table_five">
                            <thead>
                                <tr>
                                    {reward_no2.map(row => 
                                        <th className="number" key={row.id}>{row.lottery_no}</th>
                                    )}
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="reward_no1">
                        <div className="text_reward">รางวัลที่ 3</div>
                            <p className="text_reward-sub">รถจักยานยนต์ จำนวน 5 รางวัล</p>
                        <div className="div_number">
                            <table className="table_five">
                                <thead>
                                    <tr>
                                        {reward_no3.map(row => 
                                            <th className="numbers" key={row.id}>{row.lottery_no}</th>
                                        )}
                                    </tr>
                                </thead>
                            </table>
                        </div>                    
                    </div>
                    <div className="reward_no1">
                        <div className="text_reward">รางวัลที่ 4</div>
                            <p className="text_reward-sub">สร้อยคอทองคำหนัก 2 สลึง จำนวน 10 รางวัล</p>
                        <div className="div_number">
                            <table className="table_five">
                                <thead>
                                    <tr>
                                        {reward_no4.map((row, idx) => 
                                            {if(idx <= 4){return <th className="numbers" key={row.id}>{row.lottery_no}</th>}}
                                        )}
                                    </tr>
                                    <tr>
                                        {reward_no4.map((row, idx) => 
                                            {if(idx > 4){return <th className="numbers" key={row.id}>{row.lottery_no}</th>}}
                                        )}
                                    </tr>
                                </thead>
                            </table>
                        </div>                    
                    </div>
                    <div className="reward_no1">
                        <div className="text_reward">รางวัลที่ 5</div>
                            <p className="text_reward-sub">ตู้เย็น จำนวน 10 รางวัล</p>
                        <div className="div_number">
                            <table className="table_five">
                                <thead>
                                    <tr>
                                        {reward_no5.map((row, idx) =>
                                            {if(idx <= 4){return <th className="numbers" key={row.id}>{row.lottery_no}</th>}}
                                        )}
                                    </tr>
                                    <tr>
                                        {reward_no5.map((row, idx) =>
                                            {if(idx > 4){return <th className="numbers" key={row.id}>{row.lottery_no}</th>}}
                                        )}
                                    </tr>
                                </thead>
                            </table>
                        </div>                    
                    </div>
                    <div className="reward_no1">
                        <div className="text_reward">รางวัลที่ 6</div>
                            <p className="text_reward-sub">ทีวีจอแบน 43 นิ้ว (Smart TV) จำนวน 15 รางวัล</p>
                        <div className="div_number">
                            <table className="table_five">
                                <thead>
                                    <tr>
                                        {reward_no6.map((row, idx) =>
                                            {if(idx <= 4){return <th className="numbers" key={row.id}>{row.lottery_no}</th>}}
                                        )}
                                    </tr>
                                    <tr>
                                        {reward_no6.map((row, idx) =>
                                            {if(idx > 4 && idx <= 9){return <th className="numbers" key={row.id}>{row.lottery_no}</th>}}
                                        )}
                                    </tr>
                                    <tr>
                                        {reward_no6.map((row, idx) =>
                                            {if(idx > 9 && idx <= 14){return <th className="numbers" key={row.id}>{row.lottery_no}</th>}}
                                        )}
                                    </tr>
                                </thead>
                            </table>
                        </div>                    
                    </div>
                    <div className="reward_no1">
                        <div className="text_reward">รางวัลเลขท้าย 3 ตัว</div>
                        <p className="text_reward-sub">เตาปิ้งย่างชาบู จำนวน 200 รางวัล</p>
                        <table className="table_five">
                            <thead>
                                <tr>
                                    {reward_no7.map(row =>
                                        <th className="number" key={row.id}>{row.lottery_no.slice(3)}</th>
                                    )}
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default MainComponent;