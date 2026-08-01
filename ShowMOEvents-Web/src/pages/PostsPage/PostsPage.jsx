//****************************************************************************************
// Filename: PostsPage.jsx
// Date: 29 July 2026
// Author: Kyle McColgan
// Description: This file contains the posts page for ShowMOEvents.
//****************************************************************************************

import PostForm from "./PostForm";
import PostList from "./PostList";
import usePosts from "../../hooks/usePosts";

const PostsPage = () => {
	const {
		posts,
		loading,
		error,
		createPost,
		updatePost,
		deletePost,
		refresh,
	} = usePosts();
	
	return (
	  <>
	    <PostForm createPost={createPost} />
		
		<PostList
		  posts={posts}
		  loading={loading}
		  error={error}
		  updatePost={updatePost}
		  deletePost={deletePost}
		  refresh={refresh}
		/>
	</>
  );
};

export default PostsPage;