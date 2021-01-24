import React, {useRef} from 'react';
import styles from './VideoCard.module.css'
import Button from '../Button/Button'
import Video from '../Video/Video'

const dateDispose = (date) => {
    return (
      parseInt(date / 60) + ':' + (date % 60 < 10 ? '0' + (date % 60) : date % 60)
    );
};

function VideoCard({name,time,poster,src,getData}){
    const videoFatherRef = useRef();

    return (
        <div
            className={styles.video_card}
            onMouseEnter={()=>videoFatherRef.current.handleMouseEnter()}
            onMouseLeave={()=>videoFatherRef.current.handleMouseLeave()}
            onClick={()=>getData({
                name:name,
                time:time,
                poster:poster,
                src:src,
                dateDispose:dateDispose
            })}
            >
            <Video 
                src={src}
                poster={poster}
                ref={videoFatherRef}
            />
            <div className={styles.video_cont}>
                <p className={styles.video_title}>{name}</p>
                <span className={styles.video_date}>{dateDispose(time)}</span>
                <div className={styles.video_btn}>
                    <Button active={true} width="120px">开始制作</Button>
                </div>
            </div>
        </div>
    )
}

export default VideoCard;