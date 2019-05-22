import React from 'react';
import ReactDOM from 'react-dom';
import DevTools from 'mobx-react-devtools';

class App extends React.Component {
    render() {
        return (
            <div>
                <DevTools />
                <h1>Azaza mobX</h1>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));