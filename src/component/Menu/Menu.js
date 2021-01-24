import React, { useState } from 'react';
import {categoryOptions,industryOptions} from './config'
import styles from './Menu.module.css'
import Button from '../Button/Button'

function Munu({purpose,scene,industry}) {
    const [purposeID,setPurposeID] = useState(purpose||'')
    const [sceneList,setSceneList] = useState([])
    const [sceneID,setSceneID] = useState(scene||'')
    const [industryID,setIndustryID] = useState(industry||'')
    // const [categoryMenuId,setCategoryMenuId] = useState("");
    // const [subCategoryMenuId,setSubCategoryMenuId] = useState("");
    // const [indestryId,setIndestryId] = useState("")

    // useEffect(() => {
    //     console.log(categoryMenuId,subCategoryMenuId,indestryId)
    // }, [categoryMenuId,subCategoryMenuId,indestryId])

    // console.log(menuList)

    return (
        <div className={styles.menu}>
            <div className={styles.menu_item}>
                <span className={styles.menu_item_span}>用途：</span>
                <ul className={styles.menu_item_ul}>
                    {
                        categoryOptions.map(category=>
                            <li 
                                key={category.id} 
                                className={styles.menu_item_li}
                                onClick={()=>{
                                        setPurposeID(category.id)
                                        setSceneList(category.children?category.children:[])
                                    }}
                                >
                                <Button active={category.id===purposeID?true:false}>{category.name}</Button>
                            </li>
                            )
                    }
                </ul>
            </div>
            { !!sceneList.length && (
                <div className={styles.menu_item}>
                    <span className={styles.menu_item_span}>场景：</span>
                    <ul className={styles.menu_item_ul}>
                        <li className={`${styles.menu_item_li} ${sceneID===''?'active':''}`}>
                            <Button active={sceneID===''?true:false}>全部</Button>   
                        </li>
                        {
                            sceneList.map(scene=>
                                <li 
                                    className={styles.menu_item_li} 
                                    key={scene.id}
                                    onClick={()=>{
                                            setSceneID(scene.id)
                                        }}
                                    >
                                    <Button active={scene.id===sceneID?true:false}>{scene.name}</Button>
                                </li>
                                )
                        }
                    </ul>
                </div>
            )}
            <div className={styles.menu_item}>
                <span className={styles.menu_item_span}>行业：</span>
                <ul className={styles.menu_item_ul}>
                    {
                        industryOptions.map(industry=>
                            <li 
                                className={styles.menu_item_li} 
                                key={industry.id}
                                onClick={()=>{
                                    setIndustryID(industry.id)  
                                    console.log(industry.id,industryID)
                                }}
                                >
                                <Button active={industry.id===industryID?true:false}>{industry.name}</Button>
                            </li>
                            )
                    }
                </ul>
            </div>
        </div>
    );    
}

export default Munu;
