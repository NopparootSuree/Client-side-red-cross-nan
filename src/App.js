import './App.css';
import { useRef, useState , useEffect } from "react";
import liff from "@line/liff";
import preImage from './img/preview_image.png'
import {initializeApp, getFunctions, httpsCallable, firebaseConfig } from './firebaseConfig'
import Swal from 'sweetalert2'
import MainComponent from './components/MainComponent';
import axios from 'axios'

function App() {

  const app = initializeApp(firebaseConfig)
  const functions = getFunctions(app, 'asia-southeast1')
  var cameraStream = null
  const previewImageRef = useRef(null)
  const input_lottery = useRef(null)
  const cameraRef = useRef(null)
  const snapshotRef = useRef(null)
  const streamRef = useRef(null)
  const canvasRef = useRef(null)

  let [ valueLottery, setValueLottery ] = useState("")

    //Media Streaming
  const startStreaming = () => {
    const mediaSupport = 'mediaDevices' in navigator
    if (mediaSupport && null == cameraStream) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function (mediaStream) {
        cameraStream = mediaStream
        streamRef.current.srcObject = mediaStream
        streamRef.current.play()
      }).catch(function (err) {
        console.log("Unable to access camera: " + err)
      })
    } else {
      alert('Your browser does not support media devices.')
      return
    }
  }

  const captureSnapshot = () => {
    if (null != cameraStream) {
      var ctx = canvasRef.current.getContext('2d')
      ctx.drawImage(streamRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
      previewImageRef.current.src = canvasRef.current.toDataURL("image/png")
      ocr(canvasRef.current.toDataURL("image/png"))
    }
  }

  const stopStreaming = () => {
    if (null != cameraStream) {
      const track = cameraStream.getTracks()[0]
      track.stop()
      streamRef.current.load()
      cameraStream = null
    }
  }

  const getBase64 = (file) => {
    var reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      previewImageRef.current.src = reader.result
      ocr(reader.result)
    }
    reader.onerror = function (error) {
      console.log("Error: ", error)
    }
  }

  const fileInput = (event) => {
    const file = event.target.files[0]
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png']
    if (file) {
      if (validImageTypes.includes(file.type)) {
        previewImageRef.current.style.objectFit = "contain"
        if (liff.isInClient()) {
          previewImageRef.current.style.objectFit = "contain"
        }
        cameraRef.current.style.display = "none"
        snapshotRef.current.style.display = "block"
        getBase64(file)
        stopStreaming()
        let timerInterval
        Swal.fire({
          title: 'Auto close alert!',
          html: 'กรุณารอสักครู่',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
      }
    }
  }

  const btnStream = () => {
    startStreaming()
    cameraRef.current.style.display = "block"
    snapshotRef.current.style.display = "none"
  }

  const btnCapture = () => {
    captureSnapshot()
    cameraRef.current.style.display = "none"
    snapshotRef.current.style.display = "block"
    stopStreaming()
    let timerInterval
  Swal.fire({
    title: 'Auto close alert!',
    html: 'กรุณารอสักครู่',
    timer: 100,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
}).then((result) => {
  /* Read more about handling dismissals below */
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})
  }

  // Functions OCR With Base64
  function ocr(base64encoded) {
    const myCallable = httpsCallable(functions, 'myCallable');
    myCallable({ base64: base64encoded }).then((lottery) => {
      
      const { result } = lottery.data
      const regex = /\d{6}/g;
      const lottery_ocr = result.match(regex);
      console.log(lottery_ocr);
      if(lottery_ocr === null){
        Swal.fire(`กรุณาถ่ายใหม่ให้เห็นเลขสลาก`,'ตั้งกล้องในแนวตั้ง','error')
      }else{
        lottery_ocr.forEach(lotterys => {
          axios.post(`${process.env.REACT_APP_API}/checkLottery`, {lottery_no: lotterys})
          .then((result) => {
            const check_lottery = result.data
            if(check_lottery.length === 0){
              Swal.fire(`คุณไม่ถูกรางวัล`,'กรุณารอสักครู่','error')
            }else{
              if(check_lottery.length === 1){
                Swal.fire(`คุณถูกรางวัลที่ ${check_lottery[0].reward_no}`,`สลากหมายเลข ${check_lottery[0].lottery_no}`,'success')
              }
    
              if(check_lottery.length === 2){
                Swal.fire(`คุณถูกรางวัลที่ ${check_lottery[0].reward_no}\nและรางวัลเลขท้าย 3 ตัว`,`สลากหมายเลข ${check_lottery[0].lottery_no} `,'success')
              }
              
            }
          })
        });
      }
    }).catch((error) => {
      console.error(error.code, error.message);
    });
  }

  const massage_intro = '📦ผลการออกสลากกาชาดการกุศล จังหวัดน่าน ประจำปี 2566📦\nรางวัลผลสลาก มีดังนี้ \n🌸รางวัลที่ 1 รถยนต์กระบะ (แค๊ป) จำนวน 1 รางวัล \n🌸รางวัลที่ 2 รถยนต์เก๋ง จำนวน 1 รางวัล \n🌸รางวัลที่ 3 รถจักรยานยนต์ จำนวน 5 รางวัล \n🌸รางวัลที่ 4 สร้อยคอทองคำหนัก 2 สลึง จำนวน 10 รางวัล \n🌸รางวัลที่ 5 ตู้เย็น จำนวน 10 รางวัล\n🌸รางวัลที่ 6 ทีวีจอแบน 43 นิ้ว จำนวน 15 รางวัล\n🌸รางวัลเลขท้าย 3 ตัว เตาปิ้งย่างชาบู จำนวน 200 รางวัล\n✏️💌สามารถตรวจสอบการออกสลากได้ตั้งแต่วันที่ 20 กุมภาพันธ์ 2566 \n🚗ศาลากลางจังหวัดน่าน 🚗ที่ว่าการอำเภอ ทุกอำเภอในจังหวัดน่าน 🚗www.nan.go.th หรือ \n🎈🎈ผ่านทางไลน์นี้ (งานของดีเมืองน่าน)\n ........................ \n📦ติดต่อขอรับรางวัลได้ที่ ✌🏻กลุ่มงานการเงินและบัญชี ที่ทำการปกครองจังหวัดน่าน 😘 \n📞โทร. 0-5471-6412 \n⏰ระหว่างวันที่ 20 กุมภาพันธ์ - 20 เมษายน 2566'
  const delay_intro = () => {
    const myTimeout = setTimeout(Swal.fire(`${massage_intro}`), 5000);
  }

  useEffect(() => { 
    delay_intro()
    liff.init({ liffId: `${process.env.REACT_APP_LOTTERY}` }, () => { 
      if (liff.isLoggedIn()) {
        liff.getProfile().then(profile => {
        })
        .catch((err => console.log(err)))
      } else {
        liff.login();
      }
    }, err => console.log(err));

  },[])

  const handleChange = (event) => {
    setValueLottery(event.target.value)
    console.log(event.target.value);
  }

  const submitLottery = async (event) => {
    event.preventDefault()
    axios.post(`${process.env.REACT_APP_API}/checkLottery`, {lottery_no: valueLottery})
    .then((result) => {
      const check_lottery = result.data
      if(check_lottery.length === 0){
        Swal.fire(`คุณไม่ถูกรางวัล`,`สลากหมายเลข ${valueLottery}`,'error')
      }else{
        if(check_lottery.length === 1){
          if(check_lottery[0].reward_no === 7){
            Swal.fire(`คุณถูกรางวัลเลขท้าย 3 ตัว`,`สลากหมายเลข ${valueLottery}`,'success')
          }else{
            Swal.fire(`คุณถูกรางวัลที่ ${check_lottery[0].reward_no}`,`สลากหมายเลข ${check_lottery[0].lottery_no}`,'success')
          }
          
        }

        if(check_lottery.length === 2){
          Swal.fire(`คุณถูกรางวัลที่ ${check_lottery[0].reward_no}\nและรางวัลเลขท้าย 3 ตัว`,`สลากหมายเลข ${check_lottery[0].lottery_no} `,'success')
        }
      }
    })

  }

  return (
    <div>
      {
          <div id="container">
            <div id="camera" ref={cameraRef}>
              <video id="stream" width="100%" height="450" ref={streamRef}></video>
              <div onClick={() => btnCapture()}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <canvas id="canvas" width="1920" height="1080" ref={canvasRef}></canvas>
            <div id="snapshot" ref={snapshotRef}>
              <img src={preImage} alt="" id="img1" width="100%" ref={previewImageRef}/>
            </div>
            <div className="button-group">
              <button id="btnStream" type="button" className="button" onClick={() => btnStream()}>ถ่ายรูป</button>
              <label id="picture" htmlFor="file" className="label custom-file-upload">เพิ่มรูปภาพ</label>
              <input id="file" name="file" type="file" accept="image/*" onChange={fileInput}/>
            </div>
            <p className='or'>หรือ</p>
            <div className='input_box'>
              <div>
                <input type="text" className='input_lottery' name="lottery_no" placeholder="กรอกเลขสลากกาชาด" ref={input_lottery} onChange={handleChange} value={valueLottery} maxLength={6}/> 
              </div>
              <button className='button_submit' onClick={submitLottery}>ตรวจสลาก</button>
            </div>
            <MainComponent />
          </div>
      }
      
    </div>
  );
}

export default App;