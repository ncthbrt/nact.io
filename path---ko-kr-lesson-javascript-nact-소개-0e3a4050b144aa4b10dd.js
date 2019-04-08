webpackJsonp([0x792aea587be8],{432:function(e,a){e.exports={data:{allPostTitles:{edges:[{node:{frontmatter:{title:"액터 간 통신",lesson:2,programming_language:"javascript",chapter:2,type:"lesson"},fields:{slug:"/액터-간-통신"}}},{node:{frontmatter:{title:"시작하기",lesson:2,programming_language:"javascript",chapter:1,type:"lesson"},fields:{slug:"/시작하기"}}},{node:{frontmatter:{title:"액터의 계층 구조",lesson:4,programming_language:"javascript",chapter:2,type:"lesson"},fields:{slug:"/액터의-계층-구조"}}},{node:{frontmatter:{title:"Nact 소개",lesson:1,programming_language:"javascript",chapter:1,type:"lesson"},fields:{slug:"/nact-소개"}}},{node:{frontmatter:{title:"상태 저장(영속성)",lesson:1,programming_language:"javascript",chapter:3,type:"lesson"},fields:{slug:"/상태-저장-영속성"}}},{node:{frontmatter:{title:"퍼시스턴트 쿼리",lesson:4,programming_language:"javascript",chapter:3,type:"lesson"},fields:{slug:"/퍼시스턴트-쿼리"}}},{node:{frontmatter:{title:"스냅샷",lesson:2,programming_language:"javascript",chapter:3,type:"lesson"},fields:{slug:"/스냅샷"}}},{node:{frontmatter:{title:"상태가 있는 액터",lesson:1,programming_language:"javascript",chapter:2,type:"lesson"},fields:{slug:"/상태가-있는-액터"}}},{node:{frontmatter:{title:"관리 감독(Supervision)",lesson:5,programming_language:"javascript",chapter:2,type:"lesson"},fields:{slug:"/관리-감독-supervision"}}},{node:{frontmatter:{title:"타임아웃",lesson:3,programming_language:"javascript",chapter:3,type:"lesson"},fields:{slug:"/타임아웃"}}},{node:{frontmatter:{title:"질의하기",lesson:3,programming_language:"javascript",chapter:2,type:"lesson"},fields:{slug:"/질의하기"}}}]},postBySlug:{html:'<p>Nact는 Node.js에서 실행되는 <a href="https://ko.wikipedia.org/wiki/%ED%96%89%EC%9C%84%EC%9E%90_%EB%AA%A8%EB%8D%B8">액터 모델</a> 구현체입니다. Akka 라이브러리와 Erlang 언어의 문제 접근 방법에서 영감을 받았습니다. 특히 기존에 Redux를 사용하던 사용자에게 친숙한 인터페이스를 제공하려고 하였습니다.</p>\n<p>이 프로젝트의 목적은 마이크로서비스를 쉽게 생성하고 파악할 수 있도록 하고, Node 플랫폼 위에서 비동기 이벤트 기반 아키텍처를 실현하는  방법을 제공하는 것입니다.</p>\n<p>액터 모델에서는 액터라고 부르는 개체의 집합으로 시스템을 구성합니다. 하나의 액터는 독립적으로 실행되는 상태의 묶음으로 생각할 수 있습니다. 액터는 서로 간에 메시지를 통해서만 통신을 합니다. 액터는 하나 이상의 자식 액터를 생성할 수 있습니다.</p>\n<p>액터 시스템은 <a href="https://www.whatsapp.com/">WhatsApp</a>이나 <a href="https://twitter.com/">Twitter</a> 같은 거대 확장 가능한, 고가용성 시스템을 운용하기 위해 사용되었습니다. 그러나 꼭 그런 큰 회사의 업무를 위한 것만은 아닙니다. 액터를 이용한 시스템 아키텍처는, 마이크로서비스로의 전환을 고려하는 개발자에게 하나의 선택지가 될 수 있습니다.</p>\n<ul>\n<li>새로운 타입의 액터를 생성하는 일은 하나의 마이크로서비스를 통째로 생성하는 것보다 매우 가벼운 연산입니다.</li>\n<li><a href="https://en.wikipedia.org/wiki/Location_transparency">위치 투명성</a>과 상태 비공유(No Shared State) 특성은 <a href="https://en.wikipedia.org/wiki/Domain-driven_design">도메인 주도 개발</a>에서 서브 시스템에 대한 배치에 관한 아키텍처 상 결정을 유예할 수 있게 해줍니다.</li>\n<li>액터 시스템을 사용함으로써, 기존에 <a href="https://microservices.io/patterns/monolithic.html">모놀리식</a> 시스템에서 볼 수 있었던 복잡함을 해소할 수 있습니다. 이는 메시지 기반 통신이 모듈 간의 의존성을 제거하여 서로 간에 덜 결합된(less coupled) 시스템을 만드는 덕분입니다.</li>\n<li>액터는 비동기식으로 설계되었습니다. 이로써 <a href="https://www.reactivemanifesto.org/ko">리액티브 선언문</a>에 제시된 항목에 잘 부합합니다.</li>\n<li>액터는 상태와 무상태 시스템 모두에 적합합니다. 이로써 인프라적인 복잡성을 더하지 않고도 스마트 캐싱, 인-메모리 이벤트 저장소, 상태기계 워커를 생성하는 일을 쉽게 해줍니다.</li>\n</ul>\n<h2 id="유의사항"><a href="#%EC%9C%A0%EC%9D%98%EC%82%AC%ED%95%AD" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>유의사항</h2>\n<p>네트워크 투명성<sup id="fnref-1"><a href="#fn-1" class="footnote-ref">1</a></sup>과 클러스터링<sup id="fnref-2"><a href="#fn-2" class="footnote-ref">2</a></sup> 기능은 개발 예정이며, 아직 구현되지 않았습니다.</p>\n<hr>\n<div class="footnotes">\n<hr>\n<ol>\n<li id="fn-1">\n<p>Zookeeper나 Consul등을 이용해서 서비스 디스커버리(Service Discovery)를 제공하는 기능 혹은 그로 인한 특성  </p>\n<a href="#fnref-1" class="footnote-backref">↩</a>\n</li>\n<li id="fn-2">\n<p>여러 노드에 걸쳐 분산 액터 시스템을 구축하는 기능</p>\n<a href="#fnref-2" class="footnote-backref">↩</a>\n</li>\n</ol>\n</div>',timeToRead:2,excerpt:"Nact는 Node.js에서 실행되는  액터 모델  구현체입니다. Akka 라이브러리와 Erlang 언어의 문제 접근 방법에서 영감을 받았습니다. 특히 기존에 Redux…",frontmatter:{title:"Nact 소개",date:"22/03/2019",programming_language:"javascript",tags:["getting-started","nact","javascript","nodejs"]},fields:{slug:"/nact-소개"}}},pathContext:{slug:"/nact-소개",programming_language:"javascript",language:"ko_KR"}}}});
//# sourceMappingURL=path---ko-kr-lesson-javascript-nact-소개-0e3a4050b144aa4b10dd.js.map