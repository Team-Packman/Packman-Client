## 서비스

### 서비스 이름 : Packman
서비스 소개 : 우리의 일상 속에서  혼자, 때로는 함께 챙겨야 하는 짐의 목록을 편리하게 작성하고, 놓치지 않게 도와주고, 챙김이 여정 속 즐겁고 손쉬운 행위가 될 수 있도록 도와주는 서비스 Packman 입니다.

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

- typescript
- next.js
- react-query
- msw

</div>

###코딩 컨벤션 : Airbnb React Style guide

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


## commit message 컨벤션

- [gitmoji](https://gitmoji.dev/) 쓸람쓸
- 안쓰면 커밋 컨벤션 대표적인거만 지키자~


## 브랜치 전략 (ex. git flow)

- github flow 사용
- 작업 전에 이슈 생성
- 이슈 번호로 브랜치를 파서 작업
- 작업이 다 끝나면 피쳐 브랜치에서 main 브랜치로 Pull Request 작성
- 같은 팀원 3인의 Approve를 받아야 main 브랜치에 머지 가능



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
