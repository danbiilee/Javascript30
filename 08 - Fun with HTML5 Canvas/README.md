# 08. Fun with HTML5 Canvas

### :pencil: NOTE
### 1 . HTML5 Canvas
`canvas`요소는 `getContext()` 메서드를 이용해 렌더링 컨텍스트와 그리기 함수들을 사용할 수 있다. `getContext()` 메서드는 렌더링 컨텍스트 타입을 지정하는 하나의 파라미터를 갖는다. 

```javascript
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
// ... 생략

// 캔버스에 선 그리기
ctx.beginPath();
ctx.moveTo(lastX, lastY); // start from 
ctx.lineTo(e.offsetX, e.offsetY); // go to
ctx.stroke();
```



### 2. ES6 Destructuring
구조 분해 할당은 구조화된 배열 또는 객체 리터럴에서 필요한 값만을 추출해 개별적인 변수에 할당하거나 반환할 때 쓰인다. 

#### 2.1 Destructuring Array
배열의 각 요소를 추출/할당하는 기준은 **배열의 인덱스**이다.     

```javascript
const arr = [1, 2, 3];

// 이 때 반드시 분해되어 각 변수에 값이 할당될 배열을 우변에 지정해주어야 한다. 
const [one, two, three] = arr;
console.log(one, two, three); // 1 2 3
```

할당 연산자 왼쪽에는 **배열 형태의 변수 리스트**가 필요하다.   

```javascript
let [x, y, z] = [1, 2, 3];
```

#### 2.2 Destructuring Object
프로퍼티 이름(키)를 기준으로 객체의 각 프로퍼티를 추출해 변수 리스트에 할당한다.

```javascript
const obj = { firstName: 'Danbi', lastName: 'Lee' };

// lastName변수에 lastName을 키로 갖는 프로퍼티값이 할당된다. 
const { lastName, firstName } = obj;
console.log(firstName, lastName); // Danbi Lee
```

할당 연산자 왼쪽에는 **객체 형태의 변수 리스트**가 필요하다.   
```javascript
const { prop1, prop2 } = { prop1: 'a', prop2: 'b' };
console.log({ prop1, prop2 }); // { prop1: 'a', prop2: 'b' }
```




---
### 👀 POINT
1. flag 변수를 이용해 마우스를 클릭하고 있는지(`mousedown`) 아닌지(`mouseup`, `mouseout`)를 판단 후, 참이라면 draw 함수를 실행해 선을 그린다. 

2. `mousedown` 이벤트가 발생했을 때 선을 그리기 시작하는 시작점인 lastX, lastY변수에 현재 마우스의 위치를 대입해준다.     
```javascript
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
```

3. 그 후 `mousemove` 이벤트가 발생되어 draw 함수 호출로 선이 그려질 때 마우스가 움직이는 순간마다 시작점을 현재 마우스 위치로 갱신해준다.      
```javascript
canvas.addEventListener('mousemove', draw);

function draw(e) {
    // ... 생략 
    ctx.moveTo(lastX, lastY); // start from
    ctx.lineTo(e.offsetX, e.offsetY); // go to(현재 mousedown 이벤트가 발생하는 위치)
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY]; // 마우스가 움직이는 순간마다 start from 포인트 갱신
}
```