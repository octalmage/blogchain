import Web3 from 'web3';
import contract from 'truffle-contract';
import { BlogInstance, Post, HexPost } from '../BlogChainInterfaces';
import * as BlogContract from '../../build/contracts/Blog.json';

class Blog {
  public web3: Web3;
  private blogInstance: BlogInstance;
  private getWeb3;

  constructor(getWeb3: object) {
    this.getWeb3 = getWeb3;

    this.convertPost = this.convertPost.bind(this);
  }

  initialized() {
    return new Promise((resolve, reject) => {
      // Short circuit if web3 is already defined.
      if (this.web3) {
        return resolve();
      }

      // Initialize it.
      return this.getWeb3
        .then((results) => {
          this.web3 = results.web3;

          return;
        })
        .then(() => {
          const blog = contract(BlogContract);
          blog.setProvider(this.web3.currentProvider);
          return blog.deployed().then((instance: BlogInstance) => {
            this.blogInstance = instance;
            resolve();
          });
        });
    });
  }

  getBlogPost(id): Promise<Post> {
    return this.initialized()
      .then(() => {
        return Promise.all([
          this.blogInstance.getBlogPostTitle.call(id),
          this.blogInstance.getBlogPostContent.call(id)
        ]);
      })
      .then((results) => {
        return { title: results[0], content: results[1] };
      })
      .then(this.convertPost);
  }

  getBlogPosts(): Promise<Post[]> {
    return this.initialized()
      .then(() => {
        return this.blogInstance.getBlogPostsCount.call();
      })
      .then((count: number) => {
        let tasks: object[] = [];
        for (let i = 0; i < count; i++) {
          tasks.push(this.getBlogPost(i));
        }

        return Promise.all(tasks);
      })
      .then((results) => results.map(result => <Post> result));
  }

  convertPost(post: HexPost): Post {
    return {
      title: this.web3.toAscii(post.title),
      content: post.content.map((line) => {
        return this.web3.toAscii(line).replace(/\u0000/g, '');
      }).join(''),

    };
  }

  addBlogPost(title: string, content: string) {
    return this.initialized()
      .then(() => {
        return new Promise((resolve, reject) => {
          this.web3.eth.getAccounts((error, accounts) => {
            if (error) {
              return reject(error);
            }
            return resolve(accounts);
          });
        });
      })
      .then((accounts) => {
        return this.blogInstance.addBlogPost(title, [content], { from: accounts[0] });
      });
  }
}

export default Blog;
