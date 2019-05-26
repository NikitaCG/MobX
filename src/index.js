import React from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';
import {observable, action, decorate, configure, runInAction} from "mobx";
import { observer } from 'mobx-react';

configure({enforceActions: 'observed'});

// const nickName = observable({
//     firstName : 'nikita',
//     age: 23,
//
//     get nickName() {
//         console.log('work');
//         return `${this.firstName}${this.age}`;
//     },
//
//     increment() { this.age++ },
//
//     decrement() { this.age-- },
// },{
//     increment: action('plus'),
//     decrement: action('minus')
// },{
//     name:'observableObject'
// });
//
// const todos = observable([
//     { text: 'Learn React'},
//     { text: 'Learn MobX'}
// ]);

class Store  {
    user = null;

    getUser() {
        fetch('https://randomuser.me/api/')
            .then(res => res.json())
            .then(json => {
                if (json.results) {
                    runInAction( () => { this.user = json.results[0]; });
                    //или
                    // this.setUser(json.results);
                }
            })
    }

    // setUser(results) {
    //     this.user = results[0];
    // }
}

decorate(Store, {
    user: observable,
    getUser: action.bound,
    // setUser: action
});

const appStore = new Store();


@observer class App extends React.Component {

    render() {
        const { store } = this.props;

        return (
            <div>
                <DevTools />
                <button onClick={store.getUser}>Get User</button>
                <h1>{store.user ? store.user.login.username : 'Default name'}</h1>
            </div>
        );
    }
}

ReactDOM.render(<App store={appStore} />, document.getElementById('root'));