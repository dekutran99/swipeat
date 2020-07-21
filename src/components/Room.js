import React from 'react';

export default class Room extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: {}
        };
    }

    componentDidMount() {
        this.setState({
            query: this.parseQuery(this.props.location.search)
        })

        const ws = new WebSocket(`ws://${window.location.host}${window.location.pathname}`)
    }

    parseQuery(queryStr) {
        let params = queryStr.substring(1, queryStr.length).split('&');
        let query = {};
        params.forEach((param) => {
            let [key, value] = param.split('=');
            query[key] = value;
        });
        return query;
    }

    render() {
        return (
            <div>
                {this.props.ssr === undefined ? (
                        <h1>Welcome to room {this.state.query.room_id}</h1>
                    ) : (
                        <h1>Welcome to room {this.props.room_id}</h1>
                    )}
            </div>
        )
    }

}