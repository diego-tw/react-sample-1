import React, {Component} from 'react'
import ReactScrollableList from 'react-scrollable-list'

class KeysList extends Component {


    render() {

        let listItems = []
        for (let i = 0; i < 10000; i++) {
            listItems.push({ id: i, content: i*i })
        }


        return (<ReactScrollableList
                listItems={listItems}
                heightOfItem={30}
                maxItemsToRender={10}
            />
        )
    }
}

export default KeysList;