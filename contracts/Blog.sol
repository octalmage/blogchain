pragma solidity ^0.4.4;

contract Blog {
  address owner;

  // Constructor.
  function Blog() { owner = msg.sender; }

  // Function to kill the contract.
  function kill() { if (msg.sender == owner) selfdestruct(owner); }

  struct BlogPost {
    bytes32 title;
    // Contracts cannot return strings to other conracts, so this is bytes32 for now.
    // The test needs to read the content, so we need this to be bytes32 for now.
    // It's possible to read it from JavaScript though, so we could rewrite the tests in JavaScript.
    // Or we could split the content, apparently bytes32 is much more efficient.
    bytes32 content;
  }

  BlogPost[] public BlogPosts;

  function addBlogPost(bytes32 title, bytes32 content) public returns (uint) {
    require(msg.sender == owner);

    BlogPosts.push(BlogPost(title, content));

    return BlogPosts.length - 1;
  }

  function getBlogPostsCount() public constant returns(uint) {
    return BlogPosts.length;
  }

  function getBlogPost(uint index) public returns(bytes32, bytes32) {
    return (BlogPosts[index].title, BlogPosts[index].content);
  }

}
