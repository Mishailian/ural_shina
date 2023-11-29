import { PostBlock } from "../routers/PostsList/blocks/PostBlock";
import {
  filterByConditions,
  filterByCondition,
} from "./filterFunctions/filterFunctions";

const postsFilter = (posts, filter) => {
  switch (filter.filterMetod) {
    case "find":
      break;
    case "choose":
      posts.filter((post) => filterByConditions(post, filter.filterAim));
    case "sort":
      filter.filterAim
        ? (posts = filterByCondition(posts, Object.keys(filter.filterAim)))
        : null;
    default:
      filter.reverse ? (posts = [...posts].reverse()) : posts;
      return posts;
  }
};

export const createPosts = (posts, fillter) => {
  if (fillter.isFilter) {
    posts = postsFilter(posts, fillter);
  }
  return posts.map((post) => <PostBlock data={post} key={post.id} />);
};