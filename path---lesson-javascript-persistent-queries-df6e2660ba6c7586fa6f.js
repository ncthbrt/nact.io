webpackJsonp([0xeaa8364bd7c7],{383:function(n,s){n.exports={data:{allPostTitles:{edges:[{node:{frontmatter:{title:"Decoders and Encoders",lesson:2,category:"javascript",chapter:4,type:"lesson"},fields:{slug:"/decoders-and-encoders"}}},{node:{frontmatter:{title:"Getting Started",lesson:2,category:"javascript",chapter:1,type:"lesson"},fields:{slug:"/getting-started"}}},{node:{frontmatter:{title:"Persist",lesson:1,category:"javascript",chapter:3,type:"lesson"},fields:{slug:"/persist"}}},{node:{frontmatter:{title:"Actor Communication",lesson:2,category:"javascript",chapter:2,type:"lesson"},fields:{slug:"/actor-communication"}}},{node:{frontmatter:{title:"Introduction",lesson:1,category:"javascript",chapter:1,type:"lesson"},fields:{slug:"/introduction"}}},{node:{frontmatter:{title:"Hierarchy",lesson:4,category:"javascript",chapter:2,type:"lesson"},fields:{slug:"/hierarchy"}}},{node:{frontmatter:{title:"Querying",lesson:3,category:"javascript",chapter:2,type:"lesson"},fields:{slug:"/querying"}}},{node:{frontmatter:{title:"Snapshotting",lesson:2,category:"javascript",chapter:3,type:"lesson"},fields:{slug:"/snapshotting"}}},{node:{frontmatter:{title:"Stateful Actors",lesson:1,category:"javascript",chapter:2,type:"lesson"},fields:{slug:"/stateful-actors"}}},{node:{frontmatter:{title:"Timeouts",lesson:3,category:"javascript",chapter:3,type:"lesson"},fields:{slug:"/timeouts"}}},{node:{frontmatter:{title:"Supervision",lesson:5,category:"javascript",chapter:2,type:"lesson"},fields:{slug:"/supervision"}}},{node:{frontmatter:{title:"Persistent Queries",lesson:4,category:"javascript",chapter:3,type:"lesson"},fields:{slug:"/persistent-queries"}}}]},postBySlug:{html:'<p>You start to see the biggest benefit from snapshotting best when your state is small in size, and persisted events are many.\nHowever sometimes you may on occasion need to render a sequence of events into a different form.</p>\n<p>For example a real world problem I had was being able to view a list of transactions which modified a domain entity. You may not need this sequence all the time, but it is still required to be there. The problem with storing all the events in state is that now your state is just slightly larger than the sequence of events which led to that state, and hence snapshotting in fact counter productive. This is a dichotomy solved by the <a href="https://martinfowler.com/bliki/CQRS.html">CQRS pattern</a>. </p>\n<p>Nact provides the persistent query feature as a light-weight (but powerful) form of CQRS. A persistent query takes in a persistent key, and returns a function which when invoked replays the persisted events, building a result which is finally returned as a promise. A persistent query is lazy in that it only retrieves events when forced. It may be invoked any number of times, each time checking for new events. The result and sequence number of the query are cached with an optional timeout, and the result may optionally also be snapshotted every given number of messages. </p>\n<p>Here is a practical example of how a persistent query is useful. The example models a simplified wallet. The actor\'s state holds the current balance, the wallet id, and a persistent query which represents the list of transactions. An important feature to note in this example is the use of encoders and decoders. This is especially necessary as the state is now no longer just static data, it also contains a dynamic value. </p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> transactionsQuery <span class="token operator">=</span> <span class="token punctuation">(</span>parent<span class="token punctuation">,</span> id<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span>\n  <span class="token function">persistentQuery</span><span class="token punctuation">(</span>    \n    parent<span class="token punctuation">,</span>\n    <span class="token punctuation">(</span>state<span class="token operator">=</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span> msg<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n      <span class="token keyword">if</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>type <span class="token operator">==</span> <span class="token string">\'transaction\'</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> <span class="token punctuation">[</span>msg<span class="token punctuation">,</span> <span class="token operator">...</span>state<span class="token punctuation">]</span><span class="token punctuation">;</span>\n      <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n        <span class="token keyword">return</span> state<span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>          \n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token string">"wallet"</span> <span class="token operator">++</span> id<span class="token punctuation">,</span>\n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> snapshotDecoder <span class="token operator">=</span> <span class="token punctuation">(</span>parent<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">(</span>json<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>\n    id<span class="token punctuation">:</span> json<span class="token punctuation">.</span>id<span class="token punctuation">,</span>\n    balance<span class="token punctuation">:</span> json<span class="token punctuation">.</span>balance\n    transactions<span class="token punctuation">:</span> <span class="token function">transactionsQuery</span><span class="token punctuation">(</span>parent<span class="token punctuation">,</span> json<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">,</span>\n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">const</span> initialState <span class="token operator">=</span> <span class="token punctuation">(</span>id<span class="token punctuation">,</span> parent<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">(</span><span class="token punctuation">{</span>  \n  balance<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">,</span>\n  id<span class="token punctuation">:</span>walletId<span class="token punctuation">,</span>\n  transactions<span class="token punctuation">:</span> <span class="token function">transactionsQuery</span><span class="token punctuation">(</span>parent<span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">,</span>    \n<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n\n<span class="token keyword">let</span> spawnWallet <span class="token operator">=</span> <span class="token punctuation">(</span>walletId<span class="token punctuation">,</span> parent<span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span>\n  <span class="token function">spawnPersistent</span><span class="token punctuation">(</span>\n    parent<span class="token punctuation">,</span>        \n    <span class="token keyword">async</span> <span class="token punctuation">(</span>state<span class="token operator">=</span><span class="token function">initialState</span><span class="token punctuation">(</span>walletId<span class="token punctuation">,</span>parent<span class="token punctuation">)</span><span class="token punctuation">,</span> msg<span class="token punctuation">,</span> <span class="token punctuation">{</span>recovering<span class="token punctuation">,</span> persist<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">{</span>\n      <span class="token keyword">switch</span> <span class="token punctuation">(</span>msg<span class="token punctuation">.</span>type<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n        <span class="token keyword">case</span> <span class="token string">\'transaction\'</span><span class="token punctuation">:</span>          \n          <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token operator">!</span>recovering<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n            <span class="token keyword">await</span> <span class="token function">persist</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token punctuation">}</span>\n          <span class="token keyword">return</span> <span class="token punctuation">{</span><span class="token operator">...</span>state<span class="token punctuation">,</span> balance<span class="token punctuation">:</span> state<span class="token punctuation">.</span>balance <span class="token operator">+</span> msg<span class="token punctuation">.</span>amount <span class="token punctuation">}</span><span class="token punctuation">;</span>\n        <span class="token keyword">case</span> <span class="token string">\'get_transactions\'</span><span class="token punctuation">:</span>                    \n          <span class="token function">dispatch</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span>requestee<span class="token punctuation">,</span> <span class="token keyword">await</span> state<span class="token punctuation">.</span><span class="token function">transactions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n          <span class="token keyword">return</span> state<span class="token punctuation">;</span>\n        <span class="token keyword">default</span><span class="token punctuation">:</span> \n          <span class="token keyword">return</span> state<span class="token punctuation">;</span>\n      <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span><span class="token punctuation">,</span>\n    <span class="token string">"wallet"</span> <span class="token operator">++</span> walletId<span class="token punctuation">,</span>\n    walletId<span class="token punctuation">,</span>\n    <span class="token punctuation">{</span>\n      snapshotDecoder<span class="token punctuation">:</span> <span class="token function">snapshotDecoder</span><span class="token punctuation">(</span>parent<span class="token punctuation">)</span><span class="token punctuation">,</span>        \n      snapshotEvery<span class="token punctuation">:</span> <span class="token number">5</span> <span class="token operator">*</span> messages<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>    \n  <span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre>\n      </div>',timeToRead:2,excerpt:"You start to see the biggest benefit from snapshotting best when your state is small in size, and persisted events are many. \nHowever...",frontmatter:{title:"Persistent Queries",cover:"https://unsplash.it/400/300/?random?BoldMage",date:"11/12/2017",category:"javascript",tags:["getting-started","nact","javascript","nodejs"]},fields:{slug:"/persistent-queries"}}},pathContext:{slug:"/persistent-queries",category:"javascript"}}}});
//# sourceMappingURL=path---lesson-javascript-persistent-queries-df6e2660ba6c7586fa6f.js.map