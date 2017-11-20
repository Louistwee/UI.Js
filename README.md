# UI.Js
## Branch: Promise
This branch is a complete rework based on the promise constructor in most modern browsers
- [ ] Build beautiful websites and editors.
- [ ] Create your own elements.
- [ ] Receive data from webSockets.
- [X] **Don't load unnecessary Js files.**

## Don't load unnecessary Js files.

![Image of javascript](https://raw.githubusercontent.com/Louistwee/UI/master/Untitled.png)

Example:

```javascript
UI()
  .get('YourFunctionThatYouWantToAppendToUI')
  .run('TheParametersForTheFunction')
  .fn(function(){
    alert('this function is called after .run()'
      + 'you can also call it directly after .get()')
  })
```
