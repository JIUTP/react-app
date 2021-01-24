import React, {useRef,useState} from 'react';
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

function Search(){
    const searchRef = useRef()
    const [searchVal,setSearchVal] = useState('')
    const [visible,setVisible] = useState(false)
    function searchChange(event){
        setSearchVal(event.target.value)
    }

    function keyDownEnter(event){
        if(event.keyCode === 13){
            alert(searchVal)
        }
    }

    function btn(){
        alert(searchVal)
    }

    const searchMenu = ()=>{
        if(searchVal===''){
            return (
                <div className={styles.search_menu}>
                    <div className={styles.recent_search}>
                        <div>
                            <ClockCircleOutlined className={styles.icon} />
                            最近搜索：
                        </div>
                        <p>
                            {
                                search_item.map(item=>
                                    <span 
                                        onClick={(e)=>{
                                            
                                            console.log(2)
                                            setSearchVal(item.name)
                                        }} 
                                        key={item.id}
                                        >{item.name}</span>    
                                )
                            }
                        </p>
                    </div>
                    <ul className={styles.search_ranking}>
                        {
                            searchData.data.map((item,index)=>
                                <li 
                                    className={styles.search_ranking_item}
                                    key={item.name}
                                    onClick={()=>setSearchVal(item.name)}
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
                                onClick={()=>setSearchVal(item.name)}
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
                // trigger={['click']}
                visible={visible}
            >
                <input 
                    type="text" 
                    value={searchVal}
                    placeholder="请输入搜索关键词" 
                    className={styles.search_input}
                    onChange={searchChange}
                    onBlur={()=>setVisible(false)}
                    onFocus={()=>setVisible(true)}
                    ref={searchRef} 
                    ></input>
            </Dropdown>
            <Button active="true" width='110px' btnClassName={styles.enter_btn} 
                onClick={btn}
                >
                <SearchOutlined />
                <span>搜索</span>
            </Button>
        </div>
    )
}

export default Search;