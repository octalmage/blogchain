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

  initialized(): Promise<void> {
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

  canAddBlogPost(): boolean {
    // TODO: A localhost Geth HttpProvider can probably add posts, so this will only work for now.
    return this.web3.currentProvider.constructor.name !== 'HttpProvider';
  }

  getBlogPost(id): Promise<Post> {
    return this.initialized()
      .then(() => {
        return Promise.all([
          this.blogInstance.getBlogPostTitle.call(id),
          this.blogInstance.getBlogPostContent.call(id),
          this.blogInstance.getBlogPostAuthor.call(id)
        ]);
      })
      .then((results) => {
        return { title: results[0], content: results[1], author: results[2], id: id };
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

  getBlogPostsByAuthor(author): Promise<Post[]> {
      return this.getBlogPosts().then((all_posts) => all_posts.filter( function(post) { return post.author == author; } ));
  }

  convertPost(post: HexPost): Post {
    return {
      id: post.id,
      author: post.author,
      title: this.web3.toAscii(post.title).replace(/\u0000/g, ''),
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
      })
      .then((response) => {
        return this.waitTx(response.tx)
          .then(() => response); // Return the original response.
      });
  }

  waitTx(txHash: string): Promise<void> {
    return new Promise((resolve, reject) => {
      /*
      * Watch for a particular transaction hash and call the awaiting function when done;
      * Ether-pudding uses another method, with web3.eth.getTransaction(...) and checking the txHash;
      * on https://github.com/ConsenSys/ether-pudding/blob/master/index.js
      */
      let blockCounter = 15;
      // Wait for tx to be finished.
      let filter = this.web3.eth.filter('latest').watch((err, blockHash) => {
        if (blockCounter <= 0) {
          filter.stopWatching();
          filter = null;
          console.warn('!! Tx expired !!');
          return reject();
        }
        // Get info about latest Ethereum block.
        this.web3.eth.getBlock(blockHash, false, (error, block) => {
          --blockCounter;
          // Found tx hash?
          if (block.transactions.indexOf(txHash) > -1) {
            // Tx is finished
            filter.stopWatching();
            filter = null;

            return resolve();
          // Tx hash not found yet?
          } else {
            console.log('Waiting tx..', blockCounter);
          }
        });
      });
    });
  };
}

export default Blog;
