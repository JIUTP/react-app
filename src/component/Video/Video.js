
import React, {useRef,useState,useEffect,forwardRef,useImperativeHandle} from 'react';
import styles from './Video.module.css'

function Video({ src, poster}, ref){
    const videoRef = useRef();
    const [showPoster, toggleShowPoster] = useState(true);
    const [hasInteract, toggleHasInteract] = useState(() => false);

    useEffect(() => {
        const handleClick = () => {
            toggleHasInteract(true);
            document.removeEventListener('click', handleClick);
        };
        document.addEventListener('click', handleClick);
    }, []);

    const handleMouseEnter = () => {
        toggleShowPoster(false);
        videoRef.current.play();
    };
    const handleMouseLeave = () => {
        toggleShowPoster(true);
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    };

    useImperativeHandle(ref, () => {
        return {
            target: videoRef.current,
            handleMouseEnter,
            handleMouseLeave
        };
    });
    return (
        <div 
            className={styles.video_wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img 
                className={styles.video_img}
                src={poster} 
                style={{ display: showPoster ? 'block' : 'none' }} 
                alt=""
            />
            <video 
                className={styles.video}
                ref={videoRef}
                src={src}
                loop
                {...(!hasInteract && { muted: true })}
            />
        </div>
    )
}

export default React.memo(forwardRef(Video));