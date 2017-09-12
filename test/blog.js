var Blog = artifacts.require('Blog');

contract('Blog', (accounts) => {
  it('should create a blog post and return the ID.', function() {
    return Blog.deployed().then((instance) => {
      return instance.addBlogPost('Test', ['Test Content'], { from: accounts[0] });
    }).then(() => {
      return Blog.deployed();
    }).then((instance) => {
      return instance.getBlogPostsCount.call();
    }).then((count) => {
        assert.equal(count, 1, "1 wasn't the returned count.");
    });
  });

  it('should return the post title.', function() {
    return Blog.deployed().then((instance) => {
      return instance.getBlogPostTitle.call(0);
    }).then((title) => {
      var convertedTitle = web3.toAscii(title).replace(/\u0000/g, '');
      assert.equal(convertedTitle, 'Test');
    });
  });

  it('should return the post content.', function() {
    return Blog.deployed().then((instance) => {
      return instance.getBlogPostContent.call(0);
    }).then((content) => {
      const convertedContent = content.map((line) => {
        return web3.toAscii(line).replace(/\u0000/g, '');
      }).join('');

      assert.equal(convertedContent, 'Test Content');
    });
  });
});
