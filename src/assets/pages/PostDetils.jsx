import React from 'react'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { postContext } from '../../context';
export default function PostDetils() {
    const posts = useContext(postContext);
    const { postId } = useParams();
    const post = posts.find((p) => p.id == postId);
    return (
        <div>
        <h1 style={{background:'#111',textAlign:'center',padding:'1.5rem',color:'orange'}}>
        {post.title}        
        </h1>
        <p>{post.content}</p>
        </div >
    )
}
