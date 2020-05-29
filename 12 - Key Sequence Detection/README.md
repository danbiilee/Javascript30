# 12. Key Sequence Detection


### 🌼 POINT
- 코나미 코드
- `window` 객체에 `keyup` 이벤트가 발생하면, 입력한 글자를 배열에 담고 `splice()` 를 이용해 일정 길이 이상이 되면 잘라내어, 배열의 문자열이 secretCode와 일치하면 유니콘 소환!
  
```javascript
const secretCode = 'wesbos';

// 첫번째 인자가 음수이면 pressed 배열의 맨 끝에서부터 앞으로 카운트해나간다. 
pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
```