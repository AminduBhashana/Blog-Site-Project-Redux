import { useSelector } from "react-redux";
import { selectPostIds, getPostsStatus, getPostsError } from "./postsSlice";

import PostsExcerpt from "./postsExcept";

const PostsList = () => {
    
    const orderedPostIds = useSelector(selectPostIds)
    const postsStatus = useSelector(getPostsStatus);
    const postsError = useSelector(getPostsError);

   let content;
   if(postsStatus === 'loading'){
    content = <p>"Loading ..."</p>
   }else if(postsStatus === 'succeeded'){
    content = orderedPostIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
   }else if(postsStatus === 'failed'){
    content = <p>{postsError}</p>;
   }

  return (
    <section>
        {content}
    </section>
  )
}

export default PostsList