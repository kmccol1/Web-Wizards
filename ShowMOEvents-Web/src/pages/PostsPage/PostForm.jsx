//****************************************************************************************
// Filename: PostForm.jsx
// Date: 29 July 2026
// Author: Kyle McColgan
// Description: This file contains the form for creating posts for ShowMOEvents.
//****************************************************************************************

import React, { useState } from 'react';
import "../../hooks/usePosts";

const PostForm = ({ createPost }) => {
    const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	
	const handleSubmit = async (event) => {
		event.preventDefault();
		
		console.log("Submitting post:", { title, content });
		
		try
		{
			await createPost({
				title,
				content,
			});
			
			setTitle("");
			setContent("");
		}
		catch (error)
		{
			console.error(error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Title: </label>
				<input type = "text" value = {title} onChange = {(e) => setTitle(e.target.value)} />
			</div>
			<div>
				<label>Content: </label>
				<textarea value = {content} onChange = {(e) => setContent(e.target.value)}> </textarea>
			</div>
			<button type="submit"> Add Post </button>
		</form>
	);
};

export default PostForm;