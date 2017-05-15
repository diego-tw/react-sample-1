import React, {Component} from 'react'
import AlertContainer from 'react-alert'


class RefreshButton extends Component {

    constructor(props) {
        super(props);
    }


    alertOptions = {
        offset: 14,
        position: 'bottom left',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
    }

    showAlert = () => {
        this.msg.show('Getting latest data...', {
            time: 2000,
            type: 'success'
        })
    }

    render () {
        return (
            <div>
                <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                <button onClick={this.showAlert}>Refresh</button>
            </div>
        )
    }
}

export default RefreshButton;

