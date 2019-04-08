webpackJsonp([0xfef0249bfd36],{433:function(n,s){n.exports={data:{allPostTitles:{edges:[{node:{frontmatter:{title:"액터 간 통신",lesson:2,programming_language:"javascript",chapter:2,type:"lesson"},fields:{slug:"/액터-간-통신"}}},{node:{frontmatter:{title:"시작하기",lesson:2,programming_language:"javascript",chapter:1,type:"lesson"},fields:{slug:"/시작하기"}}},{node:{frontmatter:{title:"액터의 계층 구조",lesson:4,programming_language:"javascript",chapter:2,type:"lesson"},fields:{slug:"/액터의-계층-구조"}}},{node:{frontmatter:{title:"Nact 소개",lesson:1,programming_language:"javascript",chapter:1,type:"lesson"},fields:{slug:"/nact-소개"}}},{node:{frontmatter:{title:"상태 저장(영속성)",lesson:1,programming_language:"javascript",chapter:3,type:"lesson"},fields:{slug:"/상태-저장-영속성"}}},{node:{frontmatter:{title:"퍼시스턴트 쿼리",lesson:4,programming_language:"javascript",chapter:3,type:"lesson"},fields:{slug:"/퍼시스턴트-쿼리"}}},{node:{frontmatter:{title:"스냅샷",lesson:2,programming_language:"javascript",chapter:3,type:"lesson"},fields:{slug:"/스냅샷"}}},{node:{frontmatter:{title:"상태가 있는 액터",lesson:1,programming_language:"javascript",chapter:2,type:"lesson"},fields:{slug:"/상태가-있는-액터"}}},{node:{frontmatter:{title:"관리 감독(Supervision)",lesson:5,programming_language:"javascript",chapter:2,type:"lesson"},fields:{slug:"/관리-감독-supervision"}}},{node:{frontmatter:{title:"타임아웃",lesson:3,programming_language:"javascript",chapter:3,type:"lesson"},fields:{slug:"/타임아웃"}}},{node:{frontmatter:{title:"질의하기",lesson:3,programming_language:"javascript",chapter:2,type:"lesson"},fields:{slug:"/질의하기"}}}]},postBySlug:{html:'<p>액터 시스템은 \'<strong>실패하게 내버려 둬라(<a href="http://wiki.c2.com/?LetItCrash">let it crash</a>)</strong>\' 철학에 입각하여 설계되었습니다. 이 명제는 <strong>(시스템의 예외 처리를 담당하는) 인프라 영역의 코드가 도메인 영역의 로직과 뒤섞여서 혼잡해지는 것을 줄이려는</strong> 바람에서 비롯한 것입니다.</p>\n<p>그렇다면 실패하게 내버려 두면서도 어떻게 시스템의 탄력성(장애 회복성)을 확보할 수 있을까요? 그 답은 액터의 관리 감독(Supervision) 기능에 있습니다. <strong>액터가 예외적으로 중지되면 액터에 정의된 정책에 따라 어떻게 실패에서 회복할지를 결정하게 됩니다.</strong> <strong><a href="https://ko.wikipedia.org/wiki/%EC%96%BC%EB%9E%AD">Erlang</a></strong>은 이러한 실패 회복 전략을 처음으로 채택한 플랫폼이었습니다. 이로써 <a href="https://ko.wikipedia.org/wiki/%EC%97%90%EB%A6%AD%EC%8A%A8">에릭슨</a> 사가 전화 교환 시스템을 구축했을 때 <strong><a href="https://ko.wikipedia.org/wiki/%EA%B3%A0%EA%B0%80%EC%9A%A9%EC%84%B1">99.9999999% 가용성</a></strong>의 놀라운 안정성을 이루었습니다.</p>\n<p><strong>Nact</strong>의 관리 감독 시스템도 <strong>Erlang</strong>과 유사하게 동작합니다. 액터가 예외를 던지면, 기본적으로는 중지됩니다. 액터를 생성할 때 <code>onCrash</code> 파라미터를 전달해서 관리 감독 정책을 변경할 수 있습니다. 이 값은 사용자 정의 함수로서 던져진 예외, 예외가 던져질 당시에 처리하던 메시지, 그리고 액터 컨텍스트를 파라미터로 받습니다. 이 관리 감독 정책 함수는 관리 감독 결정 사항을 반환합니다. (비동기적으로도 처리 가능) 아때 가능한 결정은 아래와 같습니다.</p>\n<table>\n<thead>\n<tr>\n<th>결정</th>\n<th>효과</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>stop</td>\n<td>예외를 일으킨 액터를 종료</td>\n</tr>\n<tr>\n<td>stopAll</td>\n<td>같은 부모를 둔 액터를 모두 종료</td>\n</tr>\n<tr>\n<td>reset</td>\n<td>예외를 일으킨 액터의 상태를 초기화</td>\n</tr>\n<tr>\n<td>resetAll</td>\n<td>같은 부모를 둔 액터의 상태를 초기화</td>\n</tr>\n<tr>\n<td>resume</td>\n<td>현재 상태 그대로 액터를 재개해서 다음 메시지를 계속 처리하도록 함</td>\n</tr>\n<tr>\n<td>escalate</td>\n<td>부모 액터로 결정을 넘김</td>\n</tr>\n</tbody>\n</table>\n<p>실패할 때마다 액터의 상태를 초기화하는 관리 감독 정책 함수의 예입니다.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">reset</span> <span class="token operator">=</span> <span class="token punctuation">(</span>msg<span class="token punctuation">,</span> error<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span> <span class="token operator">=></span> ctx<span class="token punctuation">.</span>reset\n</code></pre>\n      </div>\n<p>액터의 실패는 시스템 자원을 사용할 수 없을 때 발생하기도 합니다. 이때 즉시 액터를 재개하면 금방 다시 실패하기 때문에 CPU 사이클을 불필요하게 소모하게 됩니다. 그래서 관리 감독 정책 함수에 약간의 지연을 추가하겠습니다.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">delay</span> <span class="token operator">=</span> duration <span class="token operator">=></span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span>resolve <span class="token operator">=></span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> duration<span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> reset <span class="token operator">=</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>msg<span class="token punctuation">,</span> error<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">await</span> <span class="token function">delay</span><span class="token punctuation">(</span>Math<span class="token punctuation">.</span><span class="token function">random</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">*</span> <span class="token number">500</span> <span class="token operator">-</span> <span class="token number">750</span><span class="token punctuation">)</span>\n  <span class="token keyword">return</span> ctx<span class="token punctuation">.</span>reset\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>외부 서비스를 호출하는 부분이 있을 떼, API에 호출 빈도 제한이 있을 수 있습니다. 그래서 클로저(closure)를 사용해서 좀 더 정교하게 만들어보겠습니다. (실패가 반복되면 지연 시간을 지수적으로 증가)</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">delay</span> <span class="token operator">=</span> duration <span class="token operator">=></span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span>resolve <span class="token operator">=></span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token function">resolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> duration<span class="token punctuation">)</span><span class="token punctuation">)</span>\n\n<span class="token keyword">const</span> <span class="token function-variable function">resetWithExponentialDelay</span> <span class="token operator">=</span> factor <span class="token operator">=></span> <span class="token punctuation">{</span>\n  <span class="token keyword">let</span> count <span class="token operator">=</span> <span class="token number">0</span>\n  <span class="token keyword">return</span> <span class="token keyword">async</span> <span class="token punctuation">(</span>msg<span class="token punctuation">,</span> error<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>                \n      <span class="token keyword">let</span> delay <span class="token operator">=</span>  <span class="token punctuation">(</span><span class="token number">2</span> <span class="token operator">**</span> count <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> factor\n      <span class="token keyword">await</span> <span class="token function">delay</span><span class="token punctuation">(</span>delay<span class="token punctuation">)</span>\n      count <span class="token operator">=</span> count <span class="token operator">+</span> <span class="token number">1</span>\n      <span class="token keyword">return</span> ctx<span class="token punctuation">.</span>reset\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre>\n      </div>\n<p>저번에 만든 주소록 서비스 액터에 관리 감독 정책 함수를 등록합니다.</p>\n<div class="gatsby-highlight">\n      <pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token function-variable function">spawnContactsService</span> <span class="token operator">=</span> parent <span class="token operator">=></span> <span class="token function">spawnStateless</span><span class="token punctuation">(</span>\n  parent<span class="token punctuation">,</span>\n  <span class="token punctuation">(</span>msg<span class="token punctuation">,</span> ctx<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> userId <span class="token operator">=</span> msg<span class="token punctuation">.</span>userId\n    <span class="token keyword">let</span> childActor\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token function">has</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      childActor <span class="token operator">=</span> ctx<span class="token punctuation">.</span>children<span class="token punctuation">.</span><span class="token keyword">get</span><span class="token punctuation">(</span>userId<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n      childActor <span class="token operator">=</span> <span class="token function">spawnUserContactService</span><span class="token punctuation">(</span>ctx<span class="token punctuation">.</span>self<span class="token punctuation">,</span> userId<span class="token punctuation">)</span>\n    <span class="token punctuation">}</span>\n    <span class="token function">dispatch</span><span class="token punctuation">(</span>childActor<span class="token punctuation">,</span> msg<span class="token punctuation">,</span> ctx<span class="token punctuation">.</span>sender<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span><span class="token punctuation">,</span>\n  <span class="token string">\'contacts\'</span><span class="token punctuation">,</span>\n  <span class="token punctuation">{</span> onCrash<span class="token punctuation">:</span> reset <span class="token punctuation">}</span>\n<span class="token punctuation">)</span>\n</code></pre>\n      </div>\n<p><code>spawnStateless</code> 함수의 네번째 파라미터는 액터 속성 객체입니다. 여기에는 <code>onChildCrashes</code>를 비롯해서 다양한 액터의 동작을 지정할 수 있습니다. 이후의 장에서 더 살펴보겠습니다.</p>',timeToRead:2,excerpt:"액터 시스템은 ' 실패하게 내버려 둬라( let it crash…",frontmatter:{title:"관리 감독(Supervision)",date:"22/03/2019",programming_language:"javascript",tags:["getting-started","nact","javascript","nodejs"]},fields:{slug:"/관리-감독-supervision"}}},pathContext:{slug:"/관리-감독-supervision",programming_language:"javascript",language:"ko_KR"}}}});
//# sourceMappingURL=path---ko-kr-lesson-javascript-관리-감독-supervision-099da8760d7039c9e23b.js.map