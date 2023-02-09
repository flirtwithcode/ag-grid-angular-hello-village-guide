import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  private gridApi;
  private gridColumnApi;
  private getRowNodeId;
  private columnDefs;
  private defaultColDef;
  private rowData;
  private backupRowData;

  private gridApi2;
  private gridColumnApi2;
  private getRowNodeId2;
  private columnDefs2;
  private defaultColDef2;
  private rowData2;
  private backupRowData2;



  constructor(private http: HttpClient) {
    this.columnDefs = [
      {
        field: "athlete",
        minWidth: 150
      },
      {
        field: "age",
        minWidth: 80
      },{
        field: "bronze",
        minWidth: 80
      },{
        field: "country",
        minWidth: 150
      },{
        field: "date",
        minWidth: 150
      },{
        field: "gold",
        minWidth: 80
      },{
        field: "sport",
        minWidth: 150
      }{
        displayName : "Action",
        field: "",
        minWidth: 150
      }
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 100
    };
    this.getRowNodeId = params => {
      return params.id;
    };

    this.columnDefs2 = [
      {
        field: "athlete",
        minWidth: 150
      }
    ];
    this.defaultColDef2 = {
      flex: 1,
      minWidth: 100
    };
    this.getRowNodeId2 = params => {
      return params.id;
    };
  }

  addRowData = () => {
    let newRowData = this.rowData.slice();
    let newId =
      this.rowData.length === 0
        ? 0
        : this.rowData[this.rowData.length - 1].id + 1;
    let newRow = { athlete: "new athlete", id: newId };
    newRowData.push(newRow);
    this.rowData = newRowData;
  };

  updateEvenRowData = () => {
    let newRowData = this.rowData.map((row, index) => {
      if (index % 2 === 0) {
        return { ...row, athlete: "Even Row" };
      }
      return row;
    });
    this.rowData = newRowData;
  };

  updateOddRowData = () => {
    let newRowData = this.rowData.map((row, index) => {
      if (index % 2 !== 0) {
        return { ...row, athlete: "Odd Row" };
      }
      return row;
    });
    this.rowData = newRowData;
  };

  removeRowData = () => {
    let focusedNode = this.gridApi.getSelectedRows()[0];
    let newRowData = this.rowData.filter(row => {
      return row !== focusedNode;
    });
    this.rowData = newRowData;
  };

  resetRowData = () => {
    this.rowData = this.backupRowData;
  };

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get(
        "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json"
      )
      .subscribe((data: any[]) => {
        data.length = 10;
        data = data.map((row, index) => {
          return { ...row, id: index + 1 };
        });
        this.backupRowData = data;
        this.rowData = data;
      });
  }

  //GridApi 2 below Changes
  addRowData2 = () => {
    let newRowData = this.rowData2.slice();
    let newId =
      this.rowData2.length === 0
        ? 0
        : this.rowData2[this.rowData2.length - 1].id + 1;
    let newRow = { athlete: "new athlete", id: newId };
    newRowData.push(newRow);
    this.rowData2 = newRowData;
  };

  updateEvenRowData2 = () => {
    let newRowData = this.rowData2.map((row, index) => {
      if (index % 2 === 0) {
        return { ...row, athlete: "Even Row" };
      }
      return row;
    });
    this.rowData2 = newRowData;
  };

  updateOddRowData2 = () => {
    let newRowData = this.rowData2.map((row, index) => {
      if (index % 2 !== 0) {
        return { ...row, athlete: "Odd Row" };
      }
      return row;
    });
    this.rowData2 = newRowData;
  };

  removeRowData2 = () => {
    //gridApi2
    let focusedNode = this.gridApi2.getSelectedRows()[0];
    let newRowData = this.rowData2.filter(row => {
      return row !== focusedNode;
    });
    this.rowData2 = newRowData;
  };

  resetRowData2 = () => {
    this.rowData2 = this.backupRowData2;
  };

  onGridReady2(params) {
    this.gridApi2 = params.api;
    this.gridColumnApi2 = params.columnApi;

    this.http
      .get(
        "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json"
      )
      .subscribe((data: any[]) => {
        data.length = 10;
        data = data.map((row, index) => {
          return { ...row, id: index + 1 };
        });
        this.backupRowData2 = data;
        this.rowData2 = data;
      });
  }
}
