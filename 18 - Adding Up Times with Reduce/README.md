# 18. Adding Up Times With Reduce



### :pencil: NOTE

### 1. NodeList는 Array가 아니다!
`querySelectorAll` 메서드는 `NodeList`를 반환하기 때문에 배열로 변환하지 않으면, 배열의 내장 메서드들을 전부 이용할 수 없다.    
`map()`과 같은 메서드를 사용하고 싶다면 아래처럼 배열로 변환하도록 하자. 

```javascript
const timeNodes = Array.from(document.querySelectorAll('[data-time]'));
// 혹은 
// [...NodeList]
```


### 2. parseFloat()
`parseFloat()` 함수는 문자열을 부동소수점 실수로 반환한다. 

```javascript
let [mins, secs] = timeCode.split(':'); // 콘솔에서 검은색으로 찍힌다(문자열)
let [mins, secs] = timeCode.split(':').map(parseFloat); // 콘솔에서 파란색으로 찍힌다(숫자)

// 아래의 코드는 위 .map(parseFloat) 와 완전히 동일하다. 
arr.map(str => parseFloat(str));
```




### 🧵 POINT
1. HTML태그의 `data-time` 속성에 문자열로 담겨있는 비디오의 시간들을 꺼내서 `reduce()`메서드를 이용해 초단위로 전부 더한다.
2. 다시 시/분/초로 계산해 총 비디오 리스트의 시간을 구한다. 






