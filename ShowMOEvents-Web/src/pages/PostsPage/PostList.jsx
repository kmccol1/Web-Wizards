//****************************************************************************************
// Filename: PostList.jsx
// Date: 31 July 2026
// Author: Kyle McColgan
// Description: This file contains the posts lists for ShowMOEvents.
//****************************************************************************************

import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";
import PostForm from './PostForm';
import EditPostForm from './EditPostForm';
import Comments from '../../Comments';

const PostList = ({
	posts,
	loading,
	error,
	updatePost,
	deletePost,
	refresh,
}) => {
	const [editTitle, setEditTitle] = useState('');
	const [editContent, setEditContent] = useState('');
	const [editingPostId, setEditingPostId] = useState(null);
    const [visibleComments, setVisibleComments] = useState({});

    const { user, accessToken } = useContext(AuthContext);
	const username = user?.username;
	const [userId, setUserId] = useState(null);
		
	const handleTitleChange = (e) => setEditTitle(e.target.value);
	const handleContentChange = (e) => setEditContent(e.target.value);

	const handleEdit = (post) => {
		setEditingPostId(post.id);
		setEditTitle(post.title);
		setEditContent(post.content);
	};

	const handleEditSubmit = async (e, postId) => {
		e.preventDefault(); //Prevent the default form submission behavior...
		
		await updatePost(postId, {
			title: editTitle,
			content: editContent,
		});
		
		setEditingPostId(null);
		setEditTitle("");
		setEditContent("");
	};
	const handleDelete = async(index) => {
		try
		{
			//Get the updated post's ID...
			const postID = posts[index].id;
			
			try
			{
				await deletePost(postID);
			}
			catch (error)
			{
				console.error(error);
			}
		}
		catch(error)
		{
			console.error('There was an error deleting the post!', error);
		}
	};

	const defaultUserId = 'guest'; //Default user ID for non-signed in users...

	const handleViewComments = (index) => {
		//Logic to show/hide comments goes here...
		setVisibleComments((prevState) => ({
			...prevState,
			[index]: !prevState[index],
		}));
	};
	
	return (
	    <div>
		{posts.map((post,index) => (
		<div key={post.id} className="post">
			{editingPostId === post.id ? (
			    <form onSubmit={(e) => handleEditSubmit(e, post.id)}>
				<input
				  type="text"
				  value={editTitle}
				  onChange={handleTitleChange}
				/>
				<textarea
				  value={editContent}
				  onChange={handleContentChange}
				/>
			<button type="submit">Save</button>
	    </form>

		) : (
		<div>
		  <h2>{post.title}</h2>
		  <p>{post.content}</p>
		  <button onClick={() => handleEdit(post)}>Edit</button>
		  <button onClick={() => handleDelete(index)}>Delete</button>
		  <button onClick = {() => handleViewComments(index)}>
		    {visibleComments[index] ? 'Hide Comments' : 'View All Comments'}
		  </button>
		  {visibleComments[index] && <Comments postId={post.id} userId={userId} onCommentAdded={refresh} /> }
	    </div>
	    )}
	  </div>
	))}
	</div>
	);
};

export default PostList;