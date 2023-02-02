##  Packman : 내 손안의 짐 챙김 도우미
 > 우리의 일상 속에서  혼자, 때로는 함께 챙겨야 하는 짐의 목록을 편리하게 작성하고, 놓치지 않게 도와주고, 챙김이 여정 속 즐겁고 손쉬운 행위가 될 수 있도록 도와주는 서비스 Packman 입니다.

### 서비스 바로가기    
[🧳 Packman 서비스 바로가기](https://www.packman.kr/)


## 팀원 소개

<div align="center">
	<table>
	<th>정세연 @n0eyes</th>
  <th>김연이 @younyikim</th>
	<th>이서영 @leeseooo</th>
  <th>정윤선 @yunsun99</th>
	<tr>
		<td><img src="https://github.com/n0eyes.png"></td>
		<td><img src="https://github.com/younyikim.png"></td>
		<td><img src="https://github.com/leeseooo.png"></td>
    <td><img src="https://github.com/yunsun99.png"></td>
	</tr>
	<tr>
	<td>
		<ul>
		<li>API Mocking, Socket, 패킹리스트 함께 수정하기 뷰</li>
		</ul>
	</td>
	<td>
	<ul>
		<li>스플래시, 홈 화면 리스트, 혼자 + 함께 패킹 시작하기 뷰</li>
	</ul>
	</td>
  	<td>
	<ul>
		<li>상세 패킹 리스트 조회 및 수정, 삭제 / 프로필 편집 뷰</li>
	</ul>
	</td>
	<td>
		<ul>
		<li>소셜 로그인(구글, 카카오) / 리스트 작성하기, 엿보기 모달</li>
		</ul>
	</tr>
	</table>
</div>

## 기술 스택

[![My Skills](https://skillicons.dev/icons?i=js,ts,react,nextjs)](https://skillicons.dev)
<div style="display:flex;"> 
	<img width="40" src="https://user-images.githubusercontent.com/73516688/215024583-ae171acf-cdbc-4804-9785-a2c74077f4cc.png" />
	<img width="50" src="https://user-images.githubusercontent.com/73516688/215024749-d093d461-eac1-4ab6-8495-2f36ecfdc01f.png" />
</div>


(JavaScript / TypeScript / React.js / Next.js / React Query / MSW)

</div>




## 폴더 구조

```
.
├── utils 
├── mocks 🗂 목 데이터 저장
├── package.json 📦 설치된 패키지를 관리하는 파일
├── component
│   │   ├── common 🗂 공통으로 쓰일 컴포넌트 저장
│   │   │   ├── Footer
│   │   │   ├── Header
│   │   │   └── assets
│   │   ├── home 🗂 main 페이지에 쓰일 컴포넌트 저장
│   │   └── together 🗂 together 페이지에 쓰일 컴포넌트 저장
└── pages
    ├── _app.tsx ✡️ 앱의 라우팅과 글로벌 스타일 지정
    ├── index.tsx    
    ├── together.tsx
    └── together/pack/[id].tsx
```

<br>

------  

## 서비스의 핵심 기능

### 1. 회원가입, 로그인 뷰

- 소셜 로그인을 통해 유저가 빠르게 회원가입과 로그인을 할 수 있도록 합니다. 구글 로그인과 카카오 로그인 두가지 소셜 로그인을 이용할 수 있습니다. (구글은 구현 진행 중)   
<img width="200" alt="스크린샷 2022-07-22 오후 9 48 43" src="https://user-images.githubusercontent.com/73516688/180457259-3729e70b-e866-442e-ad39-7fc11b02dc7d.png">


### 2. 폴더 뷰

- 패킹 리스트 작성을 유도하는 CTA 버튼이 있는 화면입니다.
- 사용자가 폴더를 1개 이상 생성하면 해당 버튼이 <b>+모양의 플로팅 액션 버튼</b>으로 바뀌며, 해당 버튼을 통해 혼자 및 함께 리스트를 추가 및 폴터 추가할 수 있습니다.

<div style="display:flex;">
<img width="200" alt="스크린샷 2022-07-22 오후 9 48 43" src="https://user-images.githubusercontent.com/73516688/180457874-8bb98054-ee9d-432b-90ca-07b0ec76cd46.png">
<img width="200" alt="스크린샷 2022-07-22 오후 9 49 22" src="https://user-images.githubusercontent.com/73516688/180458048-985136db-984c-426f-a4a6-e00864f95a66.png">
<img width="200" alt="스크린샷 2022-07-22 오후 9 49 55" src="https://user-images.githubusercontent.com/73516688/180458071-0ef00750-2d0b-43bc-bb40-52ab805a9012.png">
<img width="200" alt="스크린샷 2022-07-22 오후 9 50 03" src="https://user-images.githubusercontent.com/73516688/180458082-3a219839-5b73-4bcb-b399-9ef5716e8fe7.png">

</div>


### 3. 리스트 목록 뷰

- 폴더 안 패킹 리스트 목록을 확인할 수 있는 화면입니다.
- 해당 화면은 함께, 혼자에 따라 구분된 폴더에 알맞게 리스트가 소속되게 하며, 폴더 우측 초록색 토글을 통해 폴더간 이동을 가능하게 합니다.
<div style="display:flex;">

<img width="200" alt="스크린샷 2023-02-02 오후 4 28 39" src="https://user-images.githubusercontent.com/73516688/216259494-94388b45-5757-40f2-b7ab-6023b6a1e37d.png">
<img width="200" alt="스크린샷 2023-02-02 오후 4 28 50" src="https://user-images.githubusercontent.com/73516688/216259501-5d868ad6-3472-4d12-aca1-4f31a821e8ac.png">
<img width="200" alt="스크린샷 2023-02-02 오후 4 29 01" src="https://user-images.githubusercontent.com/73516688/216259505-fb0b7d1e-c2a7-4854-ac2d-2e0a8b1e7a33.png">

	
	
</div>



### 4. 혼자 패킹 리스트 뷰 / 함께 패킹 리스트 뷰

#### 혼자 패킹 리스트 뷰
- 유저는 리스트 뷰에서 손쉽게 카테고리와 리스트를 생성, 수정할 수 있습니다.

#### 함께 패킹 리스트 뷰
- 함께 패킹 리스트를 생성하면, 초대 링크를 복사할 수 있는 모달이 뜹니다.
- 초대 링크를 통해 일행에서 리스트를 공유할 수 있습니다. 초대된 일행이 들어오면, 일행도 리스트를 작성, 수정할 수 있습니다.
- 해당 뷰에서 사용자는 새로운 짐 추가 및 수정, 카테고리 및 리스트 수정, 짐 챙길 사람(담당자) 배정 등의 기능을 이용할 수 있습니다.

<div style="display:flex;">
<img width="280" alt="스크린샷 2022-07-22 오후 10 10 30" src="https://user-images.githubusercontent.com/73516688/216257623-59e97a55-59a1-4fa9-a6b0-48656bd19570.png">

<img width="280" alt="스크린샷 2022-07-22 오후 10 10 30" src="https://user-images.githubusercontent.com/73516688/216258169-41430944-3974-4cd2-9e96-7d182cc0aecb.png">

</div>


<br>

-------   

## 코딩 컨벤션 & 브랜치 전략
<details>
<summary>코딩 컨벤션 : Airbnb React Style guide</summary>

### 명명규칙(Naming Conventions)

1. 이름으로부터 의도가 읽혀질 수 있게 쓴다.
- ex)
    
    ```jsx
    // bad
    function q() {
      // ...stuff...
    }
    
    // good
    function query() {
      // ..stuff..
    }
    
    ```
    
1. 오브젝트, 함수, 그리고 인스턴스에는 `camelCase`를 사용한다.
- ex)
    
    ```jsx
    // bad
    const OBJEcttsssss = {};
    const this_is_my_object = {};
    function c() {}
    
    // good
    const thisIsMyObject = {};
    function thisIsMyFunction() {}
    
    ```
    
1. 클래스나 constructor에는 `PascalCase`를 사용한다.
- ex)
    
    ```jsx
    // bad
    function user(options) {
      this.name = options.name;
    }
    
    const bad = new user({
      name: 'nope',
    });
    
    // good
    class User {
      constructor(options) {
        this.name = options.name;
      }
    }
    
    const good = new User({
      name: 'yup',
    });
    
    ```
    
1. 함수 이름은 동사 + 명사 형태로 작성한다.
ex) `postUserInformation( )`
2. 약어 사용은 최대한 지양한다.
3. 이름에 네 단어 이상이 들어가면 팀원과 상의를 거친 후 사용한다

### 블록(Blocks)

1. 복수행의 블록에는 중괄호({})를 사용한다.
- ex)
    
    ```jsx
    // bad
    if (test)
      return false;
    
    // good
    if (test) return false;
    
    // good
    if (test) {
      return false;
    }
    
    // bad
    function() { return false; }
    
    // good
    function() {
      return false;
    }
    
    ```
    
1. 복수행 블록의 `if` 와 `else` 를 이용하는 경우 `else` 는 `if` 블록 끝의 중괄호( } )와 같은 행에 위치시킨다.
- ex)
    
    ```java
    // bad
    if (test) {
      thing1();
      thing2();
    } 
    else {
      thing3();
    }
    
    // good
    if (test) {
      thing1();
      thing2();
    } else {
      thing3();
    }
    
    ```
    

### 코멘트(Comments)

1. 복수형의 코멘트는 `/** ... */` 를 사용한다.
- ex)
    
    ```jsx
    // good
    /**
     * @param {String} tag
     * @return {Element} element
     */
    function make(tag) {
      // ...stuff...
    
      return element;
    }
    
    ```
    
1. 단일 행의 코멘트에는 `//` 을 사용하고 코멘트를 추가하고 싶은 코드의 상부에 배치한다. 그리고 코멘트의 앞에 빈 행을 넣는다.
- ex)
    
    ```jsx
    // bad
    const active = true; // is current tab
    
    // good
    // is current tab
    const active = true;
    
    // good
    function getType() {
      console.log('fetching type...');
    
      // set the default type to 'no type'
      const type = this._type || 'no type';
    
      return type;
    }
    
    ```
    

### 문자열(Strings)

1. 문자열에는 싱크쿼트 `''` 를 사용한다.
- ex)
    
    ```jsx
    // bad
    const name = "Capt. Janeway";
    
    // good
    const name = 'Capt. Janeway';
    ```
    
1. 프로그램에서 문자열을 생성하는 경우는 문자열 연결이 아닌 `template strings`를 이용한다.
- ex)
    
    ```jsx
    // bad
    function sayHi(name) {
      return 'How are you, ' + name + '?';
    }
    
    // bad
    function sayHi(name) {
      return ['How are you, ', name, '?'].join();
    }
    
    // good
    function sayHi(name) {
      return `How are you, ${name}?`;
    }
    
    ```
    

### 함수(Functions)

1. 화살표 함수를 사용한다.
- ex)
    
    ```jsx
     var arr1 = [1, 2, 3];
      var pow1 = arr.map(function (x) { // ES5 Not Good
        return x * x;
      });
    
      const arr2 = [1, 2, 3];
      const pow2 = arr.map(x => x * x); // ES6 Good
    ```
    

### 조건식과 등가식(Comparison Operators & Equality)

1. `==` 이나 `!=` 보다 `===` 와 `!==` 을 사용한다.
2. 단축형을 사용한다.
- ex)
    
    ```jsx
    // bad
    if (name !== '') {
      // ...stuff...
    }
    
    // good
    if (name) {
      // ...stuff...
    }
    ```
    
1. 비동기 함수를 사용할 때 `Promise`함수의 사용은 지양하고 `async`, `await`를 쓰도록 한다


### 기타
- 단위 : rem, em 사용

</details>

<details>
	<summary>commit message 컨벤션 & 브랜치 전략</summary>
	- option : [gitmoji](https://gitmoji.dev/)
	- 안쓰면 커밋 컨벤션 대표적인거만 지키자~


	## 브랜치 전략 (ex. git flow)

	- github flow 사용
	- 작업 전에 jira 이슈 생성
	- 이슈 번호로 브랜치를 파서 작업
	- 작업이 다 끝나면 피쳐 브랜치에서 develop 브랜치로 Pull Request 작성
	- 같은 팀원 3인의 Approve를 받아야 main 브랜치에 머지 가능

</details>
