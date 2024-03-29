# 02. JS and CSS Clock

### :pencil: NOTE
### 1. CSS
#### 1.1 box-shadow
장황한 `box-shadow`를 구경해보자... 🥴😵    

```css
.clock {
box-shadow:
  0 0 0 4px rgba(0,0,0,0.1),
  inset 0 0 0 3px #EFEFEF,
  inset 0 0 10px black,
  0 0 10px rgba(0,0,0,0.2);
}
```

#### 1.2 transform-origin
`transform-origin`은 x축의 어느 지점을 기준으로 `transform`이 작동하게 될 지를 정하는 속성이다. 

```css
.hand {
  transform-origin: 100%;
  transform: rotate(90deg);
}
```

기본값은 50%으로, 요소의 중앙을 기준으로 회전이 일어나게 된다.   
100%로 지정할 경우 요소의 가장 오른쪽 지점을 핀으로 박아놓은 것처럼 고정한 채 회전하게 되므로 시계바늘처럼 움직이는 게 가능해진다. 

> ❗ `div`태그는 `block`요소이므로 12시를 기준으로 바늘을 움직이기 위해선 기본적으로 90도에 맞춰주는 것이 필요하다.   



#### 1.3 transition
- transition
- transition-timing-function




### 2. Javscript
#### 2.1 setInterval
1초마다 시간을 재설정해준다.   

```javascript
setInterval(setDate, 1000);
```




---
### 🕘 POINT
1. CSS에서 `transform`, `transition`을 이용해 시계바늘처럼 움직일 수 있게 설정한다.
2. 시간을 설정하는 `setDate` 함수를 만든다. 그리고 지금 시간에서 초, 분, 시각을 구해 시계바늘에 각각 설정해준다.  

```javascript
// 분 구할 땐 왜 초에 *6을 하고, 시간 구할 땐 왜 분에 *30을 하는지 모르겠다!
const minsDegrees = ((mins / 60) * 360) + ((seconds/60) * 6) + 90;
const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
```
3. `setInterval` 메소드를 이용해 `setDate` 함수를 1초마다 반복해서 실행한다. 




--- 
### 🛑 ISSUE
59초 ~ 1초로 넘어가는 사이가 매끄럽지 않다. 0도가 되는 순간 90도로 바껴서 초침이 뒤로 돌아가기 때문이다.    
> ✅ 영상에서 제시한 해결책
> 1. 초침이 뒤로 돌아가지 않게 degrees를 계속해서 카운팅해주기
> 2. 일시적으로 transition을 해제했다가 다시 설정해주기 

(*나는 2번 방법으로 문제를 해결했다.*)

```javascript
if(secondsDegrees === 90){
    secondHand.style.transition = 'none';
}
else{
    secondHand.style.transition = 'all 0.05s';
}
```



