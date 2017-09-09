pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Blog.sol";

contract TestBlog {
	Blog blog = Blog(DeployedAddresses.Blog());

	function testUserCanAddBlogPost() {
		uint returnedId = blog.addBlogPost("Test Title", "Test Content");

		uint expected = 0;

		Assert.equal(returnedId, expected, "Blog post ID of 0 should be returned.");
	}

	function testUserCanGetBlogPostsCount() {
		uint returnedCount = blog.getBlogPostsCount();

		uint expected = 1;

		Assert.equal(returnedCount, expected, "Count of 1 should be returned.");
	}

	function testUserCanGetBlogPost() {
		var (returnedTitle, returnedContent) = blog.getBlogPost(0);

		Assert.equal(returnedTitle, "Test Title", "Count of 1 should be returned.");
		Assert.equal(returnedContent, "Test Content", "Count of 1 should be returned.");
	}
}
