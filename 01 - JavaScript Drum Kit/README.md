# 01. Javascript Drum Kit

### :pencil: NOTE
### 1. HTML
#### 1.1 kbd태그
키보드로 들어가는 사용자 입력을 나타내기 위해 `<kbd>` 태그를 사용한다.    

```html
To delete lines, 
press <kbd><kbd>ctrl</kbd> + <kbd>d</kbd></kbd>
```


#### 1.2 data-key 속성
어느 요소에나 `data-`로 시작하는 속성을 사용할 수 있다. 

> Javascript에서 접근하기   
<https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/%EB%8D%B0%EC%9D%B4%ED%84%B0_%EC%86%8D%EC%84%B1_%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0>  

### Point!
- 모든 키(keydown event발생 시)는 keyCode 값을 갖고 있다. 
- data-key라는 사용자 정의 속성을 이용해 드럼킷과 audio요소를 묶어준다.   

```javascript
<audio class="key-65" src="#"></audio>

//위처럼 클래스를 이용해 값을 담아도 되지만 그보다는 아래가 덜 번거롭다. 
<audio data-key="65" src="#"></audio>
```

#### 1.3 audio태그 



### 2. CSS
#### 2.1 vh, rem 
#### 2.2 display: flex
#### 2.3 align-items: center
#### 2.4 justify-content: center




### 3. Javascript
#### 3.1 `transitionend`
`transition` 이벤트가 끝났을 때 동작하는 이벤트이다.    
`setTimeout` 메소드를 이용해 직접 트랜지션 이벤트가 작동하는 시간을 지정해도 똑같이 동작하지만, `transitionend` 이벤트를 사용하면 시간을 일일이 지정해줄 필요가 없다. 
   
#### 3.2 e.propertyName

```css
/* CSS */
.key{
  transition: all .07s ease;
}
.playing{
  border-color: #ffc600;
  box-shadow: 0 0 1rem #ffc600;
  transform: scale(1.1);
}
```
CSS에서 key클래스에 `transition` 속성값으로 `all`을 주었기 때문에 요소에 playing클래스가 추가되면 해당 요소의 `propertyName`에는 border, box-shadow, transform이 담기게 된다.    
그 중 `transform`에 해당될 때만 playing클래스를 삭제하겠다는 `removeTransition`함수를 만든다. 

```javascript
function removeTransition(e){
  if(e.propertyName !== 'transform') return;
  // ...
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
```

#### 3.3 this
위의 `removeTransition` 함수(`addEventListener`함수의 콜백함수)에서 `this`는 `e.target` 즉, 해당 함수를 호출시킨 요소 `key`이다. 


#### 3.4 addClassList
```javascript
// Vanila JS
this.classList.add('playing');
this.classList.remove('playing');
this.classList.toggle('playing');

// jQuery
this.addClass('playing');
this.removeClass('playing');
this.toggleClass('playing');
```

#### 3.5 audio태그 제어 스크립트
- `currentTime` 프로퍼티
- `play()` 메소드 




---
### ⚾ POINT
1. 사용자가 특정 키를 타이핑하면(`keydown`) 드럼소리를 내는 `playSound` 콜백함수를 실행한다. 
   - audio와 div.key 요소들의 `data-key` 속성에 미리 특정 keyCode값을 지정해놓는다. 
   - playSound 함수가 실행되면 입력된 keyCode값과 data-key속성값을 이용해 해당 keyCode값을 갖는 audio와 div.key 요소를 찾는다.
   - keyCode와 일치하는 audio요소가 없으면 return한다. 
   - 일치하는 audio요소가 있다면 div.key요소에 `playing`이라는 클래스를 추가하고, audio를 실행시킨다. 
   - playing클래스로 인해 div.key요소에 `transition` 이벤트가 발생한다.
1. key요소들을 전부 찾아 트랜지션이 끝나면(`transitionend`) playing 클래스를 삭제하는 `removeTransition` 콜백함수를 실행한다. 
   - (트랜지션이 발생한) 이벤트 객체(e)의 `propertyName` 속성에 transform값이 없다면 return한다. 
   - transform값이 있다면 트랜지션 이벤트가 발생한 해당 요소(e.target)에서 playing 클래스를 삭제한다. 