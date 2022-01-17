
import React from "react"
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  UncontrolledDropdown,
} from "reactstrap"

const AssetColumns = () => [
  {
    dataField: "id",
    text: "#",
    formatter: (cellContent, row) => (
      <div className="form-check font-size-16">
        <Input type="checkbox" className="form-check-input" id={row.id} />
        <Label className="form-check-label" htmlFor={row.id}>
          &nbsp;
        </Label>
      </div>
    ),
  },
  {"dataField":"ownerId","text":"ownerId","sort":true},{"dataField":"owner","text":"owner","sort":true},{"dataField":"collectionId","text":"collectionId","sort":true},{"dataField":"yearCreated","text":"yearCreated","sort":true},{"dataField":"description","text":"description","sort":true},{"dataField":"title","text":"title","sort":true},{"dataField":"price","text":"price","sort":true},{"dataField":"likes","text":"likes","sort":true},{"dataField":"file","text":"file","sort":true},{"dataField":"royalty","text":"royalty","sort":true},{"dataField":"properties","text":"properties","sort":true},{"dataField":"saleType","text":"saleType","sort":true}
  ,{
    dataField: "menu",
    isDummyField: true,
    text: "Action",
    formatter: () => (
      <UncontrolledDropdown direction="left">
        <DropdownToggle href="#" className="card-drop" tag="i">
          <i className="mdi mdi-dots-horizontal font-size-18" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem href="#">
            <i className="fas fa-pencil-alt text-success me-1" />
            Edit
          </DropdownItem>
          <DropdownItem href="#">
            <i className="fas fa-trash-alt text-danger me-1" />
            Delete
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    ),
  },
]

export default AssetColumns
