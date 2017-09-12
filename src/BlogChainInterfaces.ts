import Web3 from 'web3';

export interface BlogInstance {
  getBlogPostsCount: ContractFunction;
  getBlogPost: ContractFunction;
}

interface ContractFunction {
  call: Function;
}

export interface Post {
  title: string;
  content: string;
}

export interface Props {
}

export interface PostState {
  title: string;
  content: string;
  web3: Web3;
}


export interface State {
  posts: Post[];
  web3: Web3;
}

