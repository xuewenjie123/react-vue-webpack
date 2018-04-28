import React from 'react';
import '../../public/css/shop.pcss';
import util from '../../public/js/util';
import apiRequest from '../../public/js/apiRequest';
class Index extends React.Component {
    constructor(props){
        super(props)
        this.state={
            name:""
        }
    }
    componentDidMount(){
        console.log(apiRequest)
        apiRequest.post('/api/test', {
        }, data => console.log(data.code), data => console.log(data.code));
    }

    render() {
        return (
            <div className="shop">
               <div>
                    {this.state.name}
                </div>
                这是商城
            </div>
        );
    }
}

export default Index;