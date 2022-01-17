
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

const CollectionColumns = () => [
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
  {"dataField":"ownerId","text":"ownerId","sort":true},{"dataField":"title","text":"title","sort":true},{"dataField":"owner","text":"owner","sort":true},{"dataField":"category","text":"category","sort":true}
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

export default CollectionColumns
