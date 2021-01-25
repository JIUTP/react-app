import React, { useRef, useState } from 'react'
import demoData from './demoData'
import Search from '../../component/Search/Search'
import Menu from '../../component/Menu/Menu'
import VideoCard from '../../component/VideoCard/VideoCard' 
import Button from '../../component/Button/Button' 
import styles from './Home.module.css'

import { Modal } from 'antd';

function Home() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalCont, setModalCont] = useState();
    const videoRef = useRef()
    const showModal = () => {
      setIsModalVisible(true);
    };

    // const handleOk = () => {
    //   setIsModalVisible(false);
    // };

    const handleCancel = () => {
      setIsModalVisible(false);
    };
    const getData = (msg) => {
      const videoModal = (
        <div>
          <p className={styles.video_name}>{msg.name}</p>
          <div className={styles.video_warp}>
            <div className={styles.video_modal}>
              <video
                ref={videoRef}
                autoplay="autoplay" 
                controls="controls"
                src={msg.src}
                />
            </div>
            <div className={styles.video_cont}>
              <Button 
                width="172px"
                active={true}
                btnClassName={styles.video_btn}
              >开始制作</Button>
              <p>时长：{msg.dateDispose(msg.time)}</p>
              <p>可编辑文字/图片：图片n张 文字n处</p>
              <p>版权所有：摄图网</p>
            </div>
          </div>
        </div>
      )
      setModalCont(videoModal)
      showModal()
    }

    const getSearch = (msg) =>{
        console.log(msg)
    }
    
    return (
      <div className={styles.home}>
        <div className={styles.banner}>
          <h5>一键套用模板，一分钟学会做视频</h5>
          <Search  getSearch={getSearch} />
        </div>
        <Menu  />
        <div className={styles.video}>
          {
            demoData.results.data.map(({ id, name, time, cover = {}, cover_video = {} } = {})=>
                <VideoCard 
                  key={id}
                  name={name}
                  time={time}
                  poster={cover.max}
                  src={cover_video.small}
                  getData={getData}
                  onClick={showModal}
                />
            )
          }
        </div> 
        <Modal 
          width={1040}
          visible={isModalVisible}
          footer={null}
          destroyOnClose={true}
          onCancel={handleCancel}
          >
          {modalCont}
        </Modal>
      </div>
    );
  }
  
  export default Home;