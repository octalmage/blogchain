# Blogchain

First install the required dependencies:

```
npm install -g ethereumjs-testrpc
npm install -g truffle
```

Then open a new terminal window and run:

```
testrpc
```

This creates a mock Ethereum blockchain that we can deploy our contracts to. You'll need to leave this open while developing.

Compile the smart contract with:

```
truffle compile
```

This produces the contract bytecode and JavaScript ABI interface.

Now we need to deploy our smart contract, you can do this using:

```
truffle migrate --reset
```

The `--reset` allows us to redeploy and start over if needed.

Almost done, just run `npm start` to open the HTML interface! Now you're ready to go.

If everything worked you should see a page that says "Loading...".

There aren't any posts on your blog yet so it will think it's still loading.
