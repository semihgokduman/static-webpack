class Observable {
  constructor() {
    this.observers = [];
    this._prevData = '';
  }

  subscribe(f) {
    this.observers.push(f);

    return this;
  }

  unsubscribe(f) {
    this.observers = this.observers.filter(subscriber => subscriber !== f);
  }

  notify(data) {

    if (this._prevData != data){
      console.log(data)
      this.observers.forEach(observer => observer(data));
      this._prevData = data;
    }
  }
}

if($('#observe').length > 0){

    const input = document.querySelector('.js-input');

    const p1 = document.querySelector('.js-p1');
    const p2 = document.querySelector('.js-p2');
    const p3 = document.querySelector('.js-p3');

    const subscribeP1 = document.querySelector('.js-subscribe-p1');
    const subscribeP2 = document.querySelector('.js-subscribe-p2');
    const subscribeP3 = document.querySelector('.js-subscribe-p3');

    const unsubscribeP1 = document.querySelector('.js-unsubscribe-p1');
    const unsubscribeP2 = document.querySelector('.js-unsubscribe-p2');
    const unsubscribeP3 = document.querySelector('.js-unsubscribe-p3');

    const historyElement = document.querySelector('#history');

    const updateP1 = text => p1.textContent = text;
    const updateP2 = text => p2.textContent = text;
    const updateP3 = text => p3.textContent = text;

    const updateHistory = (text) => {
      historyElement.innerHTML += `<div>${text}</div>`;
      historyElement.scrollTop = historyElement.scrollHeight;
    };

    const headingsObserver = new Observable();
    headingsObserver.subscribe(updateP1);
    headingsObserver.subscribe(updateP2);
    headingsObserver.subscribe(updateP3);
    headingsObserver.subscribe(updateHistory);


    [
      {element : subscribeP1, fn : updateP1, type: 'subscribe'},
      {element : unsubscribeP1, fn : updateP1, type: 'unsubscribe'},
      {element : subscribeP2, fn : updateP2, type: 'subscribe'},
      {element : unsubscribeP2, fn : updateP2, type: 'unsubscribe'},
      {element : subscribeP3, fn : updateP3, type: 'subscribe'},
      {element : unsubscribeP3, fn : updateP3, type: 'unsubscribe'}
    ].map((obj) => {
      if(obj.type === 'subscribe'){
        obj.element.addEventListener('click', () => headingsObserver.subscribe(obj.fn));
      }else{
        obj.element.addEventListener('click', () => headingsObserver.unsubscribe(obj.fn));
      }
    });

    ['keyup', 'keydown'].map((event) => {
      input.addEventListener(event, e => {
        headingsObserver.notify(e.target.value);
      });
    });


}
