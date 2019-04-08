webpackJsonp([4067072414580],{426:function(n,s){n.exports={data:{allPostTitles:{edges:[{node:{frontmatter:{title:"Actor Communication",lesson:2,programming_language:"reasonml",chapter:2,type:"lesson"},fields:{slug:"/actor-communication"}}},{node:{frontmatter:{title:"Adapters",lesson:6,programming_language:"reasonml",chapter:2,type:"lesson"},fields:{slug:"/adapters"}}},{node:{frontmatter:{title:"Decoders and Encoders",lesson:2,programming_language:"reasonml",chapter:4,type:"lesson"},fields:{slug:"/decoders-and-encoders"}}},{node:{frontmatter:{title:"Hierarchy",lesson:4,programming_language:"reasonml",chapter:2,type:"lesson"},fields:{slug:"/hierarchy"}}},{node:{frontmatter:{title:"Introduction",lesson:1,programming_language:"reasonml",chapter:1,type:"lesson"},fields:{slug:"/introduction"}}},{node:{frontmatter:{title:"Persist",lesson:1,programming_language:"reasonml",chapter:3,type:"lesson"},fields:{slug:"/persist"}}},{node:{frontmatter:{title:"Persistent Queries",lesson:4,programming_language:"reasonml",chapter:3,type:"lesson"},fields:{slug:"/persistent-queries"}}},{node:{frontmatter:{title:"Querying",lesson:3,programming_language:"reasonml",chapter:2,type:"lesson"},fields:{slug:"/querying"}}},{node:{frontmatter:{title:"Snapshotting",lesson:2,programming_language:"reasonml",chapter:3,type:"lesson"},fields:{slug:"/snapshotting"}}},{node:{frontmatter:{title:"Supervision",lesson:5,programming_language:"reasonml",chapter:2,type:"lesson"},fields:{slug:"/supervision"}}},{node:{frontmatter:{title:"Timeouts",lesson:3,programming_language:"reasonml",chapter:3,type:"lesson"},fields:{slug:"/timeouts"}}}]},postBySlug:{html:'<p>You start to see the biggest benefit from snapshotting best when your state is small in size, and persisted events are many.\nHowever sometimes you may on occasion need to render a sequence of events into a different form.</p>\n<p>For example a real world problem I had was being able to view a list of transactions which modified a domain entity. You may not need this sequence all the time, but it is still required to be there. The problem with storing all the events in state is that now your state is just slightly larger than the sequence of events which led to that state, and hence snapshotting in fact counter productive. This is a dichotomy solved by the <a href="https://martinfowler.com/bliki/CQRS.html">CQRS pattern</a>. </p>\n<p>Nact provides the persistent query feature as a light-weight (but powerful) form of CQRS. A persistent query takes in a persistent key, and returns a function which when invoked replays the persisted events, building a result which is finally returned as a promise. A persistent query is lazy in that it only retrieves events when forced. It may be invoked any number of times, each time checking for new events. The result and sequence number of the query are cached with an optional timeout, and the result may optionally also be snapshotted every given number of messages. </p>\n<p>Here is a practical example of how a persistent query is useful. The example models a simplified wallet. The actor\'s state holds the current balance, the wallet id, and a persistent query which represents the list of transactions. An important feature to note in this example is the use of encoders and decoders. This is especially necessary as the state is now no longer just static data, it also contains a dynamic value. </p>\n<div class="gatsby-highlight">\n      <pre class="language-reason"><code><span class="token keyword">open</span> <span class="token constructor variable">Nact</span><span class="token punctuation">;</span>\n\n<span class="token keyword">open</span> <span class="token class-name">Nact</span><span class="token punctuation">.</span><span class="token constructor variable">Operators</span><span class="token punctuation">;</span>\n\n<span class="token keyword">module</span> <span class="token constructor variable">Transaction</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token keyword">type</span> t <span class="token operator">=</span> <span class="token punctuation">{</span>\n    amount<span class="token punctuation">:</span> int<span class="token punctuation">,</span>\n    createdAt<span class="token punctuation">:</span> <span class="token class-name">Js</span><span class="token punctuation">.</span><span class="token class-name">Date</span><span class="token punctuation">.</span>t<span class="token punctuation">,</span>\n    reference<span class="token punctuation">:</span> string<span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">module</span> <span class="token constructor variable">Wallet</span> <span class="token operator">=</span> <span class="token punctuation">{</span>\n  <span class="token keyword">type</span> id <span class="token operator">=</span>\n    <span class="token operator">|</span> <span class="token constructor variable">WalletId</span><span class="token punctuation">(</span>string<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token keyword">type</span> t <span class="token operator">=</span> <span class="token punctuation">{</span>\n    balance<span class="token punctuation">:</span> int<span class="token punctuation">,</span>\n    id<span class="token punctuation">,</span>\n    transactions<span class="token punctuation">:</span> unit <span class="token operator">=></span> <span class="token class-name">Js</span><span class="token punctuation">.</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>t<span class="token punctuation">(</span>list<span class="token punctuation">(</span><span class="token class-name">Transaction</span><span class="token punctuation">.</span>t<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> transactionsQuery <span class="token operator">=</span> <span class="token punctuation">(</span>parent<span class="token punctuation">,</span> id<span class="token punctuation">)</span> <span class="token operator">=></span>\n  <span class="token class-name">Nact</span><span class="token punctuation">.</span>persistentQuery<span class="token punctuation">(</span>\n    <span class="token operator">~</span>key<span class="token operator">=</span><span class="token string">"wallet"</span> <span class="token operator">+</span><span class="token operator">+</span> id<span class="token punctuation">,</span>\n    <span class="token operator">~</span>cacheDuration<span class="token operator">=</span><span class="token number">20</span> <span class="token operator">*</span> minutes<span class="token punctuation">,</span>\n    parent<span class="token punctuation">,</span>\n    state <span class="token operator">=></span>\n      <span class="token keyword">fun</span>\n      <span class="token operator">|</span> <span class="token operator">`</span><span class="token constructor variable">Transaction</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token class-name">Js</span><span class="token punctuation">.</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>resolve<span class="token punctuation">(</span><span class="token punctuation">[</span>t<span class="token punctuation">,</span> <span class="token operator">...</span>state<span class="token punctuation">]</span><span class="token punctuation">)</span>\n      <span class="token operator">|</span> _ <span class="token operator">=></span> <span class="token class-name">Js</span><span class="token punctuation">.</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>resolve<span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> stateDecoder <span class="token operator">=</span> <span class="token punctuation">(</span>parent<span class="token punctuation">,</span> json<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">open</span> <span class="token class-name">Json</span><span class="token punctuation">.</span><span class="token constructor variable">Decode</span><span class="token punctuation">;</span>\n  <span class="token keyword">let</span> id <span class="token operator">=</span> field<span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">,</span> string<span class="token punctuation">,</span> json<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">{</span>\n    <span class="token class-name">Wallet</span><span class="token punctuation">.</span>id<span class="token punctuation">:</span> <span class="token class-name">Wallet</span><span class="token punctuation">.</span><span class="token constructor variable">WalletId</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    balance<span class="token punctuation">:</span> field<span class="token punctuation">(</span><span class="token string">"balance"</span><span class="token punctuation">,</span> int<span class="token punctuation">,</span> json<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    transactions<span class="token punctuation">:</span> transactionsQuery<span class="token punctuation">(</span>parent<span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">,</span>\n  <span class="token punctuation">}</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> stateEncoder <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">{</span>id<span class="token punctuation">:</span> <span class="token constructor variable">WalletId</span><span class="token punctuation">(</span>id<span class="token punctuation">)</span><span class="token punctuation">,</span> balance<span class="token punctuation">}</span><span class="token punctuation">:</span> <span class="token class-name">Wallet</span><span class="token punctuation">.</span>t<span class="token punctuation">)</span> <span class="token operator">=></span>\n  <span class="token class-name">Json</span><span class="token punctuation">.</span><span class="token class-name">Encode</span><span class="token punctuation">.</span><span class="token punctuation">(</span>\n    object_<span class="token punctuation">(</span><span class="token punctuation">[</span>\n      <span class="token punctuation">(</span><span class="token string">"id"</span><span class="token punctuation">,</span> id <span class="token operator">|</span><span class="token operator">></span> <span class="token class-name">Json</span><span class="token punctuation">.</span><span class="token class-name">Encode</span><span class="token punctuation">.</span>string<span class="token punctuation">)</span><span class="token punctuation">,</span>\n      <span class="token punctuation">(</span><span class="token string">"balance"</span><span class="token punctuation">,</span> balance <span class="token operator">|</span><span class="token operator">></span> <span class="token class-name">Json</span><span class="token punctuation">.</span><span class="token class-name">Encode</span><span class="token punctuation">.</span>int<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">]</span><span class="token punctuation">)</span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> spawnWallet <span class="token operator">=</span> <span class="token punctuation">(</span>walletId<span class="token punctuation">,</span> parent<span class="token punctuation">)</span> <span class="token operator">=></span>\n  spawnPersistent<span class="token punctuation">(</span>\n    parent<span class="token punctuation">,</span>\n    <span class="token operator">~</span>key<span class="token operator">=</span><span class="token string">"wallet"</span> <span class="token operator">+</span><span class="token operator">+</span> walletId<span class="token punctuation">,</span>\n    <span class="token operator">~</span>stateEncoder<span class="token punctuation">,</span>\n    <span class="token operator">~</span>stateDecoder<span class="token operator">=</span>stateDecoder<span class="token punctuation">(</span>parent<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token operator">~</span>snapshotEvery<span class="token operator">=</span><span class="token number">5</span> <span class="token operator">*</span> messages<span class="token punctuation">,</span>\n    <span class="token punctuation">(</span>state<span class="token punctuation">,</span> msg<span class="token punctuation">,</span> <span class="token punctuation">{</span>recovering<span class="token punctuation">,</span> persist<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n      <span class="token keyword">switch</span> <span class="token punctuation">(</span>msg<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token operator">|</span> <span class="token operator">`</span><span class="token constructor variable">Transaction</span><span class="token punctuation">(</span><span class="token punctuation">(</span>t<span class="token punctuation">:</span> <span class="token class-name">Transaction</span><span class="token punctuation">.</span>t<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n        <span class="token punctuation">(</span>recovering <span class="token operator">?</span> <span class="token class-name">Js</span><span class="token punctuation">.</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>resolve<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">:</span> persist<span class="token punctuation">(</span><span class="token operator">`</span><span class="token constructor variable">Transaction</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>\n        <span class="token operator">|</span><span class="token operator">></span> <span class="token class-name">Js</span><span class="token punctuation">.</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>then_<span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span>\n             <span class="token class-name">Js</span><span class="token punctuation">.</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>resolve<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token operator">...</span>state<span class="token punctuation">,</span> balance<span class="token punctuation">:</span> state<span class="token punctuation">.</span>balance <span class="token operator">+</span> t<span class="token punctuation">.</span>amount<span class="token punctuation">}</span><span class="token punctuation">)</span>\n           <span class="token punctuation">)</span>\n      <span class="token operator">|</span> <span class="token operator">`</span><span class="token constructor variable">GetTransactions</span><span class="token punctuation">(</span>requestee<span class="token punctuation">)</span> <span class="token operator">=></span>\n        ignore<span class="token punctuation">(</span>\n          state<span class="token punctuation">.</span>transactions<span class="token punctuation">(</span><span class="token punctuation">)</span>\n          <span class="token operator">|</span><span class="token operator">></span> <span class="token class-name">Js</span><span class="token punctuation">.</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>then_<span class="token punctuation">(</span>transactions <span class="token operator">=></span>\n               <span class="token class-name">Js</span><span class="token punctuation">.</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>resolve<span class="token punctuation">(</span>requestee <span class="token operator">&lt;</span><span class="token operator">-</span><span class="token operator">&lt;</span> transactions<span class="token punctuation">)</span>\n             <span class="token punctuation">)</span><span class="token punctuation">,</span>\n        <span class="token punctuation">)</span><span class="token punctuation">;</span>\n        <span class="token class-name">Js</span><span class="token punctuation">.</span><span class="token class-name">Promise</span><span class="token punctuation">.</span>resolve<span class="token punctuation">(</span>state<span class="token punctuation">)</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token punctuation">(</span>ctx<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n      <span class="token class-name">Wallet</span><span class="token punctuation">.</span>balance<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n      id<span class="token punctuation">:</span> <span class="token class-name">Wallet</span><span class="token punctuation">.</span><span class="token constructor variable">WalletId</span><span class="token punctuation">(</span>walletId<span class="token punctuation">)</span><span class="token punctuation">,</span>\n      transactions<span class="token punctuation">:</span> transactionsQuery<span class="token punctuation">(</span>parent<span class="token punctuation">,</span> walletId<span class="token punctuation">)</span><span class="token punctuation">,</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>\n<h2 id="differences-and-similarities-between-persistent-actors-and-persistent-queries"><a href="#differences-and-similarities-between-persistent-actors-and-persistent-queries" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Differences and similarities between persistent actors and persistent queries</h2>\n<p>Persistent queries don\'t have a lifecycle like actors, therefore they can\'t <code>shutdownAfter</code>. However the current result of a query is cached in memory, the cache is available for an unbounded amount of time by default, unless a <code>cacheDuration</code> is specified.</p>\n<p>Like persistent actors, persistent queries can have decoders and encoders. They may also be snapshotted. An important difference to note when snapshotting, is that a <code>snapshotKey</code> must be added along with the usual <code>snapshotEvery</code> property. </p>',timeToRead:3,excerpt:"You start to see the biggest benefit from snapshotting best when your state is small in size, and persisted events are many. \nHowever…",frontmatter:{title:"Persistent Queries",date:"11/12/2017",programming_language:"reasonml",tags:["getting-started","nact","reason","bucklescript"]},fields:{slug:"/persistent-queries"}}},pathContext:{slug:"/persistent-queries",programming_language:"reasonml",language:"en_UK"}}}});
//# sourceMappingURL=path---en-uk-lesson-reasonml-persistent-queries-f9bfda3329a98dfab41d.js.map