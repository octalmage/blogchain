export interface BlogInstance {
  getBlogPostsCount: ContractFunction;
  getBlogPostTitle: ContractFunction;
  getBlogPostContent: ContractFunction;
  getBlogPost: ContractFunction; // TODO: Remove this.
  addBlogPost: Function;
}

interface ContractFunction {
  call: Function;
}

export interface HexPost {
  title: string;
  content: string[];
}

export interface Post {
  title: string;
  content: string;
}

export interface Props {
}

export interface PostState {
  post: Post;
}


export interface State {
  posts: Post[];
}
