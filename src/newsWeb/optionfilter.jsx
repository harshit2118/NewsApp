import React,{Component} from 'react';
class OptionsFilter extends Component{
    handleChange=(e)=>{
        const {currentTarget:input}=e;
        let options={...this.props.options};
        options[input.name]=input.value;
        this.props.onOptionsChange(options);
    };
    createDrpDwn=(arr,name,value,disabledText)=>{
        return <ul class="list-group">
                <li class="list-group-item"><b>Order</b></li>
                <li class="list-group-item">
                <select className="form-control" name={name} value={value} onChange={this.handleChange}>
                    <option disabled selected value="">{disabledText}</option>
                    {
                        arr.map((x)=><option>{x}</option>)
                     }
                </select>
                </li>
            </ul> 
    }
    createRadios=(arr,values,name,label)=>{
        return <ul class="list-group">
                    <li class="list-group-item"><b>{label}</b></li>
                    {
                       arr.map((x)=>(
                            <li className="list-group-item form-check pl-5">
                                <input
                                className="form-check-input"
                                value={x.toLowerCase()}
                                type="radio"
                                name={name}
                                checked={values==x.toLowerCase()}
                                onChange={this.handleChange}
                                />
                                <label className="form-check-label">{x}</label>
                            </li>
                ))
            }
            </ul>
    }
    render(){
        let {section=""}=this.props.options;
        let {sectionsArr,ordersArr}=this.props;
        return(
            <div className="container bg-light">
                <div className="row">
                    <div className="col-12">
                        {this.createDrpDwn(ordersArr,"order-by",this.props.options["order-by"],"Select Order")}
                    </div>
                </div>
                <br/>
                <div className="row">
                    <hr className="col-11"/>
                    <div className="col-12">
                        {this.createRadios(sectionsArr,section,"section","Sections")}
                    </div>
                    {/**/}
                </div>
            </div>
        )
    }
}
export default OptionsFilter;