export interface BlogInstance {
  getBlogPostsCount: ContractFunction;
  getBlogPostTitle: ContractFunction;
  getBlogPostContent: ContractFunction;
  getBlogPostAuthor: ContractFunction;
  getBlogPost: ContractFunction; // TODO: Remove this.
  addBlogPost: Function;
}

interface ContractFunction {
  call: Function;
}

export interface HexPost {
  title: string;
  content: string[];
  author: string;
}

export interface Post {
  title: string;
  content: string;
  author: string;
}

export interface Props {
}

export interface PostState {
  post: Post;
}


export interface State {
  posts: Post[];
  canAddBlogPost: boolean;
}
