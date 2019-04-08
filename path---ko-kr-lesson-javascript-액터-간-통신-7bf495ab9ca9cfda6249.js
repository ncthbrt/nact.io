webpackJsonp([0xfc9600857df3],{438:function(n,s){n.exports={data:{allPostTitles:{edges:[{node:{frontmatter:{title:"액터 간 통신",lesson:2,programming_language:"javascript",chapter:2,type:"lesson"},fields:{slug:"/액터-간-통신"}}},{node:{frontmatter:{title:"시작하기",lesson:2,programming_language:"javascript",chapter:1,type:"lesson"},fields:{slug:"/시작하기"}}},{node:{frontmatter:{title:"액터의 계층 구조",lesson:4,programming_language:"javascript",chapter:2,type:"lesson"},fields:{slug:"/액터의-계층-구조"}}},{node:{frontmatter:{title:"Nact 소개",lesson:1,programming_language:"javascript",chapter:1,type:"lesson"},fields:{slug:"/nact-소개"}}},{node:{frontmatter:{title:"상태 저장(영속성)",lesson:1,programming_language:"javascript",chapter:3,type:"lesson"},fields:{slug:"/상태-저장-영속성"}}},{node:{frontmatter:{title:"퍼시스턴트 쿼리",lesson:4,programming_language:"javascript",chapter:3,type:"lesson"},fields:{slug:"/퍼시스턴트-쿼리"}}},{node:{frontmatter:{title:"스냅샷",lesson:2,programming_language:"javascript",chapter:3,type:"lesson"},fields:{slug:"/스냅샷"}}},{node:{frontmatter:{title:"상태가 있는 액터",lesson:1,programming_language:"javascript",chapter:2,type:"lesson"},fields:{slug:"/상태가-있는-액터"}}},{node:{frontmatter:{title:"관리 감독(Supervision)",lesson:5,programming_language:"javascript",chapter:2,type:"lesson"},fields:{slug:"/관리-감독-supervision"}}},{node:{frontmatter:{title:"타임아웃",lesson:3,programming_language:"javascript",chapter:3,type:"lesson"},fields:{slug:"/타임아웃"}}},{node:{frontmatter:{title:"질의하기",lesson:3,programming_language:"javascript",chapter:2,type:"lesson"},fields:{slug:"/질의하기"}}}]},postBySlug:{html:'<p>단일 액터 혼자서는 존재 의미가 없습니다. 액터는 협동을 해야합니다. <code>dispatch</code> 함수를 사용해서 액터에서 다른 액터로 메시지를 보낼 수 있습니다.</p>\n<p><code>dispatch</code> 함수의 3번째 인자는 <strong>메시지 송신자</strong>를 가리킵니다. 이 파라미터가 있음으로 해서 액터의 메시지 핸들러 함수를 작성할 때, 받은 메시지에 대해 응답을 보낼 액터를 명시적으로 지정할 필요가 없습니다. 대신 <code>ctx.sender</code>를 통해서 송신자 액터를 참조할 수 있습니다.</p>\n<p>아래 예제에서, <code>ping</code>, <code>pong</code> 두 액터가 각각 \'ping\', \'pong\' 메시지를 보내며 핑퐁게임을 하고 있습니다. 게임을 시작하기 위해 <code>pong</code> 액터가 <code>ping</code> 액터에게 메시지를 보내고, <code>ping</code> 액터는 <code>ctx.sender</code>로 <code>pong</code> 액터를 참조해서 역시 <code>pong</code> 액터에게 응답 메시지를 보냅니다.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">delay</span> <span class="token operator">=</span> <span class="token punctuation">(</span>time<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span>res<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>res<span class="token punctuation">,</span> time<span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> ping <span class="token operator">=</span> <span class="token function">spawnStateless</span><span class="token punctuation">(</span>system<span class="token punctuation">,</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>msg<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span> <span class="token operator">=></span>  <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>\n  <span class="token comment">// ping: Pong is a little slow. So I\'m giving myself a little handicap :P</span>\n  <span class="token keyword">await</span> <span class="token function">delay</span><span class="token punctuation">(</span><span class="token number">500</span><span class="token punctuation">)</span>\n  <span class="token function">dispatch</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>sender<span class="token punctuation">,</span> ctx<span class="token punctuation">.</span>name<span class="token punctuation">,</span> ctx<span class="token punctuation">.</span>self<span class="token punctuation">)</span>\n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">\'ping\'</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> pong <span class="token operator">=</span> <span class="token function">spawnStateless</span><span class="token punctuation">(</span>system<span class="token punctuation">,</span> <span class="token punctuation">(</span>msg<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span> <span class="token operator">=></span>  <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>\n  <span class="token function">dispatch</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>sender<span class="token punctuation">,</span> ctx<span class="token punctuation">.</span>name<span class="token punctuation">,</span> ctx<span class="token punctuation">.</span>self<span class="token punctuation">)</span>  \n<span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token string">\'pong\'</span><span class="token punctuation">)</span>\n\n<span class="token function">dispatch</span><span class="token punctuation">(</span>ping<span class="token punctuation">,</span> <span class="token string">\'begin\'</span><span class="token punctuation">,</span> pong<span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p>콘솔에는 다음과 같이 출력됩니다.</p>\n<div class="gatsby-highlight">\n      <pre class="language-none"><code>begin\nping\npong\nping\npong\nping\n...</code></pre>\n      </div>',timeToRead:1,excerpt:"단일 액터 혼자서는 존재 의미가 없습니다. 액터는 협동을 해야합니다.  dispatch  함수를 사용해서 액터에서 다른 액터로 메시지를 보낼 수 있습니다. dispatch  함수의…",frontmatter:{title:"액터 간 통신",date:"22/03/2019",programming_language:"javascript",tags:["getting-started","nact","javascript","nodejs"]},fields:{slug:"/액터-간-통신"}}},pathContext:{slug:"/액터-간-통신",programming_language:"javascript",language:"ko_KR"}}}});
//# sourceMappingURL=path---ko-kr-lesson-javascript-액터-간-통신-7bf495ab9ca9cfda6249.js.map