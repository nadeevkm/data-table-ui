import React from "react";
import ReactTable from "react-table";
import Axios from "axios";
import "react-table/react-table.css";

const serverApiUrl = 'http://localhost:8080/data-records/';

const requestData = (pageSize, page, sorted, filtered) => {
    let pageNum = 'page=' + page;
    let pageSizeValue = 'size=' + pageSize;
    let pageable = pageNum + "&" + pageSizeValue;

    let sort = '';
    if (sorted.length > 0) {
        let column = sorted[0].id;
        let direction = sorted[0].desc ? "desc" : "asc";
        sorted.map(d => d.desc ? "desc" : "asc");
        sort = "&sort=" + column + "," + direction;
    }
    let filter = '';
    if(filtered.length > 0){
        let column = filtered[0].id;
        let value = filtered[0].value;
        filter =  "&" + column + "=" + value;
    }
    return Axios.get(serverApiUrl + '?' + pageable + sort + filter).then(response => {
        return response.data
    })
};

export default class DataTable extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            pages: null,
            loading: true,
            pageSize: 20
        };
        this.fetchData = this.fetchData.bind(this);
    }

    fetchData(state, instance) {
        this.setState({loading: true});
        requestData(
            state.pageSize,
            state.page,
            state.sorted,
            state.filtered
        ).then(res => {
            this.setState({
                data: res.data,
                pages: res.total,
                loading: false
            });
        });
    }

    render() {
        const {data, pageSize, pages, loading} = this.state;
        return (
            <div>
                <ReactTable
                    columns={[
                        {
                            Header: "id",
                            accessor: "id",
                            filterable: false
                        },
                        {
                            Header: "name",
                            accessor: "name",
                        },
                        {
                            Header: "value",
                            accessor: "value",
                            filterable: false
                        }
                    ]}
                    manual
                    data={data}
                    pages={pages}
                    loading={loading}
                    onFetchData={this.fetchData}
                    filterable
                    defaultPageSize={pageSize}
                    onPageSizeChange={(pageSize, pageIndex) => {
                        this.setState({
                            page: pageIndex,
                            pageSize: pageSize
                        });
                    }}
                    className="-striped -highlight"
                />
                <br/>
            </div>
        );
    }
}