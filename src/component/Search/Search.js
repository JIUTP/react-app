import React, {useState,useEffect,useRef} from 'react';
import { Dropdown } from 'antd'
import { SearchOutlined , ClockCircleOutlined} from '@ant-design/icons'
import Button from '../Button/Button'
import styles from './Search.module.css'
import {searchData} from './searchData'

const search_item = [
    {
        id:0,
        name:'任大大'
    },
    {
        id:1,
        name:'任爸爸'
    },{
        id:2,
        name:'任哥哥'
    }
]

function Search({getSearch}){
    let storage = window.localStorage
    const searchRef = useRef()
    const [searchVal,setSearchVal] = useState('')
    // const [visible,setVisible] = useState(false)

    const keyDownEnter = (event)=>{
        if(event.keyCode === 13){
            searchRef.current.blur()
            setstorage()
        }
    }

    const searchBtn = () => {
        setstorage()
    }

    const clickDropdown = (item) => {
        setSearchVal(item)
        setstorage()
    }

    const setstorage = () => {
        if(storage.getItem("editor_search_history")){
            let arr = JSON.parse(storage.getItem("editor_search_history"))
            arr.unshift(searchVal)
            storage.setItem("editor_search_history",JSON.stringify(arr))
        }else{
            storage.setItem("editor_search_history",JSON.stringify([searchVal]))
        }
        getSearch(searchVal)
    }

    useEffect(() => {
        // console.log(searchVal)
    }, [searchVal])

    const searchMenu = () => {
        if(searchVal===''){
            return (
                <div className={styles.search_menu}>
                    {
                       storage.getItem("editor_search_history") && (
                            <div className={styles.recent_search}>
                                <div>
                                    <ClockCircleOutlined className={styles.icon} />
                                    最近搜索：
                                </div>
                                <p>
                                    {
                                        
                                        JSON.parse(storage.getItem("editor_search_history")).map((item,index)=>
                                            <span 
                                                onClick={(e)=>{
                                                    clickDropdown(item)
                                                }} 
                                                key={index}
                                                >{item}</span>    
                                        )
                                    }
                                </p>
                            </div>
                       ) 
                    }
                    <ul className={styles.search_ranking}>
                        {
                            searchData.data.map((item,index)=>
                                <li 
                                    className={styles.search_ranking_item}
                                    key={index}
                                    onClick={()=>clickDropdown(item.name)}
                                    >
                                    <span>
                                        <i>{++index}</i>
                                        <b>{item.name}</b>
                                    </span>
                                    <span>{item.total}结果</span>
                                </li>
                            )
                        }
                    </ul>
                </div>
            ) 
        }else{
            return (
                <div className={styles.search_menu}>
                    {
                        search_item.map(item=>
                            <p 
                                className={styles.search_item} 
                                key={item.id}
                                onClick={()=>clickDropdown(item.name)}
                                >{item.name}</p>
                        )
                    }
                </div>
            )
        }
    }

    return (
        <div 
            className={styles.search_wrapper}
            onKeyDown={keyDownEnter}
            >
            <Dropdown 
                overlay={searchMenu}
                trigger={['click']}
                // visible={visible}
            >
                <input 
                    type="text"
                    ref={searchRef} 
                    value={searchVal}
                    placeholder="请输入搜索关键词" 
                    className={styles.search_input}
                    onChange={event=>setSearchVal(event.target.value)}
                    // onBlur={()=>setVisible(false)}
                    // onFocus={()=>setVisible(true)}
                    ></input>
            </Dropdown>
            <Button active="true" width='110px' btnClassName={styles.enter_btn} 
                onClick={searchBtn}
                >
                <SearchOutlined />
                <span>搜索</span>
            </Button>
        </div>
    )
}

export default Search;