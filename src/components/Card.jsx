import React from 'react'
import './Card.css'
import { CiStar } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
const Card = ({ data }) => {
    return (
        <div className='card'>
            <img src={data.owner.avatar_url} alt="Image loading" />
            <div className='card-content'>
                <div className='repoHead'>
                    <h2 className='repo-title'><span style={{'color':'green','fontSize':'120%'}}>{data.name}</span> by <span ><i>{data.owner.login}</i></span> </h2>
                    <p>{data.description}</p>
                </div>
                <hr></hr>
                <div className='repoInfo'>
                    <button><a href={data.html_url}>Read More</a></button>
                    <div className='star'>
                        <CiStar className='star-icon' />
                        <p>{data.stargazers_count}</p>
                    </div>
                    <div className='issue'>
                        <MdErrorOutline className='issue-icon' />
                        <p>{data.open_issues_count}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
