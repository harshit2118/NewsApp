import React,{Component} from 'react';
import http from '../httpNewsService';
import queryString from 'query-string';
import NavBar from './navbar';
import OptionsFilter from './optionfilter';
class NewsComp extends Component{
    state={
        data:{},
        searchText:"",
        orders:['oldest','newest','relevence'],
        sections:["Business","Technology","Politics","LifeStyle"]
    }
    handleChange=(e)=>{
        let {currentTarget:input}=e;
        let s1={...this.state};
        s1.searchText=input.value;
        this.setState(s1);
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        let json={};
        console.log("hello");
        console.log(this.state.searchText);
        json.q=this.state.searchText;
        this.handleOptionChange(json);
    }
    handleOptionChange=(options)=>{
        options.page="1";
        console.log(options);
        this.callURL("/home",options);
    }
    callURL=(url,options)=>{
        console.log(options)
        let searchStr=this.makeSerachStr(options);
        console.log(searchStr);
        this.props.history.push({
            pathName:url,
            search:searchStr,
        })
    }
    makeSerachStr=(options)=>{
        let {page,section,q}=options
        let searchStr="";
        searchStr=this.addToQueryString(searchStr,"q",q);
        searchStr=this.addToQueryString(searchStr,"order-by",options["order-by"]);
        searchStr=this.addToQueryString(searchStr,"section",section);
        searchStr=this.addToQueryString(searchStr,"page",page);
        return searchStr;
    }
    addToQueryString=(searchStr,name,value)=>{
        return value?
        searchStr?`${searchStr}&${name}=${value}`
        :`${name}=${value}`
        :searchStr;
    }
    async fetchData(){
        let queryParams=queryString.parse(this.props.location.search);
        let searchStr=this.makeSerachStr(queryParams);
        console.log(searchStr);
        let response = await http.get(`/search?api-key=test&${searchStr}`);
        //console.log(response);
        let {data}=response;
        this.setState({data:data,searchText:queryParams.q});
    }
    componentDidMount(){
        this.fetchData()
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps!==this.props) this.fetchData();
    }
    updatePage=(num)=>{
        let queryParams=queryString.parse(this.props.location.search);
        console.log(queryParams);
        let {page="1"} = queryParams;
        let newPage="";
        if(num===0){
            newPage=parseInt(page)-1;
        }
        else{
            newPage=parseInt(page)+1;
        }
        queryParams.page=newPage;
        this.callURL("/home",queryParams);
    }
    render(){
        let {response={}}=this.state.data;
        let {searchText,orders,sections}=this.state;
        let queryParams=queryString.parse(this.props.location.search);
        let {results=[],currentPage,pages,startIndex,pageSize,total}=response;
        //console.log(results);
        return(
            <div className="container m-4">
                <div className="row">
                    <div className="col-3">
                        <OptionsFilter
                        options={queryParams}
                        ordersArr={orders}
                        sectionsArr={sections}
                        onOptionsChange={this.handleOptionChange}/>
                    </div>
                    <div className="col-9">
                        <div className="row mb-4">
                            <div className="col-9">
                            <input className="form-control"
                            value={searchText}
                            onChange={this.handleChange}
                            placeholder="Search"/></div>
                            <div className="col-1"></div>
                            <div className="col-2">
                                <button className="btn btn-secondary" onClick={this.handleSubmit}>Search</button>
                            </div>
                        </div>
                        {startIndex+"-"+((startIndex+pageSize-1)<total?startIndex+pageSize-1:total)+" of "+total}
                        <div className="row">
                            {
                                results.map((x)=>{
                                    return <div className="col-3 ml-2 mb-2 p-2 border text-center" style={{background:"PaleTurquoise"}}>
                                        {x.webTitle}<br/>
                                        <b>Source:{x.sectionName}</b><br/>
                                        <b>{x.webPublicationDate}</b><br/>
                                        <a href={x.webUrl}>Preview</a>
                                    </div>
                                })
                            }
                        </div>
                        <div className="row">
                                <div className="col-1">{currentPage==1?"":<button className="btn btn-danger" onClick={()=>this.updatePage(0)}>Previous</button>}</div>
                                <div className="col-10"></div>
                                <div className="col-1">{currentPage==pages?"":<button className="btn btn-danger" onClick={()=>this.updatePage(1)}>Next</button>}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewsComp;