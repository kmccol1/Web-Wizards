//****************************************************************************************
// Filename: usePosts.js
// Date: 29 July 2026
// Author: Kyle McColgan
// Description: This file contains a custom posts hook for ShowMOEvents.
//****************************************************************************************

import { useCallback, useEffect, useState, useContext } from "react";
import { postService } from "../services/postService";
import { AuthContext } from "../context/AuthContext";

export default function usePosts()
{
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { accessToken } = useContext(AuthContext);
	
	//console.log("usePosts accessToken:", accessToken);
	
	const refresh = useCallback(async () => {
		try
		{
			setLoading(true);
			
			const data = await postService.getAll(accessToken);
			
			setPosts(data);
			setError(null);
		}
		catch (error)
		{
			console.error(error);
			setError(error);
		}
		finally
		{
			setLoading(false);
		}
	}, [accessToken]);
	
	useEffect(() => {
		refresh();
	}, [refresh]);
	
	const createPost = async (post) => {
		console.log("usePosts.createPost called:", post);
		console.log("JWT:", accessToken);
		const created = await postService.create(post, accessToken);
		
		setPosts((previous) => [created, ...previous]);
		
		return created;
	};
	
	const updatePost = async (id, updatedValues) => {
		const updated = await postService.update(id, updatedValues, accessToken);
		
		setPosts((previous) =>
		  previous.map((post) =>
		    post.id === id ? updated : post
		  )
		);
		
		return updated;
	};
	
	const deletePost = async (id) => {
		await postService.remove(id, accessToken);
		
		setPosts((previous) =>
		  previous.filter((post) => post.id !== id)
		);
	};
	
	return {
		posts,
		loading,
		error,
		refresh,
		createPost,
		updatePost,
		deletePost,
	};
}