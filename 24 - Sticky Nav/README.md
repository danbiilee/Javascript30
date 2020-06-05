# 24. Sticky Nav


### :pencil: NOTE
### 1. transition 시 width와 max-width
`width`로 스타일을 지정하면 `transition`에 의한 효과가 적용되지 않는다. `max-width`로 지정해야 한다.    
(*왜지?!??!*)

```css 
li.logo {
  max-width: 0;
  /* ... */  
	transition: all 0.5s;
}
.fixed-nav li.logo {
	max-width: 500px;
}
```
### 2. 크기 구하기
맨날 까먹는 속성들...

- `offsetTop`: 브라우저 맨 위에서부터 요소까지의 높이 
- `offsetHegiht`: 요소의 높이
- `window.scrollY` : 브라우저 맨 위를 기준으로 스크롤한 높이 



---
### 🎆 POINT
1. `window`에 `scroll` 이벤트가 발생하면 `fixNav` 콜백함수가 실행된다. 
2. 스크롤한 높이가 nav 의 `offsetTop`보다 커지면(즉, nav가 스크롤에 의해 가려지기 시작하면?!) `fixed-nav` 클래스를 더하고, 그렇지 않으면 클래스를 지운다. 
```javascript
if(window.scrollY >= topOfNav) {
  document.body.style.paddingTop = nav.offsetHeight + 'px';
  document.body.classList.add('fixed-nav');
} else {
  document.body.style.paddingTop = 0;
  document.body.classList.remove('fixed-nav');
}
```

> [❔] : `body`에 paddingTop 값은 왜 주는 지 모르겠다. 하나 안하나 똑같아 보이는데!?

[🔍답] : `position: fixed`에 의해 nav는 브라우저 맨 위에 달라붙으면서 원래 차지하고 있던 공간을 잃게(?!) 된다. 때문에 그 아래에 있던 div가 nav에 의해 생긴 공간만큼 갑자기 훅 뛰어올라가버린다.   
그래서 nav가 fixed되던 안되던 항상 nav의 높이값만큼을 유지하고자 paddingTop값을 추가해주는 것이다! 


