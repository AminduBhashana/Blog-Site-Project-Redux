import PostAuthor from "./postAuthor";
import TimeAgo from "./timeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const PostsExcerpt = ({ postId }) => {
  const post = useSelector(state => selectPostById(state, postId))
  return (
    <article>
      <h2>{post.title}</h2>
      <p className="excerpt">{post.body.substring(0, 100)}...</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
      </p>
      <p className="postCredit">
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButtons post={post} />
    </article>
  );
}

export default PostsExcerpt