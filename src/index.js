import React from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';
import { observable, action } from "mobx";
import { observer } from 'mobx-react';

const nickName = observable({
    firstName : 'nikita',
    age: 23,

    get nickName() {
        console.log('work');
        return `${this.firstName}${this.age}`;
    },

    increment() { this.age++ },

    decrement() { this.age-- },
},{
    increment: action('plus'),
    decrement: action('minus')
},{
    name:'observableObject'
});

const todos = observable([
    { text: 'Learn React'},
    { text: 'Learn MobX'}
]);


@observer class Counter extends React.Component {

    handleIncrement = () => { this.props.store.increment() };
    handleDecrement = () => { this.props.store.decrement() };

    render() {
        return (
            <div>
                <DevTools />
                <h1>{this.props.store.nickName}</h1>
                <h1>{this.props.store.age}</h1>
                <button onClick={this.handleDecrement}>-1</button>
                <button onClick={this.handleIncrement}>+1</button>
                <ul>
                    {todos.map(({ text }) => <li key={text}>{text}</li>)}
                </ul>
            </div>
        );
    }
}

ReactDOM.render(<Counter store={nickName} />, document.getElementById('root'));