import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";
import PostAuthor from "./postAuthor";
import TimeAgo from "./timeAgo";
import ReactionButtons from "./ReactionButtons";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SinglePostPage = () => {
    const { postId } = useParams()
    console.log(postId,typeof postId)
    const post = useSelector((state) => selectPostById(state, Number(postId)))
    if(!post){
        return (
            <section>
                <h2>Page not found</h2>
            </section>
        )
    }
    return (
        <article>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <p className="postCredit">
            <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
            <PostAuthor userId={post.userId} />
          </p>
          <p className="postCredit">
            <TimeAgo timestamp={post.date} />
          </p>
          <ReactionButtons post={post} />
        </article>
      );
}

export default SinglePostPage